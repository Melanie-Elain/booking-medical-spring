package com.booking.medical_booking.service.appointment;

import com.booking.medical_booking.dto.AppointmentDTO;
import com.booking.medical_booking.model.Appointment;
import com.booking.medical_booking.model.LichGio;
import com.booking.medical_booking.model.User;
import com.booking.medical_booking.repository.AppointmentRepository;
import com.booking.medical_booking.repository.LichGioRepository;
import com.booking.medical_booking.repository.UserRepository;

import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Map; 
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private LichGioRepository   lichGioRepository;

    @Autowired
    private UserRepository  userRepository;

    private final String TRANG_THAI_KHA_DUNG = "Available";
    private final String TRANG_THAI_DA_DAT = "Booked";
    private final String TRANG_THAI_CHO = "Đang chờ";

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

    @Transactional 
    public Appointment createDoctorAppointment(AppointmentDTO appointmentDTO) {
        
        LichGio lichGio = lichGioRepository.findByMaGio(appointmentDTO.getMaGio())
            .orElseThrow(() -> new RuntimeException("Khung giờ không hợp lệ."));
            
        if (!TRANG_THAI_KHA_DUNG.equalsIgnoreCase(lichGio.getStatus())) {
            throw new RuntimeException("Khung giờ đã được đặt.");
        }

        
        User patient = userRepository.findById(appointmentDTO.getUserId())
            .orElseThrow(() -> new RuntimeException("Người dùng không tồn tại."));

        lichGio.setStatus(TRANG_THAI_DA_DAT);
        lichGioRepository.save(lichGio); 

        Appointment newAppointment = new Appointment();
        newAppointment.setUser(patient);
        newAppointment.setLichGio(lichGio); 
        newAppointment.setTrangThai(TRANG_THAI_CHO);
        newAppointment.setGhiChu(appointmentDTO.getGhiChu());

        return appointmentRepository.save(newAppointment);
    }

    @Transactional 
    public Appointment createHospitalAppointment(AppointmentDTO appointmentDTO) {
        
        LichGio lichGio = lichGioRepository.findByMaGio(appointmentDTO.getMaGio())
            .orElseThrow(() -> new RuntimeException("Khung giờ không hợp lệ."));
            
        if (!TRANG_THAI_KHA_DUNG.equalsIgnoreCase(lichGio.getStatus())) {
            throw new RuntimeException("Khung giờ đã được đặt.");
        }

        
        User patient = userRepository.findById(appointmentDTO.getUserId())
            .orElseThrow(() -> new RuntimeException("Người dùng không tồn tại."));

        lichGio.setStatus(TRANG_THAI_DA_DAT);
        lichGioRepository.save(lichGio); 

        Appointment newAppointment = new Appointment();
        newAppointment.setUser(patient);
        newAppointment.setLichGio(lichGio); 
        newAppointment.setTrangThai(TRANG_THAI_CHO);
        newAppointment.setGhiChu(appointmentDTO.getGhiChu());

        return appointmentRepository.save(newAppointment);
    }

    @Transactional 
    public Appointment createClinicAppointment(AppointmentDTO appointmentDTO) {
        
        LichGio lichGio = lichGioRepository.findByMaGio(appointmentDTO.getMaGio())
            .orElseThrow(() -> new RuntimeException("Khung giờ không hợp lệ."));
            
        if (!TRANG_THAI_KHA_DUNG.equalsIgnoreCase(lichGio.getStatus())) {
            throw new RuntimeException("Khung giờ đã được đặt.");
        }

        
        User patient = userRepository.findById(appointmentDTO.getUserId())
            .orElseThrow(() -> new RuntimeException("Người dùng không tồn tại."));

        lichGio.setStatus(TRANG_THAI_DA_DAT);
        lichGioRepository.save(lichGio); 

        Appointment newAppointment = new Appointment();
        newAppointment.setUser(patient);
        newAppointment.setLichGio(lichGio); 
        newAppointment.setTrangThai(TRANG_THAI_CHO);
        newAppointment.setGhiChu(appointmentDTO.getGhiChu());

        return appointmentRepository.save(newAppointment);
    }
}