package com.example.counselconnect.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateProfileRequest {

    @NotBlank(message = "Phone is required")
    private String phone;

    private LocalDate dateOfBirth;

    @NotBlank(message = "Address is required")
    private String address;

    @NotBlank(message = "City is required")
    private String city;

    @NotBlank(message = "State is required")
    private String state;

    @NotBlank(message = "Pincode is required")
    private String pincode;

    @NotBlank(message = "Parent name is required")
    private String parentName;

    @NotBlank(message = "Parent phone is required")
    private String parentPhone;
    private String jeeApplicationNumber;

    private Double jeePercentile;

    private Long allIndiaRank;

    private Long categoryRank;

    private Double class12Percentage;

    private Integer passingYear;

    private Boolean pwd;

    private String homeState;

    private String stateOfEligibility;
}