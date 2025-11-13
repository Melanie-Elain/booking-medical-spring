package com.booking.medical_booking.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AppointmentDTO {
    
    @NotNull(message = "Mã giờ là bắt buộc")
    private Integer maGio; 

    private Long userId; 
    
    private String ghiChu;
}
