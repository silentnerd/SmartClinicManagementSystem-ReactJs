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
import com.example.scms.model.Queue;
import com.example.scms.model.SymptomList;
@Transactional
@Repository
public interface SymptomListRepository extends JpaRepository<SymptomList, Long> {

	
	
	@Query("SELECT bll FROM SymptomList bll WHERE bll.clinic_id = :clinicid")
	List<SymptomList> findSymptomListbyClinicId(@Param("clinicid") String clinicid);

	List<SymptomList> findAllById(Long clinic_id);
}

