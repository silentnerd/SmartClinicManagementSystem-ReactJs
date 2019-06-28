package com.example.scms.model;

import org.hibernate.annotations.BatchSize;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import com.example.scms.model.audit.UserDateAudit;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "patient_test_result")
public class PatientTestResults {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Size(max = 45)
    private String name;
    
    @Size(max = 20)
    private String patient_clinic_id;
    
    @Size(max = 45)
    private String laborist_id;
    
    @Size(max = 250)
    private String clinic_id;
    
    @Size(max = 20)
    private String file_path;
    
    @Size(max = 2)
    private String status;
    
   
    
    

    

    
    public PatientTestResults() {

    }
	public PatientTestResults(String name, String patient_clinic_id, String laborist_id, String clinic_id, String file_path, String status) {
		
		this.name = name;
		this.patient_clinic_id = patient_clinic_id;
		this.laborist_id = laborist_id;
		this.clinic_id = clinic_id;
		this.file_path = file_path;
		this.status = status;
	}
	
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getClinic_id() {
		return clinic_id;
	}
	public void setClinic_id(String clinic_id) {
		this.clinic_id = clinic_id;
	}
	public String getLaborist_id() {
		return laborist_id;
	}
	public void setLaborist_id(String laborist_id) {
		this.laborist_id = laborist_id;
	}
	public String getFile_path() {
		return file_path;
	}
	public void setFile_path(String file_path) {
		this.file_path = file_path;
	}
	public String getPatient_clinic_id() {
		return patient_clinic_id;
	}
	public void setPatient_clinic_id(String patient_clinic_id) {
		this.patient_clinic_id = patient_clinic_id;
	}
	



   
}
