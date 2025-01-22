//package com.first.project.user_management_system.systemUsers;
//
//import com.first.project.user_management_system.exception.UserNotFoundException;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.access.prepost.PreAuthorize;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@RequestMapping("/systemUsers")
//public class SystemUsersController {
//
//    @Autowired
//    private SystemUserRepository systemUserRepository;
//
//    @PutMapping("/{username}")
//    @PreAuthorize("hasRole('admin')")
//    public ResponseEntity<SystemUsers> updateUser(@PathVariable String username, @RequestBody SystemUsers systemuser) {
//        SystemUsers existingUser = systemUserRepository.findByUsername(username)
//                .orElseThrow(() -> new UserNotFoundException("User not found with username: " + username));
//
//        existingUser.setUsername(systemuser.getUsername());
//        existingUser.setRole(systemuser.getRole());
//        existingUser.setPassword(systemuser.getPassword());
//        SystemUsers updatedUser = systemUserRepository.save(existingUser);
//        return ResponseEntity.ok(updatedUser);
//    }
//    @DeleteMapping("/{username}")
//    @PreAuthorize("hasRole('admin')")
//    public void deleteUser(@PathVariable String username){
//        SystemUsers user =systemUserRepository.findByUsername(username).orElseThrow(() -> new UserNotFoundException("User not found with username: " + username));
//        systemUserRepository.deleteById(user.getId());
//    }
//}
