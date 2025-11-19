package com.booking.medical_booking.model; 

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;
import java.util.Set;

import com.booking.medical_booking.config.StringListConverter;

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

        // 1. Liên kết 1-1 với User (Để lấy thông tin đăng nhập)
    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user; 

    // Quan hệ N-N với Chuyên khoa (Specialty)
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "benhvien_chuyenkhoa", 
        joinColumns = @JoinColumn(name = "MaBV"), 
        inverseJoinColumns = @JoinColumn(name = "MaCK") 
    )

    // @Convert(converter = StringListConverter.class)
    // @Column(name = "imageIntro", columnDefinition = "TEXT")
    // private List<String> imageIntro;
    
    private Set<Specialty> specialties;

    
}