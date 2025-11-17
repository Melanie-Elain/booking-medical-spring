package com.booking.medical_booking.controller.clinic;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.booking.medical_booking.dto.AppointmentResponseDTO;
import com.booking.medical_booking.service.appointment.AppointmentService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.booking.medical_booking.dto.ScheduleTimeDTO;
import com.booking.medical_booking.model.Clinic;
import com.booking.medical_booking.service.clinic.ClinicService;

@RestController
@RequestMapping("/api/clinics")
public class ClinicController {

    @Autowired
    private ClinicService clinicService;
    @Autowired
    private AppointmentService appointmentService;

    @GetMapping
    public ResponseEntity<List<Clinic>>  getAllClinicsList() {
        List<Clinic> clinics = clinicService.getAllClinicsList();
        System.out.println("Danh sách phòng khám: "+clinics);
        return ResponseEntity.ok(clinics);
    }

    @GetMapping("{id}")
    public Clinic getClinicById(@PathVariable Integer id) {
        Clinic clinic = clinicService.getClinicById(id);
        return clinic;
    }

    
    @GetMapping("/{id}/schedules")
    public ResponseEntity<Map<String, List<ScheduleTimeDTO>>> getClinicSchedules(
        @PathVariable Long id) 
    {
       
        Map<String, List<ScheduleTimeDTO>> schedules = clinicService.getClinicSchedules(id);
        
        return ResponseEntity.ok(schedules);
    }
    
    // --- QUẢN LÝ LỊCH HẸN (CHO PHÒNG KHÁM) ---
    @GetMapping("/{id}/appointments")
    public ResponseEntity<Page<AppointmentResponseDTO>> getAllAppointmentsByClinic(
            @PathVariable Integer id, // ID của phòng khám
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<AppointmentResponseDTO> appointmentPage = appointmentService.getAllAppointmentsByClinic(id.longValue(), pageable); // Chuyển đổi sang Long nếu cần
        return ResponseEntity.ok(appointmentPage);
    }


    @PutMapping("/appointments/{appointmentId}/status")
    public ResponseEntity<AppointmentResponseDTO> updateAppointmentStatus(
            @PathVariable Integer appointmentId, // ID của lịch hẹn
            @RequestBody Map<String, String> request) {
        AppointmentResponseDTO updatedAppointmentDTO = appointmentService.updateAppointmentStatus(appointmentId, request);
        return ResponseEntity.ok(updatedAppointmentDTO);
    }
}
