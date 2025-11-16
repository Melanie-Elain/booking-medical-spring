package com.booking.medical_booking.dto;

import lombok.Data;

// Lớp này ánh xạ các tham số MoMo gửi về qua IPN URL/Return URL
@Data
public class MomoIPNRequest {
    
    // Khóa bảo mật và xác thực
    private String partnerCode;
    private String accessKey;
    private String requestId;
    private String orderId;
    private String amount;
    private String orderInfo;
    
    // Kết quả giao dịch
    private String orderType;
    private String transId;
    private String resultCode; // Mã lỗi MoMo (0 = Thành công)
    private String message;
    private String payType; // Phương thức thanh toán
    private String responseTime;
    
    // Tham số bảo mật bắt buộc để xác minh tính toàn vẹn
    private String signature; 

    // Các tham số khác (tùy thuộc vào phiên bản MoMo API)
    private String extraData; 
    private String locale;
}