package com.example.counselconnect.dto;

import com.example.counselconnect.enums.Category;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
@Data
public class PredictionRequest {
    @NotNull
    private Integer rank;
    @NotNull
    private Category category;
    @NotBlank
    private String homeState;

    private String collegeType;
    private String branchName;
}