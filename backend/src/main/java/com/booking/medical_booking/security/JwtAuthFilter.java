// package com.booking.medical_booking.security;

// import jakarta.servlet.FilterChain;
// import jakarta.servlet.ServletException;
// import jakarta.servlet.http.HttpServletRequest;
// import jakarta.servlet.http.HttpServletResponse;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.HttpMethod;
// import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
// import org.springframework.security.core.context.SecurityContextHolder;
// import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.security.core.userdetails.UserDetailsService;
// import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
// import org.springframework.stereotype.Component;
// import org.springframework.web.filter.OncePerRequestFilter;
// import java.io.IOException;

// @Component
// public class JwtAuthFilter extends OncePerRequestFilter {

//     @Autowired
//     private JwtService jwtService;

//     @Autowired
//     private UserDetailsService userDetailsService;

//     @Override
//     protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
//             throws ServletException, IOException {

//         try {
//             // ---------------------------------------------
//             // ⚠️ Cho phép request OPTIONS đi qua - tránh lỗi CORS
//             // ---------------------------------------------
//             if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
//                 response.setStatus(HttpServletResponse.SC_OK);
//                 filterChain.doFilter(request, response);
//                 return;
//             }

//             final String requestPath = request.getRequestURI();

//             // ---------------------------------------------
//             // ⚠️ PATH PUBLIC — không yêu cầu JWT
//             // ---------------------------------------------
//             if (requestPath.startsWith("/api/doctors") ||
//                 requestPath.startsWith("/api/hospitals") ||
//                 requestPath.startsWith("/api/clinics") ||
//                 requestPath.startsWith("/api/specialties") ||
//                 requestPath.startsWith("/api/auth")) {

//                 filterChain.doFilter(request, response);
//                 return;
//             }

//             // ---------------------------------------------
//             // ⚠️ PATH PRIVATE — yêu cầu JWT
//             // ---------------------------------------------
//             final String authHeader = request.getHeader("Authorization");

//             if (authHeader == null || !authHeader.startsWith("Bearer ")) {
//                 // Không có token — để SecurityConfig reject
//                 filterChain.doFilter(request, response);
//                 return;
//             }

//             final String jwt = authHeader.substring(7);
//             final String phoneNumber = jwtService.getUsernameFromToken(jwt);

//             if (phoneNumber != null && SecurityContextHolder.getContext().getAuthentication() == null) {

//                 UserDetails userDetails = userDetailsService.loadUserByUsername(phoneNumber);

//                 // Validate token
//                 if (jwtService.validateToken(jwt, userDetails)) {

//                     UsernamePasswordAuthenticationToken authToken =
//                             new UsernamePasswordAuthenticationToken(
//                                     userDetails,
//                                     null,
//                                     userDetails.getAuthorities()
//                             );

//                     authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

//                     SecurityContextHolder.getContext().setAuthentication(authToken);
//                 }
//             }

//             filterChain.doFilter(request, response);

//         } catch (Exception e) {
//             // ---------------------------------------------
//             // ⚠️ BẮT LỖI JWT — tránh crash app hoặc 403 sai
//             // ---------------------------------------------
//             System.err.println("!!! LỖI JWT FILTER: " + e.getMessage());
//             e.printStackTrace();

//             response.setStatus(HttpServletResponse.SC_FORBIDDEN);
//             response.setContentType("application/json");
//             response.setCharacterEncoding("UTF-8");
//             response.getWriter().write("{\"error\": \"JWT authentication error: " + e.getMessage() + "\"}");
//         }
//     }
// }

package com.booking.medical_booking.security;

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

// Thêm 2 import này để bắt lỗi JWT cụ thể
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;
// (Bạn có thể cần thêm: import io.jsonwebtoken.MalformedJwtException;)

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        // ---------------------------------------------
        // ⚠️ LOGIC MỚI: Tách các đường dẫn public ra khỏi try...catch
        // ---------------------------------------------
        System.out.println("---!!! TÔI ĐANG CHẠY JWT FILTER BẢN MỚI NHẤT (ĐÃ SỬA LỖI 403) !!!---");
        final String requestPath = request.getRequestURI();

        // 1. Cho phép request OPTIONS đi qua (tránh lỗi CORS)
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            response.setStatus(HttpServletResponse.SC_OK);
            filterChain.doFilter(request, response);
            return;
        }

        // 2. PATH PUBLIC — không yêu cầu JWT
        // (Bất kỳ request nào tới đây sẽ đi thẳng, 
        // nếu controller ném lỗi thì Spring Boot tự xử lý)
        if (requestPath.startsWith("/api/doctors") ||
            requestPath.startsWith("/api/hospitals") ||
            requestPath.startsWith("/api/clinics") ||
            requestPath.startsWith("/api/specialties") ||
            requestPath.startsWith("/api/auth")) { // <--- /api/auth/login nằm ở đây

            filterChain.doFilter(request, response);
            return;
        }

        // ---------------------------------------------
        // ⚠️ PATH PRIVATE — yêu cầu JWT
        // (Chỉ code bên dưới mới cần try...catch cho lỗi JWT)
        // ---------------------------------------------

        final String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            // Không có token — để SecurityConfig (filter tiếp theo) reject
            filterChain.doFilter(request, response);
            return;
        }

        try {
            final String jwt = authHeader.substring(7);
            final String phoneNumber = jwtService.getUsernameFromToken(jwt);

            if (phoneNumber != null && SecurityContextHolder.getContext().getAuthentication() == null) {

                UserDetails userDetails = userDetailsService.loadUserByUsername(phoneNumber);

                // Validate token
                if (jwtService.validateToken(jwt, userDetails)) {
                    UsernamePasswordAuthenticationToken authToken =
                            new UsernamePasswordAuthenticationToken(
                                    userDetails,
                                    null,
                                    userDetails.getAuthorities()
                            );
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                }
            }

            // Nếu mọi thứ hợp lệ, cho request đi tiếp
            filterChain.doFilter(request, response);

        } catch (ExpiredJwtException | SignatureException e) { // | MalformedJwtException e) {
            // ---------------------------------------------
            // ⚠️ BẮT LỖI JWT CỤ THỂ — Token hết hạn hoặc không hợp lệ
            // ---------------------------------------------
            System.err.println("!!! LỖI JWT FILTER: " + e.getMessage());
            response.setStatus(HttpServletResponse.SC_FORBIDDEN); // 403
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.getWriter().write("{\"error\": \"JWT không hợp lệ hoặc đã hết hạn: " + e.getMessage() + "\"}");
            // Không gọi filterChain.doFilter, dừng request tại đây
        
        } catch (Exception e) {
             // Bắt các lỗi không lường trước khác trong quá trình xử lý token
            System.err.println("!!! LỖI FILTER KHÔNG XÁC ĐỊNH: " + e.getMessage());
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR); // 500
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.getWriter().write("{\"error\": \"Lỗi filter: " + e.getMessage() + "\"}");
        }
    }
}