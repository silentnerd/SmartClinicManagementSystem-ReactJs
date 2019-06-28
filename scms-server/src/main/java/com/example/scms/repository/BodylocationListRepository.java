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
@Transactional
@Repository
public interface BodylocationListRepository extends JpaRepository<BodylocationList, Long> {

	
	
	@Query("SELECT bll FROM BodylocationList bll WHERE bll.clinic_id = :clinicid")
	List<BodylocationList> findBodylocationlistbyClinicId(@Param("clinicid") String clinicid);

	List<BodylocationList> findAllById(Long clinic_id);
}
