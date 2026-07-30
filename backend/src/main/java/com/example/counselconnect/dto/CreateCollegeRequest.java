package com.example.counselconnect.dto;

import lombok.*;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateCollegeRequest {

    private String collegeName;
    private String collegeCode;
    private String collegeType;
    private String state;
    private String city;
    private Integer nirfRanking;
    private String website;
    private String address;}


