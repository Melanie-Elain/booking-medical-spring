package com.booking.medical_booking.repository;

import com.booking.medical_booking.model.Appointment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Integer> {

    // === cho Admin ===
    @EntityGraph(attributePaths = {"user", "lichGio", "lichGio.lichTong"})
    Page<Appointment> findAllByOrderByMaLichHenDesc(Pageable pageable);

    // === cho Bệnh nhân ===
    @EntityGraph(attributePaths = {"user", "lichGio", "lichGio.lichTong"})
    Page<Appointment> findByUserIdOrderByMaLichHenDesc(Long userId, Pageable pageable);

    // Tìm kiếm lịch hẹn của tôi với từ khóa (cho Bệnh nhân)
    @Query(
        value = "SELECT a.* FROM lichhen a " +
                "JOIN users u ON a.user_id = u.id " +
                "JOIN lich_gio lg ON a.ma_gio = lg.ma_gio " +
                "JOIN lich_tong lt ON lg.ma_lich = lt.ma_lich " +
                "LEFT JOIN bacsi d ON (lt.loai_doi_tuong = 'BACSI' AND lt.ma_doi_tuong = d.id) " +
                "LEFT JOIN benhvien h ON (lt.loai_doi_tuong = 'BENHVIEN' AND lt.ma_doi_tuong = h.id) " +
                "LEFT JOIN phongkham c ON (lt.loai_doi_tuong = 'PHONGKHAM' AND lt.ma_doi_tuong = c.id) " +
         
                "WHERE a.user_id = :userId AND (" +
                "   a.ghi_chu LIKE CONCAT('%', :keyword, '%') OR " +
                "   a.trang_thai LIKE CONCAT('%', :keyword, '%') OR " +
                "   d.name LIKE CONCAT('%', :keyword, '%') OR " +
                "   h.name LIKE CONCAT('%', :keyword, '%') OR " +
                "   c.name LIKE CONCAT('%', :keyword, '%')" + 
                ") " +
                "ORDER BY a.ma_lich_hen DESC",

        countQuery = "SELECT count(a.ma_lich_hen) FROM lichhen a " +
                     "JOIN users u ON a.user_id = u.id " +
                     "JOIN lich_gio lg ON a.ma_gio = lg.ma_gio " +
                     "JOIN lich_tong lt ON lg.ma_lich = lt.ma_lich " +
                     "LEFT JOIN bacsi d ON (lt.loai_doi_tuong = 'BACSI' AND lt.ma_doi_tuong = d.id) " +
                     "LEFT JOIN benhvien h ON (lt.loai_doi_tuong = 'BENHVIEN' AND lt.ma_doi_tuong = h.id) " +
                     "LEFT JOIN phongkham c ON (lt.loai_doi_tuong = 'PHONGKHAM' AND lt.ma_doi_tuong = c.id) " +
                     "WHERE a.user_id = :userId AND (" +
                     "   a.ghi_chu LIKE CONCAT('%', :keyword, '%') OR " +
                     "   a.trang_thai LIKE CONCAT('%', :keyword, '%') OR " +
                     "   d.name LIKE CONCAT('%', :keyword, '%') OR " +
                     "   h.name LIKE CONCAT('%', :keyword, '%') OR " +
                     "   c.name LIKE CONCAT('%', :keyword, '%')" + 
                     ")",
        nativeQuery = true // Báo cho Spring biết đây là SQL thuần
    )

    Page<Appointment> searchMyAppointments(
        @Param("userId") Long userId, 
        @Param("keyword") String keyword, 
        Pageable pageable
    );
}