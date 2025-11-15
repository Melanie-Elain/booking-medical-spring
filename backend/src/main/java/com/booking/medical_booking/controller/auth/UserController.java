package com.booking.medical_booking.controller.auth; // (Sửa package cho đúng)

import com.booking.medical_booking.dto.ChangePasswordRequest;
import com.booking.medical_booking.dto.UpdateProfileRequest;
import com.booking.medical_booking.model.User;
import com.booking.medical_booking.service.auth.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.booking.medical_booking.dto.AppointmentResponseDTO; 
import com.booking.medical_booking.dto.AvatarUpdateDto;
import com.booking.medical_booking.service.appointment.AppointmentService; 
import org.springframework.data.domain.Page; 
import org.springframework.data.domain.PageRequest; 
import org.springframework.data.domain.Pageable; 


@RestController
@RequestMapping("/api/user") // API gốc cho user
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private AppointmentService appointmentService;

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
    
    // === 2. API  CHO LỊCH KHÁM CÁ NHÂN ===
    @GetMapping("/appointments")
    public ResponseEntity<Page<AppointmentResponseDTO>> getMyAppointments(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            // 1. Thêm tham số keyword (không bắt buộc)
            @RequestParam(required = false) String keyword 
    ) {
        Pageable pageable = PageRequest.of(page, size);
        // 2. Truyền keyword vào service
        Page<AppointmentResponseDTO> appointmentPage = appointmentService.getMyAppointments(pageable, keyword);
        return ResponseEntity.ok(appointmentPage);
    }

    @PutMapping("/update-avatar")
    public ResponseEntity<?> updateAvatar(@RequestBody AvatarUpdateDto dto) {
        // Gọi service để tìm user đang đăng nhập
        // và set avatarUrl mới cho user đó
        userService.updateAvatar(dto.getAvatarUrl());
        return ResponseEntity.ok("Cập nhật ảnh đại diện thành công!");
    }
}