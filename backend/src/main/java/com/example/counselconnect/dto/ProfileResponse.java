package com.example.counselconnect.dto;

import com.example.counselconnect.enums.Category;
import com.example.counselconnect.enums.Gender;
import com.example.counselconnect.enums.Role;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProfileResponse {

    private Long id;

    private String firstName;

    private String lastName;

    private String email;

    private String phone;

    private Gender gender;

    private Category category;

    private Role role;

    private LocalDate dateOfBirth;

    private String address;

    private String city;

    private String state;

    private String pincode;

    private String parentName;

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