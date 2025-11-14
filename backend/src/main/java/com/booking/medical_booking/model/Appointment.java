

package com.booking.medical_booking.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Entity
@Data
@Table(name = "lichhen")
@EqualsAndHashCode(exclude = {"lichGio", "user"}) // Cần THUỘC TÍNH JAVA
@ToString(exclude = {"lichGio", "user"}) // Ngắt toString()
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer maLichHen;

    private String trangThai;
    @Lob
    private String ghiChu;

    // SỬA LẠI: Trở về LAZY (mặc định)
    @ManyToOne(fetch = FetchType.LAZY) 
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // 2. SỬA THÀNH EAGER
    // (Khi tải Lịch hẹn, chúng ta luôn muốn biết Khung giờ nào)
    @OneToOne(fetch = FetchType.EAGER) 
    @JoinColumn(name = "ma_gio", unique = true)
    @JsonIgnore
    private LichGio lichGio;
}