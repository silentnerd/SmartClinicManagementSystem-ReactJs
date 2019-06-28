CREATE TABLE `users` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `fname` varchar(40) DEFAULT NULL,
  `lname` varchar(40) DEFAULT NULL,
  `username` varchar(15) DEFAULT NULL,
  `dob` varchar(15) DEFAULT NULL,
  `nic` varchar(15) DEFAULT NULL,
  `gender` varchar(15) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `specialization` varchar(40) DEFAULT NULL,
  `usertype` varchar(40) DEFAULT NULL,
  `email` varchar(40) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `name` varchar(45) DEFAULT NULL,
  `status` varchar(2) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_users_username` (`username`),
  UNIQUE KEY `uk_users_email` (`email`),
  UNIQUE KEY `nic_UNIQUE` (`nic`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

	INSERT INTO `users` VALUES (3,'Sujeban','Elankeswaranaa','suji','1998-07-15','9851656d5v','male','7756322253','Nakkiampulam','General Medicine','Doctor','41sujeban42@gmail.com','$2a$10$fpTuRU79AEknGHsi9FgQdOWghVIT7Pr3Xy.4RNazQnbQWIwX66qKW','2019-03-22 00:36:20','2019-03-22 00:36:20',NULL,'0'),
							(6,'Sakilan','Elankeswaran','sakilan','1998-05-22','849849849v','male','775822626','Brown Road','General Medicine','doctor','41sakilan42@gmail.com','$2a$10$HrZKKil6kSsxbhSBbslns.7Rvp2/wMd1Nlfc16D6GQr6WI64VM5Qy','2019-04-07 00:33:16','2019-04-07 00:33:16',NULL,'1'),
							(8,'RFID','RFID1','rfid1','2019-04-01','noid','male','1','noaddress','','rfid','rfid@email.com','$2a$10$sqdgTwXIKIfJ/XEMWJnKb.CRG6fMhJGMAWT3AXSJDz1rRKO/sSjPm','2019-04-15 02:25:20','2019-04-15 02:25:20',NULL,'1'),
							(9,'Sakilan','Elankeswaran','asdfsdf','2019-05-08','23432423423','female','10','Nakkiampulam, Earlalai South','Geriatric Medicine','rfid','41sujebadsfsdfasan42@gmail.com','$2a$10$ttk68EZfEuRRJII7wdd3lOJRJljAo36UkTabovZl0bSO8prq3q2MS','2019-05-01 00:10:56','2019-05-01 00:10:56',NULL,NULL);
CREATE TABLE `roles` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(60) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_roles_name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;


CREATE TABLE `user_roles` (
  `user_id` bigint(20) NOT NULL,
  `role_id` bigint(20) NOT NULL,
  PRIMARY KEY (`user_id`,`role_id`),
  KEY `fk_user_roles_role_id` (`role_id`),
  CONSTRAINT `fk_user_roles_role_id` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`),
  CONSTRAINT `fk_user_roles_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE `patient` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `clinic_id` varchar(45) DEFAULT NULL,
  `fname` varchar(40) DEFAULT NULL,
  `lname` varchar(40) DEFAULT NULL,
  `dob` varchar(15) DEFAULT NULL,
  `nic` varchar(15) DEFAULT NULL,
  `gender` varchar(15) DEFAULT NULL,
  `phone` varchar(13) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `doc_specialization` varchar(40) DEFAULT NULL,
  `email` varchar(40) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `status` varchar(2) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;

CREATE TABLE `medical` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

CREATE TABLE `issue_list` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `clinic_id` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

CREATE TABLE `issue` (
  `id` bigint(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8;

CREATE TABLE `clinic` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `doc_id` bigint(20) NOT NULL,
  `patient_clinic_id` varchar(45) NOT NULL,
  `addinfo` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

CREATE TABLE `bodylocation_list` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `clinic_id` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

CREATE TABLE `tests` (
  `id` bigint(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8;

CREATE TABLE `symptoms` (
  `id` bigint(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8;

CREATE TABLE `symptom_list` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `clinic_id` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

CREATE TABLE `queue` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `patientid` varchar(40) NOT NULL,
  `docid` varchar(40) DEFAULT NULL,
  `doc_specialization` varchar(45) DEFAULT NULL,
  `status` varchar(40) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

CREATE TABLE `prescription_list` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `qtd` varchar(45) DEFAULT NULL,
  `type` varchar(45) DEFAULT NULL,
  `food` varchar(45) NOT NULL,
  `morning` varchar(45) DEFAULT NULL,
  `day` varchar(45) DEFAULT NULL,
  `evening` varchar(45) DEFAULT NULL,
  `night` varchar(45) DEFAULT NULL,
  `clinic_id` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

CREATE TABLE `patient_test_result` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `patient_clinic_id` varchar(45) NOT NULL,
  `laborist_id` varchar(45) DEFAULT NULL,
  `clinic_id` varchar(45) DEFAULT NULL,
  `file_path` varchar(255) DEFAULT NULL,
  `status` varchar(2) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;