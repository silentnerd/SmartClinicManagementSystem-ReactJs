package com.example.scms.controller;

import com.example.scms.model.*;
import com.example.scms.payload.*;
import com.example.scms.repository.IssueRepository;
import com.example.scms.repository.PatientRepository;
import com.example.scms.repository.PatientTestResultRepository;
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
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import javax.validation.Valid;
import java.net.URI;
import java.util.List;


@CrossOrigin(origins="*", allowedHeaders="*")
@RestController
@RequestMapping("/api/tests")
public class TestController {

    @Autowired
    private TestRepository testRepository;
    @Autowired
    private PatientTestResultRepository ptrRepository;
    @Autowired
    private UserRepository userRepository;


    private static final Logger logger = LoggerFactory.getLogger(TestController.class);

    @GetMapping
    public List<Test> getTests() {
        return testRepository.findAll();
    }

    @Transactional
    @PostMapping("/updateptr")
    public Boolean updateptr(@RequestBody PatientTestResults ptr) {

    	testRepository.updateptr(ptr.getLaborist_id(), ptr.getFile_path(), ptr.getStatus(), ptr.getId());
        return true;
    }
 

    @GetMapping("/activetests")
    public List<PatientTestResults> getAllActiveTests() {
        return ptrRepository.findAllByStatus("0");
    }


}
