package com.booking.medical_booking.service; // Gói service của bạn

// Import các model CÓ SẴN từ package của bạn
import com.booking.medical_booking.model.Appointment; 
import com.booking.medical_booking.model.User;
import com.booking.medical_booking.model.LichGio;
import com.booking.medical_booking.model.LichTong; // <-- Import LichTong

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import jakarta.mail.internet.MimeMessage; 
import org.springframework.mail.javamail.MimeMessageHelper;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import java.time.format.DateTimeFormatter;
import java.time.LocalDate;


@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private SpringTemplateEngine templateEngine;

    @Value("${spring.mail.from}")
    private String mailFrom;

    // Chữ ký phương thức giữ nguyên (nhận providerName từ AppointmentService)
    // @Async
    // public void sendAppointmentConfirmationEmail(Appointment appointment, String providerName) {
    //     try {
    //         // === LOGIC ĐÃ SỬA LỖI ===

    //         // 1. Lấy Bệnh nhân (User) từ Appointment
    //         User patient = appointment.getUser();
            
    //         // 2. Lấy Khung giờ (LichGio) từ Appointment
    //         LichGio lichGio = appointment.getLichGio();
            
    //         // 3. Lấy thông tin từ Patient và Appointment
    //         String patientName = patient.getFullName(); 
    //         String patientEmail = patient.getEmail();
    //         String note = appointment.getGhiChu() != null ? appointment.getGhiChu() : "";

    //         // 4. Lấy thông tin Ngày, Giờ
    //         LichTong lichTong = lichGio.getLichTong();
    //         LocalDate appointmentDate = lichTong.getNgay();

    //         // --- ĐÂY LÀ PHẦN SỬA LỖI ---
    //         // Tệp LichGio.java của bạn có trường "khungGio" kiểu String
    //         String appointmentTime = lichGio.getKhungGio(); 
    //         // --- KẾT THÚC SỬA LỖI ---


    //         // Định dạng ngày
    //         DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
    //         // Không cần timeFormatter nữa

    //         // Tạo nội dung email
    //         String subject = "[YouMed] Lịch hẹn của bạn đã được xác nhận!";
    //         String emailBody = String.format(
    //             "Xin chào %s,\n\n" +
    //             "Lịch hẹn của bạn với [ %s ]\n" +
    //             // --- SỬA LỖI FORMAT ---
    //             // Sử dụng trực tiếp chuỗi "khungGio"
    //             "Thời gian: %s, Ngày %s\n" + 
    //             "ĐÃ ĐƯỢC XÁC NHẬN.\n\n" +
    //             "Ghi chú của bạn: %s\n" +
    //             "Cảm ơn bạn đã sử dụng dịch vụ YouMed.",
    //             patientName,
    //             providerName,
    //             appointmentTime, 
    //             appointmentDate.format(dateFormatter),
    //             note
    //         );

    //         // Gửi email
    //         SimpleMailMessage message = new SimpleMailMessage();
    //         message.setFrom(mailFrom);
    //         message.setTo(patientEmail);
    //         message.setSubject(subject);
    //         message.setText(emailBody);
            
    //         mailSender.send(message);

    //         System.out.println("Email xác nhận đã được GỬI (async) tới: " + patientEmail);

    //     } catch (Exception e) {
    //         System.err.println("Lỗi khi gửi email (async): " + e.getMessage());
    //         e.printStackTrace();
    //     }
    // }
    @Async
    public void sendAppointmentConfirmationEmail(Appointment appointment, String providerName) {
        try {
            // 1. Chuẩn bị dữ liệu (Giống code cũ của bạn)
            User patient = appointment.getUser();
            LichGio lichGio = appointment.getLichGio();
            LichTong lichTong = lichGio.getLichTong();
            
            // 2. Đưa dữ liệu vào Context của Thymeleaf
            Context context = new Context();
            context.setVariable("patientName", patient.getFullName());
            context.setVariable("providerName", providerName);
            context.setVariable("appointmentTime", lichGio.getKhungGio());
            
            DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
            context.setVariable("appointmentDate", lichTong.getNgay().format(dateFormatter));
            context.setVariable("note", appointment.getGhiChu() != null ? appointment.getGhiChu() : "");

            // 3. Render HTML từ Template
            // "email-template" là tên file html trong folder templates (bỏ đuôi .html)
            String htmlBody = templateEngine.process("email-template", context);

            // 4. Gửi email dạng HTML (Dùng MimeMessage)
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8"); // true = multipart/HTML
            
            helper.setFrom(mailFrom);
            helper.setTo(patient.getEmail());
            helper.setSubject("[YouMed] Lịch hẹn của bạn đã được xác nhận!");
            helper.setText(htmlBody, true); // true = nội dung là HTML

            mailSender.send(message);
            System.out.println("Email HTML đã được GỬI tới: " + patient.getEmail());

        } catch (Exception e) {
            System.err.println("Lỗi khi gửi email: " + e.getMessage());
            e.printStackTrace();
        }
    }
}