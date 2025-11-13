package com.booking.medical_booking.controller.appointment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.booking.medical_booking.dto.AppointmentDTO;
import com.booking.medical_booking.model.Appointment;
import com.booking.medical_booking.model.User;
import com.booking.medical_booking.service.appointment.AppointmentService;
import com.booking.medical_booking.service.auth.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/booking")
public class AppointmentController {

    @Autowired 
    private AppointmentService appointmentService;

    @Autowired
    private UserService userService;

    @PostMapping("/doctor")
    public ResponseEntity<Appointment> bookDoctorAppointment(
        @Valid @RequestBody AppointmentDTO appointmentDTO) 
    {
        appointmentDTO.setUserId(userService.getCurrentUser().getId()); 
        
        try {
            Appointment appointment = appointmentService.createDoctorAppointment(appointmentDTO);
            return new ResponseEntity<>(appointment, HttpStatus.CREATED); 
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build(); 
        }
    }

    @PostMapping("/hospital")
    public ResponseEntity<Appointment> bookHospitalAppointment(
        @Valid @RequestBody AppointmentDTO appointmentDTO) 
    {
        appointmentDTO.setUserId(userService.getCurrentUser().getId()); 
        
        try {
            Appointment appointment = appointmentService.createHospitalAppointment(appointmentDTO);
            return new ResponseEntity<>(appointment, HttpStatus.CREATED); 
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build(); 
        }
    }

    @PostMapping("/clinic")
    public ResponseEntity<Appointment> bookClinicAppointment(
        @Valid @RequestBody AppointmentDTO appointmentDTO) 
    {
        appointmentDTO.setUserId(userService.getCurrentUser().getId()); 
        
        try {
            Appointment appointment = appointmentService.createClinicAppointment(appointmentDTO);
            return new ResponseEntity<>(appointment, HttpStatus.CREATED); 
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build(); 
        }
    }
}