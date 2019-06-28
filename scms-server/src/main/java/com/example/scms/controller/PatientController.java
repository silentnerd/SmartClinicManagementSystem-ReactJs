package com.example.scms.controller;

import com.example.scms.model.*;
import com.example.scms.payload.*;
import com.example.scms.repository.PatientRepository;
import com.example.scms.repository.UserRepository;
import com.example.scms.security.CurrentUser;
import com.example.scms.security.UserPrincipal;
import com.example.scms.service.PatientService;
import com.example.scms.util.AppConstants;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import javax.validation.Valid;
import java.net.URI;
import java.util.List;


@CrossOrigin(origins="*", allowedHeaders="*")
@RestController
@RequestMapping("/api/patients")
public class PatientController {

    @Autowired
    private PatientRepository patientRepository;



    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PatientService patientService;

    private static final Logger logger = LoggerFactory.getLogger(PatientController.class);

    @GetMapping
    public List<Patient> getPatients() {
        return patientRepository.findAll();
    }

    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> createPatient(@Valid @RequestBody PatientRequest patientRequest) {
        Patient patient = patientService.createPatient(patientRequest);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{pollId}")
                .buildAndExpand(patient.getId()).toUri();

        return ResponseEntity.created(location)
                .body(new ApiResponse(true, "Patient Created Successfully"));
    }


    @GetMapping("/{patientId}")
    public Patient getPollById(@CurrentUser UserPrincipal currentUser,
                                    @PathVariable Long patientId) {
        return patientService.getPatientbyId(patientId, currentUser);
    }
    
    @GetMapping("/clinic/{clinicId}")
    public Patient getPatientByClinicId(@PathVariable String clinicId) {
        return patientService.getPatientByClinicId(clinicId);
    }

    @PostMapping("/updatePatientStatus")
    public Boolean updatePatientStatus(@Valid @RequestBody PatientRequest patient) {

    	patientRepository.updatePatientStatus(patient.getStatus(), patient.getClinic_id());
        return true;
    }
    
    @PostMapping("/{patientId}")
    public Patient updatePatient(@CurrentUser UserPrincipal currentUser,
                         @PathVariable Long patientId,
                         @Valid @RequestBody PatientRequest patientRequest) {
        return patientService.updatePatientbyId(patientId, patientRequest);
    }
    
    @DeleteMapping("/{patientId}")
    public ResponseEntity<?> deletePatient(@PathVariable Long patientId) {
    	patientRepository.deleteById(patientId);

    	 URI location = ServletUriComponentsBuilder
                 .fromCurrentContextPath().path("/polls")
                 .buildAndExpand().toUri();

         return ResponseEntity.created(location).body(new ApiResponse(true, "Patient successfully deleted"));
    }
    
    @GetMapping("/checkPatientEmailAvailability")
    public UserIdentityAvailability checkPatientEmailAvailability(@RequestParam(value = "email") String email) {
        Boolean isAvailable = !patientRepository.existsByEmail(email);
        return new UserIdentityAvailability(isAvailable);
    }
    
    @GetMapping("/checkPatientClinicIDAvailability")
    public UserIdentityAvailability checkPatientClinicIDAvailability(@RequestParam(value = "clinic_id") String clinic_id) {
        Boolean isAvailable = !patientRepository.existsByClinic_id(clinic_id);
        return new UserIdentityAvailability(isAvailable);
    }
    
    @GetMapping("/checkPatientNICAvailability")
    public UserIdentityAvailability checkPatientNICAvailability(@RequestParam(value = "nic") String nic) {
        Boolean isAvailable = !patientRepository.existsByNic(nic);
        return new UserIdentityAvailability(isAvailable);
    }
    
    @GetMapping("/checkPatientPhoneAvailability")
    public UserIdentityAvailability checkPatientPhoneAvailability(@RequestParam(value = "phone") String phone) {
        Boolean isAvailable = !patientRepository.existsByPhone(phone);
        return new UserIdentityAvailability(isAvailable);
    }

}
