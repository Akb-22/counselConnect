package com.example.counselconnect.security;

import com.example.counselconnect.repository.StudentRepository;
import com.example.counselconnect.repository.CounsellorRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.example.counselconnect.repository.AdminRepository;
@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final StudentRepository studentRepository;

    private final CounsellorRepository counsellorRepository;
    private final AdminRepository adminRepository;

    public CustomUserDetailsService(StudentRepository studentRepository,
                                    CounsellorRepository counsellorRepository,
                                    AdminRepository adminRepository) {

        this.studentRepository = studentRepository;
        this.counsellorRepository = counsellorRepository;
        this.adminRepository = adminRepository;
    }
    @Override
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException {

        return studentRepository.findByEmail(username)
                .map(student -> (UserDetails) student)
                .or(() -> counsellorRepository.findByEmail(username)
                        .map(counsellor -> (UserDetails) counsellor))
                .or(() -> adminRepository.findByEmail(username)
                        .map(admin -> (UserDetails) admin))
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

}