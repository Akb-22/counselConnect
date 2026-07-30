package com.example.counselconnect.controller;

import com.example.counselconnect.dto.*;
import com.example.counselconnect.services.AppointmentService;
import com.example.counselconnect.services.StudentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.security.cert.Extension;
import java.util.List;
import com.example.counselconnect.dto.CounsellorResponse;import com.example.counselconnect.services.CounsellorService;
@RestController
@RequestMapping("/api/students")
public class StudentController {
    @Autowired
    private AppointmentService appointmentService;
    private final StudentService studentService;

    private final CounsellorService counsellorService;
    public StudentController(StudentService studentService, CounsellorService counsellorService) {
        this.studentService = studentService;
        this.counsellorService = counsellorService;
    }

    @PostMapping("/register")
    public StudentResponse registerStudent(@Valid @RequestBody StudentRequest studentRequest) {
        return studentService.registerStudent(studentRequest);}


    @PostMapping("/login")
    public LoginResponse loginStudent(
            @Valid @RequestBody LoginRequest loginRequest) {

        return studentService.loginStudent(loginRequest);
    }

    @GetMapping("/profile")
    public ProfileResponse getProfile() {
        return studentService.getProfile();
    }
    @PutMapping("/profile")
    public ProfileResponse updateProfile(@Valid @RequestBody UpdateProfileRequest request) {
        return studentService.updateProfile(request);
    }
    @PutMapping("/change-password")
    public String changePassword(
            @Valid @RequestBody ChangePasswordRequest request) {

        return studentService.changePassword(request);
    }
    @GetMapping("/dashboard")
    public ResponseEntity<StudentDashboardResponse> getDashboard(
            Authentication authentication) {

        return ResponseEntity.ok(
                studentService.getDashboard(authentication.getName()));
    }
    @PostMapping("/appointments")
    public ResponseEntity<String> bookAppointment(
            @Valid @RequestBody BookAppointmentRequest request) {

        return ResponseEntity.ok(
                appointmentService.bookAppointment(request));
    }

    @GetMapping("/appointments")
    public ResponseEntity<List<AppointmentResponse>> getAppointments(
            Authentication authentication) {

        return ResponseEntity.ok(
                appointmentService.getStudentAppointments(authentication.getName()));
    }
    @GetMapping("/counsellors")
    public ResponseEntity<List<CounsellorResponse>> getAllCounsellors() {
        return ResponseEntity.ok(counsellorService.getAllCounsellors());
    }
}