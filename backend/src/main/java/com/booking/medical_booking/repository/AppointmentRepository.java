package com.booking.medical_booking.repository;

import com.booking.medical_booking.model.Appointment;
import org.springframework.data.domain.Page; // <-- Import
import org.springframework.data.domain.Pageable; // <-- Import
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Integer> {
    Page<Appointment> findAllByOrderByAppointmentDateDesc(Pageable pageable);
}