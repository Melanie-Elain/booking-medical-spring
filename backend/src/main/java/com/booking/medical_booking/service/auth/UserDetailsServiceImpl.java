// File này "dạy" Spring Security cách tìm User trong database bằng số điện thoại.

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
        User user = userRepository.findByPhoneNumber(username)
                .orElseThrow(() -> new UsernameNotFoundException("Không tìm thấy User: " + username));

        String roleName = "ROLE_" + user.getRole().name();
        
        return new org.springframework.security.core.userdetails.User(
            user.getPhoneNumber(),
            user.getPassword(),
            Collections.singletonList(new SimpleGrantedAuthority(roleName))
        );
    }
}