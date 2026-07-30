package com.example.counselconnect.controller;

import com.example.counselconnect.dto.*;
import com.example.counselconnect.services.AppointmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;

import com.example.counselconnect.dto.AppointmentResponse;
@RestController
@RequestMapping("/api/appointments")
@RequiredArgsConstructor
public class AppointmentController {

    private final AppointmentService appointmentService;

    @PostMapping
    public String bookAppointment(
            @Valid @RequestBody BookAppointmentRequest request) {

        return appointmentService.bookAppointment(request);
    }
    @GetMapping("/student")
    public ResponseEntity<List<AppointmentResponse>> getStudentAppointments(
            Authentication authentication) {

        return ResponseEntity.ok(
                appointmentService.getStudentAppointments(authentication.getName()));
    }
    @GetMapping("/counsellor")
    public ResponseEntity<List<AppointmentResponse>> getCounsellorAppointments(
            Authentication authentication) {

        return ResponseEntity.ok(
                appointmentService.getCounsellorAppointments(authentication.getName()));
    }
    @PutMapping("/{appointmentId}/approve")
    public ResponseEntity<String> approveAppointment(
            @PathVariable Long appointmentId,
            Authentication authentication) {

        return ResponseEntity.ok(
                appointmentService.approveAppointment(
                        appointmentId,
                        authentication.getName()));
    }
    @PutMapping("/{appointmentId}/complete")
    public ResponseEntity<String> completeAppointment(
            @PathVariable Long appointmentId,
            Authentication authentication) {

        return ResponseEntity.ok(
                appointmentService.completeAppointment(
                        appointmentId,
                        authentication.getName()));
    }
    @GetMapping("/student/dashboard")
    public ResponseEntity<StudentDashboardResponse> getStudentDashboard(
            Authentication authentication) {

        return ResponseEntity.ok(
                appointmentService.getStudentDashboard(
                        authentication.getName()));
    }
    @GetMapping("/counsellor/dashboard")
    public ResponseEntity<CounsellorDashboardResponse> getCounsellorDashboard(
            Authentication authentication) {

        return ResponseEntity.ok(
                appointmentService.getCounsellorDashboard(
                        authentication.getName()));
    }
}