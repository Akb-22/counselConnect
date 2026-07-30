package com.example.counselconnect.entity;

import jakarta.persistence.*;
import lombok.*;


@Entity
@Table(name = "colleges")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class College {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String collegeName;

    @Column(unique = true, nullable = false)
    private String collegeCode;

    @Column(nullable = false)
    private String collegeType;

    @Column(nullable = false)
    private String state;

    @Column(nullable = false)
    private String city;

    @Column(nullable = false)
    private Integer nirfRanking;

    @Column(nullable = false)
    private String website;


    @Column(nullable = false)
    private String address;
}

