package com.example.scms.controller;

import com.example.scms.model.*;
import com.example.scms.payload.*;
import com.example.scms.repository.BodylocationListRepository;
import com.example.scms.repository.ClinicRepository;
import com.example.scms.repository.IssueListRepository;
import com.example.scms.repository.IssueRepository;
import com.example.scms.repository.PatientRepository;
import com.example.scms.repository.PatientTestResultRepository;
import com.example.scms.repository.PrescriptionListRepository;
import com.example.scms.repository.QueueRepository;
import com.example.scms.repository.SymptomListRepository;
import com.example.scms.repository.UserRepository;
import com.example.scms.security.CurrentUser;
import com.example.scms.security.UserPrincipal;
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
import java.time.Instant;
import java.util.List;
import java.util.Optional;


@CrossOrigin(origins="*", allowedHeaders="*")
@RestController
@RequestMapping("/api/clinics")
public class ClinicController {

    @Autowired
    private ClinicRepository clinicRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ClinicService clinicService;
    @Autowired
    private BodylocationListRepository bodylocationlistRepository;
    @Autowired
    private SymptomListRepository symptomlistRepository;
    @Autowired
    private IssueListRepository issuelistRepository;
    @Autowired
    private PatientTestResultRepository patienttestresultRepository;
    @Autowired 
    private PrescriptionListRepository prescriptionlistRepository;

    private static final Logger logger = LoggerFactory.getLogger(ClinicController.class);

   
    @SuppressWarnings("null")
	@GetMapping("/{clinicid}")
    public RequestWrapper getAllClinicbyclinicId(@PathVariable Long clinicid) {
    	
    	Optional<Clinic> clinic = clinicRepository.findById(clinicid);
    			
    	
        List<BodylocationList> bodylocationlist = bodylocationlistRepository.findBodylocationlistbyClinicId(Long.toString(clinicid));
        List<SymptomList> symptomlist = symptomlistRepository.findSymptomListbyClinicId(Long.toString(clinicid));
        List<IssueList> issuelist = issuelistRepository.findIssuebyClinicId(Long.toString(clinicid));
        List<PatientTestResults> patienttestresult = patienttestresultRepository.findPatientTestResultsbyClinicId(Long.toString(clinicid));
        List<PrescriptionList> prescriptionlist = prescriptionlistRepository.findPrescriptionListbyClinicId(Long.toString(clinicid));

        RequestWrapper requestwrapper = new RequestWrapper(clinic, bodylocationlist, symptomlist, issuelist, patienttestresult, prescriptionlist);
        
        return requestwrapper;
        
    }
    
    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public String createClinic(@RequestBody RequestWrapper requestwrapper) {
    	
    	//Create clinic
    	Clinic clinic1 = clinicService.createClinic(requestwrapper.getClinic());
    	
    	//Insert BodylocationList
    	for (BodylocationList bodylocationlist2 : requestwrapper.getBodylocationlist()) {
    		BodylocationList bodylocationlist1 = new BodylocationList(bodylocationlist2.getName(), String.valueOf(clinic1.getId()));
                bodylocationlistRepository.save(bodylocationlist1);
		}
    	
    	//Insert SymptomList
    	for (SymptomList symptomlist2 : requestwrapper.getSymptomlist()) {
    		SymptomList symptomlist1 = new SymptomList(symptomlist2.getName(), String.valueOf(clinic1.getId()));
                symptomlistRepository.save(symptomlist1);
		}
    	
    	//Insert IssueList
    	for (IssueList isssuelist2 : requestwrapper.getIssuelist()) {
    		IssueList issuelist1 = new IssueList(isssuelist2.getName(), String.valueOf(clinic1.getId()));
                issuelistRepository.save(issuelist1);
		}
    	
    	//Insert PatientTestResultList
    	for (PatientTestResults patienttestresult2 : requestwrapper.getPatienttestresult()) {
    		PatientTestResults patienttestresult1 = new PatientTestResults(patienttestresult2.getName(), patienttestresult2.getPatient_clinic_id(), 
    																		patienttestresult2.getLaborist_id(), String.valueOf(clinic1.getId()),
    																		patienttestresult2.getFile_path(), patienttestresult2.getStatus());
    		patienttestresultRepository.save(patienttestresult1);
		}
    	
    	//Insert PrescriptionList
    	for (PrescriptionList prescriptionlist2 : requestwrapper.getPrescriptionlist()) {
    		PrescriptionList prescriptionlist1 = new PrescriptionList(prescriptionlist2.getName(), prescriptionlist2.getQtd(),
    												prescriptionlist2.getType(), prescriptionlist2.getFood(), prescriptionlist2.getMorning(),
    												prescriptionlist2.getDay(), prescriptionlist2.getEvening(), prescriptionlist2.getNight(),
    												String.valueOf(clinic1.getId()), "0");
                prescriptionlistRepository.save(prescriptionlist1);
		}

        return "Successfully clinic created";
    }
    
    @PostMapping("/update")
    public Boolean updateclinic(@Valid @RequestBody Clinic clinic) {
/*
    	clinicRepository.closequeue(queue.getStatus(), queue.getPatientid());*/
        return true;
    }
    
    @GetMapping("/clinicsbypatid/{patient_clinic_id}")
    public List<Clinic> getClinicbyPatientId(@PathVariable String patient_clinic_id) {
        return clinicRepository.findAllClinicbyPatientId(patient_clinic_id);
    }
    
    @GetMapping("/prescriptionbyclinicid")
    public List<PrescriptionList> getPrescriptionByClinicId() {
        return prescriptionlistRepository.findAllUndeliveredPrescription();
    }
}
