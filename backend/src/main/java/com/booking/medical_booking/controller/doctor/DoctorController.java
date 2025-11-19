package com.booking.medical_booking.controller.doctor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;

import com.booking.medical_booking.service.doctor.DoctorScheduleService;
import com.booking.medical_booking.service.doctor.DoctorService;

import com.booking.medical_booking.dto.AppointmentResponseDTO;
import com.booking.medical_booking.dto.DoctorScheduleCreationDTO;
import com.booking.medical_booking.service.appointment.AppointmentService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Map;

import com.booking.medical_booking.dto.ScheduleTimeDTO;
import com.booking.medical_booking.model.Doctor;
import com.booking.medical_booking.model.LichGio;
import com.booking.medical_booking.model.LichTong;
import com.booking.medical_booking.service.doctor.DoctorScheduleService;
import com.booking.medical_booking.dto.DoctorScheduleCreationDTO;
import com.booking.medical_booking.dto.DoctorRequestDTO; // <-- THÊM IMPORT
import com.booking.medical_booking.model.Doctor; // <-- THÊM IMPORT


@RestController
@RequestMapping("/api/doctors")
public class DoctorController {

    @Autowired
    private DoctorService doctorService;
    @Autowired
    private AppointmentService appointmentService;
    @Autowired
    private DoctorScheduleService doctorScheduleService;

    @GetMapping
    public ResponseEntity<List<Doctor>> getAllDoctorsList() {
        List<Doctor> doctors = doctorService.getAllDoctorsList();
        return ResponseEntity.ok(doctors);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<Doctor> getDoctorByUserId(@PathVariable Long userId) {
        Doctor doctor = doctorService.findByUserId(userId);
        return ResponseEntity.ok(doctor);
    }

    @GetMapping("{id}")
    public Doctor getDoctorById(@PathVariable Long id) {
        Doctor doctor = doctorService.getDoctorById(id);
        return doctor;
    }
    
//    @GetMapping("/schedules/{id}")
//    public ResponseEntity<Map<String, List<ScheduleTimeDTO>>> getDoctorSchedules( 
//         @PathVariable Long id) 
//     {
//         try {
//             Map<String, List<ScheduleTimeDTO>> schedules = doctorService.getDoctorSchedules(id);
            
//             return ResponseEntity.ok(schedules);
            
//         } catch (RuntimeException e) {
            
//             return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
//         }
//     }

    // --- API LỊCH LÀM VIỆC (Đã cập nhật) ---
 
    @GetMapping("/schedules/{id}")
        public ResponseEntity<Map<String, List<ScheduleTimeDTO>>> getDoctorSchedules( 
            @PathVariable Long id) 
    {
            Map<String, List<ScheduleTimeDTO>> schedules = doctorService.getDoctorSchedules(id);
            return ResponseEntity.ok(schedules);
    }

    @PostMapping("/{id}/schedules")
    public ResponseEntity<?> createDoctorSchedule(
            @PathVariable Long id, 
            @RequestBody DoctorScheduleCreationDTO scheduleDTO) {
        try {
            LichTong lichTong = doctorScheduleService.createDoctorSchedule(id, scheduleDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(lichTong);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // === ENDPOINT XÓA LỊCH (Mới) ===
    // slotId là ID của LichGio
    @DeleteMapping("/schedules/{slotId}")
    public ResponseEntity<?> deleteSlot(@PathVariable Integer slotId) {
        try {
            doctorScheduleService.deleteScheduleSlot(slotId);
            return ResponseEntity.noContent().build(); // 204 No Content
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // === ENDPOINT SỬA LỊCH (Mới) ===
    // slotId là ID của LichGio
    @PutMapping("/schedules/{slotId}")
    public ResponseEntity<?> updateSlot(
            @PathVariable Integer slotId,
            @RequestBody Map<String, String> payload) {
        try {
            LichGio updatedSlot = doctorScheduleService.updateScheduleSlot(slotId, payload);
            return ResponseEntity.ok(updatedSlot);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // --- QUẢN LÝ LỊCH HẸN (CHO BÁC SĨ) ---
    @GetMapping("/{id}/appointments")
    public ResponseEntity<Page<AppointmentResponseDTO>> getAllAppointmentsByDoctor(
            @PathVariable Long id, // ID của bác sĩ
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        // Bạn cần tạo method `getAllAppointmentsByDoctor` trong AppointmentService
        Page<AppointmentResponseDTO> appointmentPage = appointmentService.getAllAppointmentsByDoctor(id, pageable);
        return ResponseEntity.ok(appointmentPage);
    }

    @PutMapping("/appointments/{appointmentId}/status")
    // @PreAuthorize("hasRole('DOCTOR')") // Bạn nên thêm phân quyền ở đây
    public ResponseEntity<AppointmentResponseDTO> updateAppointmentStatus(
            @PathVariable Integer appointmentId, // ID của lịch hẹn
            @RequestBody Map<String, String> request) {
        // Service `updateAppointmentStatus` nên kiểm tra quyền của người dùng
        AppointmentResponseDTO updatedAppointmentDTO = appointmentService.updateAppointmentStatus(appointmentId, request);
        return ResponseEntity.ok(updatedAppointmentDTO);
    }


    /**
     * API cho phép bác sĩ tự cập nhật hồ sơ của mình.
     * Sử dụng DoctorRequestDTO (đã có) để nhận dữ liệu.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Doctor> updateDoctorProfile(
            @PathVariable Long id,
            @RequestBody DoctorRequestDTO requestDTO) {
        
        // (Sau này bạn nên thêm @PreAuthorize để kiểm tra
        // xem bác sĩ có đúng là chủ sở hữu của hồ sơ này không)
        
        // Gọi hàm 'updateDoctor' đã có sẵn trong DoctorService
        Doctor updatedDoctor = doctorService.updateDoctor(id, requestDTO);
        return ResponseEntity.ok(updatedDoctor);
    }

}
