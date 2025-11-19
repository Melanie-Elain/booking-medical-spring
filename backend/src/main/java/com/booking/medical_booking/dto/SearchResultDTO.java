package com.booking.medical_booking.dto;

import lombok.Data;
import java.util.List;

@Data
public class SearchResultDTO {
    private Long id;
    private String name;
    private String image;
    private String address;
    
    // ✅ Chuyển thành List để Frontend dễ map
    private List<String> specialty; 
    
    private String workplace;
    private String type; // "BACSI", "BENHVIEN", "PHONGKHAM"
}