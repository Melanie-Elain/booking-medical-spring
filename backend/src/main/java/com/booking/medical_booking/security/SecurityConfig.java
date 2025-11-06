package com.booking.medical_booking.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration; // <-- Thêm import

import java.util.List; // <-- Thêm import

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // 1. THÊM CẤU HÌNH CORS VÀO ĐÂY
            .cors(cors -> cors.configurationSource(request -> {
                var corsConfig = new CorsConfiguration();
                corsConfig.setAllowedOrigins(List.of("http://localhost:3000")); // Cho phép React
                corsConfig.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
                corsConfig.setAllowedHeaders(List.of("*"));
                corsConfig.setAllowCredentials(true);
                return corsConfig;
            }))
            
            // 2. TẮT CSRF (bạn đã làm đúng)
            .csrf(csrf -> csrf.disable()) 
            
            // 3. PHÂN QUYỀN
            .authorizeHttpRequests(auth -> auth
            //     // 4. SỬA LẠI ĐÚNG ĐƯỜNG DẪN API ĐĂNG KÝ
            //    .requestMatchers("/api/auth/register").permitAll() // Cho phép API đăng ký
            //     // Cho phép tất cả các request "OPTIONS" (quan trọng cho CORS)
            //     .requestMatchers(org.springframework.http.HttpMethod.OPTIONS, "/**").permitAll()
            //     .anyRequest().authenticated()
            .anyRequest().permitAll()
            );

        return http.build();
    }

    // Mã hóa mật khẩu
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // Cấu hình AuthenticationManager (nếu cần sau này)
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }
}