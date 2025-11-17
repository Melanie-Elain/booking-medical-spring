package com.booking.medical_booking.dto;

import java.time.LocalDate;
import java.util.List;
import lombok.Data;

@Data
public class DoctorScheduleCreationDTO {
 
    private LocalDate date; 

    private List<String> timeSlots;

}