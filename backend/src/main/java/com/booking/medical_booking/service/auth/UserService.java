package com.booking.medical_booking.service.auth;

import com.booking.medical_booking.dto.ChangePasswordRequest;
import com.booking.medical_booking.dto.UpdateProfileRequest;
import com.booking.medical_booking.dto.UserRequestDTO;
import com.booking.medical_booking.model.User;
import com.booking.medical_booking.repository.UserRepository;
import com.booking.medical_booking.security.JwtService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public User registerUser(User user) {
        if (userRepository.existsByPhoneNumber(user.getPhoneNumber())) {
            throw new RuntimeException("Số điện thoại đã tồn tại");
        }
        if (user.getEmail() != null && !user.getEmail().isEmpty()) {
            if (userRepository.existsByEmail(user.getEmail())) {
                throw new RuntimeException("Email đã tồn tại");
            }
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        if (user.getRole() == null) {
            user.setRole(User.UserRole.BENHNHAN);
        }
        return userRepository.save(user);
    }

    public Map<String, String> login(String username, String password) {
        User user = userRepository.findByPhoneNumberOrEmail(username, username)
                .orElseThrow(() -> new UsernameNotFoundException("Sai tên đăng nhập hoặc mật khẩu"));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Sai tên đăng nhập hoặc mật khẩu");
        }
        String token = jwtService.generateToken(user.getPhoneNumber());
        return Map.of(
            "token", token,
            "fullName", user.getFullName(),
            "role", user.getRole().name()
        );
    }

    public User getCurrentUser() {
        String phoneNumber = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByPhoneNumberOrEmail(phoneNumber, phoneNumber)
                .orElseThrow(() -> new UsernameNotFoundException("Không tìm thấy user với SĐT: " + phoneNumber));
    }

    // === ĐỔI MẬT KHẨU ===
    public void changePassword(ChangePasswordRequest request) {
        User currentUser = getCurrentUser();
        if (!passwordEncoder.matches(request.getOldPassword(), currentUser.getPassword())) {
            throw new RuntimeException("Mật khẩu cũ không chính xác");
        }
        currentUser.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(currentUser);
    }
    
    // === CẬP NHẬT HỒ SƠ ===
    @Transactional // Thêm @Transactional ở đây cũng tốt
    public User updateProfile(UpdateProfileRequest request) {
        User currentUser = getCurrentUser();
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
        return userRepository.save(currentUser); // save() vẫn cần thiết để trả về User đã cập nhật
    }

    // === CẬP NHẬT ẢNH ĐẠI DIỆN (AVATAR) ===
    @Transactional
    public void updateAvatar(String avatarUrl) {
        User currentUser = getCurrentUser();
        currentUser.setAvatarUrl(avatarUrl);
        userRepository.save(currentUser); // Cứ để .save() cho chắc chắn
    }

    // === ADMIN TẠO USER ===
    @Transactional
    public User adminCreateUser(UserRequestDTO request) {
        if (request.getPhoneNumber() == null || request.getPhoneNumber().isEmpty()) {
            throw new RuntimeException("Số điện thoại là bắt buộc");
        }
        if (request.getPassword() == null || request.getPassword().isEmpty()) {
            throw new RuntimeException("Mật khẩu là bắt buộc");
        }
        if (userRepository.existsByPhoneNumber(request.getPhoneNumber())) {
            throw new RuntimeException("Số điện thoại đã tồn tại");
        }
        if (request.getEmail() != null && !request.getEmail().isEmpty()) {
            if (userRepository.existsByEmail(request.getEmail())) {
                throw new RuntimeException("Email đã tồn tại");
            }
        }
        
        User newUser = new User();
        newUser.setFullName(request.getFullName());
        newUser.setPhoneNumber(request.getPhoneNumber());
        newUser.setPassword(passwordEncoder.encode(request.getPassword()));
        newUser.setEmail(request.getEmail());
        newUser.setRole(request.getRole()); 
        
        return userRepository.save(newUser);
    }

    // === ADMIN CẬP NHẬT USER ===
    @Transactional
    public User adminUpdateUser(Long userId, UserRequestDTO request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy User ID: " + userId));

        if (!user.getPhoneNumber().equals(request.getPhoneNumber())) {
            if (userRepository.existsByPhoneNumber(request.getPhoneNumber())) {
                throw new RuntimeException("Số điện thoại này đã được sử dụng");
            }
            user.setPhoneNumber(request.getPhoneNumber());
        }

        if (request.getEmail() != null && !request.getEmail().isEmpty()) {
            if (user.getEmail() == null || !user.getEmail().equals(request.getEmail())) {
                if (userRepository.existsByEmail(request.getEmail())) {
                    throw new RuntimeException("Email này đã được sử dụng");
                }
                user.setEmail(request.getEmail());
            }
        } else {
            user.setEmail(null); // Cho phép xóa email
        }
        
        user.setFullName(request.getFullName());
        user.setRole(request.getRole());

        return userRepository.save(user);
    }
    
    // === ADMIN XÓA USER ===
    public void deleteUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy User ID: " + userId));
        
        userRepository.delete(user);
    }

    // === HÀM MỚI CHO PHÂN TRANG ===
    public Page<User> adminGetAllUsers(Pageable pageable) {
        return userRepository.findAll(pageable);
    }
}



