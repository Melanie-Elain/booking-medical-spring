package com.booking.medical_booking.model; 

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Data
@Table(name = "lichhen")
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MaLich")
    private Integer id;

    @Column(name = "NgayHen", nullable = false)
    private LocalDate appointmentDate;

    @Column(name = "GioHen", nullable = false)
    private LocalTime appointmentTime;

    @Column(name = "TrangThai", length = 50)
    private String status;

    @Lob
    @Column(name = "GhiChu")
    private String notes;

    // --- MỐI QUAN HỆ ---

    // Liên kết với User (Bệnh nhân)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // Liên kết với Bác sĩ
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MaBS", nullable = false)
    private Doctor doctor;
}