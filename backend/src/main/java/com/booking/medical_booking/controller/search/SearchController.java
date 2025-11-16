package com.booking.medical_booking.controller.search;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.data.web.PageableDefault;
import org.springframework.data.domain.Pageable; // ĐÂY LÀ CHUẨN


import com.booking.medical_booking.dto.SearchRequestDTO;
import com.booking.medical_booking.service.search.SearchService;

@RestController
@RequestMapping("/api/search") 
public class SearchController {

    @Autowired
    private SearchService searchService; // <-- Dùng SearchService

    // Ví dụ URL: /api/search/entities?query=Ngọc&specialty=Nội+tiết&page=0&size=6
    @GetMapping("/entities")
    public ResponseEntity<?> searchEntities(
            SearchRequestDTO request,
            @PageableDefault(size = 6, sort = "name") Pageable pageable) {
        
        try {
            // Gọi Service để tìm kiếm trên nhiều Entity và trả về kết quả đã phân trang
            return ResponseEntity.ok(searchService.searchAllEntities(request, pageable));
        } catch (Exception e) {
            // Phản hồi lỗi nếu có vấn đề
            return ResponseEntity.status(500).body("Lỗi hệ thống khi tìm kiếm: " + e.getMessage());
        }
    }
}
