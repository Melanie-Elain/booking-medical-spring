package com.booking.medical_booking.repository;

import com.booking.medical_booking.model.Appointment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Integer> {
    
    Page<Appointment> findAllByOrderByMaLichHenDesc(Pageable pageable);
}