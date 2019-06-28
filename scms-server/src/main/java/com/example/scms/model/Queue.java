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
@Table(name = "queue")
public class Queue {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Size(max = 40)
    private String patientid;
    
    @Size(max = 40)
    private String docid;
    
    @Size(max=40)
    private String doc_specialization;

    @Size(max = 3)
    private String status;

    

    public Queue() {

    }
	public Queue(String patientid, String docid, String doc_specialization,
			 String status) {
		this.patientid = patientid;
		this.docid = docid;
		this.doc_specialization = doc_specialization;
		this.status = status;
		
	}

	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
	public String getPatientid() {
		return patientid;
	}
	public void setPatientid(String patientid) {
		this.patientid = patientid;
	}
	public String getDocid() {
		return docid;
	}
	public void setDocid(String docid) {
		this.docid = docid;
	}
	
	public String getDoc_specialization() {
		return doc_specialization;
	}
	public void setDoc_specialization(String doc_specialization) {
		this.doc_specialization = doc_specialization;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
  
}
