package com.booking.medical_booking.repository; 

import com.booking.medical_booking.model.Hospital;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface HospitalRepository extends JpaRepository<Hospital, Integer> {
    @Query("SELECT h FROM Hospital h LEFT JOIN FETCH h.specialties s WHERE h.id = ?1")
    List<Hospital> findByIdWithSpecialties(Integer id);
}