package com.example.counselconnect.entity;



import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "payments")
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double amount;

    private String paymentStatus;

    private String transactionId;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;
}