package com.booking.medical_booking.service.doctor; 

import com.booking.medical_booking.dto.DoctorRequestDTO; 
import com.booking.medical_booking.model.Doctor;
import com.booking.medical_booking.model.Specialty;
import com.booking.medical_booking.model.User;
import com.booking.medical_booking.repository.DoctorRepository;
import com.booking.medical_booking.repository.SpecialtyRepository;
import com.booking.medical_booking.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private SpecialtyRepository specialtyRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }
    
    // Dùng @Transactional để đảm bảo cả 2 thao tác (tạo user, tạo doctor) cùng thành công
    @Transactional
    public Doctor createDoctor(DoctorRequestDTO request) {
        
        // 1. Kiểm tra SĐT (là username)
        if (userRepository.findByPhoneNumber(request.getPhoneNumber()).isPresent()) {
            throw new RuntimeException("Số điện thoại đã tồn tại trong bảng users");
        }

        // 2. Tạo tài khoản User (cho bác sĩ đăng nhập)
        User newUser = new User();
        newUser.setPhoneNumber(request.getPhoneNumber());
        newUser.setPassword(passwordEncoder.encode(request.getPassword()));
        newUser.setFullName(request.getName()); // Tên bác sĩ là fullName
        newUser.setRole(User.UserRole.BACSI); // Gán vai trò Bác sĩ
        User savedUser = userRepository.save(newUser);

        // 3. Lấy danh sách Chuyên khoa (Specialty) từ DB
        Set<Specialty> specialties = new HashSet<>(
            specialtyRepository.findAllById(request.getSpecialtyIds())
        );

        // 4. Tạo hồ sơ Bác sĩ (Doctor)
        Doctor doctor = new Doctor();
        doctor.setUser(savedUser); // Liên kết với user vừa tạo
        doctor.setName(request.getName());
        doctor.setSpecialty(request.getSpecialty());
        doctor.setAddress(request.getAddress());
        doctor.setWorkplace(request.getWorkplace());
        doctor.setImage(request.getImage());
        doctor.setExperienceYear(request.getExperienceYear());
        doctor.setDescription(request.getDescription());
        doctor.setSpecialties(specialties); // Gán danh sách chuyên khoa
        
        return doctorRepository.save(doctor);
    }

    @Transactional
    public Doctor updateDoctor(Long id, DoctorRequestDTO request) {
        Doctor doctor = doctorRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Không tìm thấy Doctor ID: " + id));

        // Lấy danh sách Chuyên khoa (Specialty) mới
        Set<Specialty> specialties = new HashSet<>(
            specialtyRepository.findAllById(request.getSpecialtyIds())
        );
        
        // Cập nhật thông tin
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
        
        // Xóa Bác sĩ sẽ tự động xóa liên kết (nhờ @ManyToMany)
        doctorRepository.delete(doctor);
        
        // Xóa luôn tài khoản User liên kết
        if (doctor.getUser() != null) {
            userRepository.delete(doctor.getUser());
        }
    }
}