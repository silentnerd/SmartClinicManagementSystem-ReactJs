package com.example.scms.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.scms.model.Issue;

@Repository
public interface IssueRepository extends JpaRepository<Issue, Long> {

    
}
