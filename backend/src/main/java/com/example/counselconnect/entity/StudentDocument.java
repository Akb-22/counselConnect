package com.example.counselconnect.entity;



import com.example.counselconnect.enums.VerificationStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "student_documents")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudentDocument {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "student_id", nullable = false, unique = true)
    private Student student;

    private String aadhaarPath;

    private String jeeScorecardPath;

    private String twelfthMarksheetPath;

    private String photoPath;

    private String signaturePath;

    private String categoryCertificatePath;

    private String domicileCertificatePath;

    @Enumerated(EnumType.STRING)
    private VerificationStatus verificationStatus;

    private LocalDateTime uploadedAt;
}