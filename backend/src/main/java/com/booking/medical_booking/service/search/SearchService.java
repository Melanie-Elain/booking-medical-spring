// src/main/java/.../service/SearchService.java
package com.booking.medical_booking.service.search;

import com.booking.medical_booking.dto.SearchRequestDTO;
import com.booking.medical_booking.model.Clinic;
import com.booking.medical_booking.model.Doctor;
import com.booking.medical_booking.model.Hospital;
import com.booking.medical_booking.repository.ClinicRepository;
import com.booking.medical_booking.repository.DoctorRepository;
import com.booking.medical_booking.repository.HospitalRepository;
import com.booking.medical_booking.service.clinic.ClinicService;
import com.booking.medical_booking.service.doctor.DoctorService;
import com.booking.medical_booking.service.hospital.HospitalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class SearchService {

   

    @Autowired private DoctorRepository doctorRepository;
    @Autowired private HospitalRepository hospitalRepository;
    @Autowired private ClinicRepository clinicRepository;
    

    public Page<?> searchAllEntities(SearchRequestDTO request, Pageable pageable) {
        
        List<Object> combinedResults = new ArrayList<>();
        
        String type = request.getType();
        String specialty = request.getSpecialty();
        String query = request.getQuery();

        System.out.println("query: "+ query);
        
        boolean hasFilter = (specialty != null && !specialty.isEmpty()) || (query != null && !query.isEmpty());
        
        if (type == null || type.equalsIgnoreCase("Bác sĩ") || type.equalsIgnoreCase("Tất cả")) {
            if (specialty != null && !specialty.isEmpty()) {
                combinedResults.addAll(doctorRepository.findBySpecialty(specialty)); 
            } else if (query != null && !query.isEmpty()) {
                combinedResults.addAll(doctorRepository.findByGeneralSearch(query));
            } else if (!hasFilter) { 
             
                combinedResults.addAll(doctorRepository.findAll()); 
            }
        }

        if (type == null || type.equalsIgnoreCase("Bệnh viện") || type.equalsIgnoreCase("Tất cả")) {
            if (specialty != null && !specialty.isEmpty()) {
                combinedResults.addAll(hospitalRepository.findBySpecialtyName(specialty));
            } else if (query != null && !query.isEmpty()) {
                combinedResults.addAll(hospitalRepository.findByNameContainingIgnoreCase(query));
            } else if (!hasFilter) {
                combinedResults.addAll(hospitalRepository.findAll()); 
            }
        }

        if (type == null || type.equalsIgnoreCase("Phòng khám") || type.equalsIgnoreCase("Tất cả")) {
            if (specialty != null && !specialty.isEmpty()) {
                combinedResults.addAll(clinicRepository.findBySpecialtyName(specialty));
            } else if (query != null && !query.isEmpty()) {
                combinedResults.addAll(clinicRepository.findByNameContainingIgnoreCase(query));
            } else if (!hasFilter) {
                combinedResults.addAll(clinicRepository.findAll()); 
            }
        }
        
        
        int totalSize = combinedResults.size();
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), totalSize);
        
        List<?> pagedResults = List.of();
        if (start < totalSize) {
             pagedResults = combinedResults.subList(start, end);
        }

        return new PageImpl<>(pagedResults, pageable, totalSize);
    }
}