package com.example.counselconnect.service.impl;
import com.example.counselconnect.dto.*;
import com.example.counselconnect.enums.AppointmentStatus;
import com.example.counselconnect.repository.AppointmentRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.context.SecurityContextHolder;
import com.example.counselconnect.entity.Counsellor;
import com.example.counselconnect.repository.CounsellorRepository;
import com.example.counselconnect.security.JwtService;
import com.example.counselconnect.services.CounsellorService;
import org.springframework.security.core.context.SecurityContextHolder;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CounsellorServiceImpl implements CounsellorService {

    private final CounsellorRepository counsellorRepository;
    private final PasswordEncoder passwordEncoder;

    private final AppointmentRepository appointmentRepository;

    @Override
    public String registerCounsellor(RegisterCounsellorRequest request) {

        if (counsellorRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        Counsellor counsellor = Counsellor.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .specialization(request.getSpecialization())
                .phone(request.getPhone())
                .build();

        counsellorRepository.save(counsellor);

        return "Counsellor registered successfully";
    }
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    @Override
    public CounsellorLoginResponse login(CounsellorLoginRequest request) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        Counsellor counsellor = counsellorRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Counsellor not found"));

        String token = jwtService.generateToken(counsellor.getEmail());

        return new CounsellorLoginResponse(
                token,
                "Login successful"
        );
    }
    @Override
    public CounsellorProfileResponse getProfile() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        Counsellor counsellor = counsellorRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Counsellor not found"));

        return CounsellorProfileResponse.builder()
                .firstName(counsellor.getFirstName())
                .lastName(counsellor.getLastName())
                .email(counsellor.getEmail())
                .specialization(counsellor.getSpecialization())
                .phone(counsellor.getPhone())
                .address(counsellor.getAddress())
                .city(counsellor.getCity())
                .state(counsellor.getState())
                .pincode(counsellor.getPincode())
                .experience(counsellor.getExperience())
                .build();
    }
    @Override
    public void updateProfile(UpdateCounsellorProfileRequest request) {

        String email = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        Counsellor counsellor = counsellorRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Counsellor not found"));

        counsellor.setFirstName(request.getFirstName());
        counsellor.setLastName(request.getLastName());
        counsellor.setSpecialization(request.getSpecialization());
        counsellor.setPhone(request.getPhone());
        counsellor.setAddress(request.getAddress());
        counsellor.setCity(request.getCity());
        counsellor.setState(request.getState());
        counsellor.setPincode(request.getPincode());
        counsellor.setExperience(request.getExperience());

        counsellorRepository.save(counsellor);
    }
    @Override
    public String changePassword(ChangeCounsellorPasswordRequest request) {

        String email = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        Counsellor counsellor = counsellorRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Counsellor not found"));

        if (!passwordEncoder.matches(
                request.getCurrentPassword(),
                counsellor.getPassword())) {

            throw new RuntimeException("Current password is incorrect");
        }

        counsellor.setPassword(
                passwordEncoder.encode(request.getNewPassword()));

        counsellorRepository.save(counsellor);

        return "Password changed successfully";
    }
    @Override
    public CounsellorDashboardResponse getDashboard(String email) {

        Counsellor counsellor = counsellorRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Counsellor not found"));

        return CounsellorDashboardResponse.builder()
                .counsellorName(
                        counsellor.getFirstName() + " " + counsellor.getLastName())
                .totalAppointments(
                        appointmentRepository.countByCounsellor(counsellor))
                .pendingAppointments(
                        appointmentRepository.countByCounsellorAndStatus(
                                counsellor, AppointmentStatus.PENDING))
                .approvedAppointments(
                        appointmentRepository.countByCounsellorAndStatus(
                                counsellor, AppointmentStatus.APPROVED))
                .completedAppointments(
                        appointmentRepository.countByCounsellorAndStatus(
                                counsellor, AppointmentStatus.COMPLETED))
                .build();
    }
    @Override
    public List<CounsellorResponse> getAllCounsellors() {

        return counsellorRepository.findAll()
                .stream()
                .map(c -> CounsellorResponse.builder()
                        .id(c.getId())
                        .fullName(c.getFirstName() + " " + c.getLastName())
                        .build())
                .toList();
    }

}