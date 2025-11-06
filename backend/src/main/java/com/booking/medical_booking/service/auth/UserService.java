package com.booking.medical_booking.service.auth;

import com.booking.medical_booking.model.User;
import com.booking.medical_booking.repository.UserRepository;
import com.booking.medical_booking.security.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
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
        // Cải tiến bảo mật: Dùng chung 1 thông báo lỗi
        throw new RuntimeException("Sai số điện thoại hoặc mật khẩu");
    }

    // 2. Tạo biến token (để dùng ở dưới)
    String token = jwtService.generateToken(user.getPhoneNumber());

    // 3. Chỉ return Map (code mới)
    return Map.of(
        "token", token,
        "fullName", user.getFullName()
    );
    }
}
