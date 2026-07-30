package com.example.counselconnect.services;

import com.example.counselconnect.dto.*;
import com.example.counselconnect.dto.CounsellorResponse;
import java.util.List;

public interface CounsellorService {

    String registerCounsellor(RegisterCounsellorRequest request);
    CounsellorLoginResponse login(CounsellorLoginRequest request);
    CounsellorProfileResponse getProfile();
    void updateProfile(UpdateCounsellorProfileRequest request);
    String changePassword(ChangeCounsellorPasswordRequest request);
    CounsellorDashboardResponse getDashboard(String email);
    List<CounsellorResponse> getAllCounsellors();
}