package com.booking.medical_booking.repository; // (Sửa package)

import com.booking.medical_booking.model.Clinic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClinicRepository extends JpaRepository<Clinic, Integer> {
}