package com.booking.medical_booking.controller.clinic;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.booking.medical_booking.dto.ScheduleTimeDTO;
import com.booking.medical_booking.model.Clinic;
import com.booking.medical_booking.service.clinic.ClinicService;

@RestController
@RequestMapping("/api/clinics")
public class ClinicController {

    @Autowired
    private ClinicService clinicService;

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
    
}
