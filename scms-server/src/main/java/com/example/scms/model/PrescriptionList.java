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
@Table(name = "prescription_list")
public class PrescriptionList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Size(max = 100)
    private String name;
    
    @Size(max = 45)
    private String qtd;
    
    @Size(max = 45)
    private String type;
    
    @Size(max = 45)
    private String food;
    
    @Size(max = 45)
    private String morning;
    
    @Size(max = 45)
    private String day;
    
    @Size(max = 45)
    private String evening;
    
    @Size(max = 45)
    private String night;
    
    @Size(max = 45)
    private String clinic_id;
    
    @Size(max = 10)
    private String status;
    

    

    
    public PrescriptionList() {

    }


	public PrescriptionList(String name, String qtd,
			String type, String food, String morning,
			String day, String evening, String night,
			String clinic_id, String status) {
	
	
		this.name = name;
		this.qtd = qtd;
		this.type = type;
		this.food = food;
		this.morning = morning;
		this.day = day;
		this.evening = evening;
		this.night = night;
		this.clinic_id = clinic_id;
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





	public String getQtd() {
		return qtd;
	}





	public void setQtd(String qtd) {
		this.qtd = qtd;
	}





	public String getType() {
		return type;
	}





	public void setType(String type) {
		this.type = type;
	}





	public String getFood() {
		return food;
	}





	public void setFood(String food) {
		this.food = food;
	}





	public String getMorning() {
		return morning;
	}





	public void setMorning(String morning) {
		this.morning = morning;
	}





	public String getDay() {
		return day;
	}





	public void setDay(String day) {
		this.day = day;
	}





	public String getEvening() {
		return evening;
	}





	public void setEvening(String evening) {
		this.evening = evening;
	}





	public String getNight() {
		return night;
	}





	public void setNight(String night) {
		this.night = night;
	}





	public String getClinic_id() {
		return clinic_id;
	}





	public void setClinic_id(String clinic_id) {
		this.clinic_id = clinic_id;
	}


	public String getStatus() {
		return status;
	}


	public void setStatus(String status) {
		this.status = status;
	}
	
    


   
}
