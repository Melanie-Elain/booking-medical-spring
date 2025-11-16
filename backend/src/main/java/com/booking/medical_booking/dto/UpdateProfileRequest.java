package com.booking.medical_booking.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class UpdateProfileRequest {
    // Lấy từ User entity, bỏ đi password
    private String phoneNumber; 
    private String fullName;
    private LocalDate dob;
    private String idCard;
    private String gender;
    private String email;
    private String ethnicity;
    private String healthInsurance;
    private String province;
    private String district;
    private String ward;
    private String address;
    private String occupation;
}