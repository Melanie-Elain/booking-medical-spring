package com.booking.medical_booking.model;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.sql.Timestamp;

@Data
@Entity
@Table(name = "lichsu_thanhtoan")
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "appointment_id")
    private Integer appointmentId;

    // VNPAY hoặc MOMO
    @Column(name = "payment_method")
    private String paymentMethod;

    // Mã đơn hàng (Của mình gửi đi)
    @Column(name = "order_id")
    private String orderId;

    // Mã giao dịch (Của cổng trả về)
    @Column(name = "transaction_no")
    private String transactionNo;

    @Column(name = "amount")
    private BigDecimal amount;

    @Column(name = "bank_code")
    private String bankCode;

    @Column(name = "card_type")
    private String cardType;

    // 00 (Thành công)
    @Column(name = "response_code")
    private String responseCode;

    // SUCCESS / FAILED
    @Column(name = "status")
    private String status;

    @Column(name = "created_at", insertable = false, updatable = false)
    private Timestamp createdAt;
}