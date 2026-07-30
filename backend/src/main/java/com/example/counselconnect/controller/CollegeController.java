package com.example.counselconnect.controller;

import com.example.counselconnect.dto.CollegeResponse;
import com.example.counselconnect.dto.CreateCollegeRequest;
import com.example.counselconnect.services.CollegeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/colleges")
@RequiredArgsConstructor
public class CollegeController {

    private final CollegeService collegeService;

    @PostMapping
    public ResponseEntity<String> addCollege(@RequestBody CreateCollegeRequest request) {
        return ResponseEntity.ok(collegeService.addCollege(request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<CollegeResponse> getCollege(@PathVariable Long id) {
        return ResponseEntity.ok(collegeService.getCollege(id));
    }

    @GetMapping
    public ResponseEntity<List<CollegeResponse>> getAllColleges() {
        return ResponseEntity.ok(collegeService.getAllColleges());
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateCollege(
            @PathVariable Long id,
            @RequestBody CreateCollegeRequest request) {

        return ResponseEntity.ok(collegeService.updateCollege(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCollege(@PathVariable Long id) {
        return ResponseEntity.ok(collegeService.deleteCollege(id));
    }

}