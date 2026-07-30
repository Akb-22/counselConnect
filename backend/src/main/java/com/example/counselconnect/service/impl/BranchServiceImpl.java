package com.example.counselconnect.service.impl;

import com.example.counselconnect.dto.BranchResponse;
import com.example.counselconnect.dto.CreateBranchRequest;
import com.example.counselconnect.entity.Branch;
import com.example.counselconnect.entity.College;
import com.example.counselconnect.repository.BranchRepository;
import com.example.counselconnect.repository.CollegeRepository;
import com.example.counselconnect.services.BranchService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BranchServiceImpl implements BranchService {

    private final BranchRepository branchRepository;
    private final CollegeRepository collegeRepository;

    @Override
    public String addBranch(CreateBranchRequest request) {

        College college = collegeRepository.findById(request.getCollegeId())
                .orElseThrow(() -> new RuntimeException("College not found"));

        Branch branch = Branch.builder()
                .branchName(request.getBranchName())
                .branchCode(request.getBranchCode())
                .seatIntake(request.getSeatIntake())
                .college(college)
                .build();

        branchRepository.save(branch);

        return "Branch added successfully";
    }

    @Override
    public BranchResponse getBranch(Long id) {

        Branch branch = branchRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Branch not found"));

        return BranchResponse.builder()
                .id(branch.getId())
                .branchName(branch.getBranchName())
                .branchCode(branch.getBranchCode())
                .seatIntake(branch.getSeatIntake())
                .collegeName(branch.getCollege().getCollegeName())
                .build();
    }

    @Override
    public List<BranchResponse> getAllBranches() {

        return branchRepository.findAll()
                .stream()
                .map(branch -> BranchResponse.builder()
                        .id(branch.getId())
                        .branchName(branch.getBranchName())
                        .branchCode(branch.getBranchCode())
                        .seatIntake(branch.getSeatIntake())
                        .collegeName(branch.getCollege().getCollegeName())
                        .build())
                .toList();
    }

    @Override
    public List<BranchResponse> getBranchesByCollege(Long collegeId) {

        return branchRepository.findByCollegeId(collegeId)
                .stream()
                .map(branch -> BranchResponse.builder()
                        .id(branch.getId())
                        .branchName(branch.getBranchName())
                        .branchCode(branch.getBranchCode())
                        .seatIntake(branch.getSeatIntake())
                        .collegeName(branch.getCollege().getCollegeName())
                        .build())
                .toList();
    }

    @Override
    public String updateBranch(Long id, CreateBranchRequest request) {

        Branch branch = branchRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Branch not found"));

        College college = collegeRepository.findById(request.getCollegeId())
                .orElseThrow(() -> new RuntimeException("College not found"));

        branch.setBranchName(request.getBranchName());
        branch.setBranchCode(request.getBranchCode());
        branch.setSeatIntake(request.getSeatIntake());
        branch.setCollege(college);

        branchRepository.save(branch);

        return "Branch updated successfully";
    }

    @Override
    public String deleteBranch(Long id) {

        Branch branch = branchRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Branch not found"));

        branchRepository.delete(branch);

        return "Branch deleted successfully";
    }
}