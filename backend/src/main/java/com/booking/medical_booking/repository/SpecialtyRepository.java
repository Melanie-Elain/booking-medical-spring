package com.booking.medical_booking.repository; 

import com.booking.medical_booking.model.Specialty; 
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SpecialtyRepository extends JpaRepository<Specialty, Integer> {
}