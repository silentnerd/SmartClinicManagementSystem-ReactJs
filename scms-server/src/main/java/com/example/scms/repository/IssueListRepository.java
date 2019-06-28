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
import com.example.scms.model.IssueList;
import com.example.scms.model.Queue;
@Transactional
@Repository
public interface IssueListRepository extends JpaRepository<IssueList, Long> {

	
	
	@Query("SELECT iss FROM IssueList iss WHERE iss.clinic_id = :clinicid")
	List<IssueList> findIssuebyClinicId(@Param("clinicid") String clinicid);

	List<IssueList> findAllById(Long clinic_id);
}
