package com.booking.medical_booking.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class AppointmentDetailDTO {
    // Thông tin lịch hẹn
    private Integer maLichHen;
    private String ngayKham;      // Từ bảng lich_tong
    private String gioKham;       // Từ bảng lich_gio
    private String ghiChu;        // Từ bảng lichhen
    private BigDecimal tongTien;

    private String tenBenhNhan;
    private LocalDate ngaySinh;
    private String gioiTinh;
    private String diaChiBenhNhan;

    
    private String tenDonVi;      // Tên Bác sĩ hoặc BV
    private String diaChiDonVi;   // Địa chỉ phòng khám/BV
    private String hinhAnhDonVi;  // Avatar
}