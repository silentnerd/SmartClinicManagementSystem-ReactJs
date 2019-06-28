package com.example.scms.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.example.scms.model.Patient;

import java.util.List;
import java.util.Optional;
@Transactional
@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {

    Optional<Patient> findById(Long pollId);
    
    Boolean existsByEmail(String email);
    
    @Query("select count(p)>0 from Patient p where clinic_id=:clinic_id")
    Boolean existsByClinic_id(@Param("clinic_id") String clinic_id);
    
    Boolean existsByNic(String nic);
    
    Boolean existsByPhone(String phone);
    
    @Query("SELECT p FROM Patient p where p.clinic_id = :clinicId")
    Optional<Patient> findByClinicId(@Param("clinicId") String clinicId);



    List<Patient> findByIdIn(List<Long> pollIds);

    List<Patient> findByIdIn(List<Long> pollIds, Sort sort);
    
    @Modifying
    @Query("update Patient p set p.status=:status where p.clinic_id=:clinic_id")
    int updatePatientStatus(@Param("status") String status, @Param("clinic_id") String clinic_id);
}

