package com.booking.medical_booking.repository; 

import com.booking.medical_booking.model.Clinic;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ClinicRepository extends JpaRepository<Clinic, Integer> {
    List<Clinic> findByNameContainingIgnoreCase(String name);

    // 2. Lọc theo Chuyên khoa (Dùng JPQL JOIN với bảng liên kết phongkham_chuyenkhoa)
    @Query(value = "SELECT pk.* FROM phongkham pk " +
                   "JOIN phongkham_chuyenkhoa pck ON pk.id = pck.MaPK " +
                   "JOIN chuyenkhoa ck ON pck.MaCK = ck.MaCK " +
                   "WHERE ck.TenCK = :specialtyName",
           nativeQuery = true)
    List<Clinic> findBySpecialtyName(@Param("specialtyName") String specialtyName);
}