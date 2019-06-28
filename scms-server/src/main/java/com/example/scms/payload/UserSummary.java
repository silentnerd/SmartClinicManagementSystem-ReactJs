package com.example.scms.payload;

public class UserSummary {
    private Long id;
    private String username;
    private String fname;
    private String lname;
    private String specialization;
    private String usertype;
    private String status;

    public UserSummary(Long id, String username, String fname, String lname, String specialization, String usertype, String status) {
        this.id = id;
        this.username = username;
        this.fname = fname;
        this.lname = lname;
        this.specialization = specialization;
        this.usertype = usertype;
        this.status = status;
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

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

   
}
