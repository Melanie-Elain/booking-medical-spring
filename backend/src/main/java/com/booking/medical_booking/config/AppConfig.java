package com.booking.medical_booking.config; 

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class AppConfig {

    /**
     * Định nghĩa Bean RestTemplate để sử dụng trong các Service lớp giao tiếp API ngoài.
     */
    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}