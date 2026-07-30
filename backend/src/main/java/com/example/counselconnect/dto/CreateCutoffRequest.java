package com.example.counselconnect.dto;

import com.example.counselconnect.enums.Category;
import lombok.Data;

@Data
public class CreateCutoffRequest {

    private Long collegeId;
    private Long branchId;
    private Category category;
    private String homeState;
    private Integer openingRank;
    private Integer closingRank;
    private Integer year;
}
