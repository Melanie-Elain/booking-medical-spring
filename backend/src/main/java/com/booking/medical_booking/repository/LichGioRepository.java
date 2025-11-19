package com.booking.medical_booking.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.booking.medical_booking.model.LichGio;
import com.booking.medical_booking.model.LichTong;
import java.util.List;

public interface LichGioRepository extends JpaRepository<LichGio, Integer> {
    Optional<LichGio> findByMaGio(Integer maGio);

    List<LichGio> findByLichTong(LichTong lichTong);
}
