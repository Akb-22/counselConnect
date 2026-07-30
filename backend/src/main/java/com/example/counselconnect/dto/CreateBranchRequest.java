package com.example.counselconnect.dto;

import lombok.Data;

@Data
public class CreateBranchRequest {

    private String branchName;
    private String branchCode;
    private Integer seatIntake;
    private Long collegeId;
}