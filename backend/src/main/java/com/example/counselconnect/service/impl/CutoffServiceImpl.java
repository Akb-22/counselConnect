package com.example.counselconnect.service.impl;

import com.example.counselconnect.dto.CollegePredictionResponse;
import com.example.counselconnect.dto.CreateCutoffRequest;
import com.example.counselconnect.dto.CutoffResponse;
import com.example.counselconnect.dto.PredictionRequest;
import com.example.counselconnect.entity.Branch;
import com.example.counselconnect.entity.College;
import com.example.counselconnect.entity.Cutoff;
import com.example.counselconnect.entity.Student;
import com.example.counselconnect.repository.BranchRepository;
import com.example.counselconnect.repository.CollegeRepository;
import com.example.counselconnect.repository.CutoffRepository;
import com.example.counselconnect.repository.StudentRepository;
import com.example.counselconnect.services.CutoffService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CutoffServiceImpl implements CutoffService {

    private final CutoffRepository cutoffRepository;
    private final CollegeRepository collegeRepository;
    private final BranchRepository branchRepository;

    @Override
    public String addCutoff(CreateCutoffRequest request) {

        College college = collegeRepository.findById(request.getCollegeId())
                .orElseThrow(() -> new RuntimeException("College not found"));

        Branch branch = branchRepository.findById(request.getBranchId())
                .orElseThrow(() -> new RuntimeException("Branch not found"));

        Cutoff cutoff = Cutoff.builder()
                .college(college)
                .branch(branch)
                .category(request.getCategory())
                .homeState(request.getHomeState())
                .openingRank(request.getOpeningRank())
                .closingRank(request.getClosingRank())
                .year(request.getYear())
                .build();

        cutoffRepository.save(cutoff);

        return "Cutoff added successfully";
    }

    @Override
    public CutoffResponse getCutoff(Long id) {

        Cutoff cutoff = cutoffRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cutoff not found"));

        return mapToResponse(cutoff);
    }

    @Override
    public List<CutoffResponse> getAllCutoffs() {

        return cutoffRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public String updateCutoff(Long id, CreateCutoffRequest request) {

        Cutoff cutoff = cutoffRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cutoff not found"));

        College college = collegeRepository.findById(request.getCollegeId())
                .orElseThrow(() -> new RuntimeException("College not found"));

        Branch branch = branchRepository.findById(request.getBranchId())
                .orElseThrow(() -> new RuntimeException("Branch not found"));

        cutoff.setCollege(college);
        cutoff.setBranch(branch);
        cutoff.setCategory(request.getCategory());
        cutoff.setHomeState(request.getHomeState());
        cutoff.setOpeningRank(request.getOpeningRank());
        cutoff.setClosingRank(request.getClosingRank());
        cutoff.setYear(request.getYear());

        cutoffRepository.save(cutoff);

        return "Cutoff updated successfully";
    }


    @Override
    public String deleteCutoff(Long id) {

        Cutoff cutoff = cutoffRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cutoff not found"));

        cutoffRepository.delete(cutoff);

        return "Cutoff deleted successfully";
    }

    private CutoffResponse mapToResponse(Cutoff cutoff) {

        return CutoffResponse.builder()
                .id(cutoff.getId())
                .collegeName(cutoff.getCollege().getCollegeName())
                .branchName(cutoff.getBranch().getBranchName())
                .category(cutoff.getCategory())
                .homeState(cutoff.getHomeState())
                .openingRank(cutoff.getOpeningRank())
                .closingRank(cutoff.getClosingRank())
                .year(cutoff.getYear())
                .build();
    }
    private final StudentRepository studentRepository;
    @Override
    public List<CollegePredictionResponse> predictCollege(PredictionRequest request) {

        List<Cutoff> cutoffs =
                cutoffRepository.findByCategoryAndHomeStateAndClosingRankGreaterThanEqual(
                        request.getCategory(),
                        request.getHomeState(),
                        request.getRank()
                );

        return cutoffs.stream()
                .map(cutoff -> CollegePredictionResponse.builder()
                        .collegeName(cutoff.getCollege().getCollegeName())
                        .branchName(cutoff.getBranch().getBranchName())
                        .category(cutoff.getCategory().name())
                        .homeState(cutoff.getHomeState())
                        .openingRank(cutoff.getOpeningRank())
                        .closingRank(cutoff.getClosingRank())
                        .year(cutoff.getYear())
                        .build())
                .toList();
    }}