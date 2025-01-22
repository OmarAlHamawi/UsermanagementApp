//package com.first.project.user_management_system.systemUsers;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Service;
//
//
//@Service
//public class SystemUserService {
//    @Autowired
//    private SystemUserRepository systemUserRepository;
//    @Autowired
//    private PasswordEncoder passwordEncoder;
//
//    public void registerUser(String username, String password) {
//        SystemUsers systemUsers = new SystemUsers();
//        systemUsers.setUsername(username);
//        systemUsers.setPassword(passwordEncoder.encode(password));
//        systemUsers.setRole("user");
//        systemUserRepository.save(systemUsers);
//    }
//    public SystemUsers findByUsername(String username) {
//        return systemUserRepository.findByUsername(username)
//                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));
//    }
//}
