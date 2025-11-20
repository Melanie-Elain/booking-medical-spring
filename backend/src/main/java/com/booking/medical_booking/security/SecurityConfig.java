package com.booking.medical_booking.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter; 
import org.springframework.web.cors.CorsConfiguration;
import com.booking.medical_booking.security.JwtAuthFilter;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    @Autowired
    private JwtAuthFilter jwtAuthFilter;

    @Autowired
    private UserDetailsService userDetailsService;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
        // 1. CẤU HÌNH CORS
            .cors(cors -> cors.configurationSource(request -> {
                var corsConfig = new CorsConfiguration();
                corsConfig.setAllowedOrigins(List.of(
                    "http://localhost:3000",
                    "https://booking-medical-spring.vercel.app"
                ));
                corsConfig.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
                corsConfig.setAllowedHeaders(List.of("*"));
                corsConfig.setAllowCredentials(true);
                return corsConfig;
            }))

            // 2. TẮT CSRF
            .csrf(csrf -> csrf.disable())

            // 3. PHÂN QUYỀN
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/api/doctors/**").permitAll()
                .requestMatchers("/api/hospitals/**").permitAll()
                .requestMatchers("/api/clinics/**").permitAll()
                .requestMatchers("/api/specialties/**").permitAll()
                .requestMatchers("/api/search/**").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/payment/confirm-status").permitAll()
                .requestMatchers("/api/payment/vnpay-return", "/api/payment/vnpay-ipn", "/").permitAll()
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                // --- API THEO ROLE CỤ THỂ (QUẢN TRỊ) ---
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .requestMatchers("/api/doctor/**").hasRole("BACSI")
                .requestMatchers("/api/clinic/**").hasRole("PHONGKHAM")
                .requestMatchers("/api/hospital/**").hasRole("BENHVIEN")

                // 1. Chỉ BENHNHAN mới được xem lịch sử khám
                .requestMatchers("/api/user/appointments/**").hasRole("BENHNHAN")

                // 2. BẤT CỨ AI đã đăng nhập (Admin, BacSi, BenhNhan...) 
                 //    đều có thể gọi các API còn lại (như /me, /profile)
                .requestMatchers("/api/user/**").authenticated()

                // 3. Mọi request khác (nếu có) phải đăng nhập
                .anyRequest().authenticated()
            )

            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
          return configuration.getAuthenticationManager();
    }
}
