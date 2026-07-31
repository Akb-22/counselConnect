package com.example.counselconnect.service.impl;



import com.example.counselconnect.dto.DocumentResponse;
import com.example.counselconnect.entity.Student;
import com.example.counselconnect.entity.StudentDocument;
import com.example.counselconnect.enums.VerificationStatus;
import com.example.counselconnect.repository.StudentDocumentRepository;
import com.example.counselconnect.repository.StudentRepository;
import com.example.counselconnect.services.StudentDocumentService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class StudentDocumentServiceImpl implements StudentDocumentService {

    private final StudentRepository studentRepository;
    private final StudentDocumentRepository documentRepository;

    @Value("${file.upload-dir}")
    private String uploadDir;

    @Override
    public String uploadDocument(String email,
                                 String documentType,
                                 MultipartFile file) {

        Student student = studentRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        StudentDocument document = documentRepository.findByStudent(student)
                .orElse(StudentDocument.builder()
                        .student(student)
                        .verificationStatus(VerificationStatus.PENDING)
                        .uploadedAt(LocalDateTime.now())
                        .build());

        try {

            String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();

            Path path = Paths.get(uploadDir, fileName);

            Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);

            switch (documentType.toLowerCase()) {

                case "aadhaar":
                    document.setAadhaarPath(fileName);
                    break;

                case "jee":
                    document.setJeeScorecardPath(fileName);
                    break;

                case "twelfth":
                    document.setTwelfthMarksheetPath(fileName);
                    break;

                case "photo":
                    document.setPhotoPath(fileName);
                    break;

                case "signature":
                    document.setSignaturePath(fileName);
                    break;

                case "category":
                    document.setCategoryCertificatePath(fileName);
                    break;

                case "domicile":
                    document.setDomicileCertificatePath(fileName);
                    break;

                default:
                    throw new RuntimeException("Invalid document type");
            }

            document.setVerificationStatus(VerificationStatus.PENDING);
            document.setUploadedAt(LocalDateTime.now());

            documentRepository.save(document);

            return "Document uploaded successfully.";

        } catch (IOException e) {
            throw new RuntimeException("Failed to upload document.");
        }

    }
    @Override
    public DocumentResponse getMyDocuments(String email) {

        Student student = studentRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        StudentDocument document = documentRepository.findByStudent(student)
                .orElseThrow(() -> new RuntimeException("Documents not uploaded"));

        return DocumentResponse.builder()
                .aadhaarPath(document.getAadhaarPath())
                .jeeScorecardPath(document.getJeeScorecardPath())
                .twelfthMarksheetPath(document.getTwelfthMarksheetPath())
                .photoPath(document.getPhotoPath())
                .signaturePath(document.getSignaturePath())
                .categoryCertificatePath(document.getCategoryCertificatePath())
                .domicileCertificatePath(document.getDomicileCertificatePath())
                .verificationStatus(document.getVerificationStatus().name())
                .build();
    }
}