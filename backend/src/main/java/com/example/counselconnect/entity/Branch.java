package com.example.counselconnect.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "branches")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Branch {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String branchName;

    @Column(nullable = false)
    private String branchCode;

    @Column(nullable = false)
    private Integer seatIntake;

    @ManyToOne
    @JoinColumn(name = "college_id", nullable = false)
    private College college;
}