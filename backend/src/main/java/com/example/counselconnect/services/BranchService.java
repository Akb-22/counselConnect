package com.example.counselconnect.services;

import com.example.counselconnect.dto.BranchResponse;
import com.example.counselconnect.dto.CreateBranchRequest;

import java.util.List;

public interface BranchService {

    String addBranch(CreateBranchRequest request);

    BranchResponse getBranch(Long id);

    List<BranchResponse> getAllBranches();

    List<BranchResponse> getBranchesByCollege(Long collegeId);

    String updateBranch(Long id, CreateBranchRequest request);

    String deleteBranch(Long id);
}