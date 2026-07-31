package com.example.counselconnect.dto;





import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DocumentResponse {

    private String aadhaarPath;

    private String jeeScorecardPath;

    private String twelfthMarksheetPath;

    private String photoPath;

    private String signaturePath;

    private String categoryCertificatePath;

    private String domicileCertificatePath;

    private String verificationStatus;
}