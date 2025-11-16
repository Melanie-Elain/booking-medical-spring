package com.booking.medical_booking.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal; // Sử dụng cho giá tiền

@Data
public class AppointmentDTO {    
    @NotNull(message = "Mã giờ là bắt buộc")
    private Integer maGio;          
    
    private Long userId;           
    
    private String ghiChu;          
    
    private String entityType;      
    
    private String examType;        
    
    private String finalPrice; 
}