// 1. SỬA LẠI PACKAGE: Bỏ ".auth"
package com.booking.medical_booking.controller.auth; 

import com.booking.medical_booking.model.User;
import com.booking.medical_booking.model.Doctor;
import com.booking.medical_booking.model.Specialty;
import com.booking.medical_booking.dto.UserRequestDTO;
import com.booking.medical_booking.dto.DoctorRequestDTO;
import com.booking.medical_booking.service.auth.UserService;
import com.booking.medical_booking.service.specialty.SpecialtyService;
import com.booking.medical_booking.service.doctor.DoctorService;
// (Bỏ import UserRepository vì đã dùng UserService)
import com.booking.medical_booking.model.Hospital;
import com.booking.medical_booking.dto.HospitalRequestDTO;
import com.booking.medical_booking.service.hospital.HospitalService;
import com.booking.medical_booking.model.Clinic;
import com.booking.medical_booking.dto.ClinicRequestDTO;
import com.booking.medical_booking.service.clinic.ClinicService;
import com.booking.medical_booking.model.Appointment;
import com.booking.medical_booking.service.appointment.AppointmentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
// <-- THÊM IMPORT NÀY
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

// Import thư viện Pageable
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

@RestController
@RequestMapping("/api/admin") // API gốc của Admin
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {

    // 2. Đã dọn dẹp các ký tự lỗi (khoảng trắng ẩn)
    @Autowired
    private UserService userService;

    // (Xóa UserRepository vì đã dùng UserService cho phân trang)

    @Autowired
    private SpecialtyService specialtyService;

    @Autowired
    private DoctorService doctorService;

    @Autowired
    private HospitalService hospitalService;
    
    @Autowired
    private ClinicService clinicService;

    @Autowired
    private AppointmentService appointmentService;

    // --- QUẢN LÝ USER ---
    @GetMapping("/users")
    public ResponseEntity<Page<User>> getAllUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        Page<User> userPage = userService.adminGetAllUsers(pageable); // Gọi service 
        return ResponseEntity.ok(userPage);
    }
    
    @PostMapping("/users")
    public ResponseEntity<User> createUser(@RequestBody UserRequestDTO request) {
        User newUser = userService.adminCreateUser(request);
        return ResponseEntity.ok(newUser);
    }
    
    @PutMapping("/users/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody UserRequestDTO request) {
        User updatedUser = userService.adminUpdateUser(id, request);
        return ResponseEntity.ok(updatedUser);
    }
    
    @DeleteMapping("/users/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        try {
            userService.deleteUser(id);
            return ResponseEntity.ok("Đã xóa User ID: " + id);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    // --- QUẢN LÝ CHUYÊN KHOA ---
    @GetMapping("/specialties")
    public ResponseEntity<Page<Specialty>> getAllSpecialties(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Specialty> specialtyPage = specialtyService.getAllSpecialties(pageable); 
        return ResponseEntity.ok(specialtyPage);
    }

    @GetMapping("/specialties/all")
    public ResponseEntity<List<Specialty>> getAllSpecialtiesList() {
        return ResponseEntity.ok(specialtyService.getAllSpecialtiesList());
    }
    
    @PostMapping("/specialties")
    public ResponseEntity<Specialty> createSpecialty(@RequestBody Specialty specialty) {
        return ResponseEntity.ok(specialtyService.createSpecialty(specialty));
    }

    @PutMapping("/specialties/{id}")
    public ResponseEntity<Specialty> updateSpecialty(@PathVariable Integer id, @RequestBody Specialty specialtyDetails) {
        return ResponseEntity.ok(specialtyService.updateSpecialty(id, specialtyDetails));
    }

    @DeleteMapping("/specialties/{id}")
    public ResponseEntity<?> deleteSpecialty(@PathVariable Integer id) {
        try {
            specialtyService.deleteSpecialty(id);
            return ResponseEntity.ok("Đã xóa Specialty ID: " + id);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // --- QUẢN LÝ BÁC SĨ ---
    @GetMapping("/doctors")
    public ResponseEntity<Page<Doctor>> getAllDoctors(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Doctor> doctorPage = doctorService.getAllDoctors(pageable);
        return ResponseEntity.ok(doctorPage);
    }

    @PostMapping("/doctors")
    public ResponseEntity<Doctor> createDoctor(@RequestBody DoctorRequestDTO request) {
        try {
            Doctor newDoctor = doctorService.createDoctor(request);
            return ResponseEntity.ok(newDoctor);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null); // (Nên trả về e.getMessage())
        }
    }

    @PutMapping("/doctors/{id}")
    public ResponseEntity<Doctor> updateDoctor(@PathVariable Long id, @RequestBody DoctorRequestDTO request) {
        Doctor updatedDoctor = doctorService.updateDoctor(id, request);
        return ResponseEntity.ok(updatedDoctor);
    }

    @DeleteMapping("/doctors/{id}")
    public ResponseEntity<?> deleteDoctor(@PathVariable Long id) {
        try {
            doctorService.deleteDoctor(id);
            return ResponseEntity.ok("Đã xóa Bác sĩ ID: " + id);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // --- QUẢN LÝ BỆNH VIỆN ---
    @GetMapping("/hospitals")
    public ResponseEntity<Page<Hospital>> getAllHospitals(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Hospital> hospitalPage = hospitalService.getAllHospitals(pageable);
        return ResponseEntity.ok(hospitalPage);
    }

    @PostMapping("/hospitals")
    public ResponseEntity<Hospital> createHospital(@RequestBody HospitalRequestDTO request) {
        return ResponseEntity.ok(hospitalService.createHospital(request));
    }

    @PutMapping("/hospitals/{id}")
    public ResponseEntity<Hospital> updateHospital(@PathVariable Integer id, @RequestBody HospitalRequestDTO request) {
        return ResponseEntity.ok(hospitalService.updateHospital(id, request));
    }

    @DeleteMapping("/hospitals/{id}")
    public ResponseEntity<?> deleteHospital(@PathVariable Integer id) {
        try {
            hospitalService.deleteHospital(id);
            return ResponseEntity.ok("Đã xóa Hospital ID: " + id);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // --- QUẢN LÝ PHÒNG KHÁM ---
    @GetMapping("/clinics")
    public ResponseEntity<Page<Clinic>> getAllClinics(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Clinic> clinicPage = clinicService.getAllClinics(pageable);
        return ResponseEntity.ok(clinicPage);
    }

    @PostMapping("/clinics")
    public ResponseEntity<Clinic> createClinic(@RequestBody ClinicRequestDTO request) {
        return ResponseEntity.ok(clinicService.createClinic(request));
    }

    @PutMapping("/clinics/{id}")
    public ResponseEntity<Clinic> updateClinic(@PathVariable Integer id, @RequestBody ClinicRequestDTO request) {
        return ResponseEntity.ok(clinicService.updateClinic(id, request));
    }

    @DeleteMapping("/clinics/{id}")
    public ResponseEntity<?> deleteClinic(@PathVariable Integer id) {
        try {
            clinicService.deleteClinic(id);
            return ResponseEntity.ok("Đã xóa Clinic ID: " + id);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // --- QUẢN LÝ LỊCH HẸN ---
    @GetMapping("/appointments")
    public ResponseEntity<Page<Appointment>> getAllAppointments(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Appointment> appointmentPage = appointmentService.getAllAppointments(pageable);
        return ResponseEntity.ok(appointmentPage);
    } 

    @PutMapping("/appointments/{id}/status")
    public ResponseEntity<Appointment> updateAppointmentStatus(@PathVariable Integer id, @RequestBody Map<String, String> request) {
        try {
            Appointment updatedAppointment = appointmentService.updateAppointmentStatus(id, request);
            return ResponseEntity.ok(updatedAppointment);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null); // (Nên trả về e.getMessage())
        }
    }
}