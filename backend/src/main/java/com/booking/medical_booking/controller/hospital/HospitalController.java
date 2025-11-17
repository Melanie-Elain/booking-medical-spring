package com.booking.medical_booking.controller.hospital;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.booking.medical_booking.dto.ScheduleTimeDTO;
import com.booking.medical_booking.model.Hospital;
import com.booking.medical_booking.model.Specialty;
import com.booking.medical_booking.service.hospital.HospitalService;

import com.booking.medical_booking.dto.AppointmentResponseDTO;
import com.booking.medical_booking.service.appointment.AppointmentService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
@RequestMapping("/api/hospitals")
public class HospitalController {

    @Autowired
    private HospitalService hospitalService;
    @Autowired
    private AppointmentService appointmentService;
    
    @GetMapping
    public ResponseEntity<List<Hospital>>  getAllHospitalsList() {
        List<Hospital> hospitals = hospitalService.getAllHospitalsList();
        System.out.println("Danh sách bệnh viện: "+hospitals);
        return ResponseEntity.ok(hospitals);
    }

    @GetMapping("{id}")
    public Hospital getHospitalById(@PathVariable Integer id) {
        Hospital hospital = hospitalService.getHospitalById(id);
        return hospital;
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

    @PutMapping("/appointments/{appointmentId}/status")
    public ResponseEntity<AppointmentResponseDTO> updateAppointmentStatus(
            @PathVariable Integer appointmentId, // ID của lịch hẹn
            @RequestBody Map<String, String> request) {
        AppointmentResponseDTO updatedAppointmentDTO = appointmentService.updateAppointmentStatus(appointmentId, request);
        return ResponseEntity.ok(updatedAppointmentDTO);
    }
    
    
}
