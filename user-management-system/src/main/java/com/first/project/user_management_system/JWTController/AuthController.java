package com.first.project.user_management_system.JWTController;

import com.first.project.user_management_system.config.JwtUtils;
import com.first.project.user_management_system.user.CustomUserDetailsService;
import com.first.project.user_management_system.user.User;
import com.first.project.user_management_system.user.UserRequest;
import com.first.project.user_management_system.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private CustomUserDetailsService customUserDetailsService;
    @Autowired
    private JwtUtils jwtUtils;
    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody User userRequest) throws AuthenticationException {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(userRequest.getUsername(), userRequest.getPassword())
        );

        UserDetails userDetails = customUserDetailsService.loadUserByUsername(userRequest.getUsername());
        User userFromDb = userService.findByUsername(userRequest.getUsername());

        String token = jwtUtils.generateToken(userDetails.getUsername());

        Map<String, String> response = new HashMap<>();
        response.put("username", userRequest.getUsername());
        response.put("role",userFromDb.getRole());
        response.put("token", token);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> register(@RequestBody UserRequest userRequest) {
        userService.registerUser(userRequest);
        Map<String, String> response = new HashMap<>();
        response.put("message", "User registered successfully");
        return ResponseEntity.ok(response);
    }
}
