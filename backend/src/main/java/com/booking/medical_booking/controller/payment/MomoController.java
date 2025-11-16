package com.booking.medical_booking.controller.payment;

import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.booking.medical_booking.config.MomoProperties;
import com.booking.medical_booking.dto.MomoCreateResponseDTO;
import com.booking.medical_booking.dto.MomoIPNRequest;
import com.booking.medical_booking.service.payment.Momoservice;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/momo")
public class MomoController{
    
    @Autowired
    private Momoservice momoService;

    @Autowired
    private MomoProperties momoProperties;

    
    @PostMapping("/create-payment")
    public ResponseEntity<MomoCreateResponseDTO> createPayment(
        @RequestParam long amount, 
        @RequestParam String orderInfo
    ) {
        MomoCreateResponseDTO response = momoService.createPayment(amount, orderInfo);
        if (response == null || response.getPayUrl() == null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body(response);
        }
        return ResponseEntity.ok(response);
    }

    @GetMapping("/payment-result")
    public String handleReturnUrl(HttpServletRequest request) {
        String partnerCode = request.getParameter("partnerCode");
        String orderId = request.getParameter("orderId");
        String requestId = request.getParameter("requestId");
        String amount = request.getParameter("amount");
        String orderInfo = request.getParameter("orderInfo");
        String resultCode = request.getParameter("resultCode"); 
        String message = request.getParameter("message");
        String responseSignature = request.getParameter("signature");

        String rawHash = String.format(
            "partnerCode=%s&orderId=%s&requestId=%s&amount=%s&orderInfo=%s&orderType=momo_wallet" + 
            "&transId=&resultCode=%s&message=%s&payType=qr",
            partnerCode, orderId, requestId, amount, orderInfo, resultCode, message
        );
        
        String localSignature = momoService.createSignature(rawHash, momoProperties.getSecretKey());
        
        String frontendRedirectUrl = "redirect:http://localhost:3000/payment-status?status=failed";

        if (Objects.equals(localSignature, responseSignature)) {
            if (Objects.equals(resultCode, "0")) {
                frontendRedirectUrl = "redirect:http://localhost:3000/payment-status?status=success&orderId=" + orderId;
            } else {
                System.out.println("MoMo Return: Giao dịch thất bại. Mã lỗi: " + resultCode);
                frontendRedirectUrl = "redirect:http://localhost:3000/payment-status?status=failed&message=" + message;
            }
        } else {
            System.err.println("MoMo Return: Lỗi xác thực chữ ký!");
        }

        return frontendRedirectUrl;
    }
    
    
    @PostMapping("/payment-notify")
    public ResponseEntity<?> handleIpnUrl(@RequestBody MomoIPNRequest ipnData) {
        
        String secretKey = momoProperties.getSecretKey();

        String rawHash = String.format(
            "partnerCode=%s&orderId=%s&requestId=%s&amount=%s&orderInfo=%s&orderType=%s" + 
            "&transId=%s&resultCode=%s&message=%s&payType=%s&responseTime=%s&extraData=%s",
            ipnData.getPartnerCode(), 
            ipnData.getOrderId(), 
            ipnData.getRequestId(), 
            ipnData.getAmount(), 
            ipnData.getOrderInfo(), 
            ipnData.getOrderType(),
            ipnData.getTransId(),
            ipnData.getResultCode(), 
            ipnData.getMessage(), 
            ipnData.getPayType(), 
            ipnData.getResponseTime(), 
            ipnData.getExtraData()
        );
        
        String localSignature = momoService.createSignature(rawHash, secretKey);

        if (Objects.equals(localSignature, ipnData.getSignature())) {
            if (ipnData.getResultCode()== null) {
                System.out.println("MoMo IPN Success: Đã cập nhật đơn hàng " + ipnData.getOrderId() + " đã thanh toán.");
                
                return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
            } else {
                System.out.println("MoMo IPN Failure: Giao dịch thất bại cho đơn hàng " + ipnData.getOrderId());
            }
        } else {
            System.err.println("MoMo IPN: Lỗi xác thực chữ ký cho đơn hàng " + ipnData.getOrderId());
        }
        
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }
}   