package com.first.project.user_management_system.user;

import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDate;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Data
public class UserRequest {
    private long id;

    @NotBlank(message = "First name is required")
    private String firstName;

    @NotBlank(message = "Last name is required")
    private String lastName;

    @Past(message = "Birth date must be in the past")
    private LocalDate birthDate;

    @Pattern(regexp = "^[0-9]{10,15}$", message = "Mobile number must be between 10 and 15 digits")
    private String  mobile;

    @Email(message = "Invalid email format")
    @NotBlank(message = "Email is required")
    private String email;

    @NotBlank(message = "Username is required")
    private String username;

    //@NotBlank(message = "Password is required")
//    @Pattern(
//            regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!]).{8,}$",
//            message = "Password must be at least 8 characters long and include at least one number, one special character, one uppercase, and one lowercase letter"
//    )
    private String password;

    @NotBlank(message = "Role is required")
    private String role;

    @NotBlank(message = "Country is required")
    private  String country;

}
