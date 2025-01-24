package com.first.project.user_management_system;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.first.project.user_management_system.JWTController.AuthController;
import com.first.project.user_management_system.config.JwtUtils;
import com.first.project.user_management_system.user.*;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Map;

import static org.hamcrest.Matchers.greaterThan;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional(propagation = Propagation.NOT_SUPPORTED)
@TestPropertySource("classpath:application-test.properties")
@Import(com.first.project.user_management_system.config.TestSecurityConfig.class)
class UserManagementSystemApplicationTests {

    @Autowired
    private MockMvc mockMvc;

    private static ObjectMapper objectMapper;
    private final UserMapperImpl userMapper = new UserMapperImpl();

    @InjectMocks
    private AuthController authController;

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private CustomUserDetailsService customUserDetailsService;

    @Mock
    private JwtUtils jwtUtils;

    @Mock
    private UserService userService;

    public void AuthControllerTest() {
        MockitoAnnotations.openMocks(this);
    }
    @BeforeAll
    public static void setUp() {
        objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
    }
    @Test
    @WithMockUser(username = "admin", roles = {"admin"})
    public void testGetCountries() throws Exception {
        mockMvc.perform(get("/users/countries"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray());
    }
    @Test
    @WithMockUser(username = "user", roles = {"user"})
    public void testRetrieveAllUsers() throws Exception {
        mockMvc.perform(get("/users?page=0&size=5"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content").isArray())
                .andExpect(jsonPath("$.totalElements", greaterThan(0)));
    }


    @ParameterizedTest
    @CsvSource({
            ",,,0,5,200",
            // Valid inputs
            "Ahmad, USER, Syria, 0, 5, 200",          // First Name: Ahmad
            "Al-Hamawi , USER, Jordan, 0, 5, 200",     // Last Name: Al-Hamawi
            "Omar , USER, Jordan, 0, 5, 200",          // First Name: Omar
            "1 , USER, Jordan, 0, 5, 404",             // Non-existent ID
            "Omar, USER, Jordan, 0, 5, 200",    // First Name: Osama, Role: ADMIN

            // Valid: Combination of filters
            "Ali , USER, Syria, 0, 5, 200",            // Partial Last Name (Ali)

            // Invalid inputs
            "InvalidName , , , 0, 5, 404",             // Invalid First Name
            "NonExistentLastName , , , 0, 5, 404",     // Invalid Last Name
            "999 , , , 0, 5, 404",                     // Invalid ID
            "Ahmad , USER, InvalidCountry, 0, 5, 404", // Invalid Country
            "Ahmad ADMIN, INVALID_ROLE, Jordan, 0, 5, 404" // Invalid Role
    })
    @WithMockUser(username = "user", roles = {"user"})
    public void testSearchAndFilterUsers(String term, String role, String country, int page, int size, int expectedStatus) throws Exception {
        // Perform the request
        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.get("/users/searchAndFilter")
                        .param("term", term != null ? term : "")
                        .param("role", role != null ? role : "")
                        .param("country", country != null ? country : "")
                        .param("page", String.valueOf(page))
                        .param("size", String.valueOf(size)))
                .andExpect(status().is(expectedStatus))
                .andReturn();

        // Validate the response content based on expected status
        if (expectedStatus == 200) {
            mockMvc.perform(MockMvcRequestBuilders.get("/users/searchAndFilter")
                            .param("term", term != null ? term : "")
                            .param("role", role != null ? role : "")
                            .param("country", country != null ? country : "")
                            .param("page", String.valueOf(page))
                            .param("size", String.valueOf(size)))
                    .andExpect(jsonPath("$.content").isArray())
                    .andExpect(jsonPath("$.content.length()").value(org.hamcrest.Matchers.greaterThan(0))); // Ensure array size is greater than 0
        } else if (expectedStatus == 404) {
            mockMvc.perform(MockMvcRequestBuilders.get("/users/searchAndFilter")
                            .param("term", term != null ? term : "")
                            .param("role", role != null ? role : "")
                            .param("country", country != null ? country : "")
                            .param("page", String.valueOf(page))
                            .param("size", String.valueOf(size)))
                    .andExpect(jsonPath("$.message").value("No users found with the given criteria.")); // Invalid data should return 404 with this message
        }
    }


    @Test
    @WithMockUser(username = "user", roles = {"user"})
    public void testSearchAndFilterUsers_NoResults() throws Exception {
        mockMvc.perform(get("/users/searchAndFilter")
                        .param("term", "nonexistent")
                        .param("role", "invalidRole")
                        .param("country", "Mars")
                        .param("page", "0")
                        .param("size", "5"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.message").value("No users found with the given criteria."));
    }


    @ParameterizedTest
    @WithMockUser(username = "admin", roles = {"admin"})
    @CsvSource({
            "-1, 404",
            "0, 404",
            "1, 200" // Use existing user ID for valid cases
    })
    public void testDeleteUser(int userId, int expectedStatus) throws Exception {
        mockMvc.perform(delete("/users/{id}", userId))
                .andExpect(status().is(expectedStatus));
    }

    // @Test
    // @WithMockUser(username = "admin", roles = {"admin"})
    // public void testCreateUser() throws Exception {
    //     // Create UserRequest with additional fields
    //     UserRequest request = new UserRequest();
    //     request.setFirstName("added");
    //     request.setLastName("user");
    //     request.setEmail("addedUser@email.com");
    //     request.setBirthDate(LocalDate.of(1990, 1, 1));
    //     request.setMobile("9295737573757");
    //     request.setUsername("omar123");  // Added username
    //     request.setPassword("Secure@password123");  // Added password
    //     request.setRole("user");  // Added role
    //     request.setCountry("Jordan");  // Added country

    //     // Convert UserRequest to JSON string
    //     String createUserJson = objectMapper.writeValueAsString(request);

    //     // Perform POST request to create user
    //     mockMvc.perform(post("/users")
    //                     .contentType(MediaType.APPLICATION_JSON)
    //                     .content(createUserJson))
    //             .andExpect(status().isCreated())  // Expecting 201 Created status
    //             .andExpect(header().exists("Location"));  // Ensure "Location" header is present
    // }


    @ParameterizedTest
    @WithMockUser(username = "user", roles = {"user"})
    @CsvSource({
            "-1, 404",    // Invalid user ID
            "0, 404",     // Invalid user ID (0 doesn't exist)
            "2, 200"      // Valid user ID with success status
    })
    public void testUpdateUser(int userId, int expectedStatus) throws Exception {


        UserRequest request = new UserRequest();
        request.setFirstName("Updated");
        request.setLastName("User");
        request.setEmail("updated.user@example.com");
        request.setBirthDate(LocalDate.of(2000, 1, 1));
        request.setMobile("987654321");
        request.setUsername("updated.user"); // Assuming you want to update this as well
        request.setRole("USER"); // Or whatever role you're testing
        request.setCountry("UpdatedCountry"); // Make sure country is set if needed
        request.setPassword("UpdatedPassword@134");

        String updateUserJson = objectMapper.writeValueAsString(request);


        mockMvc.perform(put("/users/{id}", userId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(updateUserJson))
                .andExpect(status().is(expectedStatus));

    }
    @Test
    void testUserToUserDTO_NullInput_ReturnsNull() {
        // Line 16-17: Test null input for userToUserDTO
        UserRequest result = userMapper.userToUserDTO(null);
        assertNull(result, "Expected null when input User is null.");
    }

    @Test
    void testUserDTOToUser_NullInput_ReturnsNull() {
        // Line 38-39: Test null input for userDTOToUser
        User result = userMapper.userDTOToUser(null);
        assertNull(result, "Expected null when input UserRequest is null.");
    }

    @Test
    void testCreateUserDTOWithoutId_ValidInput_ReturnsCorrectUserRequest() {
        // Line 60-76: Test valid User object for createUserDTOWithoutId
        User user = new User();
        user.setFirstName("Ahmad2");
        user.setLastName("Ali2");
        user.setBirthDate(LocalDate.parse("2000-01-02"));
        user.setMobile("7999229999");
        user.setEmail("ahmadali22@email.com");
        user.setUsername("ahmad2ali");
        user.setPassword("passworD@123");
        user.setRole("user");
        user.setCountry("Jordan");

        UserRequest result = userMapper.createUserDTOWithoutId(user);

        assertNotNull(result, "Expected a non-null UserRequest.");
        assertEquals("Ahmad2", result.getFirstName());
        assertEquals("Ali2", result.getLastName());
        assertEquals(LocalDate.parse("2000-01-02"), result.getBirthDate());
        assertEquals("7999229999", result.getMobile());
        assertEquals("ahmadali22@email.com", result.getEmail());
        assertEquals("ahmad2ali", result.getUsername());
        assertEquals("passworD@123", result.getPassword());
        assertEquals("user", result.getRole());
        assertEquals("Jordan", result.getCountry());
    }

    @Test
    void testLogin_ValidCredentials_ReturnsToken() throws AuthenticationException {
        // Mock input
        User userRequest = new User();
        userRequest.setUsername("testuser");
        userRequest.setPassword("testpassword");

        // Mock dependencies
        UserDetails mockUserDetails = mock(UserDetails.class);
        when(mockUserDetails.getUsername()).thenReturn("testuser");
        when(customUserDetailsService.loadUserByUsername("testuser")).thenReturn(mockUserDetails);

        User mockUser = new User();
        mockUser.setUsername("testuser");
        mockUser.setRole("USER");
        when(userService.findByUsername("testuser")).thenReturn(mockUser);

        when(jwtUtils.generateToken("testuser")).thenReturn("mockToken");

        // Call the method
        ResponseEntity<Map<String, String>> response = authController.login(userRequest);

        // Validate the response
        assertNotNull(response);
        assertEquals(200, response.getStatusCodeValue());
        assertNotNull(response.getBody());
        assertEquals("testuser", response.getBody().get("username"));
        assertEquals("USER", response.getBody().get("role"));
        assertEquals("mockToken", response.getBody().get("token"));

        // Verify interactions
        verify(authenticationManager).authenticate(any(UsernamePasswordAuthenticationToken.class));
        verify(customUserDetailsService).loadUserByUsername("testuser");
        verify(jwtUtils).generateToken("testuser");
    }

    @Test
    void testLogin_InvalidCredentials_ThrowsException() {
        // Mock input
        User userRequest = new User();
        userRequest.setUsername("testuser");
        userRequest.setPassword("wrongpassword");

        // Mock dependencies
        doThrow(new AuthenticationException("Bad credentials") {}).when(authenticationManager)
                .authenticate(any(UsernamePasswordAuthenticationToken.class));

        // Call the method and expect an exception
        assertThrows(AuthenticationException.class, () -> authController.login(userRequest));

        // Verify interactions
        verify(authenticationManager).authenticate(any(UsernamePasswordAuthenticationToken.class));
        verifyNoInteractions(customUserDetailsService, jwtUtils, userService);
    }

    @Test
    void testRegister_ValidUser_ReturnsSuccessMessage() {
        // Mock input
        UserRequest userRequest = new UserRequest();
        userRequest.setFirstName("Ahmad");
        userRequest.setLastName("Ali");
        userRequest.setUsername("ahmad.ali");
        userRequest.setPassword("password123");
        userRequest.setRole("USER");

        // Call the method
        ResponseEntity<Map<String, String>> response = authController.register(userRequest);

        // Validate the response
        assertNotNull(response);
        assertEquals(200, response.getStatusCodeValue());
        assertNotNull(response.getBody());
        assertEquals("User registered successfully", response.getBody().get("message"));

        // Verify interactions
        verify(userService).registerUser(userRequest);
    }



}


