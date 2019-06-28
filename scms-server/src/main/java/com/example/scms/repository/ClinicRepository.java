package com.example.scms.repository;

import java.util.Collection;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.example.scms.model.Clinic;
import com.example.scms.model.Issue;
import com.example.scms.model.Queue;
@Transactional
@Repository
public interface ClinicRepository extends JpaRepository<Clinic, Long> {

	@Modifying
    @Query("update Queue q set q.status=:status where q.patientid=:patientid")
    int updateclinic(@Param("status") String status, @Param("patientid") String patientid);
	
	@Query("SELECT c FROM Clinic c WHERE c.patient_clinic_id = :patient_clinic_id")
	List<Clinic> findAllClinicbyPatientId(@Param("patient_clinic_id") String patient_clinic_id);
}
