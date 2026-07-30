
package com.example.counselconnect.service.impl;

import com.example.counselconnect.dto.CollegeResponse;
import com.example.counselconnect.dto.CreateCollegeRequest;
import com.example.counselconnect.entity.College;
import com.example.counselconnect.repository.CollegeRepository;
import com.example.counselconnect.services.CollegeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CollegeServiceImpl implements CollegeService {

    private final CollegeRepository collegeRepository;

    @Override
    public String addCollege(CreateCollegeRequest request) {

        College college = College.builder()
                .collegeName(request.getCollegeName())
                .collegeCode(request.getCollegeCode())
                .collegeType(request.getCollegeType())
                .city(request.getCity())
                .state(request.getState())
                .address(request.getAddress())
                .nirfRanking(request.getNirfRanking())
                .website(request.getWebsite())
                .build();

        collegeRepository.save(college);

        return "College added successfully";
    }

    @Override
    public CollegeResponse getCollege(Long id) {

        College college = collegeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("College not found"));

        return CollegeResponse.builder()
                .id(college.getId())
                .collegeName(college.getCollegeName())
                .collegeCode(college.getCollegeCode())
                .city(college.getCity())
                .state(college.getState())
                .address(college.getAddress())
                .website(college.getWebsite())
                .build();
    }

    @Override
    public List<CollegeResponse> getAllColleges() {

        return collegeRepository.findAll()
                .stream()
                .map(college -> CollegeResponse.builder()
                        .id(college.getId())
                        .collegeName(college.getCollegeName())
                        .collegeCode(college.getCollegeCode())
                        .city(college.getCity())
                        .state(college.getState())
                        .address(college.getAddress())
                        .website(college.getWebsite())
                        .build())
                .toList();
    }

    @Override
    public String updateCollege(Long id, CreateCollegeRequest request) {

        College college = collegeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("College not found"));

        college.setCollegeName(request.getCollegeName());
        college.setCollegeCode(request.getCollegeCode());
        college.setCity(request.getCity());
        college.setState(request.getState());
        college.setAddress(request.getAddress());
        college.setWebsite(request.getWebsite());
        college.setCollegeType(request.getCollegeType());
        college.setNirfRanking(request.getNirfRanking());

        collegeRepository.save(college);

        return "College updated successfully";
    }

    @Override
    public String deleteCollege(Long id) {

        College college = collegeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("College not found"));

        collegeRepository.delete(college);

        return "College deleted successfully";
    }

}