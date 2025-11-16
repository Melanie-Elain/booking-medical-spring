package com.booking.medical_booking.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PaymentResponseDTO {
    private String payUrl; 
    private String paymentMethod;
    public PaymentResponseDTO(String payUrl, String paymentMethod) { 
        this.payUrl = payUrl;
        this.paymentMethod = paymentMethod;
    }
}
