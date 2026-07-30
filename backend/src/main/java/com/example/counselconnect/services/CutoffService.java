package com.example.counselconnect.services;

import com.example.counselconnect.dto.CollegePredictionResponse;
import com.example.counselconnect.dto.CreateCutoffRequest;
import com.example.counselconnect.dto.CutoffResponse;
import com.example.counselconnect.dto.PredictionRequest;

import java.util.List;

public interface CutoffService {

    String addCutoff(CreateCutoffRequest request);

    CutoffResponse getCutoff(Long id);

    List<CutoffResponse> getAllCutoffs();

    String updateCutoff(Long id, CreateCutoffRequest request);

    String deleteCutoff(Long id);
    List<CollegePredictionResponse> predictCollege(PredictionRequest request);

}