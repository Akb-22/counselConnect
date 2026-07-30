package com.example.counselconnect.repository;

import com.example.counselconnect.entity.College;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CollegeRepository extends JpaRepository<College, Long> {
    boolean existsByCollegeCode(String collegeCode);
}