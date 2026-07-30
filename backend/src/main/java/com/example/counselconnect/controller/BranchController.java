package com.example.counselconnect.controller;

import com.example.counselconnect.dto.BranchResponse;
import com.example.counselconnect.dto.CreateBranchRequest;
import com.example.counselconnect.services.BranchService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/branches")
@RequiredArgsConstructor
public class BranchController {

    private final BranchService branchService;

    @PostMapping
    public ResponseEntity<String> addBranch(@RequestBody CreateBranchRequest request) {
        return ResponseEntity.ok(branchService.addBranch(request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<BranchResponse> getBranch(@PathVariable Long id) {
        return ResponseEntity.ok(branchService.getBranch(id));
    }

    @GetMapping
    public ResponseEntity<List<BranchResponse>> getAllBranches() {
        return ResponseEntity.ok(branchService.getAllBranches());
    }

    @GetMapping("/college/{collegeId}")
    public ResponseEntity<List<BranchResponse>> getBranchesByCollege(
            @PathVariable Long collegeId) {

        return ResponseEntity.ok(
                branchService.getBranchesByCollege(collegeId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateBranch(
            @PathVariable Long id,
            @RequestBody CreateBranchRequest request) {

        return ResponseEntity.ok(
                branchService.updateBranch(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBranch(@PathVariable Long id) {

        return ResponseEntity.ok(
                branchService.deleteBranch(id));
    }
}