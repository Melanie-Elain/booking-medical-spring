package com.booking.medical_booking;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class MedicalBookingApplication {

	public static void main(String[] args) {
		SpringApplication.run(MedicalBookingApplication.class, args);
	}

}
