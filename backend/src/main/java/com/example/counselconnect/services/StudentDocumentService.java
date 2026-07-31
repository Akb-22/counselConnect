package com.example.counselconnect.services;

import com.example.counselconnect.dto.DocumentResponse;
import org.springframework.web.multipart.MultipartFile;


import com.example.counselconnect.dto.DocumentResponse;
import org.springframework.web.multipart.MultipartFile;

public interface StudentDocumentService {


    String uploadDocuments(
            String email,
            MultipartFile aadhaar,
            MultipartFile scorecard,
            MultipartFile marksheet,
            MultipartFile photo,
            MultipartFile signature,
            MultipartFile categoryCertificate,
            MultipartFile domicileCertificate
    );


    DocumentResponse getMyDocuments(String email);

}