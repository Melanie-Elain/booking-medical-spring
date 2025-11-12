package com.booking.medical_booking.dto; 

import lombok.Data;
import java.util.List;

@Data
public class HospitalRequestDTO {
    private String name;
    private String slogan;
    private String address;
    private String image;
    private String description;
    private String phone;
    private String banner;
    private List<Integer> specialtyIds; 
}