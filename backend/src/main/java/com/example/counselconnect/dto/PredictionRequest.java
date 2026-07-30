package com.example.counselconnect.dto;

import com.example.counselconnect.enums.Category;
import lombok.Data;

@Data
public class PredictionRequest {

    private Integer rank;
    private Category category;
    private String homeState;

}