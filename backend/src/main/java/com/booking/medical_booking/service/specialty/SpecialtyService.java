package com.booking.medical_booking.service.specialty;

import com.booking.medical_booking.model.Specialty; 
import com.booking.medical_booking.repository.SpecialtyRepository; 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;

@Service
public class SpecialtyService {

    @Autowired
    private SpecialtyRepository specialtyRepository; 

    public Page<Specialty> getAllSpecialties(Pageable pageable) {
        return specialtyRepository.findAll(pageable);
    }

    @Transactional(readOnly = true)
    public List<Specialty> getAllSpecialtiesList() {
        return specialtyRepository.findAll();
    }

    public Specialty createSpecialty(Specialty specialty) {
        return specialtyRepository.save(specialty);
    }

    public Specialty updateSpecialty(Integer id, Specialty specialtyDetails) {
        Specialty specialty = specialtyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy Specialty ID: " + id));
        
        specialty.setName(specialtyDetails.getName()); 
        specialty.setDescription(specialtyDetails.getDescription()); 
        
        return specialtyRepository.save(specialty);
    }

    public void deleteSpecialty(Integer id) {
        Specialty specialty = specialtyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy Specialty ID: " + id));
        
        specialtyRepository.delete(specialty);
    }
}