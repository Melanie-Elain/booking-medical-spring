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
    @Query(value = "SELECT d FROM Doctor d WHERE " +
           "LOWER(d.name) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(d.specialty) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(d.workplace) LIKE LOWER(CONCAT('%', :query, '%'))",
           nativeQuery = true)
    List<Doctor> findByGeneralSearch(@Param("query") String query);

    List<Doctor> findBySpecialty(String specialty);
}