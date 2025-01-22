package com.first.project.user_management_system.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND)
public class UserNotFoundException extends RuntimeException {  // Extend RuntimeException

	public UserNotFoundException(String message) {
        super(message);  // Call the superclass constructor
    }
}
