package com.first.project.user_management_system.user;

import com.first.project.user_management_system.email.EmailDetailsDto;
import com.first.project.user_management_system.email.SendMailService;
import com.first.project.user_management_system.exception.UserNotFoundException;
import com.first.project.user_management_system.passwords.PasswordService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/users")
public class UserController {
    private final UserRepository repository;
    private final UserService userService;

    public UserController(UserRepository repository, UserService userService) {
        this.repository = repository;
        this.userService = userService;
    }
    @Autowired
    private PasswordService passwordService;
    @Autowired
    private SendMailService emailService;


    @GetMapping
    @PreAuthorize("hasAnyRole('user', 'admin')")
    public Page<UserRequest> retrieveAllUsers(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return repository.findAll(pageable).map(userService::getUserDTOFromUser);
    }

//    @GetMapping("/search/{term}")
//    @PreAuthorize("hasAnyRole('user', 'admin')")
//    public Page<UserRequest> searchUsers(
//            @PathVariable String term,
//            @RequestParam(value = "page", defaultValue = "0") int page,
//            @RequestParam(value = "size", defaultValue = "10") int size) {
//        Pageable pageable = PageRequest.of(page, size);
//        Page<User> usersPage = userService.searchUsers(term, pageable);
//
//        if (usersPage.isEmpty()) {
//            throw new UserNotFoundException("No users found with term: " + term);
//        }
//
//     return usersPage.map(userService::getUserDTOFromUser);
//    }
    @GetMapping("/countries")
    public List<String> getCountries() {
        return userService.getDistinctCountries();
    }
//    @GetMapping("/filter")
//    @PreAuthorize("hasAnyRole('user', 'admin')")
//    public Page<UserRequest> filterUsers(
//            @RequestParam(value = "role", required = false) String role,
//            @RequestParam(value = "country", required = false) String country,
//            @RequestParam(value = "page", defaultValue = "0") int page,
//            @RequestParam(value = "size", defaultValue = "10") int size) {
//
//        Pageable pageable = PageRequest.of(page, size);
//
//        if (role != null && role.trim().isEmpty()) {
//            role = null;
//        }
//        if (country != null && country.trim().isEmpty()) {
//            country = null;
//        }
//        // Call the service method with the updated role filter
//        Page<User> usersPage = userService.filterUsers(role, country, pageable);
//
//        if (usersPage.isEmpty()) {
//            throw new UserNotFoundException("No users found with the given filters.");
//        }
//
//        return usersPage.map(userService::getUserDTOFromUser);
//    }
    @GetMapping("/searchAndFilter")
    @PreAuthorize("hasAnyRole('user', 'admin')")
    public Page<UserRequest> searchAndFilterUsers(
            @RequestParam(value = "term", required = false) String term,
            @RequestParam(value = "role", required = false) String role,
            @RequestParam(value = "country", required = false) String country,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);

        // Handle empty or trimmed inputs
        if (role != null && role.trim().isEmpty()) {
            role = null;
        }
        if (country != null && country.trim().isEmpty()) {
            country = null;
        }
        if (term != null && term.trim().isEmpty()) {
            term = null;
        }

        // Call the service layer
        Page<User> usersPage = userService.searchAndFilterUsers(term, role, country, pageable);

        if (usersPage.isEmpty()) {
            throw new UserNotFoundException("No users found with the given criteria.");
        }

        return usersPage.map(userService::getUserDTOFromUser);
    }



    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('admin')")
    public void deleteUser(@PathVariable int id) {
        repository.findById(id).orElseThrow(() -> new UserNotFoundException("User not found with id: " + id));
        repository.deleteById(id);
    }

    @PostMapping
    @PreAuthorize("hasRole('admin')")
    public ResponseEntity<Void> createUser(@Valid @RequestBody UserRequest userRequest) throws Exception {
        // Generate a random password
        String generatedPassword = passwordService.generateRandomPassword();
        userRequest.setPassword(generatedPassword);
        // Convert UserRequest to User entity and set the generated password
        User newUser = userService.convertToEntity(userRequest);
        // Save the user to the repository
        User savedUser = repository.save(newUser);
        // Send the generated password to the user's email
        EmailDetailsDto emailDetails = new EmailDetailsDto();
        emailDetails.setRecipient(newUser.getEmail());
        emailDetails.setEmailSubject("Your Account Password");
        emailDetails.setEmailBody("Hello " + newUser.getFirstName() + ",\n\nYour account has been created. Your password is: "
                + generatedPassword + "\n\nPlease change your password after logging in.");
        emailService.sendSimpleMail(emailDetails);
        // Return response
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(savedUser.getId())
                .toUri();
        return ResponseEntity.created(location).build();
}


    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('user', 'admin')")
    public ResponseEntity<UserRequest> updateUser(@PathVariable int id, @RequestBody UserRequest userRequest) {
        User existingUser = repository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found with id: " + id));

        // Use UserService to update the existing user
        existingUser = userService.updateUserFromDTO(existingUser, userRequest);

        User updatedUser = repository.save(existingUser);
        return ResponseEntity.ok(userService.getUserDTOFromUser(updatedUser));
    }
}
