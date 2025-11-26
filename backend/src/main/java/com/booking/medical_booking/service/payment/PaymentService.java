package com.booking.medical_booking.service.payment;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.booking.medical_booking.model.Payment;
import com.booking.medical_booking.repository.PaymentRepository;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    // --- HÀM LƯU VNPAY ---
    public void saveVnPayTransaction(Map<String, String> vnp_Params) {
        Payment transaction = new Payment();
        
        transaction.setPaymentMethod("VNPAY");
        transaction.setAppointmentId(Integer.parseInt(vnp_Params.get("vnp_TxnRef"))); // Giả sử orderId là mã lịch hẹn
        transaction.setOrderId(vnp_Params.get("vnp_TxnRef"));
        transaction.setTransactionNo(vnp_Params.get("vnp_TransactionNo"));
        transaction.setBankCode(vnp_Params.get("vnp_BankCode"));
        transaction.setCardType(vnp_Params.get("vnp_CardType"));
        transaction.setResponseCode(vnp_Params.get("vnp_ResponseCode"));
        transaction.setCreatedAt(new Timestamp(System.currentTimeMillis()));

        // VNPAY tiền nhân 100 -> Phải chia 100
        long amount = Long.parseLong(vnp_Params.get("vnp_Amount")) / 100;
        transaction.setAmount(BigDecimal.valueOf(amount));

        if ("00".equals(vnp_Params.get("vnp_ResponseCode"))) {
            transaction.setStatus("SUCCESS");
        } else {
            transaction.setStatus("FAILED");
        }

        paymentRepository.save(transaction);
    }

    public List<Payment> getPaymentHistory(Long userId) {
        return paymentRepository.findHistoryByUserId(userId);
    }

    // // --- HÀM LƯU MOMO (Ví dụ để bạn dùng sau này) ---
    // public void saveMomoTransaction(MomoCallbackDTO momoParams) {
    //     Payment transaction = new Payment();
        
    //     transaction.setPaymentMethod("MOMO");
    //     transaction.setAppointmentId(Integer.parseInt(momoParams.getOrderId()));
    //     transaction.setOrderId(momoParams.getOrderId());
    //     transaction.setTransactionNo(momoParams.getTransId());
    //     transaction.setAmount(BigDecimal.valueOf(momoParams.getAmount()));
    //     transaction.setResponseCode(String.valueOf(momoParams.getResultCode()));
        
    //     if (momoParams.getResultCode() == 0) {
    //         transaction.setStatus("SUCCESS");
    //     } else {
    //         transaction.setStatus("FAILED");
    //     }
        
    //     paymentRepository.save(transaction);
    // }
}