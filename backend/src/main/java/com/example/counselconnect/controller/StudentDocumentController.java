package com.example.counselconnect.controller;

import com.example.counselconnect.dto.DocumentResponse;
import com.example.counselconnect.dto.DocumentUploadResponse;
import com.example.counselconnect.services.StudentDocumentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/documents")
@RequiredArgsConstructor
public class StudentDocumentController {

    private final StudentDocumentService documentService;
    @PostMapping("/upload")
    public ResponseEntity<DocumentUploadResponse> uploadDocuments(

            @RequestParam(required = false) MultipartFile aadhaar,

            @RequestParam(required = false) MultipartFile scorecard,

            @RequestParam(required = false) MultipartFile marksheet,

            @RequestParam(required = false) MultipartFile photo,

            @RequestParam(required = false) MultipartFile signature,

            @RequestParam(required = false) MultipartFile categoryCertificate,

            @RequestParam(required = false) MultipartFile domicileCertificate,

            Authentication authentication
    ) {

        String message = documentService.uploadDocuments(
                authentication.getName(),
                aadhaar,
                scorecard,
                marksheet,
                photo,
                signature,
                categoryCertificate,
                domicileCertificate
        );

        return ResponseEntity.ok(new DocumentUploadResponse(message));
    }
    @GetMapping("/my")
    public ResponseEntity<DocumentResponse> getMyDocuments(
            Authentication authentication
    ) {

        return ResponseEntity.ok(
                documentService.getMyDocuments(authentication.getName())
        );
    }
}