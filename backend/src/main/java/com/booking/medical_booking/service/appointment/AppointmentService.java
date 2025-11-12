package com.booking.medical_booking.service.appointment;

import com.booking.medical_booking.dto.AppointmentResponseDTO; 
import com.booking.medical_booking.model.Appointment;
import com.booking.medical_booking.model.User; 
import com.booking.medical_booking.repository.AppointmentRepository;
import com.booking.medical_booking.repository.DoctorRepository; 
import com.booking.medical_booking.repository.HospitalRepository; 
import com.booking.medical_booking.repository.ClinicRepository; 
import com.booking.medical_booking.repository.UserRepository; 
import org.springframework.security.core.context.SecurityContextHolder; 
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Map; 
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.Optional;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;
    @Autowired
    private DoctorRepository doctorRepository;
    @Autowired
    private HospitalRepository hospitalRepository;
    @Autowired
    private ClinicRepository clinicRepository;
    @Autowired
    private UserRepository userRepository;

    public Page<AppointmentResponseDTO> getAllAppointments(Pageable pageable) {
        
        // 1. Lấy trang (Page) Appointment gốc từ DB
        Page<Appointment> appointmentPage = appointmentRepository.findAllByOrderByMaLichHenDesc(pageable);

        // 2. Chuyển đổi (map) Page<Appointment> sang Page<AppointmentResponseDTO>
        return appointmentPage.map(this::convertToDTO);
    }
    
    // HÀM HELPER: Chuyển đổi 1 Appointment -> 1 DTO
    private AppointmentResponseDTO convertToDTO(Appointment app) {
        String providerName = "(Không rõ)";
        
        try {
            User.UserRole type = app.getLichGio().getLichTong().getLoaiDoiTuong();
            Long id = app.getLichGio().getLichTong().getMaDoiTuong();

            // 3. Tra cứu tên dựa trên Role
            if (type == User.UserRole.BACSI) {
                providerName = doctorRepository.findById(id).map(d -> d.getName()).orElse("(Bác sĩ không tồn tại)");
            } else if (type == User.UserRole.BENHVIEN) {
                providerName = hospitalRepository.findById(id.intValue()).map(h -> h.getName()).orElse("(Bệnh viện không tồn tại)");
            } else if (type == User.UserRole.PHONGKHAM) {
                providerName = clinicRepository.findById(id.intValue()).map(c -> c.getName()).orElse("(Phòng khám không tồn tại)");
            }
        } catch (Exception e) {
            
        }
        
        // 4. Tạo DTO mới với tên đã tra cứu
        return new AppointmentResponseDTO(app, providerName);
    }

    // (Hàm updateStatus giữ nguyên logic, chỉ sửa tên trường)
    public Appointment updateAppointmentStatus(Integer id, Map<String, String> request) {
        String status = request.get("status");
        if (status == null || status.isEmpty()) {
            throw new RuntimeException("Trạng thái (status) là bắt buộc");
        }

        Appointment appointment = appointmentRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Không tìm thấy Lịch hẹn ID: " + id));
        
        appointment.setTrangThai(status); 
        
        return appointmentRepository.save(appointment);
    }

    // ===  LẤY LỊCH HẸN CỦA TÔI (CHO BỆNH NHÂN) ===
    @Transactional(readOnly = true) // readOnly=true để tối ưu tốc độ đọc
    public Page<AppointmentResponseDTO> getMyAppointments(Pageable pageable, String keyword) {
        User currentUser = getCurrentUser();
        Page<Appointment> appointmentPage;

        if (keyword != null && !keyword.isEmpty()) {
            // Hàm này (không có @EntityGraph) CẦN @Transactional
            appointmentPage = appointmentRepository.searchMyAppointments(currentUser.getId(), keyword, pageable);
        } else {
            // Hàm này (có @EntityGraph) không thực sự cần, nhưng để @Transactional
            appointmentPage = appointmentRepository.findByUserIdOrderByMaLichHenDesc(currentUser.getId(), pageable);
        }
        
        // Nhờ @Transactional, hàm convertToDTO sẽ truy cập được các trường LAZY
        return appointmentPage.map(this::convertToDTO);
    }

    // === HÀM TIỆN ÍCH ===
    private User getCurrentUser() {
        String phoneNumber = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByPhoneNumberOrEmail(phoneNumber, phoneNumber) 
            .orElseThrow(() -> new UsernameNotFoundException("Không tìm thấy user: " + phoneNumber));
    }

}