package com.example.counselconnect.service.impl;

import com.example.counselconnect.dto.AppointmentResponse;
import com.example.counselconnect.dto.BookAppointmentRequest;
import com.example.counselconnect.dto.CounsellorDashboardResponse;
import com.example.counselconnect.dto.StudentDashboardResponse;
import com.example.counselconnect.entity.Appointment;
import com.example.counselconnect.entity.Counsellor;
import com.example.counselconnect.entity.Student;
import com.example.counselconnect.enums.AppointmentStatus;
import com.example.counselconnect.repository.AppointmentRepository;
import com.example.counselconnect.repository.CounsellorRepository;
import com.example.counselconnect.repository.StudentRepository;
import com.example.counselconnect.services.AppointmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AppointmentServiceImpl implements AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final StudentRepository studentRepository;
    private final CounsellorRepository counsellorRepository;



    @Override
    public String bookAppointment(BookAppointmentRequest request) {
        Authentication authentication = SecurityContextHolder
                .getContext()
                .getAuthentication();

        String email = authentication.getName();

        Student student = studentRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        Counsellor counsellor = counsellorRepository
                .findById(request.getCounsellorId())
                .orElseThrow(() ->
                        new RuntimeException("Counsellor not found"));
        Appointment appointment = Appointment.builder()
                .appointmentDate(request.getAppointmentDate())
                .appointmentTime(request.getAppointmentTime())
                .reason(request.getReason())
                .status(AppointmentStatus.PENDING)
                .student(student)
                .counsellor(counsellor)
                .build();
        appointmentRepository.save(appointment);

        return "Appointment booked successfully.";
    }
    @Override
    public List<AppointmentResponse> getStudentAppointments(String email) {

        Student student = studentRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        List<Appointment> appointments = appointmentRepository.findByStudent(student);

        return appointments.stream()
                .map(appointment -> AppointmentResponse.builder()
                        .appointmentId(appointment.getId())
                        .studentName(
                                appointment.getStudent().getFirstName() + " "
                                        + appointment.getStudent().getLastName())
                        .counsellorName(
                                appointment.getCounsellor().getFirstName() + " "
                                        + appointment.getCounsellor().getLastName())
                        .appointmentDate(appointment.getAppointmentDate())
                        .appointmentTime(appointment.getAppointmentTime())
                        .reason(appointment.getReason())
                        .status(appointment.getStatus())
                        .build())
                .toList();
    }
    @Override
    public List<AppointmentResponse> getCounsellorAppointments(String email) {

        Counsellor counsellor = counsellorRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Counsellor not found"));

        List<Appointment> appointments =
                appointmentRepository.findByCounsellor(counsellor);

        return appointments.stream()
                .map(appointment -> AppointmentResponse.builder()
                        .appointmentId(appointment.getId())
                        .studentName(
                                appointment.getStudent().getFirstName() + " "
                                        + appointment.getStudent().getLastName())
                        .counsellorName(
                                appointment.getCounsellor().getFirstName() + " "
                                        + appointment.getCounsellor().getLastName())
                        .appointmentDate(appointment.getAppointmentDate())
                        .appointmentTime(appointment.getAppointmentTime())
                        .reason(appointment.getReason())
                        .status(appointment.getStatus())
                        .build())
                .toList();
    }
    @Override
    public String approveAppointment(Long appointmentId, String email) {

        Counsellor counsellor = counsellorRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Counsellor not found"));

        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));

        if (!appointment.getCounsellor().getId().equals(counsellor.getId())) {
            throw new RuntimeException("You are not authorized to approve this appointment");
        }

        appointment.setStatus(AppointmentStatus.APPROVED);

        appointmentRepository.save(appointment);

        return "Appointment approved successfully";
    }
    @Override
    public String completeAppointment(Long appointmentId, String email) {

        Counsellor counsellor = counsellorRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Counsellor not found"));

        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));

        if (!appointment.getCounsellor().getId().equals(counsellor.getId())) {
            throw new RuntimeException("You are not authorized to complete this appointment");
        }

        appointment.setStatus(AppointmentStatus.COMPLETED);

        appointmentRepository.save(appointment);

        return "Appointment completed successfully";
    }
    @Override
    public StudentDashboardResponse getStudentDashboard(String email) {

        Student student = studentRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        return StudentDashboardResponse.builder()
                .totalAppointments(
                        appointmentRepository.countByStudent(student))
                .pendingAppointments(
                        appointmentRepository.countByStudentAndStatus(student, AppointmentStatus.PENDING))
                .approvedAppointments(
                        appointmentRepository.countByStudentAndStatus(student, AppointmentStatus.APPROVED))

                .completedAppointments(
                        appointmentRepository.countByStudentAndStatus(student, AppointmentStatus.COMPLETED))
                .build();
    }
    @Override
    public CounsellorDashboardResponse getCounsellorDashboard(String email) {

        Counsellor counsellor = counsellorRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Counsellor not found"));

        return CounsellorDashboardResponse.builder()
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
}