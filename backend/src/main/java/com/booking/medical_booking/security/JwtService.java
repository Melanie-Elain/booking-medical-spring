// package com.booking.medical_booking.security;

// import io.jsonwebtoken.*;
// import io.jsonwebtoken.security.Keys;
// import org.springframework.stereotype.Service;
// import java.security.Key;
// import java.util.Date;

// @Service
// public class JwtService {

//     private static final String SECRET_KEY = "THIS_IS_A_SECRET_KEY_CHANGE_ME_TO_SOMETHING_LONGER"; // 🔒 nên đổi
//     private static final long EXPIRATION_TIME = 1000 * 60 * 60 * 24; // 24 giờ

//     private Key getSigningKey() {
//         return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
//     }

//     // Tạo JWT token từ số điện thoại
//     public String generateToken(String phoneNumber) {
//         return Jwts.builder()
//                 .setSubject(phoneNumber)
//                 .setIssuedAt(new Date())
//                 .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
//                 .signWith(getSigningKey(), SignatureAlgorithm.HS256)
//                 .compact();
//     }

//     // Lấy số điện thoại từ token
//     public String extractPhoneNumber(String token) {
//         return parseClaims(token).getBody().getSubject();
//     }

//     // Kiểm tra token có hợp lệ không
//     public boolean validateToken(String token) {
//         try {
//             parseClaims(token);
//             return true;
//         } catch (JwtException | IllegalArgumentException e) {
//             return false;
//         }
//     }

//     private Jws<Claims> parseClaims(String token) {
//         return Jwts.parserBuilder()
//                 .setSigningKey(getSigningKey())
//                 .build()
//                 .parseClaimsJws(token);
//     }
// }

package com.booking.medical_booking.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails; // Import
import org.springframework.stereotype.Service;
import java.security.Key;
import java.util.Date;
import java.util.function.Function; // Import

@Service
public class JwtService {

    private static final String SECRET_KEY = "THIS_IS_A_SECRET_KEY_CHANGE_ME_TO_SOMETHING_LONGER"; // 🔒 nên đổi
    private static final long EXPIRATION_TIME = 1000 * 60 * 60 * 24; // 24 giờ

    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }

    // Tạo JWT token từ số điện thoại
    public String generateToken(String phoneNumber) {
        return Jwts.builder()
                .setSubject(phoneNumber)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    // --- CÁC HÀM MỚI VÀ HÀM SỬA CHO JwtAuthFilter ---

    // 1. SỬA TÊN HÀM: (extractPhoneNumber -> getUsernameFromToken)
    // Lấy số điện thoại (username) từ token
    public String getUsernameFromToken(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    // 2. SỬA HÀM: (validateToken(String) -> validateToken(String, UserDetails))
    // Kiểm tra token có hợp lệ không (dùng bởi JwtAuthFilter)
    public boolean validateToken(String token, UserDetails userDetails) {
        final String username = getUsernameFromToken(token);
        // Kiểm tra username có khớp không VÀ token còn hạn không
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    // --- CÁC HÀM PHỤ (HELPER FUNCTIONS) ---

    // Hàm phụ chung để lấy 1 claim (thông tin)
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    // Hàm phụ: Kiểm tra token hết hạn
    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    // Hàm phụ: Lấy ngày hết hạn
    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    // 3. SỬA HÀM: (parseClaims -> extractAllClaims)
    // Hàm phụ: Giải mã toàn bộ token
    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}