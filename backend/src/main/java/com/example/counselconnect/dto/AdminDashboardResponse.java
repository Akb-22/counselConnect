package com.example.counselconnect.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdminDashboardResponse {

    private Long totalStudents;
    private Long totalCounsellors;
    private Long totalAppointments;
    private Long pendingAppointments;
    private Long approvedAppointments;
    private Long rejectedAppointments;
    private Long completedAppointments;
}