package com.booking.medical_booking.service.appointment;

import com.booking.medical_booking.dto.AppointmentDTO;
import com.booking.medical_booking.model.Appointment;
import com.booking.medical_booking.model.Clinic;
import com.booking.medical_booking.model.Doctor;
import com.booking.medical_booking.model.Hospital;
import com.booking.medical_booking.model.LichGio;
import com.booking.medical_booking.model.LichTong;
import com.booking.medical_booking.model.User;
import com.booking.medical_booking.repository.AppointmentRepository;
import com.booking.medical_booking.repository.LichGioRepository;
import com.booking.medical_booking.repository.UserRepository;
import com.booking.medical_booking.service.EmailService;

import org.springframework.transaction.annotation.Transactional;

import com.booking.medical_booking.dto.AppointmentResponseDTO;
import com.booking.medical_booking.dto.AppointmentDetailDTO;
import com.booking.medical_booking.repository.DoctorRepository; 
import com.booking.medical_booking.repository.HospitalRepository; 
import com.booking.medical_booking.repository.ClinicRepository; 
import org.springframework.security.core.context.SecurityContextHolder; 
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import com.booking.medical_booking.model.Clinic; 
import com.booking.medical_booking.model.Hospital;

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
    @Autowired
    private EmailService emailService;

    @Autowired
    private AppointmentRepository lichHenRepo;
    

    

    private final String STATUS_AVAILABLE = "Available";
    private final String STATUS_BOOKED = "Booked";
    private final String TRANG_THAI_CHO = "Đang chờ";
    private final String TRANG_THAI_CHO_THANH_TOAN = "Đang chờ thanh toán";
    private final String TRANG_THAI_THANH_CONG = "Đã thanh toán";
    private final String TRANG_THAI_THAT_BAI = "Thất bại";

    private final String TRANG_THAI_XAC_NHAN = "Đã xác nhận";
   
    public Page<AppointmentResponseDTO> getAllAppointments(Pageable pageable) {
        
        Page<Appointment> appointmentPage = appointmentRepository.findAllByOrderByMaLichHenDesc(pageable);

        return appointmentPage.map(this::convertToDTO);
    }

    @Transactional(readOnly = true)
    public Page<AppointmentResponseDTO> getAllAppointmentsByDoctor(Long userId, Pageable pageable) {

        Doctor doctor = doctorRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy thông tin bác sĩ với userId: " + userId));

        Long realDoctorId = doctor.getId();

        Page<Appointment> appointmentPage = appointmentRepository.findByLichGio_LichTong_MaDoiTuongAndLichGio_LichTong_LoaiDoiTuongOrderByMaLichHenDesc(
                realDoctorId, User.UserRole.BACSI, pageable); 

        return appointmentPage.map(this::convertToDTO);
    }

    @Transactional(readOnly = true)
        public Page<AppointmentResponseDTO> getAllAppointmentsByClinic(Long userId, Pageable pageable) {
                // 1. Dùng userId để tìm Clinic
        Clinic clinic = clinicRepository.findByUserId(userId)
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy phòng khám với userId: " + userId));
                
                // 2. Lấy ID thật của phòng khám (bảng phongkham)
                // Lưu ý: ID của Clinic là Integer
                Integer realClinicId = clinic.getId();

        Page<Appointment> appointmentPage = appointmentRepository.findByLichGio_LichTong_MaDoiTuongAndLichGio_LichTong_LoaiDoiTuongOrderByMaLichHenDesc(
        realClinicId.longValue(), User.UserRole.PHONGKHAM, pageable); // <-- Dùng realClinicId

        return appointmentPage.map(this::convertToDTO);
        }

    @Transactional(readOnly = true)
        public Page<AppointmentResponseDTO> getAllAppointmentsByHospital(Long userId, Pageable pageable) {
        // 1. Dùng userId để tìm Hospital
                Hospital hospital = hospitalRepository.findByUserId(userId)
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy bệnh viện với userId: " + userId));

                // 2. Lấy ID thật của bệnh viện (bảng benhvien)
                // Lưu ý: ID của Hospital là Integer
                Integer realHospitalId = hospital.getId();
                
        Page<Appointment> appointmentPage = appointmentRepository.findByLichGio_LichTong_MaDoiTuongAndLichGio_LichTong_LoaiDoiTuongOrderByMaLichHenDesc(
        realHospitalId.longValue(), User.UserRole.BENHVIEN, pageable); // <-- Dùng realHospitalId

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

@Transactional
public AppointmentResponseDTO updateAppointmentStatus(Integer id, Map<String, String> request) {

    // Lấy status từ request
    String newStatus = request.get("status");
    if (newStatus == null || newStatus.isEmpty()) {
        throw new RuntimeException("Trạng thái (status) là bắt buộc");
    }

    // Lấy lịch hẹn
    Appointment appointment = appointmentRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Không tìm thấy Lịch hẹn ID: " + id));

    // Lưu trạng thái cũ để so sánh
    String oldStatus = appointment.getTrangThai();

    // Cập nhật trạng thái mới
    appointment.setTrangThai(newStatus);

    // Lưu DB
    Appointment savedAppointment = appointmentRepository.save(appointment);

    // Tạo DTO
    AppointmentResponseDTO responseDTO = convertToDTO(savedAppointment);

    // Lấy providerName từ DTO
    String providerName = responseDTO.getProviderName();

    // Gửi email nếu trạng thái mới là "Đã xác nhận" và khác trạng thái cũ
    if (TRANG_THAI_XAC_NHAN.equalsIgnoreCase(newStatus)
            && !TRANG_THAI_XAC_NHAN.equalsIgnoreCase(oldStatus)) {

        try {
            emailService.sendAppointmentConfirmationEmail(savedAppointment, providerName);
            System.out.println("Đã gửi email xác nhận cho lịch hẹn ID: " + id);

        } catch (Exception e) {
            System.err.println("Lỗi gửi mail xác nhận: " + e.getMessage());
            e.printStackTrace();
        }
    }

    return responseDTO;
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

    public AppointmentDetailDTO getBookingDetails(Integer maLichHen) {
    // 1. Tìm lịch hẹn
    Appointment lichHen = lichHenRepo.findById(maLichHen)
            .orElseThrow(() -> new RuntimeException("Không tìm thấy lịch hẹn: " + maLichHen));

    // 2. Lấy thông tin bệnh nhân (User)
    User benhNhan = userRepository.findById(lichHen.getUser().getId()) 
            .orElseThrow(() -> new RuntimeException("Lỗi dữ liệu bệnh nhân"));

    // 3. Lấy thông tin Giờ và Ngày (LichGio -> LichTong)
    LichGio lichGio = lichHen.getLichGio(); // Giả sử có quan hệ @ManyToOne
    LichTong lichTong = lichGio.getLichTong(); // Giả sử có quan hệ @ManyToOne

    // 4. Map dữ liệu cơ bản vào DTO
    AppointmentDetailDTO dto = new AppointmentDetailDTO();
    dto.setMaLichHen(lichHen.getMaLichHen());
    dto.setGhiChu(lichHen.getGhiChu());
    dto.setTongTien(lichHen.getFinalPrice());
    
    dto.setGioKham(lichGio.getKhungGio());
    dto.setNgayKham(lichTong.getNgay().toString()); // Chuyển Date sang String

    // Map thông tin bệnh nhân
    dto.setTenBenhNhan(benhNhan.getFullName());
    dto.setNgaySinh(benhNhan.getDob());
    dto.setGioiTinh(benhNhan.getGender());
    dto.setDiaChiBenhNhan(benhNhan.getAddress());

    // 5. LẤY THÔNG TIN ĐƠN VỊ KHÁM (QUAN TRỌNG)
    // Dựa vào loai_doi_tuong trong lich_tong
    String loai = lichTong.getLoaiDoiTuong().name(); // "BACSI", "BENHVIEN", "PHONGKHAM"
    Long idDoiTuong = lichTong.getMaDoiTuong();

    if ("BACSI".equalsIgnoreCase(loai)) {
        Doctor bs = doctorRepository.findById(idDoiTuong).orElse(null);
        if (bs != null) {
            dto.setTenDonVi("BS. " + bs.getName());
            dto.setDiaChiDonVi(bs.getWorkplace()); // Hoặc bs.getAddress()
            dto.setHinhAnhDonVi(bs.getImage());
        }
    } else if ("BENHVIEN".equalsIgnoreCase(loai)) {
        Hospital bv = hospitalRepository.findById(idDoiTuong.intValue()).orElse(null);
        if (bv != null) {
            dto.setTenDonVi(bv.getName());
            dto.setDiaChiDonVi(bv.getAddress());
            dto.setHinhAnhDonVi(bv.getImage());
        }
    } else if ("PHONGKHAM".equalsIgnoreCase(loai)) {
        Clinic pk = clinicRepository.findById(idDoiTuong.intValue()).orElse(null);
        if (pk != null) {
            dto.setTenDonVi(pk.getName());
            dto.setDiaChiDonVi(pk.getAddress());
            dto.setHinhAnhDonVi(pk.getImage());
        }
    }

    return dto;
}


}