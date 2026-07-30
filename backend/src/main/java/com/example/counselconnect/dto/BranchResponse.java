package com.example.counselconnect.dto;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class BranchResponse {

    private Long id;
    private String branchName;
    private String branchCode;
    private Integer seatIntake;
    private String collegeName;
}