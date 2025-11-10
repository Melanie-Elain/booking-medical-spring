package com.booking.medical_booking.service.hospital;

import com.booking.medical_booking.dto.HospitalRequestDTO;
import com.booking.medical_booking.model.Hospital;
import com.booking.medical_booking.model.Specialty;
import com.booking.medical_booking.repository.HospitalRepository;
import com.booking.medical_booking.repository.SpecialtyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class HospitalService {

    @Autowired
    private HospitalRepository hospitalRepository;
    @Autowired
    private SpecialtyRepository specialtyRepository;

    public List<Hospital> getAllHospitals() {
        return hospitalRepository.findAll();
    }

    @Transactional
    public Hospital createHospital(HospitalRequestDTO request) {
        Set<Specialty> specialties = new HashSet<>(
            specialtyRepository.findAllById(request.getSpecialtyIds())
        );

        Hospital hospital = new Hospital();
        hospital.setName(request.getName());
        hospital.setSlogan(request.getSlogan());
        hospital.setAddress(request.getAddress());
        hospital.setImage(request.getImage());
        hospital.setDescription(request.getDescription());
        hospital.setPhone(request.getPhone());
        hospital.setBanner(request.getBanner());
        hospital.setSpecialties(specialties);

        return hospitalRepository.save(hospital);
    }

    @Transactional
    public Hospital updateHospital(Integer id, HospitalRequestDTO request) {
        Hospital hospital = hospitalRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Không tìm thấy Hospital ID: " + id));
        
        Set<Specialty> specialties = new HashSet<>(
            specialtyRepository.findAllById(request.getSpecialtyIds())
        );
        
        hospital.setName(request.getName());
        hospital.setSlogan(request.getSlogan());
        hospital.setAddress(request.getAddress());
        hospital.setImage(request.getImage());
        hospital.setDescription(request.getDescription());
        hospital.setPhone(request.getPhone());
        hospital.setBanner(request.getBanner());
        hospital.setSpecialties(specialties);

        return hospitalRepository.save(hospital);
    }

    public void deleteHospital(Integer id) {
        Hospital hospital = hospitalRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Không tìm thấy Hospital ID: " + id));
        hospitalRepository.delete(hospital);
    }
}