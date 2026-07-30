package com.example.counselconnect.dto;

import lombok.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Data
@Builder
public class CollegeResponse {

    private Long id;
    private String collegeName;
    private String collegeCode;
    private String collegeType;
    private String state;
    private String city;
    private Integer nirfRanking;
    private String website;
    private String address;
}