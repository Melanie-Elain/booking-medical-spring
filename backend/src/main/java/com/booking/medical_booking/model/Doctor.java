package com.booking.medical_booking.model; 

import jakarta.persistence.*;
import lombok.Data;
import java.util.Set; 

@Entity
@Data
@Table(name = "bacsi") 
public class Doctor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; 

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "specialty")
    private String specialty; 

    @Column(name = "address")
    private String address;

    @Column(name = "workplace")
    private String workplace;

    @Column(name = "image")
    private String image;

    @Column(name = "experience_year")
    private Integer experienceYear;

    @Lob
    @Column(name = "description")
    private String description;

    // --- CÁC MỐI QUAN HỆ ---

    // 1. Liên kết 1-1 với User (Để lấy thông tin đăng nhập)
    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user; 

    // 2. Liên kết N-N với Chuyên khoa (Specialty)
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "bacsi_chuyenkhoa", 
        joinColumns = @JoinColumn(name = "MaBS"), 
        inverseJoinColumns = @JoinColumn(name = "MaCK") 
    )
    private Set<Specialty> specialties; // Danh sách chuyên khoa
}