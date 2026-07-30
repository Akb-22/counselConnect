package com.example.counselconnect.dto;

import com.example.counselconnect.enums.Category;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CutoffResponse {

    private Long id;
    private String collegeName;
    private String branchName;
    private Category category;
    private String homeState;
    private Integer openingRank;
    private Integer closingRank;
    private Integer year;
}