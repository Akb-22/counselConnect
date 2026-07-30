package com.example.counselconnect.repository;

import com.example.counselconnect.entity.Branch;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BranchRepository extends JpaRepository<Branch, Long> {

    List<Branch> findByCollegeId(Long collegeId);
}
