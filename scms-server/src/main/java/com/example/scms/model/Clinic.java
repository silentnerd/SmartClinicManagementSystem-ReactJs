package com.example.scms.model;

import org.hibernate.annotations.BatchSize;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import com.example.scms.model.audit.DateAudit;
import com.example.scms.model.audit.UserDateAudit;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "clinic")
public class Clinic extends DateAudit{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Size(max = 140)
    private String doc_id;

    @Size(max = 140)
    private String patient_clinic_id;
    @Size(max = 255)
    private String addinfo;

    
    public Clinic() {

    }
	public Clinic(String doc_id, String patient_clinic_id, String addinfo) {
		this.id = id;
		this.doc_id = doc_id;
		this.patient_clinic_id = patient_clinic_id;
		this.addinfo = addinfo;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getDoc_id() {
		return doc_id;
	}
	public void setDoc_id(String doc_id) {
		this.doc_id = doc_id;
	}
	public String getPatient_clinic_id() {
		return patient_clinic_id;
	}
	public void setPatient_clinic_id(String patient_clinic_id) {
		this.patient_clinic_id = patient_clinic_id;
	}
	public String getAddinfo() {
		return addinfo;
	}
	public void setAddinfo(String addinfo) {
		this.addinfo = addinfo;
	}

	



   
}
