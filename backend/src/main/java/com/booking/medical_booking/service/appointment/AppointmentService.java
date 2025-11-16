package com.booking.medical_booking.service.appointment;

import com.booking.medical_booking.dto.AppointmentDTO;
import com.booking.medical_booking.model.Appointment;
import com.booking.medical_booking.model.LichGio;
import com.booking.medical_booking.model.User;
import com.booking.medical_booking.repository.AppointmentRepository;
import com.booking.medical_booking.repository.LichGioRepository;
import com.booking.medical_booking.repository.UserRepository;
import com.booking.medical_booking.service.EmailService;

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

    

    private final String TRANG_THAI_KHA_DUNG = "Available";
    private final String TRANG_THAI_DA_DAT = "Booked";
    private final String TRANG_THAI_CHO = "Đang chờ";

    private final String TRANG_THAI_XAC_NHAN = "Đã xác nhận";
   
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
//     public AppointmentResponseDTO updateAppointmentStatus(Integer id, Map<String, String> request) {
//     String status = request.get("status");
//     if (status == null || status.isEmpty()) {
//         throw new RuntimeException("Trạng thái (status) là bắt buộc");
//     }

//     Appointment appointment = appointmentRepository.findById(id)
//             .orElseThrow(() -> new RuntimeException("Không tìm thấy Lịch hẹn ID: " + id));
    
//     appointment.setTrangThai(status); 
    
//     Appointment savedAppointment = appointmentRepository.save(appointment);
    
//     // Chuyển đổi sang DTO trước khi trả về
//     return convertToDTO(savedAppointment); 
// }
    @Transactional
    public AppointmentResponseDTO updateAppointmentStatus(Integer id, Map<String, String> request) {
        String newStatus = request.get("status");
        if (newStatus == null || newStatus.isEmpty()) {
            throw new RuntimeException("Trạng thái (status) là bắt buộc");
        }

        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy Lịch hẹn ID: " + id));
        
        // Lấy trạng thái cũ để so sánh
        String oldStatus = appointment.getTrangThai();

        // Cập nhật trạng thái mới
        appointment.setTrangThai(newStatus); 
        
        // Lưu vào DB
        Appointment savedAppointment = appointmentRepository.save(appointment);
        
        // --- ĐÂY LÀ PHẦN SỬA LỖI ---

        // 1. Chuyển đổi sang DTO NGAY LẬP TỨC
        //    Hàm này sẽ chạy logic (dùng 3 repository) để lấy tên provider
        AppointmentResponseDTO responseDTO = convertToDTO(savedAppointment);

        // 2. Lấy tên nhà cung cấp TỪ DTO
        //    (Giả định DTO của bạn có hàm getProviderName() để lấy tên)
        String providerName = responseDTO.getProviderName(); 

        // 3. Logic gửi mail
        // Chỉ gửi mail nếu trạng thái mới là "Đã xác nhận" VÀ nó khác với trạng thái cũ
        if (TRANG_THAI_XAC_NHAN.equalsIgnoreCase(newStatus) && !TRANG_THAI_XAC_NHAN.equalsIgnoreCase(oldStatus)) {
            try {
                // SỬA LỖI: Truyền 2 tham số như yêu cầu của EmailService
                emailService.sendAppointmentConfirmationEmail(savedAppointment, providerName);
                
                System.out.println("Đã yêu cầu gửi email xác nhận cho lịch hẹn ID: " + id);

            } catch (Exception e) {
                // Ghi log lỗi, nhưng KHÔNG throw
                System.err.println("Lỗi khi gửi email xác nhận (update status) cho lịch hẹn ID " + id + ": " + e.getMessage());
                e.printStackTrace();
            }
        }
        
        // 4. Trả về DTO đã được tạo
        return responseDTO; 
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