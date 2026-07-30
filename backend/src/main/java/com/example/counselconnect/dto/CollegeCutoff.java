package com.example.counselconnect.dto;

import com.example.counselconnect.entity.College;
import com.example.counselconnect.enums.Category;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "college_cutoffs")
public class CollegeCutoff {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "college_id")
    private College college;

    private String branch;

    @Enumerated(EnumType.STRING)
    private Category category;

    private Integer year;

    private Long openingRank;

    private Long closingRank;
}