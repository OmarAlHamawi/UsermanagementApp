//package com.first.project.user_management_system.systemUsers;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.stereotype.Service;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.security.core.userdetails.User;
//
//import java.util.Collections;
//
//@Service
//public class CustomUserDetailsService implements UserDetailsService {
//    @Autowired
//    private SystemUserRepository systemUserRepository;
//
//    @Override
//    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//        SystemUsers systemUser = systemUserRepository.findByUsername(username)
//                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
//
//        // Add ROLE_ prefix to the user role
//        String role = "ROLE_" + systemUser.getRole();
//        return new User(systemUser.getUsername(), systemUser.getPassword(),
//                Collections.singletonList(new SimpleGrantedAuthority(role)));
//    }
//
//}
