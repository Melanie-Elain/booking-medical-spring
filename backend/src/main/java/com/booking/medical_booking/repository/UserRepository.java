package com.booking.medical_booking.repository;

import com.booking.medical_booking.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByPhoneNumberOrEmail(String phoneNumber, String email);
    boolean existsByPhoneNumber(String phoneNumber);
    boolean existsByEmail(String email);
}