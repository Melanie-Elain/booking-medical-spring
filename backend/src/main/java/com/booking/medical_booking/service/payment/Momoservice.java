package com.booking.medical_booking.service.payment;

import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.Objects; // Cần thiết nếu dùng Objects.requireNonNull
import java.util.UUID;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service; // Thêm @Service
import org.springframework.web.client.RestTemplate; // Dùng để gọi API

import com.booking.medical_booking.config.MomoProperties;
import com.booking.medical_booking.dto.AppointmentDTO;
import com.booking.medical_booking.dto.MomoCreateRequest;
import com.booking.medical_booking.dto.MomoCreateResponseDTO;

import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.security.InvalidKeyException; 


@Service 
public class Momoservice {

    @Autowired
    private MomoProperties momoProperties;

    @Autowired
    private RestTemplate restTemplate; 
    
    public String createSignature(String rawData, String secretKey) {
        try {
            Mac mac = Mac.getInstance("HmacSHA256");
            SecretKeySpec secretKeySpec = new SecretKeySpec(secretKey.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
            mac.init(secretKeySpec);
            byte[] hmac = mac.doFinal(rawData.getBytes(StandardCharsets.UTF_8));

            // Chuyển sang HEX lowercase
            StringBuilder sb = new StringBuilder();
            for (byte b : hmac) {
                sb.append(String.format("%02x", b));
            }
            return sb.toString();
        } catch (Exception e) {
            throw new RuntimeException("Lỗi tạo chữ ký MoMo", e);
        }
    }
    
    public MomoCreateResponseDTO createPayment(long amount, String orderInfo) {
        
        // 1. Tạo các giá trị động
        String requestId = String.valueOf(System.currentTimeMillis());
        String orderId = "ORDER_" + requestId;
        String extraData = "";
        
        // Lấy thông tin từ MomoProperties
        String partnerCode = momoProperties.getPartnerCode();
        String accessKey = momoProperties.getAccessKey();
        String secretKey = momoProperties.getSecretKey();
        String returnUrl = momoProperties.getReturnUrl();
        String notifyUrl = momoProperties.getNotifyUrl();
        String requestType = momoProperties.getRequestType();

        

        // 2. Tạo chuỗi Raw Hash theo đúng thứ tự MoMo yêu cầu (QUAN TRỌNG)
        String rawHash = "accessKey=" + accessKey +
                         "&amount=" + amount +
                         "&extraData=" + extraData + 
                         "&orderId=" + orderId +
                         "&partnerCode=" + partnerCode +
                         "&redirectUrl=" + returnUrl +
                         "&ipnUrl=" + notifyUrl +
                         "&requestId=" + requestId +
                         "&orderInfo=" + orderInfo +
                         "&requestType=" + requestType;

        // 3. Tính toán Signature
        String signature = createSignature(rawHash, secretKey);

        // 4. Chuẩn bị Request Body (JSON)
        MomoCreateRequest requestBody = new MomoCreateRequest();
        requestBody.setPartnerCode(partnerCode);
        requestBody.setAccessKey(accessKey);
        requestBody.setRequestId(requestId);
        requestBody.setAmount(amount);
        requestBody.setOrderId(orderId);
        requestBody.setOrderInfo(orderInfo);
        requestBody.setRedirectUrl(returnUrl);
        requestBody.setIpnUrl(notifyUrl);
        requestBody.setRequestType(requestType);
        requestBody.setExtraData(extraData);
        requestBody.setSignature(signature);

        // 5. Cấu hình Headers và Entity
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        
        HttpEntity<MomoCreateRequest> entity = new HttpEntity<>(requestBody, headers);

        // 6. Gọi API MoMo
        try {
            // URL gọi API được lấy từ MomoProperties
            String paymentUrl = momoProperties.getPaymentUrl(); 
            
            MomoCreateResponseDTO response = restTemplate.postForObject(
                paymentUrl, 
                entity, 
                MomoCreateResponseDTO.class
            );
            
            return Objects.requireNonNull(response);
            
        } catch (Exception e) {
            System.err.println("Lỗi khi gọi API MoMo: " + e.getMessage());
            // Xử lý lỗi kết nối, timeout, hoặc lỗi phản hồi
            throw new RuntimeException("Không thể kết nối đến cổng thanh toán MoMo", e);
        }
    }


    public MomoCreateResponseDTO createPaymentRequest(AppointmentDTO bookingDetails) {

        // 1. Tạo các giá trị động
        String requestId = UUID.randomUUID().toString();
        String orderId = "ORD_" + bookingDetails.getMaGio() + "_" + UUID.randomUUID().toString().substring(0, 4);
        long amount = 0L;
        try {
            BigDecimal finalPrice = new BigDecimal(bookingDetails.getFinalPrice());
            amount = finalPrice.longValue(); // VNĐ
        } catch (Exception e) {
            amount = 1000L; // Giá trị mặc định để test sandbox
        }

        String orderInfo = "Thanh toán lịch khám ID: " + bookingDetails.getMaGio();
        String extraData = "";

        // 2. Lấy thông tin từ MomoProperties
        String partnerCode = momoProperties.getPartnerCode();
        String accessKey = momoProperties.getAccessKey();
        String secretKey = momoProperties.getSecretKey();
        String redirectUrl = momoProperties.getReturnUrl();
        String ipnUrl = momoProperties.getNotifyUrl();
        String requestType = momoProperties.getRequestType(); // thường "captureWallet"
        String endpoint = momoProperties.getPaymentUrl(); // sandbox endpoint

        

        // 3. Tạo chuỗi rawHash theo đúng thứ tự MoMo yêu cầu
        String rawHash = "partnerCode=" + partnerCode +
                         "&accessKey=" + accessKey +
                         "&requestId=" + requestId +
                         "&amount=" + amount +
                         "&orderId=" + orderId +
                         "&orderInfo=" + orderInfo +
                         "&redirectUrl=" + redirectUrl +
                         "&ipnUrl=" + ipnUrl +
                         "&extraData=" + extraData +
                         "&requestType=" + requestType;

        

        // 4. Tạo chữ ký
        String signature = createSignature(rawHash, secretKey);

        System.out.println("partnerCode=" + partnerCode);
        System.out.println("accessKey=" + accessKey);
        System.out.println("secretKey=" + secretKey);
        System.out.println("endpoint=" + endpoint);
        System.out.println("rawHash=" + rawHash);
        System.out.println("signature=" + signature);


        // 5. Chuẩn bị request body
        MomoCreateRequest requestBody = new MomoCreateRequest();
        requestBody.setPartnerCode(partnerCode);
        requestBody.setAccessKey(accessKey);
        requestBody.setRequestId(requestId);
        requestBody.setAmount(amount);
        requestBody.setOrderId(orderId);
        requestBody.setOrderInfo(orderInfo);
        requestBody.setRedirectUrl(redirectUrl);
        requestBody.setIpnUrl(ipnUrl);
        requestBody.setRequestType(requestType);
        requestBody.setExtraData(extraData);
        requestBody.setSignature(signature);

        // 6. Gọi API MoMo
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<MomoCreateRequest> entity = new HttpEntity<>(requestBody, headers);

            MomoCreateResponseDTO response = restTemplate.postForObject(
                    endpoint,
                    entity,
                    MomoCreateResponseDTO.class
            );

            return Objects.requireNonNull(response);

        } catch (Exception e) {
            throw new RuntimeException("Không thể kết nối tới cổng thanh toán MoMo: " + e.getMessage(), e);
        }
    }
}