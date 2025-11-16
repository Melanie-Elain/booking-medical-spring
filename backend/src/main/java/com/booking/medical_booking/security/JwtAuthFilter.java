package com.booking.medical_booking.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        // BỌC TRONG TRY-CATCH ĐỂ TÌM LỖI THẬT
        try {
            
            // ✅ SỬA LỖI CORS: Luôn cho phép OPTIONS đi qua ĐẦU TIÊN
            // Request OPTIONS (pre-flight) được dùng để kiểm tra CORS.
            // Nó phải được cho phép đi qua filter để SecurityConfig xử lý .permitAll()
            if ("OPTIONS".equals(request.getMethod())) {
                response.setStatus(HttpServletResponse.SC_OK);
                filterChain.doFilter(request, response); // Phải gọi filterChain
                return; // Dừng lại
            }
            
            final String requestPath = request.getRequestURI();

            // Bỏ qua các đường dẫn public
            // (Không cần check OPTIONS ở đây nữa)
            if (requestPath.startsWith("/api/doctors") ||
                    requestPath.startsWith("/api/hospitals") ||
                    requestPath.startsWith("/api/clinics") ||
                    requestPath.startsWith("/api/specialties") ||
                    requestPath.startsWith("/api/auth")) {

                filterChain.doFilter(request, response);
                return;
            }

            // ===============================================
            // BẮT ĐẦU XỬ LÝ TOKEN CHO CÁC ĐƯỜNG DẪN PRIVATE
            // ===============================================

            final String authHeader = request.getHeader("Authorization");
            final String jwt;
            final String phoneNumber; // Đổi 'username' thành 'phoneNumber' cho nhất quán

            // Nếu không có header 'Authorization' hoặc không bắt đầu bằng "Bearer "
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                // Đây là request đến private path mà không có token, 
                // cứ cho nó qua, SecurityConfig sẽ xử lý (và từ chối)
                filterChain.doFilter(request, response);
                return;
            }

            jwt = authHeader.substring(7);
            phoneNumber = jwtService.getUsernameFromToken(jwt); // Dùng hàm của bạn

            // Nếu có SĐT và chưa được xác thực trong SecurityContext
            if (phoneNumber != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                
                UserDetails userDetails = this.userDetailsService.loadUserByUsername(phoneNumber);

                // Nếu token hợp lệ
                if (jwtService.validateToken(jwt, userDetails)) {
                    // Tạo đối tượng xác thực
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                            userDetails,
                            null, // Không cần credentials
                            userDetails.getAuthorities()
                    );
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    
                    // Đưa thông tin xác thực vào SecurityContext
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                }
            }
            // Cho request đi tiếp
            filterChain.doFilter(request, response);

        } catch (Exception e) {
            // ĐÂY LÀ PHẦN BẪY LỖI
            // Nó sẽ in ra lỗi thật (Token hết hạn, User không tìm thấy, BEAN KHÔNG TÌM THẤY)
            System.err.println("!!! LỖI NGHIÊM TRỌNG TRONG JWT FILTER: " + e.getMessage());
            e.printStackTrace(); // In ra chi tiết lỗi

            // Trả về 403 (Forbidden) hoặc 401 (Unauthorized)
            response.setStatus(HttpServletResponse.SC_FORBIDDEN); 
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.getWriter().write("{\"error\": \"Lỗi xác thực: " + e.getMessage() + "\"}");
        }
    }
}