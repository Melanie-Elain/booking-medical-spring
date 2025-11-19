package com.booking.medical_booking.service.clinic;

import com.booking.medical_booking.dto.ClinicRequestDTO;
import com.booking.medical_booking.dto.ScheduleTimeDTO;
import com.booking.medical_booking.model.Clinic;
import com.booking.medical_booking.model.LichTong;
import com.booking.medical_booking.model.Specialty;
import com.booking.medical_booking.model.User;
import com.booking.medical_booking.repository.ClinicRepository;
import com.booking.medical_booking.repository.LichTongRepository;
import com.booking.medical_booking.repository.SpecialtyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Service
public class ClinicService {

    @Autowired
    private ClinicRepository clinicRepository;
    @Autowired
    private SpecialtyRepository specialtyRepository;
    @Autowired
    private LichTongRepository lichTongRepository;

    public Page<Clinic> getAllClinics(Pageable pageable) {
        return clinicRepository.findAll(pageable);
    }

    public List<Clinic> getAllClinicsList() {
        return clinicRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Clinic getClinicById(Integer id) {
        return clinicRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Không tìm thấy Clinic ID: " + id));
    }

    @Transactional(readOnly = true)
    public Clinic findByUserId(Long userId) {
        // Gọi repository (nhớ là repository phải có hàm findByUser_Id)
        return clinicRepository.findByUserId(userId) 
            .orElseThrow(() -> new RuntimeException("Không tìm thấy phòng khám với userId: " + userId));
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

    @Transactional(readOnly = true)
    public Map<String, List<ScheduleTimeDTO>> getClinicSchedules(Long clinicId) {
        
        List<LichTong> clinicSchedules = lichTongRepository.findSchedulesWithLichGiosByDoctor(
            User.UserRole.PHONGKHAM, 
            clinicId
        );
        
        if (clinicSchedules.isEmpty()) {
            return new LinkedHashMap<>();
        }
        
        Map<String, List<ScheduleTimeDTO>> formattedSchedules = new LinkedHashMap<>(); 
        
        for (LichTong lichTong : clinicSchedules) {
            String tenNgay = lichTong.getTenNgay(); 
            
            List<ScheduleTimeDTO> availableTimes = lichTong.getLichGios().stream()
                 .filter(lichGio -> "Available".equalsIgnoreCase(lichGio.getStatus())) 
                 .map(lichGio -> {
                     ScheduleTimeDTO dto = new ScheduleTimeDTO();
                     dto.setId(lichGio.getMaGio());     
                     dto.setTime(lichGio.getKhungGio()); 
                     return dto;
                 })
                 .collect(Collectors.toList());
                
            if (!availableTimes.isEmpty()) {
                formattedSchedules.put(tenNgay, availableTimes);
            }
        }

        return formattedSchedules;
    }

}