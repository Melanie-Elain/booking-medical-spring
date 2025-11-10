package com.booking.medical_booking.service.auth; // (Sửa package cho đúng)

import com.booking.medical_booking.model.User;
import com.booking.medical_booking.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import java.util.Collections;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        
        // === SỬA LỖI Ở ĐÂY ===
        // "username" có thể là SĐT hoặc Email,
        // nên chúng ta dùng hàm findByPhoneNumberOrEmail
        User user = userRepository.findByPhoneNumberOrEmail(username, username)
                .orElseThrow(() -> new UsernameNotFoundException("Không tìm thấy User: " + username));

        String roleName = "ROLE_" + user.getRole().name();
        
        return new org.springframework.security.core.userdetails.User(
            user.getPhoneNumber(), // Luôn dùng SĐT làm "chủ thể" (principal)
            user.getPassword(),
            Collections.singletonList(new SimpleGrantedAuthority(roleName))
        );
    }
}