package com.example.counselconnect.services;

import com.example.counselconnect.dto.DocumentResponse;
import org.springframework.web.multipart.MultipartFile;


import com.example.counselconnect.dto.DocumentResponse;
import org.springframework.web.multipart.MultipartFile;

public interface StudentDocumentService {

    String uploadDocument(
            String email,
            String documentType,
            MultipartFile file
    );

    DocumentResponse getMyDocuments(String email);

}