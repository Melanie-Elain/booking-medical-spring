
package com.booking.medical_booking.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import java.math.BigDecimal; // Import cho kiểu tiền tệ

@Entity
@Data
@Table(name = "lichhen")
@EqualsAndHashCode(exclude = {"lichGio", "user"}) 
@ToString(exclude = {"lichGio", "user"}) 
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ma_lich_hen") 
    private Integer maLichHen;

    @Column(name = "trang_thai") 
    private String trangThai;
    
    @Lob
    @Column(name = "ghi_chu") 
    private String ghiChu;

    @Column(name = "hinh_thuc_kham", length = 50) 
    private String examType; 
    
    @Column(name = "tong_tien", precision = 10, scale = 2) 
    private BigDecimal finalPrice; 

    
    @ManyToOne(fetch = FetchType.LAZY) 
    @JoinColumn(name = "user_id", nullable = false) 
    @JsonIgnore
    private User user;

    @ManyToOne(fetch = FetchType.EAGER) 
    @JoinColumn(name = "ma_gio", nullable = false) 
    @JsonIgnore
    private LichGio lichGio;
}