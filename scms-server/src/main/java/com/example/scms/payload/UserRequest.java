package com.example.scms.payload;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.*;

import org.hibernate.annotations.NaturalId;



public class UserRequest {
	 	

	    
	    @Size(max = 40)
	    private String fname;
	    
	    
	    @Size(max = 40)
	    private String lname;  

	    
	    
	    @Size(max = 40)
	    private String dob;
	    
	    
	    @Size(max = 40)
	    private String nic;
	    
	    
	    @Size(max = 40)
	    private String gender;
	    
	    
	    @Size(max = 15)
	    private String phone;
	    
	    
	    @Size(max = 40)
	    private String address;
	    
	   
	    @Size(max = 40)
	    private String specialization;
	    
	    
	    @Size(max = 40)
	    private String usertype;


	    
	    @Size(max = 40)
	    @Email
	    private String email;

	    
	    @Size(max = 100)
	    private String password;
	    
	    public UserRequest() {
	    	
	    }

	   
	    
	    public UserRequest(String fname, String lname,
	    		String dob, String nic,
				String gender, String phone,
				String address, String specialization,
				String usertype, String email,
				String password) {
			
			
			this.fname = fname;
			this.lname = lname;
			this.dob = dob;
			this.nic = nic;
			this.gender = gender;
			this.phone = phone;
			this.address = address;
			this.specialization = specialization;
			this.usertype = usertype;
			this.email = email;
			this.password = password;
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

		public String getPhone() {
			return phone;
		}

		public void setPhone(String phone) {
			this.phone = phone;
		}

		public String getAddress() {
			return address;
		}

		public void setAddress(String address) {
			this.address = address;
		}

		public String getSpecialization() {
			return specialization;
		}

		public void setSpecialization(String specialization) {
			this.specialization = specialization;
		}

		public String getUsertype() {
			return usertype;
		}

		public void setUsertype(String usertype) {
			this.usertype = usertype;
		}

		public String getEmail() {
			return email;
		}

		public void setEmail(String email) {
			this.email = email;
		}

		public String getPassword() {
			return password;
		}

		public void setPassword(String password) {
			this.password = password;
		}
	    
	    
}
