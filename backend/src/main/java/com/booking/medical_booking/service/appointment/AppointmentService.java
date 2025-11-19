// package com.booking.medical_booking.service.appointment;

// import com.booking.medical_booking.dto.AppointmentDTO;
// import com.booking.medical_booking.model.Appointment;
// import com.booking.medical_booking.model.Clinic;
// import com.booking.medical_booking.model.Doctor;
// import com.booking.medical_booking.model.Hospital;
// import com.booking.medical_booking.model.LichGio;
// import com.booking.medical_booking.model.LichTong;
// import com.booking.medical_booking.model.User;
// import com.booking.medical_booking.repository.AppointmentRepository;
// import com.booking.medical_booking.repository.LichGioRepository;
// import com.booking.medical_booking.repository.UserRepository;
// import com.booking.medical_booking.service.EmailService;

// import org.springframework.transaction.annotation.Transactional;

// import com.booking.medical_booking.dto.AppointmentResponseDTO;
// import com.booking.medical_booking.dto.AppointmentDetailDTO;
// import com.booking.medical_booking.repository.DoctorRepository; 
// import com.booking.medical_booking.repository.HospitalRepository; 
// import com.booking.medical_booking.repository.ClinicRepository; 
// import org.springframework.security.core.context.SecurityContextHolder; 
// import org.springframework.security.core.userdetails.UsernameNotFoundException;
// import com.booking.medical_booking.model.Clinic; 
// import com.booking.medical_booking.model.Hospital;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;

// import java.math.BigDecimal;
// import java.util.Map; 
// import org.springframework.data.domain.Page;
// import org.springframework.data.domain.Pageable;
// import java.util.Optional;

// @Service
// public class AppointmentService {

//     @Autowired
//     private AppointmentRepository appointmentRepository;
//     @Autowired
//     private DoctorRepository doctorRepository;
//     @Autowired
//     private HospitalRepository hospitalRepository;
//     @Autowired
//     private ClinicRepository clinicRepository;
//     @Autowired
//     private UserRepository userRepository;

//     @Autowired
//     private LichGioRepository   lichGioRepository;
//     @Autowired
//     private EmailService emailService;

//     @Autowired
//     private AppointmentRepository lichHenRepo;
    

    

//     private final String STATUS_AVAILABLE = "Available";
//     private final String STATUS_BOOKED = "Booked";
//     private final String TRANG_THAI_CHO = "Đang chờ";
//     private final String TRANG_THAI_CHO_THANH_TOAN = "Đang chờ thanh toán";
//     private final String TRANG_THAI_THANH_CONG = "Đã thanh toán";
//     private final String TRANG_THAI_THAT_BAI = "Thất bại";

//     private final String TRANG_THAI_XAC_NHAN = "Đã xác nhận";
//     private final String TRANG_THAI_HUY = "Đã hủy";
   
//     public Page<AppointmentResponseDTO> getAllAppointments(Pageable pageable) {
        
//         Page<Appointment> appointmentPage = appointmentRepository.findAllByOrderByMaLichHenDesc(pageable);

//         return appointmentPage.map(this::convertToDTO);
//     }

//     @Transactional(readOnly = true)
//     public Page<AppointmentResponseDTO> getAllAppointmentsByDoctor(Long userId, Pageable pageable) {

//         Doctor doctor = doctorRepository.findByUserId(userId)
//                 .orElseThrow(() -> new RuntimeException("Không tìm thấy thông tin bác sĩ với userId: " + userId));

//         Long realDoctorId = doctor.getId();

//         Page<Appointment> appointmentPage = appointmentRepository.findByLichGio_LichTong_MaDoiTuongAndLichGio_LichTong_LoaiDoiTuongOrderByMaLichHenDesc(
//                 realDoctorId, User.UserRole.BACSI, pageable); 

//         return appointmentPage.map(this::convertToDTO);
//     }

//     @Transactional(readOnly = true)
//         public Page<AppointmentResponseDTO> getAllAppointmentsByClinic(Long userId, Pageable pageable) {
//                 // 1. Dùng userId để tìm Clinic
//         Clinic clinic = clinicRepository.findByUserId(userId)
//                     .orElseThrow(() -> new RuntimeException("Không tìm thấy phòng khám với userId: " + userId));
                
//                 // 2. Lấy ID thật của phòng khám (bảng phongkham)
//                 // Lưu ý: ID của Clinic là Integer
//                 Integer realClinicId = clinic.getId();

//         Page<Appointment> appointmentPage = appointmentRepository.findByLichGio_LichTong_MaDoiTuongAndLichGio_LichTong_LoaiDoiTuongOrderByMaLichHenDesc(
//         realClinicId.longValue(), User.UserRole.PHONGKHAM, pageable); // <-- Dùng realClinicId

//         return appointmentPage.map(this::convertToDTO);
//         }

//     @Transactional(readOnly = true)
//         public Page<AppointmentResponseDTO> getAllAppointmentsByHospital(Long userId, Pageable pageable) {
//         // 1. Dùng userId để tìm Hospital
//                 Hospital hospital = hospitalRepository.findByUserId(userId)
//                     .orElseThrow(() -> new RuntimeException("Không tìm thấy bệnh viện với userId: " + userId));

//                 // 2. Lấy ID thật của bệnh viện (bảng benhvien)
//                 // Lưu ý: ID của Hospital là Integer
//                 Integer realHospitalId = hospital.getId();
                
//         Page<Appointment> appointmentPage = appointmentRepository.findByLichGio_LichTong_MaDoiTuongAndLichGio_LichTong_LoaiDoiTuongOrderByMaLichHenDesc(
//         realHospitalId.longValue(), User.UserRole.BENHVIEN, pageable); // <-- Dùng realHospitalId

//         return appointmentPage.map(this::convertToDTO);
//         }
    
//     private AppointmentResponseDTO convertToDTO(Appointment app) {
//         String providerName = "(Không rõ)";
        
//         try {
//             User.UserRole type = app.getLichGio().getLichTong().getLoaiDoiTuong();
//             Long id = app.getLichGio().getLichTong().getMaDoiTuong();

//             if (type == User.UserRole.BACSI) {
//                 providerName = doctorRepository.findById(id).map(d -> d.getName()).orElse("(Bác sĩ không tồn tại)");
//             } else if (type == User.UserRole.BENHVIEN) {
//                 providerName = hospitalRepository.findById(id.intValue()).map(h -> h.getName()).orElse("(Bệnh viện không tồn tại)");
//             } else if (type == User.UserRole.PHONGKHAM) {
//                 providerName = clinicRepository.findById(id.intValue()).map(c -> c.getName()).orElse("(Phòng khám không tồn tại)");
//             }
//         } catch (Exception e) {
            
//         }
        
//         return new AppointmentResponseDTO(app, providerName);
//     }

//     // @Transactional
//     // public AppointmentResponseDTO updateAppointmentStatus(Integer id, Map<String, String> request) {

//     //     // Lấy status từ request
//     //     String newStatus = request.get("status");
//     //     if (newStatus == null || newStatus.isEmpty()) {
//     //         throw new RuntimeException("Trạng thái (status) là bắt buộc");
//     //     }

//     //     // Lấy lịch hẹn
//     //     Appointment appointment = appointmentRepository.findById(id)
//     //             .orElseThrow(() -> new RuntimeException("Không tìm thấy Lịch hẹn ID: " + id));

//     //     // Lưu trạng thái cũ để so sánh
//     //     String oldStatus = appointment.getTrangThai();

//     //     // Cập nhật trạng thái mới
//     //     appointment.setTrangThai(newStatus);

//     //     // Lưu DB
//     //     Appointment savedAppointment = appointmentRepository.save(appointment);

//     //     // Tạo DTO
//     //     AppointmentResponseDTO responseDTO = convertToDTO(savedAppointment);

//     //     // Lấy providerName từ DTO
//     //     String providerName = responseDTO.getProviderName();

//     //     // Gửi email nếu trạng thái mới là "Đã xác nhận" và khác trạng thái cũ
//     //     if (TRANG_THAI_XAC_NHAN.equalsIgnoreCase(newStatus)
//     //             && !TRANG_THAI_XAC_NHAN.equalsIgnoreCase(oldStatus)) {

//     //         try {
//     //             emailService.sendAppointmentConfirmationEmail(savedAppointment, providerName);
//     //             System.out.println("Đã gửi email xác nhận cho lịch hẹn ID: " + id);

//     //         } catch (Exception e) {
//     //             System.err.println("Lỗi gửi mail xác nhận: " + e.getMessage());
//     //             e.printStackTrace();
//     //         }
//     //     }

//     //     return responseDTO;
//     // }

//     @Transactional
//     public AppointmentResponseDTO updateAppointmentStatus(Integer id, Map<String, String> request) {
//         String newStatus = request.get("status");
        
//         // 👉 1. IN RA ĐỂ KIỂM TRA XEM FRONTEND GỬI GÌ
//         System.out.println("DEBUG: Frontend gửi status = " + newStatus);

//         Appointment appointment = appointmentRepository.findById(id)
//                 .orElseThrow(() -> new RuntimeException("Không tìm thấy: " + id));

//         // Cập nhật trạng thái lịch hẹn
//         appointment.setTrangThai(newStatus);
//         Appointment savedAppointment = appointmentRepository.save(appointment);

//         // 👉 2. SỬA LẠI LOGIC SO SÁNH (CHẶT CHẼ HƠN)
//         // Kiểm tra kỹ chuỗi string này phải khớp với cái bạn in ra ở trên
//         if ("Đã hủy".equalsIgnoreCase(newStatus) || "Cancelled".equalsIgnoreCase(newStatus)) {
            
//             LichGio lichGio = appointment.getLichGio();
            
//             if (lichGio != null) {
//                 System.out.println("DEBUG: Tìm thấy LichGio ID = " + lichGio.getMaGio());
//                 System.out.println("DEBUG: Status cũ = " + lichGio.getStatus());

//                 // 👉 3. SET LẠI TRẠNG THÁI (Khớp với DB là "Available")
//                 lichGio.setStatus("Available"); 
                
//                 // 👉 4. LƯU VÀO DB
//                 lichGioRepository.save(lichGio); 
                
//                 System.out.println("DEBUG: Đã đổi thành Available và Save");
//             } else {
//                 System.out.println("DEBUG: Lỗi! Không tìm thấy LichGio liên kết.");
//             }
//         }

//         return convertToDTO(savedAppointment);
//     }

//     @Transactional
//     public AppointmentResponseDTO cancelAppointment(Integer appointmentId) {
//         // 1. Tìm lịch hẹn
//         Appointment appointment = appointmentRepository.findById(appointmentId)
//                 .orElseThrow(() -> new RuntimeException("Không tìm thấy Lịch hẹn ID: " + appointmentId));

//         // 2. Kiểm tra: Nếu đã hủy rồi thì không làm gì cả (tránh lỗi logic)
//         if (TRANG_THAI_HUY.equalsIgnoreCase(appointment.getTrangThai())) {
//             throw new RuntimeException("Lịch hẹn này đã bị hủy trước đó.");
//         }

//         // 3. Cập nhật trạng thái lịch hẹn sang "Đã hủy"
//         appointment.setTrangThai(TRANG_THAI_HUY);
//         Appointment savedAppointment = appointmentRepository.save(appointment);

//         // 4. QUAN TRỌNG: Trả lại trạng thái "Available" cho LichGio
//         LichGio lichGio = appointment.getLichGio();
//         if (lichGio != null) {
//             lichGio.setStatus(STATUS_AVAILABLE);
//             lichGioRepository.save(lichGio); // Lưu thay đổi vào DB
//             System.out.println("Đã cập nhật khung giờ " + lichGio.getMaGio() + " thành Available.");
//         }

//         // 5. Trả về DTO
//         return convertToDTO(savedAppointment);
//     }


//     @Transactional 
//     public Appointment createAppointment(AppointmentDTO appointmentDTO) {
        
//         LichGio lichGio = lichGioRepository.findByMaGio(appointmentDTO.getMaGio())
//             .orElseThrow(() -> new RuntimeException("Khung giờ không hợp lệ."));
            
//         if (!STATUS_AVAILABLE.equalsIgnoreCase(lichGio.getStatus())) {
//             throw new RuntimeException("Khung giờ đã được đặt.");
//         }

//         User patient = userRepository.findById(appointmentDTO.getUserId())
//             .orElseThrow(() -> new RuntimeException("Người dùng không tồn tại."));

//         String finalStatus;

//         boolean isPaymentRequired = "thuong".equalsIgnoreCase(appointmentDTO.getExamType()) && 
//                                     "BENHVIEN".equalsIgnoreCase(appointmentDTO.getEntityType());

//         if (isPaymentRequired) {
//             finalStatus = TRANG_THAI_CHO_THANH_TOAN;
//         } else {
//             finalStatus = TRANG_THAI_CHO;
//         }

//         lichGio.setStatus(STATUS_BOOKED);
//         lichGioRepository.save(lichGio); 

//         Appointment newAppointment = new Appointment();
//         newAppointment.setUser(patient);
//         newAppointment.setLichGio(lichGio); 
//         newAppointment.setTrangThai(finalStatus); 
//         newAppointment.setGhiChu(appointmentDTO.getGhiChu());
        
//         newAppointment.setExamType(appointmentDTO.getExamType());

//         BigDecimal price = (appointmentDTO.getFinalPrice() != null && !appointmentDTO.getFinalPrice().isEmpty()) 
//         ? new BigDecimal(appointmentDTO.getFinalPrice()) 
//         : BigDecimal.ZERO;
//         newAppointment.setFinalPrice(price);
        
//         return appointmentRepository.save(newAppointment);
//     }


//     @Transactional(readOnly = true) 
//     public Page<AppointmentResponseDTO> getMyAppointments(Pageable pageable, String keyword) {
//         User currentUser = getCurrentUser();
//         Page<Appointment> appointmentPage;

//         if (keyword != null && !keyword.isEmpty()) {
//             appointmentPage = appointmentRepository.searchMyAppointments(currentUser.getId(), keyword, pageable);
//         } else {
//             appointmentPage = appointmentRepository.findByUserIdOrderByMaLichHenDesc(currentUser.getId(), pageable);
//         }
        
//         return appointmentPage.map(this::convertToDTO);
//     }

//     private User getCurrentUser() {
//         String phoneNumber = SecurityContextHolder.getContext().getAuthentication().getName();
//         return userRepository.findByPhoneNumberOrEmail(phoneNumber, phoneNumber) 
//             .orElseThrow(() -> new UsernameNotFoundException("Không tìm thấy user: " + phoneNumber));
//     }

//     @Transactional
//     public Appointment confirmPaymentStatus(Integer maLichHen, String successCode, String paymentMethod) {
    
//         Appointment appointment = appointmentRepository.findById(maLichHen)
//             .orElseThrow(() -> new RuntimeException("Không tìm thấy Lịch hẹn để cập nhật ID: " + maLichHen));
    
//         System.out.println("mã successCode:"+ successCode);
//         if ("0".equals(successCode)) {
//             appointment.setTrangThai(TRANG_THAI_THANH_CONG);
//             System.out.println("Giao dịch thành công. Cập nhật trạng thái lịch hẹn.");
            
//         } else {
//             appointment.setTrangThai(TRANG_THAI_THAT_BAI);
//             System.out.println("Giao dịch thất bại. Mã lỗi: " + successCode);
//         }
        
//         return appointmentRepository.save(appointment);
//     }

//     public Appointment findById(Integer id) {
//         return appointmentRepository.findById(id)
//             .orElseThrow(() -> new RuntimeException("Không tìm thấy lịch hẹn với id: " + id));
//     }

//     public Appointment save(Appointment appointment) {
//         return appointmentRepository.save(appointment);
//     }

//     public AppointmentDetailDTO getBookingDetails(Integer maLichHen) {
//     // 1. Tìm lịch hẹn
//     Appointment lichHen = lichHenRepo.findById(maLichHen)
//             .orElseThrow(() -> new RuntimeException("Không tìm thấy lịch hẹn: " + maLichHen));

//     // 2. Lấy thông tin bệnh nhân (User)
//     User benhNhan = userRepository.findById(lichHen.getUser().getId()) 
//             .orElseThrow(() -> new RuntimeException("Lỗi dữ liệu bệnh nhân"));

//     // 3. Lấy thông tin Giờ và Ngày (LichGio -> LichTong)
//     LichGio lichGio = lichHen.getLichGio(); // Giả sử có quan hệ @ManyToOne
//     LichTong lichTong = lichGio.getLichTong(); // Giả sử có quan hệ @ManyToOne

//     // 4. Map dữ liệu cơ bản vào DTO
//     AppointmentDetailDTO dto = new AppointmentDetailDTO();
//     dto.setMaLichHen(lichHen.getMaLichHen());
//     dto.setGhiChu(lichHen.getGhiChu());
//     dto.setTongTien(lichHen.getFinalPrice());
    
//     dto.setGioKham(lichGio.getKhungGio());
//     dto.setNgayKham(lichTong.getNgay().toString()); // Chuyển Date sang String

//     // Map thông tin bệnh nhân
//     dto.setTenBenhNhan(benhNhan.getFullName());
//     dto.setNgaySinh(benhNhan.getDob());
//     dto.setGioiTinh(benhNhan.getGender());
//     dto.setDiaChiBenhNhan(benhNhan.getAddress());

//     // 5. LẤY THÔNG TIN ĐƠN VỊ KHÁM (QUAN TRỌNG)
//     // Dựa vào loai_doi_tuong trong lich_tong
//     String loai = lichTong.getLoaiDoiTuong().name(); // "BACSI", "BENHVIEN", "PHONGKHAM"
//     Long idDoiTuong = lichTong.getMaDoiTuong();

//     if ("BACSI".equalsIgnoreCase(loai)) {
//         Doctor bs = doctorRepository.findById(idDoiTuong).orElse(null);
//         if (bs != null) {
//             dto.setTenDonVi("BS. " + bs.getName());
//             dto.setDiaChiDonVi(bs.getWorkplace()); // Hoặc bs.getAddress()
//             dto.setHinhAnhDonVi(bs.getImage());
//         }
//     } else if ("BENHVIEN".equalsIgnoreCase(loai)) {
//         Hospital bv = hospitalRepository.findById(idDoiTuong.intValue()).orElse(null);
//         if (bv != null) {
//             dto.setTenDonVi(bv.getName());
//             dto.setDiaChiDonVi(bv.getAddress());
//             dto.setHinhAnhDonVi(bv.getImage());
//         }
//     } else if ("PHONGKHAM".equalsIgnoreCase(loai)) {
//         Clinic pk = clinicRepository.findById(idDoiTuong.intValue()).orElse(null);
//         if (pk != null) {
//             dto.setTenDonVi(pk.getName());
//             dto.setDiaChiDonVi(pk.getAddress());
//             dto.setHinhAnhDonVi(pk.getImage());
//         }
//     }

//     return dto;
// }


// }

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

    // CÁC HẰNG SỐ TRẠNG THÁI (Status trong DB bảng lich_gio)
    private final String STATUS_AVAILABLE = "Available";
    private final String STATUS_BOOKED = "Booked";
    
    // CÁC HẰNG SỐ TRẠNG THÁI (TrangThai trong DB bảng appointment)
    private final String TRANG_THAI_CHO = "Đang chờ";
    private final String TRANG_THAI_CHO_THANH_TOAN = "Đang chờ thanh toán";
    private final String TRANG_THAI_THANH_CONG = "Đã thanh toán";
    private final String TRANG_THAI_THAT_BAI = "Thất bại";

    private final String TRANG_THAI_XAC_NHAN = "Đã xác nhận";
    private final String TRANG_THAI_HUY = "Đã hủy";
   
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
        Clinic clinic = clinicRepository.findByUserId(userId)
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy phòng khám với userId: " + userId));
                
        Integer realClinicId = clinic.getId();
        Page<Appointment> appointmentPage = appointmentRepository.findByLichGio_LichTong_MaDoiTuongAndLichGio_LichTong_LoaiDoiTuongOrderByMaLichHenDesc(
        realClinicId.longValue(), User.UserRole.PHONGKHAM, pageable); 

        return appointmentPage.map(this::convertToDTO);
        }

    @Transactional(readOnly = true)
        public Page<AppointmentResponseDTO> getAllAppointmentsByHospital(Long userId, Pageable pageable) {
                Hospital hospital = hospitalRepository.findByUserId(userId)
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy bệnh viện với userId: " + userId));

                Integer realHospitalId = hospital.getId();
                
        Page<Appointment> appointmentPage = appointmentRepository.findByLichGio_LichTong_MaDoiTuongAndLichGio_LichTong_LoaiDoiTuongOrderByMaLichHenDesc(
        realHospitalId.longValue(), User.UserRole.BENHVIEN, pageable); 

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

    // ========================================================================
    // 1. CẬP NHẬT TRẠNG THÁI (XÁC NHẬN / HỦY) VÀ ĐỒNG BỘ LỊCH GIỜ
    // ========================================================================
    @Transactional
    public AppointmentResponseDTO updateAppointmentStatus(Integer id, Map<String, String> request) {
        String newStatus = request.get("status");
        
        if (newStatus == null || newStatus.isEmpty()) {
            throw new RuntimeException("Status là bắt buộc");
        }

        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy Lịch hẹn ID: " + id));
        
        String oldStatus = appointment.getTrangThai();

        // Cập nhật trạng thái lịch hẹn
        appointment.setTrangThai(newStatus);
        Appointment savedAppointment = appointmentRepository.save(appointment);

        // --- LOGIC CẬP NHẬT LICH_GIO (SỬA ĐỂ FIX LỖI) ---
        LichGio lichGio = appointment.getLichGio();
        
        if (lichGio != null) {
            // TRƯỜNG HỢP 1: HỦY hoặc THẤT BẠI -> MỞ KHÓA (Available)
            if (TRANG_THAI_HUY.equalsIgnoreCase(newStatus) || 
                TRANG_THAI_THAT_BAI.equalsIgnoreCase(newStatus) || 
                "Đã từ chối".equalsIgnoreCase(newStatus) || 
                "Cancelled".equalsIgnoreCase(newStatus)) {
                
                lichGio.setStatus(STATUS_AVAILABLE); 
                lichGioRepository.save(lichGio); 
                System.out.println("-> Đã mở lại khung giờ (Available) cho lịch hẹn: " + id);
            } 
            // TRƯỜNG HỢP 2: XÁC NHẬN / ĐANG CHỜ -> KHÓA (Booked)
            else if (TRANG_THAI_XAC_NHAN.equalsIgnoreCase(newStatus) || 
                     TRANG_THAI_CHO.equalsIgnoreCase(newStatus) || 
                     TRANG_THAI_THANH_CONG.equalsIgnoreCase(newStatus) ||
                     "Đã khám xong".equalsIgnoreCase(newStatus)) {
                
                if (!STATUS_BOOKED.equalsIgnoreCase(lichGio.getStatus())) {
                    lichGio.setStatus(STATUS_BOOKED);
                    lichGioRepository.save(lichGio);
                    System.out.println("-> Đã khóa khung giờ (Booked) cho lịch hẹn: " + id);
                }
            }
        }
        // -----------------------------------------------------

        // Gửi email nếu chuyển sang "Đã xác nhận"
        if (TRANG_THAI_XAC_NHAN.equalsIgnoreCase(newStatus) && !TRANG_THAI_XAC_NHAN.equalsIgnoreCase(oldStatus)) {
             try {
                 String providerName = convertToDTO(savedAppointment).getProviderName();
                 emailService.sendAppointmentConfirmationEmail(savedAppointment, providerName);
             } catch (Exception e) {
                 System.err.println("Lỗi gửi mail: " + e.getMessage());
             }
        }

        return convertToDTO(savedAppointment);
    }

    // ========================================================================
    // 2. HỦY LỊCH (HÀM RIÊNG)
    // ========================================================================
    @Transactional
    public AppointmentResponseDTO cancelAppointment(Integer appointmentId) {
        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy Lịch hẹn ID: " + appointmentId));

        if (TRANG_THAI_HUY.equalsIgnoreCase(appointment.getTrangThai())) {
            throw new RuntimeException("Lịch hẹn này đã bị hủy trước đó.");
        }

        // Set trạng thái Đã hủy
        appointment.setTrangThai(TRANG_THAI_HUY);
        Appointment savedAppointment = appointmentRepository.save(appointment);

        // TRẢ LẠI GIỜ AVAILABLE
        LichGio lichGio = appointment.getLichGio();
        if (lichGio != null) {
            lichGio.setStatus(STATUS_AVAILABLE);
            lichGioRepository.save(lichGio);
            System.out.println("CancelAppointment: Đã trả lại khung giờ Available.");
        }

        return convertToDTO(savedAppointment);
    }

    // ========================================================================
    // 3. TẠO LỊCH HẸN (BỆNH NHÂN ĐẶT) -> PHẢI KHÓA GIỜ NGAY
    // ========================================================================
    @Transactional 
    public Appointment createAppointment(AppointmentDTO appointmentDTO) {
        
        // 1. Tìm khung giờ
        LichGio lichGio = lichGioRepository.findByMaGio(appointmentDTO.getMaGio())
            .orElseThrow(() -> new RuntimeException("Khung giờ không hợp lệ."));
            
        // 2. Kiểm tra: Phải là Available mới cho đặt
        if (!STATUS_AVAILABLE.equalsIgnoreCase(lichGio.getStatus())) {
            throw new RuntimeException("Khung giờ này đã được đặt bởi người khác.");
        }

        // 3. KHÓA GIỜ NGAY LẬP TỨC (SỬA ĐỂ FIX LỖI ĐANG CHỜ MÀ VẪN AVAILABLE)
        lichGio.setStatus(STATUS_BOOKED);
        lichGioRepository.save(lichGio); // Lưu trạng thái Booked vào DB

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
        
        LichGio lichGio = appointment.getLichGio();

        if ("0".equals(successCode)) {
            appointment.setTrangThai(TRANG_THAI_THANH_CONG);
            System.out.println("Giao dịch thành công. Cập nhật trạng thái lịch hẹn.");
            // Thanh toán thành công thì giữ nguyên Booked
        } else {
            appointment.setTrangThai(TRANG_THAI_THAT_BAI);
            System.out.println("Giao dịch thất bại. Mã lỗi: " + successCode);
            
            // Thanh toán thất bại -> Trả lại giờ Available
            if (lichGio != null) {
                lichGio.setStatus(STATUS_AVAILABLE);
                lichGioRepository.save(lichGio);
            }
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
    LichGio lichGio = lichHen.getLichGio(); 
    LichTong lichTong = lichGio.getLichTong(); 

    // 4. Map dữ liệu cơ bản vào DTO
    AppointmentDetailDTO dto = new AppointmentDetailDTO();
    dto.setMaLichHen(lichHen.getMaLichHen());
    dto.setGhiChu(lichHen.getGhiChu());
    dto.setTongTien(lichHen.getFinalPrice());
    
    dto.setGioKham(lichGio.getKhungGio());
    dto.setNgayKham(lichTong.getNgay().toString()); 

    // Map thông tin bệnh nhân
    dto.setTenBenhNhan(benhNhan.getFullName());
    dto.setNgaySinh(benhNhan.getDob());
    dto.setGioiTinh(benhNhan.getGender());
    dto.setDiaChiBenhNhan(benhNhan.getAddress());

    // 5. LẤY THÔNG TIN ĐƠN VỊ KHÁM
    String loai = lichTong.getLoaiDoiTuong().name(); 
    Long idDoiTuong = lichTong.getMaDoiTuong();

    if ("BACSI".equalsIgnoreCase(loai)) {
        Doctor bs = doctorRepository.findById(idDoiTuong).orElse(null);
        if (bs != null) {
            dto.setTenDonVi("BS. " + bs.getName());
            dto.setDiaChiDonVi(bs.getWorkplace()); 
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