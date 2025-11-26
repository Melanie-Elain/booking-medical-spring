package com.booking.medical_booking.controller.hospital;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.booking.medical_booking.dto.ScheduleTimeDTO;
import com.booking.medical_booking.model.Hospital;
import com.booking.medical_booking.model.Specialty;
import com.booking.medical_booking.service.hospital.HospitalService;

import com.booking.medical_booking.dto.AppointmentResponseDTO;
import com.booking.medical_booking.dto.HospitalRequestDTO;
import com.booking.medical_booking.service.appointment.AppointmentService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.booking.medical_booking.dto.DoctorScheduleCreationDTO; 
import com.booking.medical_booking.model.LichGio; 
import com.booking.medical_booking.model.LichTong; 
import com.booking.medical_booking.service.hospital.HospitalScheduleService;

import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;


@RestController
@RequestMapping("/api/hospitals")
public class HospitalController {

    @Autowired
    private HospitalService hospitalService;
    @Autowired
    private AppointmentService appointmentService;
    @Autowired
    private HospitalScheduleService hospitalScheduleService;
    
    @GetMapping
    public ResponseEntity<List<Hospital>>  getAllHospitalsList() {
        List<Hospital> hospitals = hospitalService.getAllHospitalsList();
        System.out.println("Danh sách bệnh viện: "+hospitals);
        return ResponseEntity.ok(hospitals);
    }

     // === API CHO WORKSPACE (MỚI) ===
    @GetMapping("/user/{userId}")
    public ResponseEntity<Hospital> getHospitalByUserId(@PathVariable Long userId) {
        Hospital hospital = hospitalService.findByUserId(userId);
        return ResponseEntity.ok(hospital);
    }
    
    @GetMapping("{id}")
    public Hospital getHospitalById(@PathVariable Integer id) {
        Hospital hospital = hospitalService.getHospitalById(id);
        return hospital;
    }

    // === API CẬP NHẬT HỒ SƠ (MỚI) ===
    @PutMapping("/{id}")
    public ResponseEntity<Hospital> updateHospitalProfile(
            @PathVariable Integer id,
            @RequestBody HospitalRequestDTO requestDTO) {
        Hospital updatedHospital = hospitalService.updateHospital(id, requestDTO);
        return ResponseEntity.ok(updatedHospital);
    }

    
    @GetMapping("{id}/specialties")
    public ResponseEntity<Set<Specialty>> getHospitalWithSpecialties(@PathVariable Integer hospitalId) {
        Set<Specialty> specialties = hospitalService.getHospitalSpecialties(hospitalId);
        if (specialties.isEmpty()) {
            return ResponseEntity.noContent().build(); 
        }
        return ResponseEntity.ok(specialties);
    }

    @GetMapping("/{id}/schedules")
    public ResponseEntity<Map<String, List<ScheduleTimeDTO>>> getHospitalSchedules(
        @PathVariable Long id) 
    {
        
        Map<String, List<ScheduleTimeDTO>> schedules = hospitalService.getHospitalSchedules(id);
        
        return ResponseEntity.ok(schedules);
    }

    @GetMapping("/{id}/schedules-management") // Đường dẫn khác với cái cũ
    public ResponseEntity<?> getAllSchedules(@PathVariable Long id) {
        
        return ResponseEntity.ok(hospitalService.getAllSchedulesForManagement(id));
    }

        // --- QUẢN LÝ LỊCH HẸN (CHO BỆNH VIỆN) ---
         @GetMapping("/{id}/appointments")
    public ResponseEntity<Page<AppointmentResponseDTO>> getAllAppointmentsByHospital(
            @PathVariable Integer id, // ID của bệnh viện
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<AppointmentResponseDTO> appointmentPage = appointmentService.getAllAppointmentsByHospital(id.longValue(), pageable); // Chuyển đổi sang Long nếu cần
        return ResponseEntity.ok(appointmentPage);
    }

    // @PutMapping("/appointments/{appointmentId}/status")
    // public ResponseEntity<AppointmentResponseDTO> updateAppointmentStatus(
    //         @PathVariable Integer appointmentId, // ID của lịch hẹn
    //         @RequestBody Map<String, String> request) {
    //     AppointmentResponseDTO updatedAppointmentDTO = appointmentService.updateAppointmentStatus(appointmentId, request);
    //     return ResponseEntity.ok(updatedAppointmentDTO);
    // }
    
   // --- API LỊCH LÀM VIỆC CỦA BỆNH VIỆN (MỚI) ---
    // (Giống hệt API của Bác sĩ)

    // 1. XÁC NHẬN / CẬP NHẬT TRẠNG THÁI
    @PutMapping("/appointments/{appointmentId}/status")
    public ResponseEntity<?> updateAppointmentStatus(
            @PathVariable Integer appointmentId,
            @RequestBody Map<String, String> request) {
        try {
            AppointmentResponseDTO result = appointmentService.updateAppointmentStatus(appointmentId, request);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // 2. HỦY LỊCH (Thêm mới)
    @PutMapping("/appointments/{appointmentId}/cancel")
    public ResponseEntity<?> cancelAppointment(@PathVariable Integer appointmentId) {
        try {
            AppointmentResponseDTO result = appointmentService.cancelAppointment(appointmentId);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/{id}/schedules")
    public ResponseEntity<?> createHospitalSchedule(
            @PathVariable Integer id, // ID của bệnh viện
            @RequestBody DoctorScheduleCreationDTO scheduleDTO) {
        try {
            LichTong lichTong = hospitalScheduleService.createHospitalSchedule(id, scheduleDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(lichTong);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // API Xóa và Sửa slot dùng chung (nếu bạn chưa có)
    // Nếu bạn đã có ScheduleSlotController rồi thì BỎ QUA 2 HÀM NÀY
    @DeleteMapping("/schedules/{slotId}")
    public ResponseEntity<?> deleteSlot(@PathVariable Integer slotId) {
        try {
            hospitalScheduleService.deleteScheduleSlot(slotId);
            return ResponseEntity.noContent().build(); 
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/schedules/{slotId}")
    public ResponseEntity<?> updateSlot(
            @PathVariable Integer slotId,
            @RequestBody Map<String, String> payload) {
        try {
            LichGio updatedSlot = hospitalScheduleService.updateScheduleSlot(slotId, payload);
            return ResponseEntity.ok(updatedSlot);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    
}
