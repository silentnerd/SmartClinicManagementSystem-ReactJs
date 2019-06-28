package com.example.scms.repository;

import java.util.Collection;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.example.scms.model.Issue;
import com.example.scms.model.Queue;
@Transactional
@Repository
public interface QueueRepository extends JpaRepository<Queue, Long> {

	@Modifying
    @Query("update Queue q set q.status=:status where q.patientid=:patientid")
    int closequeue(@Param("status") String status, @Param("patientid") String patientid);
	
	@Query("SELECT q FROM Queue q WHERE q.status = 0 ORDER BY q.id ASC")
	List<Queue> findAllActiveQueues();
	

	@Query(nativeQuery = true,
    value = "SELECT * FROM Queue q WHERE q.status = 0 AND q.doc_specialization=:special ORDER BY q.id ASC LIMIT 1")
	Queue getLatestQueue(@Param("special") String special);
}
