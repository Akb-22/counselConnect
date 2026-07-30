package com.example.counselconnect.services;

import com.example.counselconnect.dto.*;


public interface StudentService {

    StudentResponse registerStudent(StudentRequest studentRequest);
    LoginResponse loginStudent(LoginRequest loginRequest);
    ProfileResponse getProfile();
    ProfileResponse updateProfile(UpdateProfileRequest request);
    String changePassword(ChangePasswordRequest request);

    StudentDashboardResponse getDashboard(String email);
}
