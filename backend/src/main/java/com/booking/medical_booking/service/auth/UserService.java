package com.booking.medical_booking.service.auth;

import com.booking.medical_booking.dto.ChangePasswordRequest;
import com.booking.medical_booking.dto.UpdateProfileRequest;
import com.booking.medical_booking.dto.UserRequestDTO;

import com.booking.medical_booking.model.User;
import com.booking.medical_booking.repository.UserRepository;
import com.booking.medical_booking.security.JwtService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Map;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    public User registerUser(User user) {
        // Kiểm tra trùng số điện thoại
        if (userRepository.findByPhoneNumber(user.getPhoneNumber()).isPresent()) {
            throw new RuntimeException("Số điện thoại đã tồn tại");
        }

        // Mã hóa mật khẩu trước khi lưu
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        return userRepository.save(user);
    }

public Map<String, String> login(String phone, String password) {
    Optional<User> userOpt = userRepository.findByPhoneNumber(phone);

    if (userOpt.isEmpty()) {
        throw new RuntimeException("Sai số điện thoại hoặc mật khẩu");
    }

    User user = userOpt.get();

    if (!passwordEncoder.matches(password, user.getPassword())) {
        throw new RuntimeException("Sai số điện thoại hoặc mật khẩu");
    }

    
    String token = jwtService.generateToken(user.getPhoneNumber());

    
    return Map.of(
            "token", token,
            "fullName", user.getFullName(),
            "role", user.getRole().name() 
        );
    }

    public User getCurrentUser() {
        // Lấy SĐT (username) từ SecurityContext (do JwtAuthFilter đưa vào)
        String phoneNumber = SecurityContextHolder.getContext().getAuthentication().getName();
        
        return userRepository.findByPhoneNumber(phoneNumber)
            .orElseThrow(() -> new UsernameNotFoundException("Không tìm thấy user với SĐT: " + phoneNumber));
    }

    // ĐỔI MẬT KHẨU ===
    public void changePassword(ChangePasswordRequest request) {
        // Lấy user hiện tại
        User currentUser = getCurrentUser();

        // 1. Kiểm tra mật khẩu cũ có đúng không
        if (!passwordEncoder.matches(request.getOldPassword(), currentUser.getPassword())) {
            throw new RuntimeException("Mật khẩu cũ không chính xác");
        }

        // 2. Mã hóa và lưu mật khẩu mới
        currentUser.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(currentUser);
    }
    // === CẬP NHẬT HỒ SƠ ===
    public User updateProfile(UpdateProfileRequest request) {
        // Lấy user hiện tại
        User currentUser = getCurrentUser();

        // Cập nhật các trường
        currentUser.setFullName(request.getFullName());
        currentUser.setDob(request.getDob());
        currentUser.setIdCard(request.getIdCard());
        currentUser.setGender(request.getGender());
        currentUser.setEmail(request.getEmail());
        currentUser.setEthnicity(request.getEthnicity());
        currentUser.setHealthInsurance(request.getHealthInsurance());
        currentUser.setProvince(request.getProvince());
        currentUser.setDistrict(request.getDistrict());
        currentUser.setWard(request.getWard());
        currentUser.setAddress(request.getAddress());
        currentUser.setOccupation(request.getOccupation());

        // Lưu lại vào database
        return userRepository.save(currentUser);
    }

    // ===  ADMIN TẠO USER ===
    public User adminCreateUser(UserRequestDTO request) {
        // Kiểm tra SĐT trùng
        if (userRepository.findByPhoneNumber(request.getPhoneNumber()).isPresent()) {
            throw new RuntimeException("Số điện thoại đã tồn tại");
        }
        
        User newUser = new User();
        newUser.setFullName(request.getFullName());
        newUser.setPhoneNumber(request.getPhoneNumber());
        // Mã hóa mật khẩu khi Admin tạo
        newUser.setPassword(passwordEncoder.encode(request.getPassword()));
        newUser.setEmail(request.getEmail());
        newUser.setRole(request.getRole()); // Gán Role
        
        return userRepository.save(newUser);
    }

    // ===  ADMIN CẬP NHẬT USER ===
    public User adminUpdateUser(Long userId, UserRequestDTO request) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("Không tìm thấy User ID: " + userId));

        // Cập nhật thông tin (trừ mật khẩu và SĐT)
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setRole(request.getRole());
        // (Bạn có thể thêm logic cho phép đổi SĐT nếu muốn)

        return userRepository.save(user);
    }
    
    // ===  ADMIN XÓA USER ===
    public void deleteUser(Long userId) {
        // (Nâng cao: Bạn nên kiểm tra xem Admin có tự xóa mình không)
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("Không tìm thấy User ID: " + userId));
        
        userRepository.delete(user);
    }

}
