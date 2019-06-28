package com.example.scms.payload;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public class PatientRequest {
	
    
    @Size(max = 140)
    private String clinic_id;

    @Size(max = 140)
    private String fname;

    @Size(max = 140)
    private String lname;
    
    @Size(max = 140)
    private String dob;
    
    @Size(max = 140)
    private String nic;
    
    @Size(max = 140)
    private String gender;
    
    @Size(max = 140)
    private String address;
    
    @Size(max = 140)
    private String doc_specialization;
    
    @Size(max = 140)
    private String email;
    
    @Size(max = 140)
    private String phone;

    @Size(max = 2)
    private String status;
    
    public PatientRequest() {}
    
	public PatientRequest(String clinic_id, String fname,
			String lname, String dob, String nic,
			String gender, String phone, String address, String doc_specialization,
			String email, String status) {
		
		this.clinic_id = clinic_id;
		this.fname = fname;
		this.lname = lname;
		this.dob = dob;
		this.nic = nic;
		this.gender = gender;
		this.address = address;
		this.doc_specialization = doc_specialization;
		this.email = email;
		this.phone = phone;
		this.status =status;
	}
	
	public PatientRequest(String status, String clinic_id) {
		this.status =status;
		this.clinic_id = clinic_id;
	}

	public String getClinic_id() {
		return clinic_id;
	}

	public void setClinic_id(String clinic_id) {
		this.clinic_id = clinic_id;
	}

	public String getFname() {
		return fname;
	}

	public void setFname(String fname) {
		this.fname = fname;
	}

	public String getLname() {
		return lname;
	}

	public void setLname(String lname) {
		this.lname = lname;
	}

	public String getDob() {
		return dob;
	}

	public void setDob(String dob) {
		this.dob = dob;
	}

	public String getNic() {
		return nic;
	}

	public void setNic(String nic) {
		this.nic = nic;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getDoc_specialization() {
		return doc_specialization;
	}

	public void setDoc_specialization(String doc_specialization) {
		this.doc_specialization = doc_specialization;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

}
