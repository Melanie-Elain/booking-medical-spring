package com.booking.medical_booking.dto;

import lombok.Data;

@Data
public class PaymentRequestDTO {
    private AppointmentDTO bookingDetails; // Chi tiết đặt lịch
    private String paymentMethod;
}
