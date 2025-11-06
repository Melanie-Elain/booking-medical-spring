package com.booking.medical_booking.controller.auth;

// 1. Import DTOs (chỉ cần LoginRequest)
import com.booking.medical_booking.dto.LoginRequest;
// import com.booking.medical_booking.dto.LoginResponse; // BỎ import này
import com.booking.medical_booking.model.User;
import com.booking.medical_booking.service.auth.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map; // Đảm bảo đã import Map

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000") // Đã sửa thành an toàn hơn
public class AuthController {

    private final UserService userService;

    // Dùng Constructor Injection (an toàn hơn)
    @Autowired
    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user) {
        // Trả về ResponseEntity để kiểm soát status code (ví dụ 200 OK)
        return ResponseEntity.ok(userService.registerUser(user));
    }

    // === SỬA HÀM LOGIN TỪ ĐÂY ===
    @PostMapping("/login")
    // 1. Sửa kiểu trả về (từ LoginResponse -> Map)
    public ResponseEntity<Map<String, String>> login(@RequestBody LoginRequest loginRequest) {
        
        // 2. Gọi service, nó sẽ trả về Map
        Map<String, String> responseMap = userService.login(
            loginRequest.getPhoneNumber(), 
            loginRequest.getPassword()
        );

        // 3. Trả về Map đó. Frontend sẽ nhận được JSON là:
        // { "token": "...", "fullName": "..." }
        return ResponseEntity.ok(responseMap);
    }
    // === SỬA HÀM LOGIN TỚI ĐÂY ===
}