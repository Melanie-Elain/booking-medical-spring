package com.booking.medical_booking.dto; // (Sửa package)

import com.booking.medical_booking.model.User.UserRole;
import lombok.Data;

@Data
public class UserRequestDTO {
    // Dùng cho cả Create và Update
    private String fullName;
    private String phoneNumber;
    private String password; // (Chỉ dùng khi tạo mới, sẽ bị bỏ qua khi cập nhật)
    private String email;
    private UserRole role; // "ADMIN", "BENHNHAN", "BACSI"
    
    
}