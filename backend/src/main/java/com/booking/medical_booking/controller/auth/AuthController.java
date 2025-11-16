package com.booking.medical_booking.controller.auth;

import com.booking.medical_booking.dto.LoginRequest; 
import com.booking.medical_booking.model.User;
import com.booking.medical_booking.service.auth.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map; 



@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final UserService userService;

    @Autowired
    public AuthController(UserService userService) {
        this.userService = userService;
    }

    // (Hàm register của bạn đã xử lý try-catch, rất tốt)
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        try {
            User newUser = userService.registerUser(user);
            return ResponseEntity.ok(newUser);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // === LỖI BIÊN DỊCH CỦA BẠN ĐÃ ĐƯỢC SỬA Ở ĐÂY ===
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody LoginRequest loginRequest) {
        
        // Sửa lại: Dùng getUsername()
        Map<String, String> responseMap = userService.login(
            loginRequest.getUsername(), // <-- ĐÃ SỬA
            loginRequest.getPassword()
        );

        return ResponseEntity.ok(responseMap);
    }

    @GetMapping("/check-exist")
    public ResponseEntity<Map<String, String>> checkExist(
            @RequestParam(name = "phoneNumber", required = false) String phoneNumber,
            @RequestParam(name = "email", required = false) String email) {
        
        Map<String, String> response = new HashMap<>();

        // Logic của bạn giữ nguyên
        if (phoneNumber != null && userService.isPhoneNumberExists(phoneNumber)) {
            response.put("error", "Số điện thoại đã tồn tại");
            return ResponseEntity.badRequest().body(response);
        }

        if (email != null && userService.isEmailExists(email)) {
            response.put("error", "Email đã tồn tại");
            return ResponseEntity.badRequest().body(response);
        }

        response.put("message", "OK");
        return ResponseEntity.ok(response);
    }
}