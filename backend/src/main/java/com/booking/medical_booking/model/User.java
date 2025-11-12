package com.booking.medical_booking.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullName;

    @Column(unique = true, nullable = false)
    private String phoneNumber;

    @Column(nullable = false)
    private String password;

    private LocalDate dob;
    private String idCard;
    private String gender;
    private String email;
    private String ethnicity;
    private String healthInsurance;
    private String province;
    private String district;
    private String ward;
    private String address;
    private String referralCode;
    private String occupation;

    

    public enum UserRole {
        BENHNHAN,
        BACSI,
        ADMIN,
        BENHVIEN,   
        PHONGKHAM
    }

    @Enumerated(EnumType.STRING) 
    @Column(name = "role", nullable = false) 
    private UserRole role;

    
    @PrePersist
    public void prePersist() {
        if (role == null) {
            role = UserRole.BENHNHAN;
        }
    }
}
