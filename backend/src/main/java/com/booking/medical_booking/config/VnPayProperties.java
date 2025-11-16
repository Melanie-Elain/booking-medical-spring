package com.booking.medical_booking.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import lombok.Data;


@Data
@Configuration
@ConfigurationProperties(prefix = "vnpay")
public class VnPayProperties {
    private String tmnCode;         // Vnp_TmnCode
    private String hashSecret;      // Vnp_HashSecret (Secret Key)
    private String apiUrl;          // URL API tạo thanh toán
    private String returnUrl;
}
