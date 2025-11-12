// package com.booking.medical_booking.repository;

// import com.booking.medical_booking.model.Appointment;
// import org.springframework.data.domain.Page;
// import org.springframework.data.domain.Pageable;
// import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.stereotype.Repository;

// @Repository
// public interface AppointmentRepository extends JpaRepository<Appointment, Integer> {
    
//     // === SỬA LỖI 1 ===
//     // Tên hàm phải khớp với tên trường (field) 'maLichHen' trong Entity
//     Page<Appointment> findAllByOrderByMaLichHenDesc(Pageable pageable);
// }
package com.booking.medical_booking.repository;

import com.booking.medical_booking.model.Appointment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph; // <-- IMPORT
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Integer> {
    
    // === SỬA LỖI Ở ĐÂY: THÊM @EntityGraph ===
    // Bắt buộc Hibernate phải tải (JOIN) các trường này
    @EntityGraph(attributePaths = {"user", "lichGio", "lichGio.lichTong"})
    Page<Appointment> findAllByOrderByMaLichHenDesc(Pageable pageable);
}