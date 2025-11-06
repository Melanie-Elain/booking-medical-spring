package com.booking.medical_booking.controller.auth;

import com.booking.medical_booking.model.User;
import com.booking.medical_booking.service.auth.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return userService.registerUser(user);
    }

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody Map<String, String> request) {
        String phone = request.get("phoneNumber");
        String password = request.get("password");

        String token = userService.login(phone, password);

        return Map.of("token", token);
    }
}
