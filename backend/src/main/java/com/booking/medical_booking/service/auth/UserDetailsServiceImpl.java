package com.booking.medical_booking.service.auth;

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
        
        // "username" co the la SDT hoac Email
        User user = userRepository.findByPhoneNumberOrEmail(username, username)
                .orElseThrow(() -> new UsernameNotFoundException("Không tìm thấy User: " + username));

        // Tu dong them tien to "ROLE_"
        String roleName = "ROLE_" + user.getRole().name();
        
        return new org.springframework.security.core.userdetails.User(
            user.getPhoneNumber(), // Luon dung SDT lam "chu the" (principal)
            user.getPassword(),
            Collections.singletonList(new SimpleGrantedAuthority(roleName))
        );
    }
}