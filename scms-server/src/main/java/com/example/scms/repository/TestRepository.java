package com.example.scms.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.scms.model.Issue;
import com.example.scms.model.PatientTestResults;
import com.example.scms.model.Test;

@Repository
public interface TestRepository extends JpaRepository<Test, Long> {

	@Modifying
    @Query("update PatientTestResults ptr set ptr.laborist_id=:laboristid, ptr.file_path=:filepath, ptr.status=:status where ptr.id=:ptrid")
    int updateptr(@Param("laboristid") String laboristid, @Param("filepath") String filepath, @Param("status") String status, @Param("ptrid") Long ptrid);
	
	/*@Modifying
    @Query("select * from PatientTestResults ptr where ptr.status='0'")
    List<PatientTestResults> findAllActiveTests();*/
}
