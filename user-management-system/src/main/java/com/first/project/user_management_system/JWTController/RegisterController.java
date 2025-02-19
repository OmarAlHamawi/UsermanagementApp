//package com.first.project.user_management_system.JWTController;
//
//import com.first.project.user_management_system.systemUsers.SystemUserService;
//import com.first.project.user_management_system.systemUsers.SystemUsers;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import java.util.HashMap;
//import java.util.Map;
//
//@RestController
//@RequestMapping("/api/auth")
//public class RegisterController {
//    @Autowired
//    private SystemUserService systemUserService;
//
//    @PostMapping("/register")
//    public ResponseEntity<Map<String, String>> register(@RequestBody SystemUsers systemUsers) {
//        systemUserService.registerUser(systemUsers.getUsername(), systemUsers.getPassword());
//        Map<String, String> response = new HashMap<>();
//        response.put("message", "User registered successfully");
//        return ResponseEntity.ok(response);
//    }
//}
