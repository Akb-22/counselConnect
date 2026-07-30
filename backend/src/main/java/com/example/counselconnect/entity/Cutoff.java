package com.example.counselconnect.entity;

import com.example.counselconnect.enums.Category;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "cutoffs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Cutoff {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "college_id", nullable = false)
    private College college;

    @ManyToOne
    @JoinColumn(name = "branch_id", nullable = false)
    private Branch branch;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Category category;

    @Column(nullable = false)
    private String homeState;

    @Column(nullable = false)
    private Integer openingRank;

    @Column(nullable = false)
    private Integer closingRank;

    @Column(nullable = false)
    private Integer year;
}