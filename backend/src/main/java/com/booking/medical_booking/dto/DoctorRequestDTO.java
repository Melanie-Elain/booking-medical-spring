package com.booking.medical_booking.dto;
import lombok.Data;
import java.util.List;

@Data
public class DoctorRequestDTO {
    // Thông tin cho User
    private String phoneNumber;
    private String password;
    private String email; //
    
    // Thông tin cho Doctor
    private String name;
    private String specialty;
    private String address;
    private String workplace;
    private String image;
    private Integer experienceYear;
    private String description;
    
    // Danh sách ID Chuyên khoa (ví dụ: [1, 3])
    private List<Integer> specialtyIds; 
}