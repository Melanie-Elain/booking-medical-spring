package com.booking.medical_booking.repository; 

import com.booking.medical_booking.model.Doctor;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long> {
    @Query(value = "SELECT bs.* FROM bacsi bs " +
    "JOIN bacsi_chuyenkhoa bsck ON bs.id = bsck.MaBS " +
    "JOIN chuyenkhoa ck ON bsck.MaCK = ck.MaCK " +
    "WHERE ck.TenCK = :specialtyName", 
    nativeQuery = true)
List<Doctor> findByGeneralSearch(@Param("query") String query);


    List<Doctor> findBySpecialty(String specialty);
}