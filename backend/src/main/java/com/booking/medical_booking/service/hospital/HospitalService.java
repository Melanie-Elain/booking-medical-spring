package com.booking.medical_booking.service.hospital;

import com.booking.medical_booking.dto.HospitalRequestDTO;
import com.booking.medical_booking.dto.ScheduleTimeDTO;
import com.booking.medical_booking.model.Hospital;
import com.booking.medical_booking.model.LichTong;
import com.booking.medical_booking.model.Specialty;
import com.booking.medical_booking.model.User;
import com.booking.medical_booking.repository.HospitalRepository;
import com.booking.medical_booking.repository.LichTongRepository;
import com.booking.medical_booking.repository.SpecialtyRepository;
import com.booking.medical_booking.repository.UserRepository;

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
public class HospitalService {

    @Autowired
    private HospitalRepository hospitalRepository;
    @Autowired
    private SpecialtyRepository specialtyRepository;
    @Autowired
    private LichTongRepository lichTongRepository;
    @Autowired
    private UserRepository userRepository;

    public Page<Hospital> getAllHospitals(Pageable pageable) {
        return hospitalRepository.findAll(pageable);
    }

    public List<Hospital> getAllHospitalsList() {
        return hospitalRepository.findAll();
    }

    @Transactional(readOnly = true) // Thêm @Transactional
        public Hospital getHospitalById(Integer id) {
        return hospitalRepository.findById(id) // findById này đã được thêm @EntityGraph
        .orElseThrow(() -> new RuntimeException("Không tìm thấy Hospital ID: " + id));
        }

    // === HÀM MỚI QUAN TRỌNG (ĐỂ LẤY ID) ===
    @Transactional(readOnly = true)
    public Hospital findByUserId(Long userId) {
        return hospitalRepository.findByUserId(userId) // Phải khớp với Repository
            .orElseThrow(() -> new RuntimeException("Không tìm thấy bệnh viện với userId: " + userId));
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

    public Set<Specialty> getHospitalSpecialties(Integer hospitalId) {
        List<Hospital> results= hospitalRepository.findByIdWithSpecialties(hospitalId);
        return results.get(0).getSpecialties();
    }

    @Transactional(readOnly = true)
    public Map<String, List<ScheduleTimeDTO>> getHospitalSchedules(Long hospitalId) {
        
        List<LichTong> hospitalSchedules = lichTongRepository.findSchedulesWithLichGiosByDoctor(
            User.UserRole.BENHVIEN, 
            hospitalId
        );
        
        if (hospitalSchedules.isEmpty()) {
            return new LinkedHashMap<>();
        }
        
        Map<String, List<ScheduleTimeDTO>> formattedSchedules = new LinkedHashMap<>(); 
        
        for (LichTong lichTong : hospitalSchedules) {
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