package com.booking.medical_booking.repository;
import com.booking.medical_booking.model.Payment;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface PaymentRepository extends JpaRepository<Payment, Integer> {
    @Query("SELECT p FROM Payment p, Appointment a " +
           "WHERE p.appointmentId = a.maLichHen " + 
           "AND a.user.id = :userId " +
           "ORDER BY p.createdAt DESC")
    List<Payment> findHistoryByUserId(@Param("userId") Long userId);
}
