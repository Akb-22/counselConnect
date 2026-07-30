package com.example.counselconnect.repository;



import com.example.counselconnect.entity.Counsellor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CounsellorRepository extends JpaRepository<Counsellor, Long> {

    Optional<Counsellor> findByEmail(String email);
    long count();
}