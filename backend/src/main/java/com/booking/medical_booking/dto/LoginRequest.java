package com.booking.medical_booking.dto; // (Sửa lại package cho đúng)

import lombok.Data;

@Data
public class LoginRequest {
    private String phoneNumber;
    private String password;
}