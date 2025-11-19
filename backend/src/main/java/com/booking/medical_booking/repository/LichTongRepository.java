package com.booking.medical_booking.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.booking.medical_booking.model.LichTong;
import com.booking.medical_booking.model.User;
import java.util.Optional;

public interface LichTongRepository extends JpaRepository<LichTong, Integer> {
    
    @Query("SELECT DISTINCT lt FROM LichTong lt LEFT JOIN FETCH lt.lichGios lg " +
           "WHERE lt.loaiDoiTuong = :loaiDoiTuong AND lt.maDoiTuong = :maDoiTuong")
    List<LichTong> findByLoaiDoiTuongAndMaDoiTuong(User.UserRole loaiDoiTuong, Long maDoiTuong);

    @Query("SELECT DISTINCT lt FROM LichTong lt LEFT JOIN FETCH lt.lichGios lg " +
           "WHERE lt.loaiDoiTuong = :loaiDoiTuong AND lt.maDoiTuong = :maDoiTuong " + 
           "ORDER BY lt.ngay ASC") // Tùy chọn: Thêm ORDER BY để sắp xếp ngày
    List<LichTong> findSchedulesWithLichGiosByDoctor(
        @Param("loaiDoiTuong") User.UserRole loaiDoiTuong,
        @Param("maDoiTuong") Long maDoiTuong
    );

    // Dùng để kiểm tra xem bác sĩ đã có lịch cho ngày này chưa
    Optional<LichTong> findByMaDoiTuongAndLoaiDoiTuongAndNgay(
            Long maDoiTuong,
            User.UserRole loaiDoiTuong,
            LocalDate ngay
    );
}
