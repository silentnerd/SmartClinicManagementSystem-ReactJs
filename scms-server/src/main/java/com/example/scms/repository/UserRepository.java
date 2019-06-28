package com.example.scms.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.example.scms.model.Patient;
import com.example.scms.model.User;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

@Transactional
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    Optional<User> findByUsernameOrEmail(String username, String email);

    List<User> findByIdIn(List<Long> userIds);

    Optional<User> findByUsername(String username);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);
    
    Boolean existsByNic(String nic);
    
    Boolean existsByPhone(String phone);
  
    @Modifying
    @Query("update User u set u.status=:status where u.id=:userid")
    int updateUserStatus(@Param("status") String status, @Param("userid") Long userid);
    /* User user1 = new User(userId, userRequest.getFname(), userRequest.getLname(), userRequest.getDob(),
	userRequest.getNic(), userRequest.getGender(), userRequest.getPhone(), userRequest.getAddress(), userRequest.getSpecialization(),
	userRequest.getUsertype(), userRequest.getEmail(), userRequest.getPassword());
user1.setPassword(passwordEncoder.encode(userRequest.getPassword()));
*/
    @Modifying
    @Query("update User u set u.fname=:fname,u.lname=:lname,u.dob=:dob,u.nic=:nic,u.gender=:gender,u.phone=:phone,u.address=:address,u.specialization=:specialization,u.usertype=:usertype,u.email=:email,u.password=:password where u.id=:userid")
    int updateUserbyId(@Param("fname") String fname, @Param("lname") String lname, @Param("dob") String dob, @Param("nic") String nic, 
    		@Param("gender") String gender, @Param("phone") String phone, @Param("address") String address, @Param("specialization") String specialization, 
    		@Param("usertype") String usertype, @Param("email") String email, @Param("password") String password, @Param("userid") Long userId);
}


