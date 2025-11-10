package com.booking.medical_booking.controller.auth; 

import com.booking.medical_booking.model.User;
import com.booking.medical_booking.model.Doctor;
import com.booking.medical_booking.model.Specialty;
import com.booking.medical_booking.dto.UserRequestDTO;
import com.booking.medical_booking.dto.DoctorRequestDTO;
import com.booking.medical_booking.service.auth.UserService;
import com.booking.medical_booking.service.specialty.SpecialtyService;
import com.booking.medical_booking.service.doctor.DoctorService;
import com.booking.medical_booking.repository.UserRepository;
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
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin") // API gốc của Admin
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

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

    /**
     * API Lấy tất cả user (cho trang Quản lý User)
     */
    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userRepository.findAll();
        return ResponseEntity.ok(users);
    }
    
    // === THÊM USER ===
    @PostMapping("/users")
    public ResponseEntity<User> createUser(@RequestBody UserRequestDTO request) {
        User newUser = userService.adminCreateUser(request);
        return ResponseEntity.ok(newUser);
    }
    
    // === CẬP NHẬT USER ===
    @PutMapping("/users/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody UserRequestDTO request) {
        User updatedUser = userService.adminUpdateUser(id, request);
        return ResponseEntity.ok(updatedUser);
    }
    
    // ===  XÓA USER ===
    @DeleteMapping("/users/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        try {
            userService.deleteUser(id);
            return ResponseEntity.ok("Đã xóa User ID: " + id);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }



    /**
     * API Lấy tất cả Chuyên khoa
     * Frontend sẽ gọi: GET /api/admin/specialties
     */
    @GetMapping("/specialties")
    public ResponseEntity<List<Specialty>> getAllSpecialties() {
        return ResponseEntity.ok(specialtyService.getAllSpecialties());
    }
    
        // === THÊM Chuyên khoa ===
    @PostMapping("/specialties")
    public ResponseEntity<Specialty> createSpecialty(@RequestBody Specialty specialty) {
        return ResponseEntity.ok(specialtyService.createSpecialty(specialty));
    }

    // === CẬP NHẬT Chuyên khoa ===
    @PutMapping("/specialties/{id}")
    public ResponseEntity<Specialty> updateSpecialty(@PathVariable Integer id, @RequestBody Specialty specialtyDetails) {
        return ResponseEntity.ok(specialtyService.updateSpecialty(id, specialtyDetails));
    }

    // ===  XÓA Chuyên khoa ===
    @DeleteMapping("/specialties/{id}")
    public ResponseEntity<?> deleteSpecialty(@PathVariable Integer id) {
        try {
            specialtyService.deleteSpecialty(id);
            return ResponseEntity.ok("Đã xóa Specialty ID: " + id);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    // === 2. THÊM KHỐI API MỚI CHO BÁC SĨ (DOCTOR) ===

    
    @GetMapping("/doctors")
    public ResponseEntity<List<Doctor>> getAllDoctors() {
        return ResponseEntity.ok(doctorService.getAllDoctors());
    }

    // === THÊM Bác sĩ ===
    @PostMapping("/doctors")
    public ResponseEntity<Doctor> createDoctor(@RequestBody DoctorRequestDTO request) {
        try {
            Doctor newDoctor = doctorService.createDoctor(request);
            return ResponseEntity.ok(newDoctor);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null); // (Nên trả về e.getMessage())
        }
    }

    // === CẬP NHẬT Bác sĩ ===
    @PutMapping("/doctors/{id}")
    public ResponseEntity<Doctor> updateDoctor(@PathVariable Long id, @RequestBody DoctorRequestDTO request) {
        Doctor updatedDoctor = doctorService.updateDoctor(id, request);
        return ResponseEntity.ok(updatedDoctor);
    }

    // === XÓA Bác sĩ ===
    @DeleteMapping("/doctors/{id}")
    public ResponseEntity<?> deleteDoctor(@PathVariable Long id) {
        try {
            doctorService.deleteDoctor(id);
            return ResponseEntity.ok("Đã xóa Bác sĩ ID: " + id);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    // === 2. THÊM KHỐI API CHO BỆNH VIỆN (HOSPITAL) ===
    @GetMapping("/hospitals")
    public ResponseEntity<List<Hospital>> getAllHospitals() {
        return ResponseEntity.ok(hospitalService.getAllHospitals());
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

    // === 3. THÊM KHỐI API CHO PHÒNG KHÁM (CLINIC) ===
    @GetMapping("/clinics")
    public ResponseEntity<List<Clinic>> getAllClinics() {
        return ResponseEntity.ok(clinicService.getAllClinics());
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

    // === 2. THÊM KHỐI API CHO LỊCH HẸN (APPOINTMENT) ===

    /**
     * API Lấy tất cả Lịch hẹn
     * Frontend sẽ gọi: GET /api/admin/appointments
     */
    @GetMapping("/appointments")
    public ResponseEntity<List<Appointment>> getAllAppointments() {
        return ResponseEntity.ok(appointmentService.getAllAppointments());
    }   

    /**
     * API Cập nhật Trạng thái Lịch hẹn (Xác nhận / Hủy)
     * Frontend sẽ gọi: PUT /api/admin/appointments/{id}/status
     * Body gửi đi: { "status": "Đã xác nhận" }
     */
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