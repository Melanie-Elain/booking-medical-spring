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
            final String requestPath = request.getRequestURI();
            
            // Bỏ qua các đường dẫn public
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
                return; 
            }

            final String authHeader = request.getHeader("Authorization");
            final String jwt;
            final String phoneNumber; // Đổi 'username' thành 'phoneNumber' cho nhất quán

            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                filterChain.doFilter(request, response);
                return; 
            }

            jwt = authHeader.substring(7);
            phoneNumber = jwtService.getUsernameFromToken(jwt); // Dùng hàm của bạn

            if (phoneNumber != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                
                UserDetails userDetails = this.userDetailsService.loadUserByUsername(phoneNumber);

                if (jwtService.validateToken(jwt, userDetails)) { 
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                            userDetails,
                            null,
                            userDetails.getAuthorities()
                    );
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                }
            }
            filterChain.doFilter(request, response);
            
        } catch (Exception e) {
            // ĐÂY LÀ PHẦN BẪY LỖI
            // Nó sẽ in ra lỗi thật (Token hết hạn, User không tìm thấy, BEAN KHÔNG TÌM THẤY)
            System.err.println("!!! LỖI NGHIÊM TRỌNG TRONG JWT FILTER: " + e.getMessage());
            e.printStackTrace(); // In ra chi tiết lỗi
            
            response.setStatus(HttpServletResponse.SC_FORBIDDEN); // Trả về 403
            response.getWriter().write("Loi xac thuc: " + e.getMessage());
        }
    }
}