
package com.example.counselconnect.services;

import com.example.counselconnect.dto.CollegeResponse;
import com.example.counselconnect.dto.CreateCollegeRequest;

import java.util.List;

public interface CollegeService {

    String addCollege(CreateCollegeRequest request);

    CollegeResponse getCollege(Long id);

    List<CollegeResponse> getAllColleges();

    String updateCollege(Long id, CreateCollegeRequest request);

    String deleteCollege(Long id);
}