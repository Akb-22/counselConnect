package com.example.counselconnect.repository;


import com.example.counselconnect.entity.Appointment;
import com.example.counselconnect.entity.Counsellor;
import com.example.counselconnect.entity.Student;
import com.example.counselconnect.enums.AppointmentStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByStudent(Student student);
    List<Appointment> findByCounsellor(Counsellor counsellor);
    long countByStudent(Student student);

    long countByStudentAndStatus(Student student, AppointmentStatus status);
    long countByCounsellor(Counsellor counsellor);

    long countByCounsellorAndStatus(Counsellor counsellor,
                                    AppointmentStatus status);
    long count();

    long countByStatus(AppointmentStatus status);
    boolean existsByCounsellor(Counsellor counsellor);

}