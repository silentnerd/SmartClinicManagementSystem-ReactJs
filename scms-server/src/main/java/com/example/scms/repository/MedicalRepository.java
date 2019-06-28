package com.example.scms.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.scms.model.Issue;
import com.example.scms.model.Medical;
import com.example.scms.model.Test;

@Repository
public interface MedicalRepository extends JpaRepository<Medical, Long> {

    
}
