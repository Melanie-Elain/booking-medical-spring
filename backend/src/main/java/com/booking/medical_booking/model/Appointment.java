

// package com.booking.medical_booking.model;

// import jakarta.persistence.*;
// import lombok.Data;

// @Entity
// @Data
// @Table(name = "lichhen")
// public class Appointment {

//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Integer maLichHen;

//     private String trangThai;
//     @Lob
//     private String ghiChu;

//     // 1. SỬA THÀNH EAGER
//     // (Khi tải Lịch hẹn, chúng ta luôn muốn biết của User nào)
//     @ManyToOne(fetch = FetchType.EAGER) 
//     @JoinColumn(name = "user_id")
//     private User user;

//     // 2. SỬA THÀNH EAGER
//     // (Khi tải Lịch hẹn, chúng ta luôn muốn biết Khung giờ nào)
//     @OneToOne(fetch = FetchType.EAGER) 
//     @JoinColumn(name = "ma_gio", unique = true)
//     private LichGio lichGio;
// }

package com.booking.medical_booking.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "lichhen")
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

    // SỬA LẠI: Trở về LAZY
    @OneToOne(fetch = FetchType.LAZY) 
    @JoinColumn(name = "ma_gio", nullable = false, unique = true)
    private LichGio lichGio;
}