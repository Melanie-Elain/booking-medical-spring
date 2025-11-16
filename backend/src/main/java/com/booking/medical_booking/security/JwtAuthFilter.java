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

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        try {
            // ---------------------------------------------
            // ⚠️ Cho phép request OPTIONS đi qua - tránh lỗi CORS
            // ---------------------------------------------
            if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
                response.setStatus(HttpServletResponse.SC_OK);
                filterChain.doFilter(request, response);
                return;
            }

            final String requestPath = request.getRequestURI();

            // ---------------------------------------------
            // ⚠️ PATH PUBLIC — không yêu cầu JWT
            // ---------------------------------------------
            if (requestPath.startsWith("/api/doctors") ||
                requestPath.startsWith("/api/hospitals") ||
                requestPath.startsWith("/api/clinics") ||
                requestPath.startsWith("/api/specialties") ||
                requestPath.startsWith("/api/auth")) {

                filterChain.doFilter(request, response);
                return;
            }

            // ---------------------------------------------
            // ⚠️ PATH PRIVATE — yêu cầu JWT
            // ---------------------------------------------
            final String authHeader = request.getHeader("Authorization");

            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                // Không có token — để SecurityConfig reject
                filterChain.doFilter(request, response);
                return;
            }

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

            filterChain.doFilter(request, response);

        } catch (Exception e) {
            // ---------------------------------------------
            // ⚠️ BẮT LỖI JWT — tránh crash app hoặc 403 sai
            // ---------------------------------------------
            System.err.println("!!! LỖI JWT FILTER: " + e.getMessage());
            e.printStackTrace();

            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.getWriter().write("{\"error\": \"JWT authentication error: " + e.getMessage() + "\"}");
        }
    }
}
