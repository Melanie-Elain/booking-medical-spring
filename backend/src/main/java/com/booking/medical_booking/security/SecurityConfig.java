// package com.booking.medical_booking.security;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.security.authentication.AuthenticationManager;
// import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.security.web.SecurityFilterChain;
// import org.springframework.web.cors.CorsConfiguration;
// import com.booking.medical_booking.security.JwtAuthFilter; 
// import org.springframework.security.core.userdetails.UserDetailsService; 

// import java.util.List; // <-- Thêm import

// @Configuration
// public class SecurityConfig {

//     @Autowired
//     private JwtAuthFilter jwtAuthFilter; // 1. Tiêm filter

//     @Autowired
//     private UserDetailsService userDetailsService; // 2. Tiêm UserDetailsService

//     @Bean
//     public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//         http
//             // 1. THÊM CẤU HÌNH CORS VÀO ĐÂY
//             .cors(cors -> cors.configurationSource(request -> {
//                 var corsConfig = new CorsConfiguration();
//                 corsConfig.setAllowedOrigins(List.of("http://localhost:3000")); // Cho phép React
//                 corsConfig.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
//                 corsConfig.setAllowedHeaders(List.of("*"));
//                 corsConfig.setAllowCredentials(true);
//                 return corsConfig;
//             }))
            
//             // 2. TẮT CSRF (bạn đã làm đúng)
//             .csrf(csrf -> csrf.disable()) 
            
//             // 3. PHÂN QUYỀN
//             .authorizeHttpRequests(auth -> auth
//                 // 4. SỬA LẠI ĐÚNG ĐƯỜNG DẪN API ĐĂNG KÝ
//                .requestMatchers("/api/auth/register").permitAll()
//                .requestMatchers("/api/auth/login").permitAll()
//                 // Cho phép API đăng ký
//                 // Cho phép tất cả các request "OPTIONS" (quan trọng cho CORS)
//                 .requestMatchers(org.springframework.http.HttpMethod.OPTIONS, "/**").permitAll()
//                 .anyRequest().authenticated()
//             // .anyRequest().permitAll()
//             );

//         return http.build();
//     }

//     // Mã hóa mật khẩu
//     @Bean
//     public PasswordEncoder passwordEncoder() {
//         return new BCryptPasswordEncoder();
//     }

//     // Cấu hình AuthenticationManager (nếu cần sau này)
//     @Bean
//     public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
//         return configuration.getAuthenticationManager();
//     }
// }

package com.booking.medical_booking.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter; // <-- Import
import org.springframework.web.cors.CorsConfiguration;
import com.booking.medical_booking.security.JwtAuthFilter; 
import org.springframework.security.core.userdetails.UserDetailsService; 

import java.util.List;

@Configuration
public class SecurityConfig {

    @Autowired
    private JwtAuthFilter jwtAuthFilter; // 1. Tiêm filter

    @Autowired
    private UserDetailsService userDetailsService; // 2. Tiêm UserDetailsService

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // 1. CẤU HÌNH CORS
            .cors(cors -> cors.configurationSource(request -> {
                var corsConfig = new CorsConfiguration();
                corsConfig.setAllowedOrigins(List.of("http://localhost:3000")); // Cho phép React
                corsConfig.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
                corsConfig.setAllowedHeaders(List.of("*"));
                corsConfig.setAllowCredentials(true);
                return corsConfig;
            }))
            
            // 2. TẮT CSRF
            .csrf(csrf -> csrf.disable()) 
            
            // 3. PHÂN QUYỀN
            .authorizeHttpRequests(auth -> auth
                // Gộp /register và /login thành /api/auth/**
                .requestMatchers("/api/auth/**").permitAll()
                // Cho phép tất cả các request "OPTIONS" (quan trọng cho CORS)
                .requestMatchers(org.springframework.http.HttpMethod.OPTIONS, "/**").permitAll()
                // Bất kỳ request nào khác đều phải xác thực (ví dụ: /api/v1/appointments)
                .anyRequest().authenticated()
            )

            // 4. BÁO SPRING DÙNG UserDetailsService CỦA BẠN (ĐANG THIẾU)
            .userDetailsService(userDetailsService)
            
            // 5. LẮP JWT FILTER VÀO (ĐANG THIẾU)
            // Thêm filter JWT vào TRƯỚC filter UsernamePassword
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    // Mã hóa mật khẩu
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // Cấu hình AuthenticationManager
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }
}