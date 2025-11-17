package com.booking.medical_booking.service.auth;

import com.booking.medical_booking.dto.LoginResponse;
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
import org.springframework.security.authentication.AuthenticationManager; 
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken; 
import org.springframework.security.core.Authentication;

import java.util.HashMap;
import java.util.Map;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Autowired
    public UserService(UserRepository userRepository, 
                       PasswordEncoder passwordEncoder, 
                       JwtService jwtService,
                       AuthenticationManager authenticationManager) { // << THÊM VÀO
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager; // << THÊM VÀO
    }


    // Kiểm tra số điện thoại đã tồn tại hay chưa
    public boolean isPhoneNumberExists(String phoneNumber) {
        return userRepository.existsByPhoneNumber(phoneNumber);
    }

    // Kiểm tra email đã tồn tại hay chưa
    public boolean isEmailExists(String email) {
        if (email == null || email.isEmpty()) return false;
        return userRepository.existsByEmail(email);
    }

    // === ĐĂNG KÝ USER MỚI ===
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

    // === ĐĂNG NHẬP VÀ TRẢ VỀ TOKEN + THÔNG TIN USER ===
    public LoginResponse login(String username, String password) {
        
        // 1. Dùng AuthenticationManager để xác thực.
        // Nó sẽ TỰ ĐỘNG gọi UserDetailsServiceImpl của bạn
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(username, password)
        );

        // 2. Nếu không có lỗi, tức là đăng nhập thành công.
        // Lấy đối tượng UserDetailsImpl (đã tạo ở Bước 1)
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        // 3. Lấy ra User đầy đủ từ UserDetailsImpl
        User user = userDetails.getUser();

        // 4. Lấy danh sách Role (dạng "ROLE_BENHNHAN")
        List<String> roles = userDetails.getAuthorities().stream()
                                .map(item -> item.getAuthority())
                                .collect(Collectors.toList());

        // 5. Tạo token
        // String token = jwtService.generateToken(
        //     user.getPhoneNumber(),
        //     roles  // gửi role vào token
        // );
        String token = jwtService.generateToken(user.getPhoneNumber());


        // 6. Trả về LoginResponse đầy đủ
        return new LoginResponse(
            token,
            user.getId(),
            user.getPhoneNumber(), // Hoặc user.getFullName() tùy bạn
            user.getEmail(),
            user.getFullName(),
            roles
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
    @Transactional
    public Map<String, Object> updateProfile(UpdateProfileRequest request) {
        Map<String, Object> response = new HashMap<>();
        try {
            User currentUser = getCurrentUser();
            String newToken = null;

            // ==== Kiểm tra SĐT ====
            if (request.getPhoneNumber() != null && !request.getPhoneNumber().isEmpty()
                    && !currentUser.getPhoneNumber().equals(request.getPhoneNumber())) {
                if (userRepository.existsByPhoneNumber(request.getPhoneNumber())) {
                    response.put("error", "Số điện thoại này đã được sử dụng");
                    return response;
                }
                currentUser.setPhoneNumber(request.getPhoneNumber());
                newToken = jwtService.generateToken(currentUser.getPhoneNumber());
            }

            // ==== Kiểm tra email ====
            if (request.getEmail() != null && !request.getEmail().isEmpty()) {
                if (currentUser.getEmail() == null || !currentUser.getEmail().equals(request.getEmail())) {
                    if (userRepository.existsByEmail(request.getEmail())) {
                        response.put("error", "Email này đã được sử dụng");
                        return response;
                    }
                    currentUser.setEmail(request.getEmail());
                }
            } else {
                currentUser.setEmail(null);
            }

            // ==== Cập nhật các field khác ====
            currentUser.setFullName(request.getFullName());
            currentUser.setDob(request.getDob());
            currentUser.setIdCard(request.getIdCard());
            currentUser.setGender(request.getGender());
            currentUser.setEthnicity(request.getEthnicity());
            currentUser.setHealthInsurance(request.getHealthInsurance());
            currentUser.setProvince(request.getProvince());
            currentUser.setDistrict(request.getDistrict());
            currentUser.setWard(request.getWard());
            currentUser.setAddress(request.getAddress());
            currentUser.setOccupation(request.getOccupation());

            User updatedUser = userRepository.save(currentUser);

            response.put("user", updatedUser);
            if (newToken != null) {
                response.put("token", newToken);
            }

        } catch (Exception ex) {
            response.put("error", ex.getMessage() != null ? ex.getMessage() : "Cập nhật thất bại");
        }

        return response;
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



