package com.booking.medical_booking.controller.auth; // (Sửa package cho đúng)

import com.booking.medical_booking.dto.ChangePasswordRequest;
import com.booking.medical_booking.dto.UpdateProfileRequest;
import com.booking.medical_booking.model.User;
import com.booking.medical_booking.service.auth.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user") // API gốc cho user
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserService userService;

    /**
     * API Lấy thông tin user hiện tại (cho trang Hồ sơ và Tài khoản)
     * Frontend sẽ gọi: GET /api/user/me
     */
    @GetMapping("/me")
    public ResponseEntity<User> getMyProfile() {
        User user = userService.getCurrentUser();
        return ResponseEntity.ok(user);
    }

    /**
     * API Đổi mật khẩu (cho trang Tài khoản)
     * Frontend sẽ gọi: POST /api/user/change-password
     */
    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordRequest request) {
        try {
            userService.changePassword(request);
            return ResponseEntity.ok("Đổi mật khẩu thành công");
        } catch (RuntimeException e) {
            // Bắt lỗi (ví dụ: "Mật khẩu cũ không chính xác")
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    /**
     * API Cập nhật hồ sơ (cho trang Hồ sơ)
     * Frontend sẽ gọi: PUT /api/user/profile
     */
    @PutMapping("/profile")
    public ResponseEntity<User> updateMyProfile(@RequestBody UpdateProfileRequest request) {
        User updatedUser = userService.updateProfile(request);
        return ResponseEntity.ok(updatedUser);
    }
}