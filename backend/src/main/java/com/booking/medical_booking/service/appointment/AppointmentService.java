package com.booking.medical_booking.service.appointment;

import com.booking.medical_booking.dto.AppointmentDTO;
import com.booking.medical_booking.model.Appointment;
import com.booking.medical_booking.model.LichGio;
import com.booking.medical_booking.model.User;
import com.booking.medical_booking.repository.AppointmentRepository;
import com.booking.medical_booking.repository.LichGioRepository;
import com.booking.medical_booking.repository.UserRepository;

import org.springframework.transaction.annotation.Transactional;

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

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
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

    @Autowired
    private LichGioRepository   lichGioRepository;

    

    private final String STATUS_AVAILABLE = "Available";
    private final String STATUS_BOOKED = "Booked";
    private final String TRANG_THAI_CHO = "Đang chờ";
    private final String TRANG_THAI_CHO_THANH_TOAN = "Đang chờ thanh toán";
    private final String TRANG_THAI_THANH_CONG = "Đã thanh toán";
    private final String TRANG_THAI_THAT_BAI = "Thất bại";

   
    public Page<AppointmentResponseDTO> getAllAppointments(Pageable pageable) {
        
        Page<Appointment> appointmentPage = appointmentRepository.findAllByOrderByMaLichHenDesc(pageable);

        return appointmentPage.map(this::convertToDTO);
    }
    
    private AppointmentResponseDTO convertToDTO(Appointment app) {
        String providerName = "(Không rõ)";
        
        try {
            User.UserRole type = app.getLichGio().getLichTong().getLoaiDoiTuong();
            Long id = app.getLichGio().getLichTong().getMaDoiTuong();

            if (type == User.UserRole.BACSI) {
                providerName = doctorRepository.findById(id).map(d -> d.getName()).orElse("(Bác sĩ không tồn tại)");
            } else if (type == User.UserRole.BENHVIEN) {
                providerName = hospitalRepository.findById(id.intValue()).map(h -> h.getName()).orElse("(Bệnh viện không tồn tại)");
            } else if (type == User.UserRole.PHONGKHAM) {
                providerName = clinicRepository.findById(id.intValue()).map(c -> c.getName()).orElse("(Phòng khám không tồn tại)");
            }
        } catch (Exception e) {
            
        }
        
        return new AppointmentResponseDTO(app, providerName);
    }

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

    
    @Transactional 
    public Appointment createAppointment(AppointmentDTO appointmentDTO) {
        
        LichGio lichGio = lichGioRepository.findByMaGio(appointmentDTO.getMaGio())
            .orElseThrow(() -> new RuntimeException("Khung giờ không hợp lệ."));
            
        if (!STATUS_AVAILABLE.equalsIgnoreCase(lichGio.getStatus())) {
            throw new RuntimeException("Khung giờ đã được đặt.");
        }

        User patient = userRepository.findById(appointmentDTO.getUserId())
            .orElseThrow(() -> new RuntimeException("Người dùng không tồn tại."));

        String finalStatus;

        boolean isPaymentRequired = "thuong".equalsIgnoreCase(appointmentDTO.getExamType()) && 
                                    "BENHVIEN".equalsIgnoreCase(appointmentDTO.getEntityType());

        if (isPaymentRequired) {
            finalStatus = TRANG_THAI_CHO_THANH_TOAN;
        } else {
            finalStatus = TRANG_THAI_CHO;
        }

        lichGio.setStatus(STATUS_BOOKED);
        lichGioRepository.save(lichGio); 

        Appointment newAppointment = new Appointment();
        newAppointment.setUser(patient);
        newAppointment.setLichGio(lichGio); 
        newAppointment.setTrangThai(finalStatus); 
        newAppointment.setGhiChu(appointmentDTO.getGhiChu());
        
        newAppointment.setExamType(appointmentDTO.getExamType());

        BigDecimal price = (appointmentDTO.getFinalPrice() != null && !appointmentDTO.getFinalPrice().isEmpty()) 
        ? new BigDecimal(appointmentDTO.getFinalPrice()) 
        : BigDecimal.ZERO;
        newAppointment.setFinalPrice(price);
        
        return appointmentRepository.save(newAppointment);
    }


    @Transactional(readOnly = true) 
    public Page<AppointmentResponseDTO> getMyAppointments(Pageable pageable, String keyword) {
        User currentUser = getCurrentUser();
        Page<Appointment> appointmentPage;

        if (keyword != null && !keyword.isEmpty()) {
            appointmentPage = appointmentRepository.searchMyAppointments(currentUser.getId(), keyword, pageable);
        } else {
            appointmentPage = appointmentRepository.findByUserIdOrderByMaLichHenDesc(currentUser.getId(), pageable);
        }
        
        return appointmentPage.map(this::convertToDTO);
    }

    private User getCurrentUser() {
        String phoneNumber = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByPhoneNumberOrEmail(phoneNumber, phoneNumber) 
            .orElseThrow(() -> new UsernameNotFoundException("Không tìm thấy user: " + phoneNumber));
    }

    @Transactional
    public Appointment confirmPaymentStatus(Integer maLichHen, String successCode, String paymentMethod) {
    
        Appointment appointment = appointmentRepository.findById(maLichHen)
            .orElseThrow(() -> new RuntimeException("Không tìm thấy Lịch hẹn để cập nhật ID: " + maLichHen));
    
        System.out.println("mã successCode:"+ successCode);
        if ("0".equals(successCode)) {
            appointment.setTrangThai(TRANG_THAI_THANH_CONG);
            System.out.println("Giao dịch thành công. Cập nhật trạng thái lịch hẹn.");
            
        } else {
            appointment.setTrangThai(TRANG_THAI_THAT_BAI);
            System.out.println("Giao dịch thất bại. Mã lỗi: " + successCode);
        }
        
        return appointmentRepository.save(appointment);
    }

    public Appointment findById(Integer id) {
        return appointmentRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Không tìm thấy lịch hẹn với id: " + id));
    }

    public Appointment save(Appointment appointment) {
        return appointmentRepository.save(appointment);
    }

}