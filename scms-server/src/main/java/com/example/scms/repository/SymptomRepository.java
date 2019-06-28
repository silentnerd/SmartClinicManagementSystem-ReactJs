package com.example.scms.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.scms.model.Issue;
import com.example.scms.model.Symptom;

@Repository
public interface SymptomRepository extends JpaRepository<Symptom, Long> {

    
}
