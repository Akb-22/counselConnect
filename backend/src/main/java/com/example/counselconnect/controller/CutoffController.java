package com.example.counselconnect.controller;

import com.example.counselconnect.dto.CollegePredictionResponse;
import com.example.counselconnect.dto.CreateCutoffRequest;
import com.example.counselconnect.dto.CutoffResponse;
import com.example.counselconnect.dto.PredictionRequest;
import com.example.counselconnect.services.CutoffService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cutoffs")
@RequiredArgsConstructor
public class CutoffController {

    private final CutoffService cutoffService;

    @PostMapping
    public ResponseEntity<String> addCutoff(@RequestBody CreateCutoffRequest request) {
        return ResponseEntity.ok(cutoffService.addCutoff(request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<CutoffResponse> getCutoff(@PathVariable Long id) {
        return ResponseEntity.ok(cutoffService.getCutoff(id));
    }

    @GetMapping
    public ResponseEntity<List<CutoffResponse>> getAllCutoffs() {
        return ResponseEntity.ok(cutoffService.getAllCutoffs());
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateCutoff(
            @PathVariable Long id,
            @RequestBody CreateCutoffRequest request) {

        return ResponseEntity.ok(cutoffService.updateCutoff(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCutoff(@PathVariable Long id) {
        return ResponseEntity.ok(cutoffService.deleteCutoff(id));
    }
    @PostMapping("/predict")
    public ResponseEntity<List<CollegePredictionResponse>> predictCollege(
            @Valid @RequestBody PredictionRequest request) {

        return ResponseEntity.ok(
                cutoffService.predictCollege(request)
        );
    }

}