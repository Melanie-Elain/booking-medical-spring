package com.booking.medical_booking.controller.clinic;

import com.booking.medical_booking.dto.ClinicRequestDTO;
import com.booking.medical_booking.dto.DoctorScheduleCreationDTO;
import com.booking.medical_booking.dto.AppointmentResponseDTO;
import com.booking.medical_booking.model.Clinic;
import com.booking.medical_booking.model.LichGio;
import com.booking.medical_booking.model.LichTong;
import com.booking.medical_booking.service.appointment.AppointmentService;
import com.booking.medical_booking.service.clinic.ClinicScheduleService; // Service chứa logic fix lỗi
import com.booking.medical_booking.service.clinic.ClinicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/clinics")
public class ClinicController {

    @Autowired
    private ClinicService clinicService;

    @Autowired
    private ClinicScheduleService clinicScheduleService; // Service xử lý lịch chính

    @Autowired
    private AppointmentService appointmentService;

    // --- API THÔNG TIN PHÒNG KHÁM ---

    @GetMapping("/user/{userId}")
    public ResponseEntity<Clinic> getClinicByUserId(@PathVariable Long userId) {
        Clinic clinic = clinicService.findByUserId(userId);
        return ResponseEntity.ok(clinic);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Clinic> getClinicById(@PathVariable Integer id) {
        Clinic clinic = clinicService.getClinicById(id);
        return ResponseEntity.ok(clinic);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Clinic> updateClinicProfile(
            @PathVariable Integer id,
            @RequestBody ClinicRequestDTO requestDTO) {
        Clinic updatedClinic = clinicService.updateClinic(id, requestDTO);
        return ResponseEntity.ok(updatedClinic);
    }

    @GetMapping
    public ResponseEntity<List<Clinic>> getAllClinicsList() {
        List<Clinic> clinics = clinicService.getAllClinicsList();
        return ResponseEntity.ok(clinics);
    }

    // ===============================================================
    // --- API LỊCH LÀM VIỆC (ĐÃ SỬA ĐỂ FIX LỖI HIỂN THỊ) ---
    // ===============================================================

    // 1. LẤY DANH SÁCH LỊCH (GET)
    // Sửa: Gọi sang clinicScheduleService.getAllClinicSchedules
    @GetMapping("/{id}/schedules")
    public ResponseEntity<?> getClinicSchedules(@PathVariable Integer id) {
        try {
            // Gọi hàm mới đã fix lỗi chỉ hiện 1 ngày
            Map<String, List<Map<String, Object>>> schedules = clinicScheduleService.getAllClinicSchedules(id);
            return ResponseEntity.ok(schedules);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Lỗi tải lịch: " + e.getMessage());
        }
    }

    // 2. TẠO LỊCH MỚI (POST)
    @PostMapping("/{id}/schedules")
    public ResponseEntity<?> createClinicSchedule(
            @PathVariable Integer id,
            @RequestBody DoctorScheduleCreationDTO scheduleDTO) {
        try {
            LichTong lichTong = clinicScheduleService.createClinicSchedule(id, scheduleDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(lichTong);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // 3. XÓA KHUNG GIỜ (DELETE)
    @DeleteMapping("/schedules/{slotId}")
    public ResponseEntity<?> deleteSlot(@PathVariable Integer slotId) {
        try {
            clinicScheduleService.deleteScheduleSlot(slotId);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // 4. SỬA KHUNG GIỜ (PUT)
    @PutMapping("/schedules/{slotId}")
    public ResponseEntity<?> updateSlot(
            @PathVariable Integer slotId,
            @RequestBody Map<String, String> payload) {
        try {
            LichGio updatedSlot = clinicScheduleService.updateScheduleSlot(slotId, payload);
            return ResponseEntity.ok(updatedSlot);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // --- API QUẢN LÝ LỊCH HẸN ---

    @GetMapping("/{id}/appointments")
    public ResponseEntity<Page<AppointmentResponseDTO>> getAllAppointmentsByClinic(
            @PathVariable Integer id, // ID này là userId từ React gửi lên
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<AppointmentResponseDTO> appointmentPage = appointmentService.getAllAppointmentsByClinic(id.longValue(), pageable);
        return ResponseEntity.ok(appointmentPage);
    }

    // @PutMapping("/appointments/{appointmentId}/status")
    // public ResponseEntity<AppointmentResponseDTO> updateAppointmentStatus(
    //         @PathVariable Integer appointmentId,
    //         @RequestBody Map<String, String> request) {
    //     AppointmentResponseDTO updatedAppointmentDTO = appointmentService.updateAppointmentStatus(appointmentId, request);
    //     return ResponseEntity.ok(updatedAppointmentDTO);
    // }
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

    // 2. HỦY LỊCH (Thêm mới vào đây)
    @PutMapping("/appointments/{appointmentId}/cancel")
    public ResponseEntity<?> cancelAppointment(@PathVariable Integer appointmentId) {
        try {
            AppointmentResponseDTO result = appointmentService.cancelAppointment(appointmentId);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    
}