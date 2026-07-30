package com.example.counselconnect.controller;

import com.example.counselconnect.dto.*;
import com.example.counselconnect.services.AdminService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @PostMapping("/register")
    public ResponseEntity<String> register(
            @Valid @RequestBody AdminRegisterRequest request) {

        return ResponseEntity.ok(adminService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(
            @Valid @RequestBody AdminLoginRequest request) {

        return ResponseEntity.ok(adminService.login(request));
    }

    @GetMapping("/profile")
    public ResponseEntity<AdminResponse> getProfile(
            Authentication authentication) {

        return ResponseEntity.ok(
                adminService.getProfile(authentication.getName()));
    }

    @GetMapping("/dashboard")
    public ResponseEntity<AdminDashboardResponse> getDashboard() {
        return ResponseEntity.ok(adminService.getDashboard());
    }

    @GetMapping("/students")
    public ResponseEntity<List<StudentResponse>> getAllStudents() {

        return ResponseEntity.ok(adminService.getAllStudents());

    }

    @GetMapping("/counsellors")
    public ResponseEntity<List<CounsellorProfileResponse>> getAllCounsellors() {
        return ResponseEntity.ok(adminService.getAllCounsellors());
    }

    @GetMapping("/appointments")
    public ResponseEntity<List<AppointmentResponse>> getAllAppointments() {
        return ResponseEntity.ok(adminService.getAllAppointments());
    }

    @DeleteMapping("/students/{studentId}")
    public ResponseEntity<String> deleteStudent(@PathVariable Long studentId) {

        adminService.deleteStudent(studentId);

        return ResponseEntity.ok("Student deleted successfully.");
    }

    @DeleteMapping("/counsellors/{counsellorId}")
    public ResponseEntity<String> deleteCounsellor(@PathVariable Long counsellorId) {

        adminService.deleteCounsellor(counsellorId);

        return ResponseEntity.ok("Counsellor deleted successfully.");
    }

    @PostMapping("/colleges")
    public ResponseEntity<CollegeResponse> addCollege(
            @RequestBody CreateCollegeRequest request) {

        CollegeResponse response = adminService.addCollege(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/colleges")
    public ResponseEntity<List<CollegeResponse>> getAllColleges() {
        return ResponseEntity.ok(adminService.getAllColleges());
    }

    @DeleteMapping("/colleges/{collegeId}")
    public ResponseEntity<String> deleteCollege(@PathVariable Long collegeId) {

        adminService.deleteCollege(collegeId);

        return ResponseEntity.ok("College deleted successfully.");
    }
}