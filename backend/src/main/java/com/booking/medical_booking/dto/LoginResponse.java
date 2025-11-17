package com.booking.medical_booking.dto;

import java.util.List;
import lombok.Data;

@Data 
public class LoginResponse {
    private String token; // Token JWT
    private String type = "Bearer";
    private Long id;
    private String username;
    private String email;
    private String fullName;
    private List<String> roles;

    // Constructor của bạn
    public LoginResponse(String accessToken, Long id, String username, String email, String fullName, List<String> roles) {
        this.token = accessToken;
        this.id = id;
        this.username = username;
        this.email = email;
        this.fullName = fullName;
        this.roles = roles;
    }
 

}