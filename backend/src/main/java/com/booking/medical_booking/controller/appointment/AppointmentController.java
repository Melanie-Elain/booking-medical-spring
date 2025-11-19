package com.booking.medical_booking.controller.appointment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.booking.medical_booking.dto.AppointmentDTO;
import com.booking.medical_booking.dto.AppointmentDetailDTO;
import com.booking.medical_booking.model.Appointment;
import com.booking.medical_booking.service.appointment.AppointmentService;
import com.booking.medical_booking.service.auth.UserService; // Lớp Service lấy User

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/booking")
public class AppointmentController {

    @Autowired 
    private AppointmentService appointmentService;

    @Autowired
    private UserService userService;

    private ResponseEntity<Appointment> handleBookingRequest(String type, AppointmentDTO appointmentDTO) {
        
        Long userId = userService.getCurrentUser().getId();
        appointmentDTO.setUserId(userId);
        
        appointmentDTO.setEntityType(type);
        
        try {
            
            Appointment appointment = appointmentService.createAppointment(appointmentDTO);
            
            return new ResponseEntity<>(appointment, HttpStatus.CREATED); 
            
        } catch (RuntimeException e) {
            
            return ResponseEntity.badRequest().build(); 
        }
    }


    @PostMapping("/doctor")
    public ResponseEntity<Appointment> bookDoctorAppointment(@Valid @RequestBody AppointmentDTO appointmentDTO) 
    {
        return handleBookingRequest("BACSI", appointmentDTO);
    }

    @PostMapping("/hospital")
    public ResponseEntity<Appointment> bookHospitalAppointment(@Valid @RequestBody AppointmentDTO appointmentDTO) 
    {
        return handleBookingRequest("BENHVIEN", appointmentDTO);
    }

    @PostMapping("/clinic")
    public ResponseEntity<Appointment> bookClinicAppointment(@Valid @RequestBody AppointmentDTO appointmentDTO) 
    {
        return handleBookingRequest("PHONGKHAM", appointmentDTO);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Appointment> getAppointmentDetail(@PathVariable Integer id) {
        Appointment appointment = appointmentService.findById(id);
        System.out.println("Thông tin lịch hẹn: "+appointment);
        return ResponseEntity.ok(appointment);
    }

    @GetMapping("/{id}/details")
    public ResponseEntity<AppointmentDetailDTO> getAppointmentInforDetails(@PathVariable Integer id) {
        AppointmentDetailDTO result = appointmentService.getBookingDetails(id);
        return ResponseEntity.ok(result);
    }
}