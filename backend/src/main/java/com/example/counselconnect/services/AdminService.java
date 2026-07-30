package com.example.counselconnect.services;
import java.util.List;

import com.example.counselconnect.dto.*;

public interface AdminService {

    String register(AdminRegisterRequest request);

    String login(AdminLoginRequest request);

    AdminResponse getProfile(String email);
    AdminDashboardResponse getDashboard();
    List<StudentResponse> getAllStudents();
    List<CounsellorProfileResponse> getAllCounsellors();
    List<AppointmentResponse> getAllAppointments();
    void deleteStudent(Long studentId);
    void deleteCounsellor(Long counsellorId);
    CollegeResponse addCollege(CreateCollegeRequest request);
    void deleteCollege(Long collegeId);

    List<CollegeResponse> getAllColleges();
}