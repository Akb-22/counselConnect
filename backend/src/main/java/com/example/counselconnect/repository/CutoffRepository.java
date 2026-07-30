package com.example.counselconnect.repository;

import com.example.counselconnect.entity.College;
import com.example.counselconnect.entity.Cutoff;
import com.example.counselconnect.enums.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CutoffRepository extends JpaRepository<Cutoff, Long> {
    List<Cutoff> findByCategoryAndHomeStateAndClosingRankGreaterThanEqual(
            Category category,
            String homeState,
            Integer closingRank
    );
    boolean existsByCollege(College college);
}