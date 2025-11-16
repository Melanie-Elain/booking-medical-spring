package com.booking.medical_booking.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class VnPayIpnResponseDTO {
    public String RspCode;
    public String Message;

    // public VnPayIpnResponseDTO(String rspCode, String message) {
    //     this.RspCode = rspCode;
    //     this.Message = message;
    // }

    public VnPayIpnResponseDTO(String rspCode, String message) {
        this.RspCode = rspCode;
        this.Message = message;
    }
}
