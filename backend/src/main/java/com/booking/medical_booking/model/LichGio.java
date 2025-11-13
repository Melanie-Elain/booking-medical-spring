// package com.booking.medical_booking.model;

// import jakarta.persistence.*;
// import lombok.Data;
// // import java.util.Set; // (Import nếu cần)

// @Entity
// @Data
// @Table(name = "lich_gio")
// public class LichGio {

//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     @Column(name = "ma_gio") // <-- CHỈ ĐỊNH RÕ RÀNG
//     private Integer maGio;

//     @Column(name = "khung_gio", nullable = false, length = 20) // <-- CHỈ ĐỊNH RÕ RÀNG
//     private String khungGio;

//     @Column(name = "status", nullable = false, length = 20)
//     private String status;

//     @ManyToOne(fetch = FetchType.EAGER) // Sửa: LAZY -> EAGER
//     @JoinColumn(name = "ma_lich") 
//     private LichTong lichTong;
    
//     // (mappedBy nên là LAZY để tránh vòng lặp vô hạn, nhưng
//     // vì chúng ta dùng DTO ở Frontend nên vẫn ổn)
//     @OneToOne(mappedBy = "lichGio", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
//     private Appointment appointment;
// }

package com.booking.medical_booking.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;
import lombok.EqualsAndHashCode;

// 1. IMPORT THƯ VIỆN JSON
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Data
@Table(name = "lich_gio")
@EqualsAndHashCode(exclude = {"appointment", "lichTong"}) // Cần THUỘC TÍNH JAVA
@ToString(exclude = {"appointment", "lichTong"}) // Ngắt toString()
public class LichGio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer maGio;

    private String khungGio;
    private String status;

    // 2. SỬA THÀNH EAGER
    // (Khi tải 1 khung giờ, chúng ta luôn muốn biết nó của Lịch Tổng nào)
    @ManyToOne(fetch = FetchType.EAGER) 
    @JoinColumn(name = "ma_lich") 
    @JsonIgnore
    private LichTong lichTong;
    
    // 3. THÊM @JsonIgnore ĐỂ NGẮT VÒNG LẶP
    @JsonIgnore 
    @OneToOne(mappedBy = "lichGio", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Appointment appointment;
}