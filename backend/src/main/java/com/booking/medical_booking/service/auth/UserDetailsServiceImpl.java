// File này "dạy" Spring Security cách tìm User trong database bằng số điện thoại.

package com.booking.medical_booking.service.auth; // (Sửa package cho đúng)



import com.booking.medical_booking.model.User;
import com.booking.medical_booking.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import java.util.ArrayList; // Import

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // "username" ở đây chính là "phoneNumber"
        User user = userRepository.findByPhoneNumber(username)
                .orElseThrow(() -> new UsernameNotFoundException("Không tìm thấy User: " + username));

        // Trả về một đối tượng UserDetails mà Spring Security hiểu được
        return new org.springframework.security.core.userdetails.User(
            user.getPhoneNumber(),
            user.getPassword(),
            new ArrayList<>() // Bỏ qua Roles nếu bạn chưa dùng
        );
    }
}