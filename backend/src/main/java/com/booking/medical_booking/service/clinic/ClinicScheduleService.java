package com.booking.medical_booking.service.clinic;

import com.booking.medical_booking.dto.DoctorScheduleCreationDTO;
import com.booking.medical_booking.model.Clinic;
import com.booking.medical_booking.model.LichGio;
import com.booking.medical_booking.model.LichTong;
import com.booking.medical_booking.model.User;
import com.booking.medical_booking.repository.ClinicRepository;
import com.booking.medical_booking.repository.LichGioRepository;
import com.booking.medical_booking.repository.LichTongRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class ClinicScheduleService {

    @Autowired
    private LichTongRepository lichTongRepository;
    @Autowired
    private LichGioRepository lichGioRepository;
    @Autowired
    private ClinicRepository clinicRepository;

    private final String STATUS_AVAILABLE = "Available";
    private final String STATUS_BOOKED = "Booked";

    // =================================================================
    // 1. TẠO LỊCH MỚI
    // =================================================================
    @Transactional
    public LichTong createClinicSchedule(Integer clinicId, DoctorScheduleCreationDTO dto) {
        Clinic clinic = clinicRepository.findById(clinicId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy Phòng khám ID: " + clinicId));

        Optional<LichTong> optLichTong = lichTongRepository.findByMaDoiTuongAndLoaiDoiTuongAndNgay(
                clinicId.longValue(),
                User.UserRole.PHONGKHAM,
                dto.getDate()
        );

        LichTong lichTongToProcess;
        Set<String> existingSlots = new HashSet<>();

        if (optLichTong.isPresent()) {
            lichTongToProcess = optLichTong.get();
            List<LichGio> currentSlots = lichGioRepository.findByLichTong(lichTongToProcess);
            for (LichGio slot : currentSlots) {
                existingSlots.add(slot.getKhungGio());
            }
        } else {
            LichTong newLichTong = new LichTong();
            newLichTong.setMaDoiTuong(clinicId.longValue());
            newLichTong.setLoaiDoiTuong(User.UserRole.PHONGKHAM);
            newLichTong.setNgay(dto.getDate());
            newLichTong.setTenNgay(formatDateToVietnamese(dto.getDate()));
            lichTongToProcess = lichTongRepository.save(newLichTong);
        }

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

        if (!slotsToSave.isEmpty()) {
            lichGioRepository.saveAll(slotsToSave);
        }
        return lichTongToProcess;
    }

    // =================================================================
    // 2. XÓA KHUNG GIỜ
    // =================================================================
    @Transactional
    public void deleteScheduleSlot(Integer maGio) { // Sửa tên tham số cho khớp model
        LichGio slot = lichGioRepository.findById(maGio)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy khung giờ ID: " + maGio));

        if (STATUS_BOOKED.equalsIgnoreCase(slot.getStatus())) {
            throw new RuntimeException("Không thể xóa. Khung giờ này đã có người đặt.");
        }
        lichGioRepository.delete(slot);
    }

    // =================================================================
    // 3. SỬA KHUNG GIỜ
    // =================================================================
    @Transactional
    public LichGio updateScheduleSlot(Integer maGio, Map<String, String> payload) {
        String newTime = payload.get("time");
        if (newTime == null || newTime.isEmpty()) {
            throw new RuntimeException("Nội dung 'time' là bắt buộc.");
        }

        LichGio slot = lichGioRepository.findById(maGio)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy khung giờ ID: " + maGio));

        if (STATUS_BOOKED.equalsIgnoreCase(slot.getStatus())) {
            throw new RuntimeException("Không thể sửa. Khung giờ này đã có người đặt.");
        }

        slot.setKhungGio(newTime);
        return lichGioRepository.save(slot);
    }

    // // =================================================================
    // // 4. LẤY TOÀN BỘ LỊCH (Đã Fix lỗi Set/List và getId)
    // // =================================================================
    // public Map<String, List<Map<String, Object>>> getAllClinicSchedules(Integer clinicId) {
    //     // 1. Lấy dữ liệu từ Repo
    //     List<LichTong> listLichTong = lichTongRepository.findSchedulesWithLichGiosByDoctor(
    //             User.UserRole.PHONGKHAM,
    //             clinicId.longValue()
    //     );

    //     Map<String, List<Map<String, Object>>> scheduleMap = new LinkedHashMap<>();

    //     for (LichTong lichTong : listLichTong) {
    //         String dateKey = lichTong.getTenNgay();
    //         scheduleMap.putIfAbsent(dateKey, new ArrayList<>());

    //         // === FIX LỖI TYPE MISMATCH Ở ĐÂY ===
    //         // Vì Model LichTong dùng Set<LichGio>, ta cần convert sang List để sort
    //         Set<LichGio> setGio = lichTong.getLichGios(); // Lấy Set từ Model
    //         List<LichGio> listGio;
            
    //         if (setGio != null) {
    //             listGio = new ArrayList<>(setGio); // Convert Set -> List
    //         } else {
    //             listGio = new ArrayList<>();
    //         }
    //         // ===================================

    //         // Sort theo giờ
    //         listGio.sort(Comparator.comparing(LichGio::getKhungGio));

    //         for (LichGio slot : listGio) {
    //             Map<String, Object> slotInfo = new HashMap<>();
                
    //             // === FIX LỖI getId() Ở ĐÂY ===
    //             slotInfo.put("id", slot.getMaGio()); // Sửa getId() -> getMaGio()
    //             // ==============================
                
    //             slotInfo.put("time", slot.getKhungGio());
    //             slotInfo.put("status", slot.getStatus());
                
    //             scheduleMap.get(dateKey).add(slotInfo);
    //         }
    //     }

    //     return scheduleMap;
    // }

    // =================================================================
    // 4. LẤY TOÀN BỘ LỊCH (SỬA ĐỂ CHỈ HIỆN GIỜ TRỐNG - AVAILABLE)
    // =================================================================
    public Map<String, List<Map<String, Object>>> getAllClinicSchedules(Integer clinicId) {
        // ... (Code phần lấy listLichTong giữ nguyên) ...
        List<LichTong> listLichTong = lichTongRepository.findSchedulesWithLichGiosByDoctor(
                User.UserRole.PHONGKHAM,
                clinicId.longValue()
        );

        Map<String, List<Map<String, Object>>> scheduleMap = new LinkedHashMap<>();

        for (LichTong lichTong : listLichTong) {
            String dateKey = lichTong.getTenNgay();
            
            // Lấy danh sách giờ
            List<LichGio> listGio = lichGioRepository.findByLichTong(lichTong);
            if (listGio == null) listGio = new ArrayList<>();

            listGio.sort(Comparator.comparing(LichGio::getKhungGio));

            // Kiểm tra xem list cho ngày này đã tồn tại chưa
            scheduleMap.putIfAbsent(dateKey, new ArrayList<>());

            for (LichGio slot : listGio) {
                
                // 👉👉👉 THÊM ĐOẠN NÀY ĐỂ LỌC 👈👈👈
                // Nếu trạng thái KHÔNG PHẢI là "Available" thì bỏ qua, không thêm vào danh sách hiển thị
                if (!"Available".equalsIgnoreCase(slot.getStatus())) {
                    continue; 
                }
                // ----------------------------------------

                Map<String, Object> slotInfo = new HashMap<>();
                slotInfo.put("id", slot.getMaGio()); 
                slotInfo.put("time", slot.getKhungGio());
                slotInfo.put("status", slot.getStatus());
                
                scheduleMap.get(dateKey).add(slotInfo);
            }
            
            // (Tùy chọn) Nếu ngày đó sau khi lọc mà không còn giờ nào trống, 
            // thì có thể xóa key đó đi để giao diện không hiện ngày trống trơn.
            if (scheduleMap.get(dateKey).isEmpty()) {
                scheduleMap.remove(dateKey);
            }
        }

        return scheduleMap;
    }

    // Helper Format ngày
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