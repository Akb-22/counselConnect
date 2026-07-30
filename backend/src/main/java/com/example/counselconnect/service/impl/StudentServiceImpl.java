package com.example.counselconnect.service.impl;
import com.example.counselconnect.dto.*;
import com.example.counselconnect.entity.Counsellor;
import com.example.counselconnect.entity.Student;
import com.example.counselconnect.repository.AppointmentRepository;
import com.example.counselconnect.repository.CounsellorRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import com.example.counselconnect.enums.Role;
import com.example.counselconnect.dto.StudentDashboardResponse;
import com.example.counselconnect.enums.AppointmentStatus;
import com.example.counselconnect.exception.EmailAlreadyExistsException;
import com.example.counselconnect.repository.StudentRepository;
import com.example.counselconnect.security.JwtService;
import com.example.counselconnect.services.StudentService;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.Optional;

@Service
public class StudentServiceImpl implements StudentService {
    private final CounsellorRepository counsellorRepository;
    private final StudentRepository studentRepository;
    private final PasswordEncoder passwordEncoder;
    private final AppointmentRepository appointmentRepository;
    public StudentServiceImpl(CounsellorRepository counsellorRepository, StudentRepository studentRepository,
                              PasswordEncoder passwordEncoder,
                              JwtService jwtService,
                              AppointmentRepository appointmentRepository) {
        this.counsellorRepository = counsellorRepository;

        this.studentRepository = studentRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.appointmentRepository = appointmentRepository;
    }
    @Override
    public StudentResponse registerStudent(StudentRequest studentRequest) {
        if (studentRepository.existsByEmail(studentRequest.getEmail())) {
            throw new EmailAlreadyExistsException("Email already exists.");
        }

        Student student = Student.builder()
                .firstName(studentRequest.getFirstName())
                .lastName(studentRequest.getLastName())
                .email(studentRequest.getEmail())
                .password(passwordEncoder.encode(studentRequest.getPassword()))
                .phone(studentRequest.getPhone())
                .gender(studentRequest.getGender())
                .category(studentRequest.getCategory())
                .role(Role.STUDENT)
                .build();

        Student savedStudent = studentRepository.save(student);

        return StudentResponse.builder()
                .id(savedStudent.getId())
                .firstName(savedStudent.getFirstName())
                .lastName(savedStudent.getLastName())
                .email(savedStudent.getEmail())
                .phone(savedStudent.getPhone())
                .gender(savedStudent.getGender())
                .category(savedStudent.getCategory())
                .role(savedStudent.getRole())
                .build();
    }
    @Override
    public LoginResponse loginStudent(LoginRequest loginRequest) {

        Optional<Student> optionalStudent =
                studentRepository.findByEmail(loginRequest.getEmail());

        if (optionalStudent.isEmpty()) {
            throw new RuntimeException("Invalid email or password.");
        }

        Student student = optionalStudent.get();

        if (!passwordEncoder.matches(
                loginRequest.getPassword(),
                student.getPassword())) {

            throw new RuntimeException("Invalid email or password.");
        }

        String token = jwtService.generateToken(student.getEmail());

        return LoginResponse.builder()
                .token(token)
                .message("Login Successful")
                .build();}
    private final JwtService jwtService;
    @Override
    public ProfileResponse getProfile() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        Student student = studentRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("Student not found"));

        return ProfileResponse.builder()
                .id(student.getId())
                .firstName(student.getFirstName())
                .lastName(student.getLastName())
                .email(student.getEmail())
                .phone(student.getPhone())
                .gender(student.getGender())
                .category(student.getCategory())
                .role(student.getRole())
                .dateOfBirth(student.getDateOfBirth())
                .address(student.getAddress())
                .city(student.getCity())
                .state(student.getState())
                .pincode(student.getPincode())
                .parentName(student.getParentName())
                .parentPhone(student.getParentPhone())
                .jeeApplicationNumber(student.getJeeApplicationNumber())
                .jeePercentile(student.getJeePercentile())
                .allIndiaRank(student.getAllIndiaRank())
                .categoryRank(student.getCategoryRank())
                .class12Percentage(student.getClass12Percentage())
                .passingYear(student.getPassingYear())
                .category(student.getCategory())
                .pwd(student.getPwd())
                .homeState(student.getHomeState())
                .stateOfEligibility(student.getStateOfEligibility())
                .build();
    }
    @Override
    public ProfileResponse updateProfile(UpdateProfileRequest request) {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        Student student = studentRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        student.setPhone(request.getPhone());
        student.setDateOfBirth(request.getDateOfBirth());
        student.setAddress(request.getAddress());
        student.setCity(request.getCity());
        student.setState(request.getState());
        student.setPincode(request.getPincode());
        student.setParentName(request.getParentName());
        student.setParentPhone(request.getParentPhone());
        student.setJeeApplicationNumber(request.getJeeApplicationNumber());
        student.setJeePercentile(request.getJeePercentile());
        student.setAllIndiaRank(request.getAllIndiaRank());
        student.setCategoryRank(request.getCategoryRank());
        student.setClass12Percentage(request.getClass12Percentage());
        student.setPassingYear(request.getPassingYear());
        student.setPwd(request.getPwd());
        student.setHomeState(request.getHomeState());
        student.setStateOfEligibility(request.getStateOfEligibility());

        studentRepository.save(student);

        return ProfileResponse.builder()
                .id(student.getId())
                .firstName(student.getFirstName())
                .lastName(student.getLastName())
                .email(student.getEmail())
                .phone(student.getPhone())
                .gender(student.getGender())
                .category(student.getCategory())
                .role(student.getRole())
                .dateOfBirth(student.getDateOfBirth())
                .address(student.getAddress())
                .city(student.getCity())
                .state(student.getState())
                .pincode(student.getPincode())
                .parentName(student.getParentName())
                .parentPhone(student.getParentPhone())
                .jeeApplicationNumber(student.getJeeApplicationNumber())
                .jeePercentile(student.getJeePercentile())
                .allIndiaRank(student.getAllIndiaRank())
                .categoryRank(student.getCategoryRank())
                .class12Percentage(student.getClass12Percentage())
                .passingYear(student.getPassingYear())
                .pwd(student.getPwd())
                .homeState(student.getHomeState())
                .stateOfEligibility(student.getStateOfEligibility())
                .build();
    }
    @Override
    public String changePassword(ChangePasswordRequest request) {
        Authentication authentication = SecurityContextHolder
                .getContext()
                .getAuthentication();

        String email = authentication.getName();
        Student student = studentRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        if (!passwordEncoder.matches(
                request.getCurrentPassword(),
                student.getPassword())) {

            throw new RuntimeException("Current password is incorrect");
        }
        if (!request.getNewPassword()
                .equals(request.getConfirmPassword())) {

            throw new RuntimeException("New password and confirm password do not match");
        }
        student.setPassword(
                passwordEncoder.encode(request.getNewPassword()));

        studentRepository.save(student);
        return "Password changed successfully.";
    }
    @Override
    public StudentDashboardResponse getDashboard(String email) {

        Student student = studentRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        return StudentDashboardResponse.builder()
                .studentName(student.getFirstName() + " " + student.getLastName())
                .jeePercentile(student.getJeePercentile())
                .allIndiaRank(student.getAllIndiaRank())
                .totalAppointments(appointmentRepository.countByStudent(student))
                .pendingAppointments(
                        appointmentRepository.countByStudentAndStatus(
                                student, AppointmentStatus.PENDING))
                .approvedAppointments(
                        appointmentRepository.countByStudentAndStatus(
                                student, AppointmentStatus.APPROVED))
                .completedAppointments(
                        appointmentRepository.countByStudentAndStatus(
                                student, AppointmentStatus.COMPLETED))
                .build();
}
    @Override
    public List<CounsellorResponse> getAllCounsellors() {

        List<Counsellor> counsellors = counsellorRepository.findAll();

        return counsellors.stream()
                .map(counsellor -> CounsellorResponse.builder()
                        .id(counsellor.getId())
                        .fullName(counsellor.getFirstName() + " " + counsellor.getLastName())
                        .specialization(counsellor.getSpecialization())
                        .experience(counsellor.getExperience())
                        .email(counsellor.getEmail())
                        .phone(counsellor.getPhone())
                        .city(counsellor.getCity())
                        .state(counsellor.getState())
                        .build())
                .toList();
    }

}