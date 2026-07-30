package com.example.counselconnect.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "documents")
public class Document {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String documentName;

    private String fileUrl;

    private String verificationStatus;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;
}