package com.booking.medical_booking.controller.doctor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import com.booking.medical_booking.service.doctor.DoctorService;
import java.util.List;
import java.util.Map;

import com.booking.medical_booking.dto.ScheduleTimeDTO;
import com.booking.medical_booking.model.Doctor;

@RestController
@RequestMapping("/api/doctors")
public class DoctorController {

    @Autowired
    private DoctorService doctorService;

    @GetMapping
    public ResponseEntity<List<Doctor>> getAllDoctorsList() {
        List<Doctor> doctors = doctorService.getAllDoctorsList();
        return ResponseEntity.ok(doctors);
    }

    @GetMapping("{id}")
    public Doctor getDoctorById(@PathVariable Long id) {
        Doctor doctor = doctorService.getDoctorById(id);
        return doctor;
    }
    
   @GetMapping("/schedules/{id}")
   public ResponseEntity<Map<String, List<ScheduleTimeDTO>>> getDoctorSchedules( // <-- SỬA KIỂU TRẢ VỀ Ở ĐÂY
        @PathVariable Long id) 
    {
        try {
            Map<String, List<ScheduleTimeDTO>> schedules = doctorService.getDoctorSchedules(id);
            
            return ResponseEntity.ok(schedules);
            
        } catch (RuntimeException e) {
            
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }


}
