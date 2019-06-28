package com.example.scms.controller;

import com.example.scms.model.*;
import com.example.scms.payload.*;
import com.example.scms.repository.BodylocationListRepository;
import com.example.scms.repository.ClinicRepository;
import com.example.scms.repository.IssueRepository;
import com.example.scms.repository.PatientRepository;
import com.example.scms.repository.QueueRepository;
import com.example.scms.repository.UserRepository;
import com.example.scms.security.CurrentUser;
import com.example.scms.security.UserPrincipal;
import com.example.scms.service.BodylocationListService;
import com.example.scms.service.ClinicService;
import com.example.scms.service.PatientService;
import com.example.scms.service.QueueService;
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
import java.util.ArrayList;
import java.util.List;


@CrossOrigin(origins="*", allowedHeaders="*")
@RestController
@RequestMapping("/api/bodylocationlists")
public class BodylocationListController {

    @Autowired
    private BodylocationListRepository bodylocationlistRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private BodylocationListService bodylocationlistService;


    private static final Logger logger = LoggerFactory.getLogger(BodylocationListController.class);


    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public Boolean createBodylocationlist(@Valid @RequestBody List<BodylocationList> bodylocationlist) {
    	Boolean res = bodylocationlistService.createBodylocationList(bodylocationlist);


        return res;
    }
    
    
    @GetMapping("/bodylocationlistsbyclinicid")
    public List<BodylocationList> getClinicbyPatientId(@RequestBody String patientclinicid) {
        return bodylocationlistRepository.findBodylocationlistbyClinicId(patientclinicid);
    }
}
