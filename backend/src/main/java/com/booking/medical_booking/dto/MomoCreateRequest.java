package com.booking.medical_booking.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
public class MomoCreateRequest {
    @JsonProperty("partnerCode")
    private String partnerCode;
    
    @JsonProperty("accessKey")
    private String accessKey;
    
    @JsonProperty("requestId")
    private String requestId;
    
    @JsonProperty("amount")
    private Long amount;
    
    @JsonProperty("orderId")
    private String orderId;
    
    @JsonProperty("orderInfo")
    private String orderInfo;
    
    @JsonProperty("redirectUrl")
    private String redirectUrl;
    
    @JsonProperty("ipnUrl")
    private String ipnUrl;
    
    @JsonProperty("requestType")
    private String requestType;
    
    @JsonProperty("extraData")
    private String extraData; 
    
    @JsonProperty("signature")
    private String signature;

   
}
