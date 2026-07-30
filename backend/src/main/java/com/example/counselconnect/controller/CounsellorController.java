package com.example.counselconnect.controller;

import com.example.counselconnect.dto.*;
import com.example.counselconnect.services.AppointmentService;
import com.example.counselconnect.services.CounsellorService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/counsellors")
@RequiredArgsConstructor
public class CounsellorController {
    private final AppointmentService appointmentService;
    private final CounsellorService counsellorService;



    @PostMapping("/register")
    public String registerCounsellor(
            @Valid @RequestBody RegisterCounsellorRequest request) {

        return counsellorService.registerCounsellor(request);
    }
    @PostMapping("/login")
    public CounsellorLoginResponse login(
            @Valid @RequestBody CounsellorLoginRequest request) {

        return counsellorService.login(request);
    }
    @GetMapping("/profile")
    public CounsellorProfileResponse getProfile() {
        return counsellorService.getProfile();
    }
    @PutMapping("/profile")
    public String updateProfile(
            @Valid @RequestBody UpdateCounsellorProfileRequest request) {

        counsellorService.updateProfile(request);

        return "Profile updated successfully";
    }
    @PutMapping("/change-password")
    public String changePassword(
            @Valid @RequestBody ChangeCounsellorPasswordRequest request) {

        return counsellorService.changePassword(request);
    }
    @GetMapping("/dashboard")
    public ResponseEntity<CounsellorDashboardResponse> getDashboard(
            Authentication authentication) {

        return ResponseEntity.ok(
                counsellorService.getDashboard(authentication.getName()));
    }
    @GetMapping("/appointments")
    public ResponseEntity<List<AppointmentResponse>> getAppointments(
            Authentication authentication) {

        return ResponseEntity.ok(
                appointmentService.getCounsellorAppointments(authentication.getName()));
    }

    @PutMapping("/appointments/{id}/approve")
    public ResponseEntity<String> approveAppointment(
            @PathVariable Long id,
            Authentication authentication) {

        return ResponseEntity.ok(
                appointmentService.approveAppointment(id, authentication.getName()));
    }

    @PutMapping("/appointments/{id}/complete")
    public ResponseEntity<String> completeAppointment(
            @PathVariable Long id,
            Authentication authentication) {

        return ResponseEntity.ok(
                appointmentService.completeAppointment(id, authentication.getName()));
    }
}
