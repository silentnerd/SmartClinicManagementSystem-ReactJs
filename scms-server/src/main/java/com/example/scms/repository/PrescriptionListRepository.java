package com.example.scms.repository;

import java.util.Collection;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.example.scms.model.BodylocationList;
import com.example.scms.model.Clinic;
import com.example.scms.model.Issue;
import com.example.scms.model.PrescriptionList;
import com.example.scms.model.Queue;
@Transactional
@Repository
public interface PrescriptionListRepository extends JpaRepository<PrescriptionList, Long> {

	
	
	@Query("SELECT pres FROM PrescriptionList pres WHERE pres.clinic_id = :clinicid")
	List<PrescriptionList> findPrescriptionListbyClinicId(@Param("clinicid") String clinicid);

	List<PrescriptionList> findAllById(Long clinic_id);
	
	@Query("SELECT pres FROM PrescriptionList pres WHERE pres.status = '0'")
	List<PrescriptionList> findAllUndeliveredPrescription();
}
