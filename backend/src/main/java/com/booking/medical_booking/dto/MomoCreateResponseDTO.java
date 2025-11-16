package com.booking.medical_booking.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
public class MomoCreateResponseDTO {
    @JsonProperty("partnerCode")
    private String partnerCode;
    
    @JsonProperty("requestId")
    private String requestId;
    
    @JsonProperty("orderId")
    private String orderId;
    
    @JsonProperty("amount")
    private Long amount;
    
    @JsonProperty("resultCode")
    private Integer resultCode; // 0: Thành công
    
    @JsonProperty("message")
    private String message;
    
    @JsonProperty("payUrl")
    private String payUrl; // URL thanh toán quan trọng nhất
    
    @JsonProperty("signature")
    private String signature;
}
