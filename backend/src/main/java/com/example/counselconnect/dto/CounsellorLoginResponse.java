package com.example.counselconnect.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CounsellorLoginResponse {

    private String token;
    private String message;
}