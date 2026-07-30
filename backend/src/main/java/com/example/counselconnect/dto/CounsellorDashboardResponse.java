package com.example.counselconnect.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CounsellorDashboardResponse {

    private String counsellorName;

    private Long totalAppointments;

    private Long pendingAppointments;

    private Long approvedAppointments;

    private Long completedAppointments;
}