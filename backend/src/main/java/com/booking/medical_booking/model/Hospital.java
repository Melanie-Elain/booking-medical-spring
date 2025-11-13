package com.booking.medical_booking.model; 

import jakarta.persistence.*;
import lombok.Data;
import java.util.Set;

@Entity
@Data
@Table(name = "benhvien")
public class Hospital {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id; 

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "slogan")
    private String slogan;

    @Column(name = "address")
    private String address;

    @Column(name = "image")
    private String image;

    @Lob
    @Column(name = "description")
    private String description;

    @Column(name = "phone", length = 50)
    private String phone;

    @Column(name = "banner")
    private String banner;

    // Quan hệ N-N với Chuyên khoa (Specialty)
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "benhvien_chuyenkhoa", 
        joinColumns = @JoinColumn(name = "MaBV"), 
        inverseJoinColumns = @JoinColumn(name = "MaCK") 
    )
    private Set<Specialty> specialties;

    
}