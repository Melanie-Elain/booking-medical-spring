package com.booking.medical_booking.service.payment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.booking.medical_booking.config.VnPayProperties;
import com.booking.medical_booking.dto.AppointmentDTO;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.*;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

@Service
public class VNPayService {

    @Autowired private VnPayProperties vnPayProperties;

    private static String bytesToHex(byte[] bytes) {
        try (Formatter formatter = new Formatter()) {
            for (byte b : bytes) {
                formatter.format("%02x", b);
            }
            return formatter.toString();
        }
    }

    // Trong VnPayService.java

    public String hashAllFields(String hashSecret, Map<String, String> fields) {
        
        // 1. Sắp xếp các tham số theo thứ tự bảng chữ cái
        Map<String, String> sortedFields = new TreeMap<>(fields);
        
        StringBuilder hashData = new StringBuilder();
        
        // 2. Nối chuỗi tham số (Sử dụng URL Encoding cho giá trị)
        for (Map.Entry<String, String> entry : sortedFields.entrySet()) {
            String key = entry.getKey();
            String value = entry.getValue();

            if (value != null && !value.isEmpty()) {
                try {
                    // ✅ FIX: Mã hóa URL giá trị trước khi nối vào hashData
                    String encodedValue = URLEncoder.encode(value, StandardCharsets.US_ASCII.toString());

                    hashData.append(key);
                    hashData.append('=');
                    hashData.append(encodedValue); // <-- Nối giá trị đã được mã hóa
                    hashData.append('&');
                } catch (UnsupportedEncodingException e) {
                    // Lỗi này không nên xảy ra với US_ASCII, nhưng nên bắt
                    System.err.println("Encoding error: " + e.getMessage());
                    return null;
                }
            }
        }
        
        // 3. Loại bỏ ký tự '&' cuối cùng
        String rawHashData = hashData.toString();
        if (rawHashData.length() > 0) {
            rawHashData = rawHashData.substring(0, rawHashData.length() - 1);
        }

        try {
            // 4. Băm bằng HMAC-SHA512
            Mac sha512Hmac = Mac.getInstance("HmacSHA512");
            SecretKeySpec secretKey = new SecretKeySpec(hashSecret.getBytes(StandardCharsets.US_ASCII), "HmacSHA512");
            sha512Hmac.init(secretKey);
            
            byte[] hash = sha512Hmac.doFinal(rawHashData.getBytes(StandardCharsets.US_ASCII));
            
            // 5. Chuyển kết quả băm sang chuỗi Hex (Chữ hoa)
            return bytesToHex(hash).toUpperCase();
            
        } catch (Exception e) {
            System.err.println("Lỗi tạo Secure Hash VNPAY: " + e.getMessage());
            return null;
        }
    }

    
    public String createPaymentUrl(AppointmentDTO bookingDetails, Integer orderId, long totalAmount) throws UnsupportedEncodingException {
        
        String vnp_TxnRef = String.valueOf(orderId);
        String vnp_OrderInfo = "Thanh toan don hang lich kham #" + orderId;
        long totalAmountInCents = totalAmount;
        String vnp_Amount = String.valueOf(totalAmountInCents); 
        
        String vnp_CreateDate = new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()); 
        System.out.println(".......vnp_TmnCode......: "+vnPayProperties.getTmnCode());
        System.out.println(".......vnp_ReturnUrl......: "+vnPayProperties.getReturnUrl());
        System.out.println(".......vnPayProperties.getApiUrl().....: "+vnPayProperties.getApiUrl());


        Map<String, String> vnp_Params = new TreeMap<>();
        vnp_Params.put("vnp_Version", "2.1.0");
        vnp_Params.put("vnp_Command", "pay");
        vnp_Params.put("vnp_TmnCode", vnPayProperties.getTmnCode());
        vnp_Params.put("vnp_Amount", vnp_Amount);
        vnp_Params.put("vnp_BankCode", ""); 
        vnp_Params.put("vnp_CreateDate", vnp_CreateDate); 
        vnp_Params.put("vnp_CurrCode", "VND");
        vnp_Params.put("vnp_IpAddr", "127.0.0.1");
        vnp_Params.put("vnp_Locale", "vn");
        vnp_Params.put("vnp_OrderInfo", vnp_OrderInfo);
        vnp_Params.put("vnp_OrderType", "other");
        vnp_Params.put("vnp_ReturnUrl", vnPayProperties.getReturnUrl());
        vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
        
        String vnp_SecureHash = hashAllFields(vnPayProperties.getHashSecret(), vnp_Params); 
        vnp_Params.put("vnp_SecureHash", vnp_SecureHash);

        String queryUrl = this.buildQueryUrl(vnp_Params); // 
        return vnPayProperties.getApiUrl() + "?" + queryUrl;
    }

    private String buildQueryUrl(Map<String, String> params) throws UnsupportedEncodingException {
    
        // Khai báo kiểu mã hóa (UTF-8 là tiêu chuẩn cho Web)
        String encoding = StandardCharsets.UTF_8.toString(); 
    
        StringBuilder query = new StringBuilder();
        for (Map.Entry<String, String> entry : params.entrySet()) {
            
            String key = entry.getKey();
            String value = entry.getValue();
    
            if (value != null && !value.isEmpty()) {
                
                // 1. Mã hóa Key và nối với '='
                query.append(URLEncoder.encode(key, encoding));
                query.append('=');
                
                // 2. Mã hóa Value
                query.append(URLEncoder.encode(value, encoding));
                
                // 3. Nối với '&' (Trừ phần tử cuối cùng)
                query.append('&');
            }
        }
        
        // Loại bỏ '&' cuối cùng (nếu chuỗi không rỗng)
        if (query.length() > 0) {
            return query.toString().substring(0, query.length() - 1); 
        }
        return query.toString();
    }
}