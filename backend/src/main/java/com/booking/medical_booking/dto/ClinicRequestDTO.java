package com.booking.medical_booking.dto; 

import lombok.Data;
import java.util.List;

@Data
public class ClinicRequestDTO {
    private String name;
    private String address;
    private String image;
    private String description;
    private String imagesIntro; 
    private List<Integer> specialtyIds;
}