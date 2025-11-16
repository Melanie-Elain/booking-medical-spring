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
    
    // Giả định HospitalService và ClinicService có hàm getSpecification() tương tự DoctorService

    public Page<?> searchAllEntities(SearchRequestDTO request, Pageable pageable) {
        
        List<Object> combinedResults = new ArrayList<>();
        
        String type = request.getType();
        String specialty = request.getSpecialty();
        String query = request.getQuery();
        
        // --- 1. Tìm kiếm Bác sĩ (Bảng bacsi) ---
        if (type == null || type.equalsIgnoreCase("Bác sĩ") || type.equalsIgnoreCase("Tất cả")) {
            if (query != null && !query.isEmpty()) {
                // Tìm kiếm chung (tên, chuyên khoa, nơi làm việc)
                combinedResults.addAll(doctorRepository.findByGeneralSearch(query));
            } else if (specialty != null && !specialty.isEmpty()) {
                // ✅ SỬA LỖI: Gọi đúng hàm findBySpecialty(String)
                combinedResults.addAll(doctorRepository.findBySpecialty(specialty)); 
            }
        }

        // --- 2. Tìm kiếm Bệnh viện (Bảng benhvien) ---
        if (type == null || type.equalsIgnoreCase("Bệnh viện") || type.equalsIgnoreCase("Tất cả")) {
            if (query != null && !query.isEmpty()) {
                // Tìm theo tên
                combinedResults.addAll(hospitalRepository.findByNameContainingIgnoreCase(query));
            } else if (specialty != null && !specialty.isEmpty()) {
                // Lọc theo chuyên khoa (dùng JPQL JOIN)
                combinedResults.addAll(hospitalRepository.findBySpecialtyName(specialty));
            }
        }

        // --- 3. Tìm kiếm Phòng khám (Bảng phongkham) ---
        if (type == null || type.equalsIgnoreCase("Phòng khám") || type.equalsIgnoreCase("Tất cả")) {
            if (query != null && !query.isEmpty()) {
                // Tìm theo tên
                combinedResults.addAll(clinicRepository.findByNameContainingIgnoreCase(query));
            } else if (specialty != null && !specialty.isEmpty()) {
                // Lọc theo chuyên khoa (dùng JPQL JOIN)
                combinedResults.addAll(clinicRepository.findBySpecialtyName(specialty));
            }
        }
        
        // --- 4. Xử lý Phân trang (Thủ công) ---
        
        // Sắp xếp (Nếu cần)
        // combinedResults.sort(Comparator.comparing(item -> ...)); 
        
        int totalSize = combinedResults.size();
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), totalSize);
        
        List<?> pagedResults = List.of();
        if (start < totalSize) {
             pagedResults = combinedResults.subList(start, end);
        }

        // Trả về PageImpl để Frontend nhận được cấu trúc phân trang chuẩn
        return new PageImpl<>(pagedResults, pageable, totalSize);
    }
}