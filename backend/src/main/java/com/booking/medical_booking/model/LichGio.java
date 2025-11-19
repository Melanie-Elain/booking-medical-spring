
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

    @Column(name = "status")
    private String status;

    // SỬA LẠI: Trở về LAZY
    @ManyToOne(fetch = FetchType.LAZY) 
    @JoinColumn(name = "ma_lich") 
    @JsonIgnore
    private LichTong lichTong;
    
    @JsonIgnore 
    @OneToOne(mappedBy = "lichGio", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Appointment appointment;
}