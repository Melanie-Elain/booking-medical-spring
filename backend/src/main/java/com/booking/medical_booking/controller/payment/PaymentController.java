package com.booking.medical_booking.controller.payment;

import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.booking.medical_booking.config.VnPayProperties;
import com.booking.medical_booking.dto.MomoCreateResponseDTO;
import com.booking.medical_booking.dto.PaymentRequestDTO;
import com.booking.medical_booking.dto.PaymentResponseDTO;
import com.booking.medical_booking.dto.VnPayIpnResponseDTO;
import com.booking.medical_booking.model.Appointment;
import com.booking.medical_booking.service.appointment.AppointmentService;
import com.booking.medical_booking.service.payment.Momoservice;
import com.booking.medical_booking.service.payment.VNPayService;

import jakarta.servlet.http.HttpServletRequest;
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
    public String handleVnPayReturn(HttpServletRequest request) throws UnsupportedEncodingException {
        
        Map<String, String> vnp_Params = new HashMap<>();
        Enumeration<String> params = request.getParameterNames();
        
        while (params.hasMoreElements()) {
            String fieldName = params.nextElement();
            String fieldValue = request.getParameter(fieldName);
            vnp_Params.put(fieldName, fieldValue);
        }
        
        String vnp_SecureHash = vnp_Params.get("vnp_SecureHash");
        vnp_Params.remove("vnp_SecureHash");
        
        String secureHashLocal = vnPayService.hashAllFields(vnPayProperties.getHashSecret(), vnp_Params);
        
        String vnp_ResponseCode = request.getParameter("vnp_ResponseCode");
        String vnp_TxnRef = request.getParameter("vnp_TxnRef"); // Mã lịch hẹn (orderId)

        String frontendRedirectUrl;

        if (secureHashLocal != null && secureHashLocal.equals(vnp_SecureHash)) {
            
            if ("00".equals(vnp_ResponseCode)) {
                // ✅ Thành công: Chuyển hướng Frontend để hiển thị "Đã thanh toán" (nhưng chưa lưu DB)
                return "redirect:http://localhost:3000/payment-status?status=success&orderId=" + vnp_TxnRef;
            } else {
                // Thất bại: Chuyển hướng để hiển thị thất bại
                return "redirect:http://localhost:3000/payment-status?status=failed&orderId=" + vnp_TxnRef;
            }
        } else {
            System.err.println("VNPAY Return: Lỗi xác thực chữ ký!");
            frontendRedirectUrl = "redirect:http://localhost:3000/payment-status?status=failed&message=InvalidSignature";
        }

        return frontendRedirectUrl;
    }

    @RequestMapping(value = "/vnpay-ipn", method = {RequestMethod.POST, RequestMethod.GET})
    @Transactional
    public ResponseEntity<VnPayIpnResponseDTO> handleVnPayIpn(HttpServletRequest request) 
        throws UnsupportedEncodingException {
        
        System.out.println("Helllo");
        Map<String, String> vnp_Params = new HashMap<>();
        Enumeration<String> params = request.getParameterNames();
        while (params.hasMoreElements()) {
            String fieldName = params.nextElement();
            String fieldValue = request.getParameter(fieldName);
            vnp_Params.put(fieldName, fieldValue);
        }

        String vnp_SecureHash = vnp_Params.get("vnp_SecureHash");
        vnp_Params.remove("vnp_SecureHash"); 
        
        String vnp_ResponseCode = vnp_Params.get("vnp_ResponseCode");
        String vnp_TxnRef = vnp_Params.get("vnp_TxnRef"); // Mã tham chiếu (Order ID)
        String vnp_Amount = vnp_Params.get("vnp_Amount"); // Số tiền giao dịch (đã nhân 100)

        String secureHashLocal = vnPayService.hashAllFields(vnPayProperties.getHashSecret(), vnp_Params);

        System.out.println("hi");
        
        if (!secureHashLocal.equals(vnp_SecureHash)) {
            System.err.println("VNPAY IPN: Lỗi xác thực chữ ký!");
            return ResponseEntity.ok(new VnPayIpnResponseDTO("97", "Chu ky khong hop le")); 
        }

        Appointment appointment;
        try {
            Integer appointmentId = Integer.valueOf(vnp_TxnRef); 
            appointment = appointmentService.findById(appointmentId);
        } catch (Exception e) {
            System.err.println("VNPAY IPN: Khong tim thay lich hen voi ID: " + vnp_TxnRef);
            return ResponseEntity.ok(new VnPayIpnResponseDTO("01", "Order khong ton tai")); 
        }

        if ("THANH_TOAN_THANH_CONG".equals(appointment.getTrangThai())) {
            System.out.println("VNPAY IPN: Lich hen da duoc thanh toan: " + vnp_TxnRef);
            return ResponseEntity.ok(new VnPayIpnResponseDTO("02", "Order da duoc xu ly")); 
        }

        
        if ("00".equals(vnp_ResponseCode)) {
            appointment.setTrangThai("THANH_TOAN_THANH_CONG");
            appointmentService.save(appointment); 
            
            System.out.println("VNPAY IPN: Cap nhat thanh cong lich hen: " + vnp_TxnRef);
            return ResponseEntity.ok(new VnPayIpnResponseDTO("00", "Confirm Success"));
            
        } else {
            appointment.setTrangThai("THANH_TOAN_THAT_BAI");
            appointmentService.save(appointment);
            System.out.println("VNPAY IPN: Giao dich that bai. Ma loi: " + vnp_ResponseCode);
            return ResponseEntity.ok(new VnPayIpnResponseDTO("00", "Confirm Success")); 
        }
    }

    
}
