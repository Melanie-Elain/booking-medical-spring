package com.booking.medical_booking.repository; 

import com.booking.medical_booking.model.Hospital;
import java.util.Optional;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface HospitalRepository extends JpaRepository<Hospital, Integer> {
    @Query("SELECT h FROM Hospital h LEFT JOIN FETCH h.specialties s WHERE h.id = ?1")
    List<Hospital> findByIdWithSpecialties(Integer id);

    List<Hospital> findByNameContainingIgnoreCase(String name);

    // 2. Lọc theo Chuyên khoa (Dùng JPQL JOIN với bảng liên kết benhvien_chuyenkhoa)
    @Query(value = "SELECT b.* FROM benhvien b " +
                   "JOIN benhvien_chuyenkhoa bck ON b.id = bck.MaBV " +
                   "JOIN chuyenkhoa ck ON bck.MaCK = ck.MaCK " +
                   "WHERE ck.TenCK = :specialtyName", 
           nativeQuery = true)
    List<Hospital> findBySpecialtyName(@Param("specialtyName") String specialtyName);

    Optional<Hospital> findByUserId(Long userId);
}