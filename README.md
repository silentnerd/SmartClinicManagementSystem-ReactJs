# Full Stack Application with React, Spring Boot, AWS S3 Bucket, RFID
## Smart Clinic Management System using RFID
![alt text](https://github.com/silentnerd/SmartClinicManagementSystem-ReactJs/blob/master/patientdashabord.png?raw=true)

A web application which digitalise the process of clinic management in government hospitals.
The objective of this application is to reduce the waiting time of the patient in the clinical department. More over it also
ensures that patient data are secure it all their records and results.

- React is a one of the most popular front end view frameworks
- Spring Boot is an awesome framework to build RESTful API and Microservices.

#### Required Tools

- Node v10+ for npm
- Visual Studio Code - Latest Version
- Java 8+
- Spring Boot IDE
- RFID Reader/Writer
- AWS S3 Bucket

## Installation Guides

## Steps to Setup the Spring Boot Back end app (scms-server)

1. **Clone the application**

	```bash
	git clone https://github.com/silentnerd/SmartClinicManagementSystem-ReactJs.git
	cd scms-server
	```

2. **Create MySQL database**

	```bash
	create database scms_app
	```

3. **Change MySQL username and password as per your MySQL installation**

	+ open `src/main/resources/application.properties` file.

	+ change `spring.datasource.username` and `spring.datasource.password` properties as per your mysql installation

4. **Change AWS Configuration settings**

	+ open `src/main/resources/application.properties` file.
	
	+ change `aws.access.key.id = #`, `aws.access.key.secret = #` and `aws.region = #`

4. **Run the app**

	You can run the spring boot app by typing the following command -

	```bash
	mvn spring-boot:run
	```

	The server will start on port 5000.


## Steps to Setup the React Front end app (scms-client)

First go to the `scms-client` folder -

```bash
cd scms-client
```

Then type the following command to install the dependencies and start the application -

```bash
npm install && npm start
```

The front-end server will start on port `3000`.





