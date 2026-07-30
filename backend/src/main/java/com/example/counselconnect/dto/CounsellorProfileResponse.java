package com.example.counselconnect.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CounsellorProfileResponse {

    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String specialization;
    private String phone;
    private String address;
    private String city;
    private String state;
    private String pincode;
    private Integer experience;
}