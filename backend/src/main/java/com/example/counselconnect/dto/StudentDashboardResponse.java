package com.example.counselconnect.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StudentDashboardResponse {

    private String studentName;

    private Long totalAppointments;

    private Long pendingAppointments;

    private Long approvedAppointments;

    private Long completedAppointments;

    private Double jeePercentile;

    private Long allIndiaRank;

}