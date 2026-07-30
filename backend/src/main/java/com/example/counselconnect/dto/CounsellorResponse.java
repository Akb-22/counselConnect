package com.example.counselconnect.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CounsellorResponse {

    private Long id;
    private String fullName;
    private String specialization;
    private Integer experience;
    private String email;
    private String phone;
    private String city;
    private String state;
}