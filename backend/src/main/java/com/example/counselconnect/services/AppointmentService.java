package com.example.counselconnect.services;



import com.example.counselconnect.dto.AppointmentResponse;
import com.example.counselconnect.dto.BookAppointmentRequest;
import com.example.counselconnect.dto.CounsellorDashboardResponse;
import com.example.counselconnect.dto.StudentDashboardResponse;

import java.util.List;

public interface AppointmentService {

    String bookAppointment(BookAppointmentRequest request);
    List<AppointmentResponse> getStudentAppointments(String email);
    List<AppointmentResponse> getCounsellorAppointments(String email);
    String approveAppointment(Long appointmentId, String email);
    String completeAppointment(Long appointmentId, String email);
    StudentDashboardResponse getStudentDashboard(String email);
    CounsellorDashboardResponse getCounsellorDashboard(String email);

}