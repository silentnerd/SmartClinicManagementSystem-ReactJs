package com.example.scms.model;

import java.util.List;
import java.util.Optional;

public class RequestWrapper {

	
    private Clinic clinic;
    private Optional<Clinic> clinic1;

    private List<BodylocationList> bodylocationlist;
    private List<SymptomList> symptomlist;
    private List<IssueList> issuelist;
    private List<PatientTestResults> patienttestresult;
    private List<PrescriptionList> prescriptionlist;


    RequestWrapper(){}
    
   
    
	public RequestWrapper(Clinic clinic, List<BodylocationList> bodylocationlist, List<SymptomList> symptomlist,
			List<IssueList> issuelist, List<PatientTestResults> patienttestresult,
			List<PrescriptionList> prescriptionlist) {
	
		this.clinic = clinic;
		this.bodylocationlist = bodylocationlist;
		this.symptomlist = symptomlist;
		this.issuelist = issuelist;
		this.patienttestresult = patienttestresult;
		this.prescriptionlist = prescriptionlist;
	}
	public RequestWrapper(Optional<Clinic> clinic1, List<BodylocationList> bodylocationlist, List<SymptomList> symptomlist,
			List<IssueList> issuelist, List<PatientTestResults> patienttestresult,
			List<PrescriptionList> prescriptionlist) {
	
		this.clinic1 = clinic1;
		this.bodylocationlist = bodylocationlist;
		this.symptomlist = symptomlist;
		this.issuelist = issuelist;
		this.patienttestresult = patienttestresult;
		this.prescriptionlist = prescriptionlist;
	}



	public Clinic getClinic() {
		return clinic;
	}


	public void setClinic(Clinic clinic) {
		this.clinic = clinic;
	}

	public List<BodylocationList> getBodylocationlist() {
		return bodylocationlist;
	}

	public void setBodylocationlist(List<BodylocationList> bodylocationlist) {
		this.bodylocationlist = bodylocationlist;
	}



	public List<SymptomList> getSymptomlist() {
		return symptomlist;
	}



	public void setSymptomlist(List<SymptomList> symptomlist) {
		this.symptomlist = symptomlist;
	}



	public List<IssueList> getIssuelist() {
		return issuelist;
	}



	public void setIssuelist(List<IssueList> issuelist) {
		this.issuelist = issuelist;
	}



	public List<PatientTestResults> getPatienttestresult() {
		return patienttestresult;
	}



	public void setPatienttestresult(List<PatientTestResults> patienttestresult) {
		this.patienttestresult = patienttestresult;
	}



	public List<PrescriptionList> getPrescriptionlist() {
		return prescriptionlist;
	}



	public void setPrescriptionlist(List<PrescriptionList> prescriptionlist) {
		this.prescriptionlist = prescriptionlist;
	}



	public Optional<Clinic> getClinic1() {
		return clinic1;
	}



	public void setClinic1(Optional<Clinic> clinic1) {
		this.clinic1 = clinic1;
	}










	





	



   
}
