package com.booking.medical_booking.dto;

import com.booking.medical_booking.model.Appointment;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class AppointmentResponseDTO {

    private Integer maLichHen;
    private String trangThai;
    private String ghiChu;
    
    // Thông tin User (Bệnh nhân)
    private Long userId;
    private String patientName; // Tên bệnh nhân
    
    // Thông tin Khung giờ
    private String khungGio;
    private LocalDate ngay;
    private String tenNgay;
    
    // Thông tin Đối tượng khám (BS/BV/PK)
    private String providerType; // (BACSI, BENHVIEN...)
    private Long providerId;
    private String providerName; // <-- TÊN THẬT (ví dụ: "BV Chợ Rẫy")

    // Constructor để chuyển đổi
    public AppointmentResponseDTO(Appointment app, String providerName) {
        this.maLichHen = app.getMaLichHen();
        this.trangThai = app.getTrangThai();
        this.ghiChu = app.getGhiChu();
        
        // User (Bệnh nhân)
        if (app.getUser() != null) {
            this.userId = app.getUser().getId();
            this.patientName = app.getUser().getFullName();
        }

        // LichGio và LichTong
        if (app.getLichGio() != null) {
            this.khungGio = app.getLichGio().getKhungGio();
            if (app.getLichGio().getLichTong() != null) {
                this.ngay = app.getLichGio().getLichTong().getNgay();
                this.tenNgay = app.getLichGio().getLichTong().getTenNgay();
                this.providerType = app.getLichGio().getLichTong().getLoaiDoiTuong().name();
                this.providerId = app.getLichGio().getLichTong().getMaDoiTuong();
            }
        }
        
        // Tên thật (được truyền từ Service)
        this.providerName = providerName;
    }
}