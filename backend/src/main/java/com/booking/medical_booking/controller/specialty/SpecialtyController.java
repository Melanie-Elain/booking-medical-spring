package com.booking.medical_booking.controller.specialty;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.booking.medical_booking.model.Specialty;
import com.booking.medical_booking.service.specialty.SpecialtyService;

@RestController
@RequestMapping("/api/specialties")
public class SpecialtyController {

    @Autowired
    private SpecialtyService specialtyService;
    
    @GetMapping
    public ResponseEntity< List<Specialty>> getAllSpecialtiesList() {
        List<Specialty> specialties = specialtyService.getAllSpecialtiesList();
        return ResponseEntity.ok(specialties);
    }
}
