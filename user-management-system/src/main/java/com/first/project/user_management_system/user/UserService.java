package com.first.project.user_management_system.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserMapper userMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    UserRepository userRepository;

    @Autowired
    public UserService(UserMapper userMapper) {
        this.userMapper = userMapper;
    }

    public UserRequest getUserDTOFromUser(User user) {
        return userMapper.userToUserDTO(user);
    }

    public User convertToEntity(UserRequest userRequest) {
        userRequest.setPassword(passwordEncoder.encode(userRequest.getPassword()));
        return userMapper.userDTOToUser(userRequest);
    }

    public User updateUserFromDTO(User existingUser, UserRequest userRequest) {
        existingUser.setFirstName(userRequest.getFirstName());
        existingUser.setLastName(userRequest.getLastName());
        existingUser.setBirthDate(userRequest.getBirthDate());
        existingUser.setMobile(userRequest.getMobile());
        existingUser.setEmail(userRequest.getEmail());
        existingUser.setUsername(userRequest.getUsername());
        existingUser.setPassword(passwordEncoder.encode(userRequest.getPassword()));
        existingUser.setRole(userRequest.getRole());
        existingUser.setCountry(userRequest.getCountry());
        return existingUser;
    }
    public User findByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));
    }

//    public Page<User> searchUsers(String term, Pageable pageable) {
//        try {
//            int id = Integer.parseInt(term); // Attempt to parse the term as an integer
//            return userRepository.findById(id, pageable);
//        } catch (NumberFormatException e) {
//            // If term is not a number, perform name-based search
//            return userRepository.findByFirstNameIgnoreCaseStartsWithOrLastNameIgnoreCaseStartsWith(term, term, pageable);
//        }
//    }
//    public Page<User> filterUsers(String role, String country, Pageable pageable) {
//        if (role != null && country != null) {
//            return userRepository.findByRoleAndCountryIgnoreCase(role, country, pageable);
//        } else if (role != null) {
//            return userRepository.findByRoleIgnoreCase(role, pageable);
//        } else if (country != null) {
//            return userRepository.findByCountryIgnoreCase(country, pageable);
//        } else {
//            return userRepository.findAll(pageable); // No filters applied
//        }
//    }
    public Page<User> searchAndFilterUsers(String term, String role, String country, Pageable pageable) {
        // Base query to include all users
        Specification<User> specification = Specification.where(null);

        // Add search term criteria
        if (term != null && !term.trim().isEmpty()) {
            specification = specification.and((root, query, criteriaBuilder) -> {
                try {
                    // Search by ID if term is a number
                    int id = Integer.parseInt(term);
                    return criteriaBuilder.equal(root.get("id"), id);
                } catch (NumberFormatException e) {
                    // Search by name if term is not a number
                    return criteriaBuilder.or(
                            criteriaBuilder.like(criteriaBuilder.lower(root.get("firstName")), term.toLowerCase() + "%"),
                            criteriaBuilder.like(criteriaBuilder.lower(root.get("lastName")), term.toLowerCase() + "%")
                    );
                }
            });
        }
        // Add role filter
        if (role != null && !role.trim().isEmpty()) {
            specification = specification.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.equal(criteriaBuilder.lower(root.get("role")), role.toLowerCase())
            );
        }
        // Add country filter
        if (country != null && !country.trim().isEmpty()) {
            specification = specification.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.equal(criteriaBuilder.lower(root.get("country")), country.toLowerCase())
            );
        }
        // Execute the query with combined criteria
        return userRepository.findAll(specification, pageable);
    }



    public void registerUser(UserRequest userRequest) {
        User user = this.convertToEntity(userRequest);
        user.setRole("user");
        userRepository.save(user);
    }

    public List<String> getDistinctCountries() {
        return userRepository.findDistinctCountries();
    }
}
