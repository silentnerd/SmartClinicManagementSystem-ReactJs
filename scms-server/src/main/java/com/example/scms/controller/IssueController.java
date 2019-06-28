package com.example.scms.controller;

import com.example.scms.model.*;
import com.example.scms.payload.*;
import com.example.scms.repository.IssueRepository;
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
@RequestMapping("/api/issues")
public class IssueController {

    @Autowired
    private IssueRepository issueRepository;
    @Autowired
    private UserRepository userRepository;


    private static final Logger logger = LoggerFactory.getLogger(IssueController.class);

    @GetMapping
    public List<Issue> getIssues() {
        return issueRepository.findAll();
    }

 


}
