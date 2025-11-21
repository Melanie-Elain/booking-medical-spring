package com.booking.medical_booking.controller.payment;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;
import java.util.TreeMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

import com.booking.medical_booking.config.VnPayProperties;
import com.booking.medical_booking.dto.MomoCreateResponseDTO;
import com.booking.medical_booking.dto.PaymentRequestDTO;
import com.booking.medical_booking.dto.PaymentResponseDTO;
import com.booking.medical_booking.dto.VnPayIpnResponseDTO;
import com.booking.medical_booking.model.Appointment;
import com.booking.medical_booking.model.LichGio;
import com.booking.medical_booking.repository.LichGioRepository;
import com.booking.medical_booking.service.appointment.AppointmentService;
import com.booking.medical_booking.service.payment.Momoservice;
import com.booking.medical_booking.service.payment.PaymentService;
import com.booking.medical_booking.service.payment.VNPayService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

@RestController
@RequestMapping("api/payment")
public class PaymentController {

    @Autowired
    private Momoservice momoservice;

    @Autowired
    private VNPayService vnPayService;
    @Autowired
    private AppointmentService appointmentService;

    @Autowired
    private VnPayProperties vnPayProperties;

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private LichGioRepository lichGioRepository;

    @Value("${app.frontend.url}")
    private String frontendUrl;
    
    @PostMapping("/create-checkout-url")
    public ResponseEntity<PaymentResponseDTO> createCheckoutUrl(@Valid @RequestBody PaymentRequestDTO request) {
        
        PaymentResponseDTO responseDto;
        
        try {
            if ("MOMO".equalsIgnoreCase(request.getPaymentMethod())) {
                // Logic MoMo giữ nguyên
                MomoCreateResponseDTO momoResponse = momoservice.createPaymentRequest(request.getBookingDetails());
                responseDto = new PaymentResponseDTO(momoResponse.getPayUrl(), "MOMO");
                
            } else if ("VNPAY".equalsIgnoreCase(request.getPaymentMethod())) {

                Appointment newAppointment = appointmentService.createAppointment(request.getBookingDetails());
                
                String priceStr = request.getBookingDetails().getFinalPrice();
                long totalAmount;

                try {
                    BigDecimal finalPrice = new BigDecimal(priceStr); 
                    totalAmount = finalPrice.movePointRight(2).longValueExact(); 
                  
                } catch (Exception e) {
                    System.err.println("Lỗi chuyển đổi/định dạng giá tiền VNPAY: " + e.getMessage());
                    throw new RuntimeException("Số tiền thanh toán không hợp lệ.", e); 
                }
                
                
                String vnPayUrl;
                try {
                    vnPayUrl = vnPayService.createPaymentUrl(
                        request.getBookingDetails(), 
                        newAppointment.getMaLichHen(),
                        totalAmount
                    );

                    System.out.println("VNPAY URL được tạo ra: " + vnPayUrl);
                } catch (UnsupportedEncodingException e) {
                    throw new RuntimeException("Lỗi mã hóa tham số VNPAY.", e); 
                }
                
                responseDto = new PaymentResponseDTO(vnPayUrl, "VNPAY");
                
            } else {
                throw new IllegalArgumentException("Cổng thanh toán không được hỗ trợ.");
            }
            System.out.println("check var responseDto : "+ responseDto);
            return ResponseEntity.ok(responseDto);

        } catch (RuntimeException e) {
            // Khối này bắt tất cả RuntimeException và RuntimeException được ném ra từ khối try-catch nhỏ bên trên
            System.err.println("Lỗi tạo thanh toán: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new PaymentResponseDTO(null, e.getMessage()));
        }
    }

    @PostMapping("/confirm-status")
    public ResponseEntity<Appointment> confirmPaymentStatus(@RequestBody Map<String, String> request) {
        
        String maLichHenStr = request.get("maLichHen");
        String successCode = request.get("successCode");
        String paymentMethod = request.get("paymentMethod"); // Tùy chọn để ghi log

        if (maLichHenStr == null || successCode == null) {
            return ResponseEntity.badRequest().build();
        }
        
        try {
            Integer maLichHen = Integer.valueOf(maLichHenStr);
            
            // 2. Gọi Service để cập nhật trạng thái
            Appointment updatedAppointment = appointmentService.confirmPaymentStatus(
                maLichHen, 
                successCode, 
                paymentMethod
            );
            
            // 3. Trả về đối tượng Appointment đã được cập nhật
            return new ResponseEntity<>(updatedAppointment, HttpStatus.OK);
            
        } catch (NumberFormatException e) {
            System.err.println("Lỗi: maLichHen không phải là số.");
            return ResponseEntity.badRequest().build();
        } catch (RuntimeException e) {
            // Xử lý lỗi nếu không tìm thấy lịch hẹn (NOT FOUND)
            System.err.println("Lỗi xác nhận thanh toán: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); 
        }
    }

    @GetMapping("/vnpay-return") 
    public RedirectView handleVnPayReturn(HttpServletRequest request, HttpServletResponse response) throws IOException {
        
        Map<String, String> vnp_Params = new TreeMap<>();
        Enumeration<String> params = request.getParameterNames();
        
        while (params.hasMoreElements()) {
            String fieldName = params.nextElement();
            String fieldValue = request.getParameter(fieldName);
            if ((fieldValue != null) && (fieldValue.length() > 0)) {
                vnp_Params.put(fieldName, fieldValue);
            }
        }
        
        String vnp_SecureHash = vnp_Params.get("vnp_SecureHash");
        vnp_Params.remove("vnp_SecureHashType");
        vnp_Params.remove("vnp_SecureHash");
        
        String secureHashLocal = vnPayService.hashAllFields(vnPayProperties.getHashSecret(), vnp_Params);

        System.out.println("VNPAY Hash: " + vnp_SecureHash);
        System.out.println("Local Hash: " + secureHashLocal);
        
        String vnp_ResponseCode = request.getParameter("vnp_ResponseCode");
        String vnp_TxnRef = request.getParameter("vnp_TxnRef"); 

        if (secureHashLocal != null && secureHashLocal.equalsIgnoreCase(vnp_SecureHash)){
            paymentService.saveVnPayTransaction(vnp_Params);
            if ("00".equals(vnp_ResponseCode)) {
                updateAppointmentStatus(Integer.parseInt(vnp_TxnRef), "Đã thanh toán");
                return new RedirectView(frontendUrl + "/payment-status?status=success&orderId=" + vnp_TxnRef);
            } else {
                updateAppointmentStatus(Integer.parseInt(vnp_TxnRef), "Thanh toán thất bại");
                return new RedirectView(frontendUrl + "/payment-status?status=failed&orderId=" + vnp_TxnRef);
            }
        } else {
            updateAppointmentStatus(Integer.parseInt(vnp_TxnRef), "Thanh toán thất bại");
            return new RedirectView(frontendUrl + "/payment-status?status=failed&message=InvalidSignature");
        }
    }

    @RequestMapping(value = "/vnpay-ipn", method = {RequestMethod.POST, RequestMethod.GET})
    @Transactional
    public ResponseEntity<VnPayIpnResponseDTO> handleVnPayIpn(HttpServletRequest request) {
        try {
            System.out.println("------------ IPN START ------------");
            
            // 1. Dùng TreeMap để sắp xếp tham số (BẮT BUỘC)
            Map<String, String> vnp_Params = new TreeMap<>();
            Enumeration<String> params = request.getParameterNames();
            while (params.hasMoreElements()) {
                String fieldName = params.nextElement();
                String fieldValue = request.getParameter(fieldName);
                if ((fieldValue != null) && (fieldValue.length() > 0)) {
                    vnp_Params.put(fieldName, fieldValue);
                }
            }

            // 2. Lấy chữ ký và loại bỏ tham số không cần thiết
            String vnp_SecureHash = request.getParameter("vnp_SecureHash");
            if (vnp_Params.containsKey("vnp_SecureHashType")) vnp_Params.remove("vnp_SecureHashType");
            if (vnp_Params.containsKey("vnp_SecureHash")) vnp_Params.remove("vnp_SecureHash");

            // 3. Tính toán lại Hash
            String secureHashLocal = vnPayService.hashAllFields(vnPayProperties.getHashSecret(), vnp_Params);

            // Debug Log
            System.out.println("IPN VNPAY Hash: " + vnp_SecureHash);
            System.out.println("IPN Local Hash: " + secureHashLocal);

            // 4. Kiểm tra chữ ký
            if (secureHashLocal != null && secureHashLocal.equalsIgnoreCase(vnp_SecureHash)) {
                
                String vnp_ResponseCode = request.getParameter("vnp_ResponseCode");
                String vnp_TxnRef = request.getParameter("vnp_TxnRef");

                // 5. Tìm đơn hàng trong DB
                Appointment appointment = null;
                try {
                    Integer appointmentId = Integer.valueOf(vnp_TxnRef);
                    appointment = appointmentService.findById(appointmentId);
                } catch (Exception e) {
                    System.err.println("IPN: Lỗi tìm đơn hàng ID: " + vnp_TxnRef);
                    return ResponseEntity.ok(new VnPayIpnResponseDTO("01", "Order not found"));
                }

                if (appointment == null) {
                    return ResponseEntity.ok(new VnPayIpnResponseDTO("01", "Order not found"));
                }

                // 6. Kiểm tra xem đơn hàng đã được xử lý trước đó chưa
                // (Tránh cập nhật lại nếu VNPAY gọi nhiều lần)
                if (appointment.getTrangThai() != null && 
                (appointment.getTrangThai().equals("Đã thanh toán") || appointment.getTrangThai().equals("Thanh toán thất bại"))) {
                    System.out.println("IPN: Đơn hàng đã được xử lý trước đó: " + vnp_TxnRef);
                    return ResponseEntity.ok(new VnPayIpnResponseDTO("02", "Order already confirmed"));
                }

                // 7. Cập nhật trạng thái
                if ("00".equals(vnp_ResponseCode)) {
                    System.out.println("IPN: Thanh toán thành công. Updating DB...");
                    appointment.setTrangThai("Đã thanh toán"); // Đảm bảo chuỗi này khớp với logic của bạn
                    appointmentService.save(appointment);
                    return ResponseEntity.ok(new VnPayIpnResponseDTO("00", "Confirm Success"));
                } else {
                    System.out.println("IPN: Thanh toán thất bại. Updating DB...");
                    appointment.setTrangThai("Thanh toán thất bại");
                    appointmentService.save(appointment);
                    return ResponseEntity.ok(new VnPayIpnResponseDTO("00", "Confirm Success"));
                }
            } else {
                System.err.println("IPN: Chữ ký không hợp lệ!");
                return ResponseEntity.ok(new VnPayIpnResponseDTO("97", "Invalid Signature"));
            }
        } catch (Exception e) {
            System.err.println("IPN Error: " + e.getMessage());
            return ResponseEntity.ok(new VnPayIpnResponseDTO("99", "Unknown Error"));
        }
    }

    private void updateAppointmentStatus(Integer id, String status) {
        try {
            Appointment appointment = appointmentService.findById(id);
            if (appointment != null) {
                appointment.setTrangThai(status);
                appointmentService.save(appointment);
                if (status=="Đã thanh toán"){
                    LichGio lichGio = lichGioRepository.findByMaGio(appointment.getLichGio().getMaGio()).orElseThrow();
                    lichGio.setStatus("Booked");
                    lichGioRepository.save(lichGio);
                }
                System.out.println("Đã cập nhật trạng thái lịch hẹn #" + id + " thành: " + status);
            }
        } catch (Exception e) {
            System.err.println("Lỗi cập nhật DB: " + e.getMessage());
        }
    }

    
}
