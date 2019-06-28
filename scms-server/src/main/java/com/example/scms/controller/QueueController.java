package com.example.scms.controller;

import com.example.scms.model.*;
import com.example.scms.payload.*;
import com.example.scms.repository.IssueRepository;
import com.example.scms.repository.PatientRepository;
import com.example.scms.repository.QueueRepository;
import com.example.scms.repository.UserRepository;
import com.example.scms.security.CurrentUser;
import com.example.scms.security.UserPrincipal;
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
import java.util.List;


@CrossOrigin(origins="*", allowedHeaders="*")
@RestController
@RequestMapping("/api/queues")
public class QueueController {

    @Autowired
    private QueueRepository queueRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private QueueService queueService;


    private static final Logger logger = LoggerFactory.getLogger(QueueController.class);

    @GetMapping
    public List<Queue> getQueues() {
        return queueRepository.findAll();
       
    }
    
    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> createQueue(@Valid @RequestBody Queue queue) {
        Queue queue1 = queueService.createQueue(queue);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{pollId}")
                .buildAndExpand(queue1.getId()).toUri();

        return ResponseEntity.created(location)
                .body(new ApiResponse(true, "Queue Created Successfully"));
    }
    
    @PostMapping("/close")
    public Boolean closequeue(@Valid @RequestBody Queue queue) {

    	queueRepository.closequeue(queue.getStatus(), queue.getPatientid());
        return true;
    }
    
    @GetMapping("/activequeues")
    public List<Queue> getActiveQueues() {
        return queueRepository.findAllActiveQueues();
    }
    
    @GetMapping("/getlatestactivequeue/{special}")
    public Queue getLatestActiveQueues(@PathVariable String special) {
        return queueRepository.getLatestQueue(special);
    }
}
