package com.example.scms.service;

import com.example.scms.exception.AppException;
import com.example.scms.exception.BadRequestException;
import com.example.scms.exception.ResourceNotFoundException;
import com.example.scms.model.*;
import com.example.scms.payload.PagedResponse;
import com.example.scms.payload.PatientRequest;
import com.example.scms.payload.SignUpRequest;
import com.example.scms.payload.UserRequest;
import com.example.scms.payload.UserSummary;
import com.example.scms.repository.PatientRepository;
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
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

import javax.validation.Valid;

@Service
public class UserService {

 

	@Autowired
    PasswordEncoder passwordEncoder;
	
    @Autowired
    private UserRepository userRepository;

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);


    
    public int updateUserbyId(Long userId, UserRequest userRequest) {


 return userRepository.updateUserbyId(userRequest.getFname(), userRequest.getLname(), userRequest.getDob(), userRequest.getNic(),
		 								userRequest.getGender(), userRequest.getPhone(), userRequest.getAddress(), userRequest.getSpecialization(),
		 								userRequest.getUsertype(), userRequest.getEmail(), passwordEncoder.encode(userRequest.getPassword()), userId);
 
}

	
    
}
