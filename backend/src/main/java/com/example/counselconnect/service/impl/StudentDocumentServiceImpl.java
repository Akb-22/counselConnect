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
    public String uploadDocuments(
            String email,
            MultipartFile aadhaar,
            MultipartFile scorecard,
            MultipartFile marksheet,
            MultipartFile photo,
            MultipartFile signature,
            MultipartFile categoryCertificate,
            MultipartFile domicileCertificate
    ) {

        Student student = studentRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        StudentDocument document = documentRepository.findByStudent(student)
                .orElse(StudentDocument.builder()
                        .student(student)
                        .verificationStatus(VerificationStatus.PENDING)
                        .uploadedAt(LocalDateTime.now())
                        .build());

        try {

            if (aadhaar != null && !aadhaar.isEmpty()) {
                document.setAadhaarPath(saveFile(aadhaar));
            }

            if (scorecard != null && !scorecard.isEmpty()) {
                document.setJeeScorecardPath(saveFile(scorecard));
            }

            if (marksheet != null && !marksheet.isEmpty()) {
                document.setTwelfthMarksheetPath(saveFile(marksheet));
            }

            if (photo != null && !photo.isEmpty()) {
                document.setPhotoPath(saveFile(photo));
            }

            if (signature != null && !signature.isEmpty()) {
                document.setSignaturePath(saveFile(signature));
            }

            if (categoryCertificate != null && !categoryCertificate.isEmpty()) {
                document.setCategoryCertificatePath(saveFile(categoryCertificate));
            }

            if (domicileCertificate != null && !domicileCertificate.isEmpty()) {
                document.setDomicileCertificatePath(saveFile(domicileCertificate));
            }

            document.setVerificationStatus(VerificationStatus.PENDING);
            document.setUploadedAt(LocalDateTime.now());

            documentRepository.save(document);

            return "Documents uploaded successfully.";

        } catch (IOException e) {
            throw new RuntimeException("Failed to upload documents.");
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
    private String saveFile(MultipartFile file) throws IOException {

        String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();

        Path path = Paths.get(uploadDir);

        if (!Files.exists(path)) {
            Files.createDirectories(path);
        }

        Files.copy(
                file.getInputStream(),
                path.resolve(fileName),
                StandardCopyOption.REPLACE_EXISTING
        );

        return fileName;
    }
}