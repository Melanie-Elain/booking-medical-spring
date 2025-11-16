package com.booking.medical_booking.dto;

import lombok.Data;

@Data
public class SearchRequestDTO {
    private String query; 
    private String type; 
    private String specialty; 
    
}
