

package com.booking.medical_booking.service.doctor; 

import com.booking.medical_booking.dto.DoctorRequestDTO;
import com.booking.medical_booking.dto.ScheduleTimeDTO;
import com.booking.medical_booking.model.Doctor;

import com.booking.medical_booking.model.LichTong;
import com.booking.medical_booking.model.Specialty;
import com.booking.medical_booking.model.User;
import com.booking.medical_booking.repository.DoctorRepository;
import com.booking.medical_booking.repository.LichTongRepository;
import com.booking.medical_booking.repository.SpecialtyRepository;
import com.booking.medical_booking.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
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
public class DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private SpecialtyRepository specialtyRepository;
    @Autowired
    private LichTongRepository lichTongRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public Page<Doctor> getAllDoctors(Pageable pageable) {
        return doctorRepository.findAll(pageable);
    }

    public List<Doctor> getAllDoctorsList() {
        return doctorRepository.findAll();
    }


    @Transactional
    public Doctor getDoctorById(Long id) {
        return doctorRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Không tìm thấy Doctor ID: " + id));
    }
    
    @Transactional
    public Doctor createDoctor(DoctorRequestDTO request) {
        
        if (userRepository.existsByPhoneNumber(request.getPhoneNumber())) {
            throw new RuntimeException("Số điện thoại đã tồn tại trong bảng users");
        }
        
        // (Kiểm tra email)
        if (request.getEmail() != null && !request.getEmail().isEmpty()) {
            if (userRepository.existsByEmail(request.getEmail())) {
                throw new RuntimeException("Email này đã tồn tại trong bảng users");
            }
        }

        // 2. Tạo tài khoản User
        User newUser = new User();
        newUser.setPhoneNumber(request.getPhoneNumber());
        newUser.setPassword(passwordEncoder.encode(request.getPassword()));
        newUser.setFullName(request.getName()); 
        newUser.setEmail(request.getEmail()); // <-- Giờ hàm này đã hợp lệ
        newUser.setRole(User.UserRole.BACSI); 
        User savedUser = userRepository.save(newUser);

        // 3. Lấy danh sách Chuyên khoa
        Set<Specialty> specialties = new HashSet<>(
            specialtyRepository.findAllById(request.getSpecialtyIds())
        );

        // 4. Tạo hồ sơ Bác sĩ
        Doctor doctor = new Doctor();
        doctor.setUser(savedUser); 
        doctor.setName(request.getName());
        doctor.setSpecialty(request.getSpecialty());
        doctor.setAddress(request.getAddress());
        doctor.setWorkplace(request.getWorkplace());
        doctor.setImage(request.getImage());
        doctor.setExperienceYear(request.getExperienceYear());
        doctor.setDescription(request.getDescription());
        doctor.setSpecialties(specialties); 
        
        return doctorRepository.save(doctor);
    }

    @Transactional
    public Doctor updateDoctor(Long id, DoctorRequestDTO request) {
        Doctor doctor = doctorRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Không tìm thấy Doctor ID: " + id));

        Set<Specialty> specialties = new HashSet<>(
            specialtyRepository.findAllById(request.getSpecialtyIds())
        );
        
        doctor.setName(request.getName());
        doctor.setSpecialty(request.getSpecialty());
        doctor.setAddress(request.getAddress());
        doctor.setWorkplace(request.getWorkplace());
        doctor.setImage(request.getImage());
        doctor.setExperienceYear(request.getExperienceYear());
        doctor.setDescription(request.getDescription());
        doctor.setSpecialties(specialties);
        
        return doctorRepository.save(doctor);
    }

    @Transactional
    public void deleteDoctor(Long id) {
        Doctor doctor = doctorRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Không tìm thấy Doctor ID: " + id));
        
        doctorRepository.delete(doctor);
        
        if (doctor.getUser() != null) {
            userRepository.delete(doctor.getUser());
        }
    }

    @Transactional(readOnly = true)
    public Map<String, List<ScheduleTimeDTO>> getDoctorSchedules(Long id) {
        
        // Giả định dùng Repository JPQL JOIN FETCH đã được sửa (findSchedulesWithLichGiosByDoctor)
        List<LichTong> doctorSchedules = lichTongRepository.findSchedulesWithLichGiosByDoctor(
            User.UserRole.BACSI, 
            id
        );
        
        // Khai báo Map
        Map<String, List<ScheduleTimeDTO>> formattedSchedules = new LinkedHashMap<>(); 
        
        for (LichTong lichTong : doctorSchedules) {
            String tenNgay = lichTong.getTenNgay(); 
            
            List<ScheduleTimeDTO> availableTimes = lichTong.getLichGios().stream()
                .filter(lichGio -> "Available".equalsIgnoreCase(lichGio.getStatus())) 
                .map(lichGio -> {
                    
                    ScheduleTimeDTO schedulesTimeDTO = new ScheduleTimeDTO(); 

                    schedulesTimeDTO.setId(lichGio.getMaGio());
                    schedulesTimeDTO.setTime(lichGio.getKhungGio());
                    
                    return schedulesTimeDTO;
                })
                .collect(Collectors.toList());
                
            if (!availableTimes.isEmpty()) {
                formattedSchedules.put(tenNgay, availableTimes);
            }
        }

        return formattedSchedules;
    }
    // @Transactional
    // public List<Doctor> getDoctorsBySpecialtyId(Long specialtyId) {
    //     Specialty specialty = specialtyRepository.(specialtyId)
    //         .orElseThrow(() -> new RuntimeException("Không tìm thấy Specialty ID: " + specialtyId));
        
    //     return doctorRepository.findBySpecialtiesContaining(specialty);
    // }

    // @Transactional
    // public List<Doctor> searchDoctorsByName(String name) {
    //     return doctorRepository.findByNameContainingIgnoreCase(name);
    // }

    // @Transactional
    // public Doctor getDoctorSchedules (Long id) {
    //     return doctorRepository.findByIdWithSchedules(id)
    //         .orElseThrow(() -> new RuntimeException("Không tìm thấy Doctor ID: " + id));
    // }
}