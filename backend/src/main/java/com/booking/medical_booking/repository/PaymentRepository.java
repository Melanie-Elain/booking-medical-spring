package com.booking.medical_booking.repository;
import com.booking.medical_booking.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;


public interface PaymentRepository extends JpaRepository<Payment, Integer> {
    
}
