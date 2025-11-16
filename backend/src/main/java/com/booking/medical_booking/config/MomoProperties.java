package com.booking.medical_booking.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import lombok.Data;

@Component
@Data
@ConfigurationProperties(prefix = "momo")
public class MomoProperties {
    
    private String partnerCode;
    private String accessKey;
    private String secretKey;
    private String requestType;
    private String paymentUrl;
    private String returnUrl;
    private String notifyUrl;

    
    
    
}