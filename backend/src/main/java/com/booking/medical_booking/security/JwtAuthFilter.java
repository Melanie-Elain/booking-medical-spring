package com.booking.medical_booking.security; // (Sửa package cho đúng)

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
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
    private UserDetailsService userDetailsService; // Sẽ tự động tiêm UserDetailsServiceImpl

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        
        final String requestPath = request.getRequestURI();
        if (requestPath.startsWith("/api/doctors") || 
            requestPath.startsWith("/api/hospitals") || 
            requestPath.startsWith("/api/clinics") ||
            requestPath.startsWith("/api/specialties") ||
            requestPath.startsWith("/api/auth")) {
            if ("OPTIONS".equals(request.getMethod())) {
                response.setStatus(HttpServletResponse.SC_OK);
                return;
            }
            filterChain.doFilter(request, response);
            return; // Rất quan trọng: Thoát khỏi filter này
       }

        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String phoneNumber;

        

        // 1. Kiểm tra xem có Header và có 'Bearer ' không
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return; // Bỏ qua, để cho Spring Security (ở Config) xử lý
        }

        // 2. Lấy token (bỏ "Bearer ")
        jwt = authHeader.substring(7);
        phoneNumber = jwtService.getUsernameFromToken(jwt); 

        // 3. Nếu có SĐT VÀ user chưa được xác thực trong Context
        if (phoneNumber != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            
            // 4. Lấy UserDetails từ Database
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(phoneNumber);

            // 5. Xác thực token
            if (jwtService.validateToken(jwt, userDetails)) { // (Bạn cần viết hàm này)
                // Tạo 1 token xác thực
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null,
                        userDetails.getAuthorities()
                );
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                
                // 6. Lưu vào SecurityContext
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }
        filterChain.doFilter(request, response);
    }
}