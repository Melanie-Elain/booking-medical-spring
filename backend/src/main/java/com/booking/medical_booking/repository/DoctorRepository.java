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
    @Query(value = "SELECT d.* FROM bacsi d WHERE " + 
               "d.name LIKE CONCAT('%', :query, '%') OR " +
               "d.specialty LIKE CONCAT('%', :query, '%') OR " +
               "d.workplace LIKE CONCAT('%', :query, '%')",
       nativeQuery = true)
List<Doctor> findByGeneralSearch(@Param("query") String query);


    List<Doctor> findBySpecialty(String specialty);
}