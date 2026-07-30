package com.example.counselconnect.service.impl;
import com.example.counselconnect.entity.College;
import com.example.counselconnect.entity.Counsellor;
import com.example.counselconnect.dto.*;
import com.example.counselconnect.entity.Admin;
import com.example.counselconnect.enums.Role;
import com.example.counselconnect.repository.*;
import com.example.counselconnect.security.JwtService;
import com.example.counselconnect.services.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.example.counselconnect.enums.AppointmentStatus;
import com.example.counselconnect.entity.Student;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {
    private final CollegeRepository collegeRepository;
    private final CutoffRepository cutoffRepository;
    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final StudentRepository studentRepository;
    private final CounsellorRepository counsellorRepository;
    private final AppointmentRepository appointmentRepository;
    @Override
    public String register(AdminRegisterRequest request) {

        if (adminRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Admin already exists");
        }

        Admin admin = Admin.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.ADMIN)
                .build();

        adminRepository.save(admin);

        return "Admin registered successfully";
    }

    @Override
    public String login(AdminLoginRequest request) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        Admin admin = adminRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Admin not found"));

        return jwtService.generateToken(admin.getEmail());
    }

    @Override
    public AdminResponse getProfile(String email) {

        Admin admin = adminRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Admin not found"));

        return AdminResponse.builder()
                .id(admin.getId())
                .fullName(admin.getFullName())
                .email(admin.getEmail())
                .build();
    }
    @Override
    public AdminDashboardResponse getDashboard() {

        return AdminDashboardResponse.builder()
                .totalStudents(studentRepository.count())
                .totalCounsellors(counsellorRepository.count())
                .totalAppointments(appointmentRepository.count())
                .pendingAppointments(
                        appointmentRepository.countByStatus(AppointmentStatus.PENDING))
                .approvedAppointments(
                        appointmentRepository.countByStatus(AppointmentStatus.APPROVED))
                .rejectedAppointments(
                        appointmentRepository.countByStatus(AppointmentStatus.REJECTED))
                .completedAppointments(
                        appointmentRepository.countByStatus(AppointmentStatus.COMPLETED))
                .build();
    }
    @Override
    public List<StudentResponse> getAllStudents() {

        List<Student> students = studentRepository.findAll();

        return students.stream()
                .map(student -> StudentResponse.builder()
                        .id(student.getId())
                        .firstName(student.getFirstName())
                        .lastName(student.getLastName())
                        .email(student.getEmail())
                        .phone(student.getPhone())
                        .gender(student.getGender())
                        .category(student.getCategory())
                        .role(student.getRole())
                        .build())
                .collect(Collectors.toList());

    }
    @Override
    public List<CounsellorProfileResponse> getAllCounsellors() {

        return counsellorRepository.findAll()
                .stream()
                .map(counsellor -> CounsellorProfileResponse.builder().id(counsellor.getId())
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
                        .build())
                .toList();
    }
    @Override
    public List<AppointmentResponse> getAllAppointments() {

        return appointmentRepository.findAll()
                .stream()
                .map(appointment -> AppointmentResponse.builder()
                        .appointmentId(appointment.getId())
                        .studentName(
                                appointment.getStudent().getFirstName() + " "
                                        + appointment.getStudent().getLastName()
                        )
                        .counsellorName(
                                appointment.getCounsellor().getFirstName() + " "
                                        + appointment.getCounsellor().getLastName()
                        )
                        .appointmentDate(appointment.getAppointmentDate())
                        .appointmentTime(appointment.getAppointmentTime())
                        .reason(appointment.getReason())
                        .status(appointment.getStatus())
                        .build())
                .collect(Collectors.toList());
    }
    @Override
    public void deleteStudent(Long studentId) {

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        studentRepository.delete(student);
    }

    @Override
    public void deleteCounsellor(Long counsellorId) {

        Counsellor counsellor = counsellorRepository.findById(counsellorId)
                .orElseThrow(() -> new RuntimeException("Counsellor not found"));

        boolean hasAppointments =
                appointmentRepository.existsByCounsellor(counsellor);

        if (hasAppointments) {
            throw new RuntimeException(
                    "Cannot delete counsellor because appointments exist.");
        }

        counsellorRepository.delete(counsellor);
    }
    @Override
    public CollegeResponse addCollege(CreateCollegeRequest request) {

        College college = College.builder()
                .collegeName(request.getCollegeName())
                .collegeCode(request.getCollegeCode())
                .collegeType(request.getCollegeType())
                .state(request.getState())
                .city(request.getCity())
                .nirfRanking(request.getNirfRanking())
                .website(request.getWebsite())
                .address(request.getAddress())
                .build();

        College savedCollege = collegeRepository .save(college);

        return CollegeResponse.builder()
                .id(savedCollege.getId())
                .collegeName(savedCollege.getCollegeName())
                .collegeCode(savedCollege.getCollegeCode())
                .collegeType(savedCollege.getCollegeType())
                .state(savedCollege.getState())
                .city(savedCollege.getCity())
                .nirfRanking(savedCollege.getNirfRanking())
                .website(savedCollege.getWebsite())
                .address(savedCollege.getAddress())
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
                        .collegeType(college.getCollegeType())
                        .state(college.getState())
                        .city(college.getCity())
                        .nirfRanking(college.getNirfRanking())
                        .website(college.getWebsite())
                        .address(college.getAddress())
                        .build())
                .collect(Collectors.toList());
    }
    @Override
    public void deleteCollege(Long collegeId) {

        College college = collegeRepository.findById(collegeId)
                .orElseThrow(() -> new RuntimeException("College not found"));

        if (cutoffRepository.existsByCollege(college)) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Cannot delete college because cutoff records exist."
            );
        }

        collegeRepository.delete(college);
    }
}