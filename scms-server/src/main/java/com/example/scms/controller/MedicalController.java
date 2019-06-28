package com.example.scms.controller;

import com.example.scms.model.*;
import com.example.scms.payload.*;
import com.example.scms.repository.IssueRepository;
import com.example.scms.repository.MedicalRepository;
import com.example.scms.repository.PatientRepository;
import com.example.scms.repository.TestRepository;
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
@RequestMapping("/api/medicals")
public class MedicalController {

   
    @Autowired
    private MedicalRepository medicalRepository;


    private static final Logger logger = LoggerFactory.getLogger(MedicalController.class);

    @GetMapping
    public List<Medical> getMedicals() {
        return medicalRepository.findAll();
    }

 


}
