package com.booking.medical_booking.model; 

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "chuyenkhoa") 
public class Specialty {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MaCK") 
    private Integer id;

    @Column(name = "TenCK", nullable = false, length = 100) 
    private String name;

    @Lob 
    @Column(name = "mo_ta") 
    private String description;
}