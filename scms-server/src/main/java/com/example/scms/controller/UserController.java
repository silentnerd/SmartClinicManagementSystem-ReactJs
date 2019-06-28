package com.example.scms.controller;

import com.example.scms.exception.ResourceNotFoundException;
import com.example.scms.model.Patient;
import com.example.scms.model.User;
import com.example.scms.payload.*;
import com.example.scms.repository.PatientRepository;
import com.example.scms.repository.UserRepository;
import com.example.scms.security.CurrentUser;
import com.example.scms.security.UserPrincipal;
import com.example.scms.service.PatientService;
import com.example.scms.service.UserService;
import com.example.scms.util.AppConstants;

import java.net.URI;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PatientRepository pollRepository;


    @Autowired
    private UserService userService;

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);
    @GetMapping("/users")
    public List<User> getUsers() {
        return userRepository.findAll();
    }
    
    @PostMapping("/users/{userId}")
    public int updateUser(@CurrentUser UserPrincipal currentUser,
                         @PathVariable Long userId,
                         @Valid @RequestBody UserRequest userRequest) {
        return userService.updateUserbyId(userId, userRequest);
    }
    
    @GetMapping("/users/one/{id}")
    public Optional<User> getUser(@PathVariable(value = "id") Long id) {
        return userRepository.findById(id);
    }
    
    @DeleteMapping("/users/{userId}")
    public ResponseEntity<?> deletePatient(@PathVariable Long userId) {
    	userRepository.deleteById(userId);

    	 URI location = ServletUriComponentsBuilder
                 .fromCurrentContextPath().path("/user")
                 .buildAndExpand().toUri();

         return ResponseEntity.created(location).body(new ApiResponse(true, "User successfully deleted"));
    }
    
    @GetMapping("/user/me")
    @PreAuthorize("hasRole('USER')")
    public UserSummary getCurrentUser(@CurrentUser UserPrincipal currentUser) {
        UserSummary userSummary = new UserSummary(currentUser.getId(), currentUser.getUsername(), currentUser.getFname(), currentUser.getLname(), currentUser.getSpecialization(), currentUser.getUsertype(), currentUser.getStatus());
        return userSummary;
    }

    @GetMapping("/user/checkUsernameAvailability")
    public UserIdentityAvailability checkUsernameAvailability(@RequestParam(value = "username") String username) {
        Boolean isAvailable = !userRepository.existsByUsername(username);
        return new UserIdentityAvailability(isAvailable);
    }

    @GetMapping("/user/checkEmailAvailability")
    public UserIdentityAvailability checkEmailAvailability(@RequestParam(value = "email") String email) {
        Boolean isAvailable = !userRepository.existsByEmail(email);
        return new UserIdentityAvailability(isAvailable);
    }

    @GetMapping("/users/{username}")
    public UserProfile getUserProfile(@PathVariable(value = "username") String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", username));

    
       

        UserProfile userProfile = new UserProfile(user.getId(), user.getUsername(), user.getFname(), user.getCreatedAt());

        return userProfile;
    }
    
    @GetMapping("/users/checkNICAvailability")
    public UserIdentityAvailability checkNICAvailability(@RequestParam(value = "nic") String nic) {
        Boolean isAvailable = !userRepository.existsByNic(nic);
        return new UserIdentityAvailability(isAvailable);
    }
    
    @GetMapping("/users/checkPhoneAvailability")
    public UserIdentityAvailability checkPhoneAvailability(@RequestParam(value = "phone") String phone) {
        Boolean isAvailable = !userRepository.existsByPhone(phone);
        return new UserIdentityAvailability(isAvailable);
    }


}
