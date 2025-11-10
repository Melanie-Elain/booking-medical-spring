package com.booking.medical_booking.service.clinic;

import com.booking.medical_booking.dto.ClinicRequestDTO;
import com.booking.medical_booking.model.Clinic;
import com.booking.medical_booking.model.Specialty;
import com.booking.medical_booking.repository.ClinicRepository;
import com.booking.medical_booking.repository.SpecialtyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class ClinicService {

    @Autowired
    private ClinicRepository clinicRepository;
    @Autowired
    private SpecialtyRepository specialtyRepository;

    public List<Clinic> getAllClinics() {
        return clinicRepository.findAll();
    }

    @Transactional
    public Clinic createClinic(ClinicRequestDTO request) {
        Set<Specialty> specialties = new HashSet<>(
            specialtyRepository.findAllById(request.getSpecialtyIds())
        );

        Clinic clinic = new Clinic();
        clinic.setName(request.getName());
        clinic.setAddress(request.getAddress());
        clinic.setImage(request.getImage());
        clinic.setDescription(request.getDescription());
        clinic.setImagesIntro(request.getImagesIntro());
        clinic.setSpecialties(specialties);

        return clinicRepository.save(clinic);
    }

    @Transactional
    public Clinic updateClinic(Integer id, ClinicRequestDTO request) {
        Clinic clinic = clinicRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Không tìm thấy Clinic ID: " + id));
        
        Set<Specialty> specialties = new HashSet<>(
            specialtyRepository.findAllById(request.getSpecialtyIds())
        );
        
        clinic.setName(request.getName());
        clinic.setAddress(request.getAddress());
        clinic.setImage(request.getImage());
        clinic.setDescription(request.getDescription());
        clinic.setImagesIntro(request.getImagesIntro());
        clinic.setSpecialties(specialties);

        return clinicRepository.save(clinic);
    }

    public void deleteClinic(Integer id) {
        Clinic clinic = clinicRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Không tìm thấy Clinic ID: " + id));
        clinicRepository.delete(clinic);
    }
}