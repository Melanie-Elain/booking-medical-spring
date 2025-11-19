package com.booking.medical_booking.service.search;

import com.booking.medical_booking.dto.SearchRequestDTO;
import com.booking.medical_booking.dto.SearchResultDTO;
import com.booking.medical_booking.model.Clinic;
import com.booking.medical_booking.model.Doctor;
import com.booking.medical_booking.model.Hospital;
import com.booking.medical_booking.model.Specialty; // Import Model Specialty
import com.booking.medical_booking.repository.ClinicRepository;
import com.booking.medical_booking.repository.DoctorRepository;
import com.booking.medical_booking.repository.HospitalRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional; // Import Transactional

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class SearchService {

    @Autowired private DoctorRepository doctorRepository;
    @Autowired private HospitalRepository hospitalRepository;
    @Autowired private ClinicRepository clinicRepository;

    // Thêm @Transactional để tránh lỗi Lazy Loading khi gọi .getSpecialties()
    @Transactional(readOnly = true) 
    public Page<SearchResultDTO> searchAllEntities(SearchRequestDTO request, Pageable pageable) {
        
        List<SearchResultDTO> combinedResults = new ArrayList<>();
        
        String type = request.getType();
        String specialty = request.getSpecialty();
        String query = request.getQuery();
        
        boolean hasFilter = (specialty != null && !specialty.isEmpty()) || (query != null && !query.isEmpty());
        if (type == null || type.equalsIgnoreCase("Bác sĩ") || type.equalsIgnoreCase("Tất cả")) {
            List<Doctor> doctors = new ArrayList<>();
            if (specialty != null && !specialty.isEmpty()) {
                doctors = doctorRepository.findBySpecialty(specialty);
            } else if (query != null && !query.isEmpty()) {
                doctors = doctorRepository.findByGeneralSearch(query);
            } else if (!hasFilter) {
                doctors = doctorRepository.findAll();
            }
            
            for (Doctor doc : doctors) {
                SearchResultDTO dto = new SearchResultDTO();
                dto.setId(doc.getId());
                dto.setName(doc.getName());
                dto.setImage(doc.getImage());
                dto.setAddress(doc.getAddress());
                dto.setWorkplace(doc.getWorkplace());
                dto.setType("BACSI");

                // Xử lý chuyên khoa của Bác sĩ (Lấy từ trường String)
                String specStr = doc.getSpecialty();
                if (specStr != null && !specStr.isEmpty()) {
                    // Tách chuỗi "Tim mạch, Nhi khoa" thành List
                    dto.setSpecialty(Arrays.asList(specStr.split(",\\s*"))); 
                } else {
                    dto.setSpecialty(Collections.emptyList());
                }
                combinedResults.add(dto);
            }
        }

        // ================= 2. TÌM BỆNH VIỆN =================
        if (type == null || type.equalsIgnoreCase("Bệnh viện") || type.equalsIgnoreCase("Tất cả")) {
            List<Hospital> hospitals = new ArrayList<>();
            // ... (Logic query giữ nguyên) ...
            if (specialty != null && !specialty.isEmpty()) {
                hospitals = hospitalRepository.findBySpecialtyName(specialty);
            } else if (query != null && !query.isEmpty()) {
                hospitals = hospitalRepository.findByNameContainingIgnoreCase(query);
            } else if (!hasFilter) {
                hospitals = hospitalRepository.findAll();
            }

            for (Hospital hos : hospitals) {
                SearchResultDTO dto = new SearchResultDTO();
                dto.setId(Long.valueOf(hos.getId())); 
                dto.setName(hos.getName());
                dto.setImage(hos.getImage());
                dto.setAddress(hos.getAddress());
                dto.setWorkplace(null);
                dto.setType("BENHVIEN");

                // Xử lý chuyên khoa Bệnh viện (Lấy từ bảng liên kết @ManyToMany)
                Set<Specialty> specs = hos.getSpecialties();
                if (specs != null && !specs.isEmpty()) {
                    // Dùng Stream để lấy tên chuyên khoa và gom thành List<String>
                    List<String> specNames = specs.stream()
                                                  .map(Specialty::getName) // Giả sử model Specialty có hàm getName()
                                                  .collect(Collectors.toList());
                    dto.setSpecialty(specNames);
                } else {
                    dto.setSpecialty(Collections.emptyList());
                }
                combinedResults.add(dto);
            }
        }

        // ================= 3. TÌM PHÒNG KHÁM =================
        if (type == null || type.equalsIgnoreCase("Phòng khám") || type.equalsIgnoreCase("Tất cả")) {
            List<Clinic> clinics = new ArrayList<>();
            // ... (Logic query giữ nguyên) ...
            if (specialty != null && !specialty.isEmpty()) {
                clinics = clinicRepository.findBySpecialtyName(specialty);
            } else if (query != null && !query.isEmpty()) {
                clinics = clinicRepository.findByNameContainingIgnoreCase(query);
            } else if (!hasFilter) {
                clinics = clinicRepository.findAll();
            }

            for (Clinic clinic : clinics) {
                SearchResultDTO dto = new SearchResultDTO();
                dto.setId(Long.valueOf(clinic.getId()));
                dto.setName(clinic.getName());
                dto.setImage(clinic.getImage());
                dto.setAddress(clinic.getAddress());
                dto.setWorkplace(null);
                dto.setType("PHONGKHAM");

                // Xử lý chuyên khoa Phòng khám (Lấy từ bảng liên kết @ManyToMany)
                Set<Specialty> specs = clinic.getSpecialties();
                if (specs != null && !specs.isEmpty()) {
                    List<String> specNames = specs.stream()
                                                  .map(Specialty::getName)
                                                  .collect(Collectors.toList());
                    dto.setSpecialty(specNames);
                } else {
                    dto.setSpecialty(Collections.emptyList());
                }
                combinedResults.add(dto);
            }
        }
        
        // Phân trang thủ công trên List kết quả
        int totalSize = combinedResults.size();
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), totalSize);
        
        List<SearchResultDTO> pagedResults = new ArrayList<>();
        if (start < totalSize) {
             pagedResults = combinedResults.subList(start, end);
        }

        return new PageImpl<>(pagedResults, pageable, totalSize);
    }
}