package com.example.counselconnect.repository;

import com.example.counselconnect.entity.Student;
import com.example.counselconnect.entity.StudentDocument;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StudentDocumentRepository extends JpaRepository<StudentDocument, Long> {

    Optional<StudentDocument> findByStudent(Student student);

    boolean existsByStudent(Student student);

}