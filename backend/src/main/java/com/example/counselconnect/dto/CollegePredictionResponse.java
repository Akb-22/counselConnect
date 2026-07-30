package com.example.counselconnect.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CollegePredictionResponse {

    private String collegeName;
    private String branchName;
    private String category;
    private String homeState;
    private Integer openingRank;
    private Integer closingRank;
    private Integer year;
}
