
package com.booking.medical_booking.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import java.time.LocalDate;
import java.util.Set;
// 1. IMPORT THƯ VIỆN JSON
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Data
@Table(name = "lich_tong")
@EqualsAndHashCode(exclude = {"lichGios"}) // Cần THUỘC TÍNH JAVA (số nhiều)
@ToString(exclude = {"lichGios"}) // Ngắt toString()
public class LichTong {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer maLich;

    @Enumerated(EnumType.STRING)
    private User.UserRole loaiDoiTuong;

    private Long maDoiTuong;
    private LocalDate ngay;
    private String tenNgay;

    // 2. THÊM @JsonIgnore ĐỂ NGẮT VÒNG LẶP THỨ 2
    // Báo Jackson: "Bỏ qua trường này khi chuyển sang JSON"
    @JsonIgnore
    @OneToMany(mappedBy = "lichTong", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<LichGio> lichGios;
}