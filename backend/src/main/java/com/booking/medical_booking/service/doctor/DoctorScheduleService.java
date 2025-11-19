package com.booking.medical_booking.service.doctor;

import com.booking.medical_booking.dto.DoctorScheduleCreationDTO;
import com.booking.medical_booking.model.Doctor;
import com.booking.medical_booking.model.LichGio;
import com.booking.medical_booking.model.LichTong;
import com.booking.medical_booking.model.User;
import com.booking.medical_booking.repository.DoctorRepository;
import com.booking.medical_booking.repository.LichGioRepository;
import com.booking.medical_booking.repository.LichTongRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Map; // <-- Thêm import
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class DoctorScheduleService {

    @Autowired
    private LichTongRepository lichTongRepository;

    @Autowired
    private LichGioRepository lichGioRepository;

    @Autowired
    private DoctorRepository doctorRepository; 

    private final String STATUS_AVAILABLE = "Available";
    private final String STATUS_BOOKED = "Booked"; // <-- Thêm

    // === 1. HÀM THÊM (Đã sửa) ===
    @Transactional
    public LichTong createDoctorSchedule(Long doctorId, DoctorScheduleCreationDTO dto) {

        // 1. Xác thực Bác sĩ
        Doctor doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy Bác sĩ với ID: " + doctorId));

        // 2. Tìm hoặc Tạo mới Lịch Tổng
        Optional<LichTong> optLichTong = lichTongRepository.findByMaDoiTuongAndLoaiDoiTuongAndNgay(
                doctorId,
                User.UserRole.BACSI,
                dto.getDate()
        );

        LichTong lichTongToProcess;
        Set<String> existingSlots = new HashSet<>();

        if (optLichTong.isPresent()) {
            // 2a. Nếu đã tồn tại: Lấy ra và tải các khung giờ
            lichTongToProcess = optLichTong.get();
            List<LichGio> currentSlots = lichGioRepository.findByLichTong(lichTongToProcess);
            existingSlots = currentSlots.stream()
                                    .map(LichGio::getKhungGio)
                                    .collect(Collectors.toSet());
        } else {
            // 2b. Nếu chưa tồn tại: Tạo mới
            LichTong newLichTong = new LichTong();
            newLichTong.setMaDoiTuong(doctorId);
            newLichTong.setLoaiDoiTuong(User.UserRole.BACSI);
            newLichTong.setNgay(dto.getDate());
            newLichTong.setTenNgay(formatDateToVietnamese(dto.getDate()));
            lichTongToProcess = lichTongRepository.save(newLichTong);
        }

        // 3. Xử lý và thêm Lịch Giờ (LichGio)
        List<LichGio> slotsToSave = new ArrayList<>();
        for (String timeSlot : dto.getTimeSlots()) {
            if (!existingSlots.contains(timeSlot)) {
                LichGio newSlot = new LichGio();
                newSlot.setLichTong(lichTongToProcess); 
                newSlot.setKhungGio(timeSlot);
                newSlot.setStatus(STATUS_AVAILABLE);
                slotsToSave.add(newSlot);
            }
        }

        // 4. Lưu tất cả Lịch Giờ mới
        if (!slotsToSave.isEmpty()) {
            lichGioRepository.saveAll(slotsToSave);
        }
        return lichTongToProcess;
    }

    // === 2. HÀM XÓA (Mới) ===
    @Transactional
    public void deleteScheduleSlot(Integer slotId) {
        LichGio slot = lichGioRepository.findById(slotId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy khung giờ ID: " + slotId));

        // Kiểm tra an toàn: Chỉ cho xóa nếu chưa có ai đặt
        if (STATUS_BOOKED.equalsIgnoreCase(slot.getStatus())) {
            throw new RuntimeException("Không thể xóa. Khung giờ này đã có người đặt.");
        }
        lichGioRepository.delete(slot);
    }

    // === 3. HÀM SỬA (Mới) ===
    @Transactional
    public LichGio updateScheduleSlot(Integer slotId, Map<String, String> payload) {
        String newTime = payload.get("time");
        if (newTime == null || newTime.isEmpty()) {
            throw new RuntimeException("Nội dung 'time' là bắt buộc.");
        }

        LichGio slot = lichGioRepository.findById(slotId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy khung giờ ID: " + slotId));

        // Kiểm tra an toàn: Chỉ cho sửa nếu chưa có ai đặt
        if (STATUS_BOOKED.equalsIgnoreCase(slot.getStatus())) {
            throw new RuntimeException("Không thể sửa. Khung giờ này đã có người đặt.");
        }

        slot.setKhungGio(newTime);
        return lichGioRepository.save(slot);
    }

    // === 4. HÀM HELPER (Giữ nguyên) ===
    private String formatDateToVietnamese(LocalDate date) {
        DayOfWeek day = date.getDayOfWeek();
        String dayName;
        switch (day) {
            case MONDAY:    dayName = "Thứ 2"; break;
            case TUESDAY:   dayName = "Thứ 3"; break;
            case WEDNESDAY: dayName = "Thứ 4"; break;
            case THURSDAY:  dayName = "Thứ 5"; break;
            case FRIDAY:    dayName = "Thứ 6"; break;
            case SATURDAY:  dayName = "Thứ 7"; break;
            case SUNDAY:    dayName = "Chủ nhật"; break;
            default:        dayName = "";
        }
        String formattedDate = date.format(DateTimeFormatter.ofPattern("dd/MM/yyyy"));
        return dayName + ", " + formattedDate;
    }
}