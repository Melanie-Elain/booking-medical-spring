package com.booking.medical_booking.service.appointment;

import com.booking.medical_booking.model.Appointment;
import com.booking.medical_booking.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Map; // Import

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    /**
     * Lấy tất cả lịch hẹn (cho Admin)
     */
    public List<Appointment> getAllAppointments() {
        // (Nâng cao: Sau này bạn nên dùng Pageable thay vì List)
        return appointmentRepository.findAllByOrderByAppointmentDateDesc();
    }

    /**
     * Admin cập nhật trạng thái lịch hẹn
     */
    public Appointment updateAppointmentStatus(Integer id, Map<String, String> request) {
        String status = request.get("status");
        if (status == null || status.isEmpty()) {
            throw new RuntimeException("Trạng thái (status) là bắt buộc");
        }

        Appointment appointment = appointmentRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Không tìm thấy Lịch hẹn ID: " + id));
        
        appointment.setStatus(status); // Cập nhật trạng thái
        
        return appointmentRepository.save(appointment);
    }
}