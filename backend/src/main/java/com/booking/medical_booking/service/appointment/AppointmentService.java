package com.booking.medical_booking.service.appointment;

import com.booking.medical_booking.model.Appointment;
import com.booking.medical_booking.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Map; 
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    public Page<Appointment> getAllAppointments(Pageable pageable) {
        return appointmentRepository.findAll(pageable);
    }

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