package com.booking.medical_booking.service.appointment;

import com.booking.medical_booking.model.Appointment;
import com.booking.medical_booking.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Map; 
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    public Page<Appointment> getAllAppointments(Pageable pageable) {
        // === SỬA LỖI 1 ===
        // Gọi đúng tên hàm (khớp với tên trường 'maLichHen' trong Entity)
        return appointmentRepository.findAllByOrderByMaLichHenDesc(pageable);
    }

    public Appointment updateAppointmentStatus(Integer id, Map<String, String> request) {
        String status = request.get("status");
        if (status == null || status.isEmpty()) {
            throw new RuntimeException("Trạng thái (status) là bắt buộc");
        }

        // 'id' ở đây là 'maLichHen'
        Appointment appointment = appointmentRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Không tìm thấy Lịch hẹn ID: " + id));
        
        // === SỬA LỖI 2 ===
        // Tên trường là 'trangThai', nên hàm là 'setTrangThai'
        appointment.setTrangThai(status); 
        
        return appointmentRepository.save(appointment);
    }
}