package com.example.scms.service;

import com.example.scms.exception.BadRequestException;
import com.example.scms.exception.ResourceNotFoundException;
import com.example.scms.model.*;
import com.example.scms.payload.PagedResponse;
import com.example.scms.payload.PatientRequest;
import com.example.scms.payload.UserSummary;
import com.example.scms.repository.BodylocationListRepository;
import com.example.scms.repository.ClinicRepository;
import com.example.scms.repository.PatientRepository;
import com.example.scms.repository.QueueRepository;
import com.example.scms.repository.UserRepository;
import com.example.scms.security.UserPrincipal;
import com.example.scms.util.AppConstants;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

import javax.validation.Valid;

@Service
public class BodylocationListService {

    @Autowired
    private BodylocationListRepository bodylocationlistRepository;


    @Autowired
    private UserRepository userRepository;

    private static final Logger logger = LoggerFactory.getLogger(BodylocationListService.class);


    public Boolean createBodylocationList(@Valid List<BodylocationList> bodylocationlist) {
    	
    	
    	for (BodylocationList bodylocationlist2 : bodylocationlist) {
    		BodylocationList bodylocationlist1 = new BodylocationList(bodylocationlist2.getName(), bodylocationlist2.getClinic_id());
    		   Instant now = Instant.now();
    	          
               

               // poll.setExpirationDateTime(expirationDateTime);

                bodylocationlistRepository.save(bodylocationlist1);
		}
		return true;
    		
            
         
		
	
    	
    }
    /*
    public Patient getPatientbyId(Long patientId, UserPrincipal currentUser) {
    	return patientRepository.findById(patientId).orElseThrow(() -> new ResourceNotFoundException("Patient", "id", patientId));
    }
    
    public Patient getPatientByClinicId(String clinicId) {
    	return patientRepository.findByClinicId(clinicId).orElseThrow(() -> new ResourceNotFoundException("Clinic", "id", clinicId));
    }
    
    public Patient updatePatientbyId(Long patientId, PatientRequest patientRequest) {
        Patient patient1 = new Patient(patientId, patientRequest.getClinic_id(), patientRequest.getFname(), null, null, null, null, null, null, null, null, null);
 
 Instant now = Instant.now();
 


// poll.setExpirationDateTime(expirationDateTime);

 return patientRepository.save(patient1);
 
}
*/
	
}
