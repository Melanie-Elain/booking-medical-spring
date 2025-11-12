package com.booking.medical_booking.model; 
import jakarta.persistence.*;
import lombok.Data;
import java.util.Set;

@Entity
@Data
@Table(name = "phongkham")
public class Clinic {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id; 

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "address")
    private String address;

    @Column(name = "image")
    private String image;

    @Lob
    @Column(name = "description")
    private String description;
    
    // Lưu trữ JSON (danh sách ảnh) dưới dạng String
    @Lob
    @Column(name = "images_intro")
    private String imagesIntro; 

    // Quan hệ N-N với Chuyên khoa (Specialty)
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "phongkham_chuyenkhoa",
        joinColumns = @JoinColumn(name = "MaPK"),
        inverseJoinColumns = @JoinColumn(name = "MaCK")
    )
    private Set<Specialty> specialties;
}