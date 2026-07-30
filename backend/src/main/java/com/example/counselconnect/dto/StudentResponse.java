package com.example.counselconnect.dto;

import com.example.counselconnect.enums.Category;
import com.example.counselconnect.enums.Gender;
import com.example.counselconnect.enums.Role;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudentResponse {

    private Long id;

    private String firstName;

    private String lastName;

    private String email;

    private String phone;

    private Gender gender;

    private Category category;

    private Role role;
}
