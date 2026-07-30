package com.example.counselconnect.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChangeCounsellorPasswordRequest {

    @NotBlank
    private String currentPassword;

    @NotBlank
    private String newPassword;
}