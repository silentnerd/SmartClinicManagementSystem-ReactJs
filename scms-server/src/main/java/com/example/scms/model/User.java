package com.example.scms.model;

import org.hibernate.annotations.NaturalId;

import com.example.scms.model.audit.DateAudit;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.Set;


@Entity
@Table(name = "users", uniqueConstraints = {
        @UniqueConstraint(columnNames = {
            "username"
        }),
        @UniqueConstraint(columnNames = {
            "email"
        })
})
public class User extends DateAudit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 40)
    private String fname;
    
    @NotBlank
    @Size(max = 40)
    private String lname;  

    @NotBlank
    @Size(max = 15)
    private String username;
    
    @NotBlank
    @Size(max = 40)
    private String dob;
    
    
    @Size(max = 40)
    private String nic;
    
    @NotBlank
    @Size(max = 40)
    private String gender;
    
    @NotBlank
    @Size(max = 15)
    private String phone;
    
    @NotBlank
    @Size(max = 40)
    private String address;
    
   
    @Size(max = 40)
    private String specialization;
    
    @NotBlank
    @Size(max = 40)
    private String usertype;

    
    @NotBlank
    @Size(max = 40)
    @Email
    private String email;

    @NotBlank
    @Size(max = 100)
    private String password;
    
   
    @Size(max = 40)
    private String name;
    
    @Size(max = 2)
    private String status;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();

  
    public User(){}
    
    

    public User(Long id, String fname, String lname,
			String username, String dob, String nic,
			String gender, String phone,
			String address, String specialization,
			String usertype, String email,
			String password) {
		
		this.id = id;
		this.fname = fname;
		this.lname = lname;
		this.username = username;
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


    public User(String fname, String lname,
 			String username, String dob, String nic,
 			String gender, String phone,
 			String address, String specialization,
 			String usertype, String email,
 			String password) {
 		
 		this.fname = fname;
 		this.lname = lname;
 		this.username = username;
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
    
    public User(Long id, String fname, String lname, String dob, String nic,
 			String gender, String phone,
 			String address, String specialization,
 			String usertype, String email,
 			String password) {
 		this.id = id;
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



	public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
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



	public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }
}