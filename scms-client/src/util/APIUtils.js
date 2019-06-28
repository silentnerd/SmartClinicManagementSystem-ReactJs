import { API_BASE_URL, ACCESS_TOKEN } from '../constants';

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })
  //  console.log(localStorage.getItem(ACCESS_TOKEN));
    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
    .then(response => 
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );
};

export function getAllUsers() {
    return request({
        url: API_BASE_URL + "/users",
        method: 'GET'
    });
}

export function getAllPatients() {
    return request({
        url: API_BASE_URL + "/patients",
        method: 'GET'
    });
}

export function getAllActiveQueues() {
    return request({
        url: API_BASE_URL + "/queues/activequeues",
        method: 'GET'
    });
}

export function getLatestActiveQueue(special) {
    return request({
        url: API_BASE_URL + "/queues/getlatestactivequeue/" + special,
        method: 'GET'
    });
}

export function getAllSymptoms() {
    return request({
        url: API_BASE_URL + "/symptoms",
        method: 'GET'
    });
}

export function getAllIssues() {
    return request({
        url: API_BASE_URL + "/issues",
        method: 'GET'
    });
}

export function getAllTests() {
    return request({
        url: API_BASE_URL + "/tests",
        method: 'GET'
    });
}

export function getAllMedicals() {
    return request({
        url: API_BASE_URL + "/medicals",
        method: 'GET'
    });
}


export function getAllClinicsbyPatId(id) {
    //console.log(id);
    return request({
        url: API_BASE_URL + "/clinics/clinicsbypatid/" + id,
        method: 'GET'
    });
}

export function createQueue(queueData) {
    //console.log(queueData);
    return request({
        url: API_BASE_URL + "/queues",
        method: 'POST',
        body: JSON.stringify(queueData)
    });
}

export function closequeue(status, id) {
console.log(status, id);
    return request({
        url: API_BASE_URL + "/queues/close",
        method: 'POST',
        body: JSON.stringify({
            status: status,
            patientid: id,
        })
    });
}

export function createClinic(clinicData) {
    console.log(JSON.stringify(clinicData));
    return request({
        url: API_BASE_URL + "/clinics",
        method: 'POST',
        body: JSON.stringify(clinicData)
    });
}

export function createBodylocationlist(bllData) {
    console.log(JSON.stringify(bllData));
    return request({
        url: API_BASE_URL + "/bodylocationlists",
        method: 'POST',
        body: JSON.stringify(bllData)
    });
}

export function updateUserStatus(status, id) {
  
    return request({
        url: API_BASE_URL + "/auth/updateUserStatus",
        method: 'POST',
        body: JSON.stringify({
            status: status,
            id: id,
        })
    });
}

export function updatePatientStatus(status, id) {
console.log(status,id);
    return request({
        url: API_BASE_URL + "/patients/updatePatientStatus",
        method: 'POST',
        body: JSON.stringify({
            status: status,
            clinic_id: id,
        })
    });
}

export function createPatient(patientData) {
    console.log(patientData);
    return request({
        url: API_BASE_URL + "/patients",
        method: 'POST',
        body: JSON.stringify(patientData)
    });
}

export function updatePatient(patientdata) {
    return request({
        url: API_BASE_URL + "/patients/" + patientdata.id,
        method: 'POST',
        body: JSON.stringify(patientdata)
    });
}

export function deletePatient(id) {
    return request({
        url: API_BASE_URL + "/patients/" + id,
        method: 'DELETE',
         body: JSON.stringify(id)
    });
}

export function login(loginRequest) {
    return request({
        url: API_BASE_URL + "/auth/signin",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function signup(signupRequest) {
    return request({
        url: API_BASE_URL + "/auth/signup",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

export function checkUsernameAvailability(username) {
    return request({
        url: API_BASE_URL + "/user/checkUsernameAvailability?username=" + username,
        method: 'GET'
    });
}

export function checkEmailAvailability(email) {
    return request({
        url: API_BASE_URL + "/user/checkEmailAvailability?email=" + email,
        method: 'GET'
    });
}


export function getCurrentUser() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/user/me",
        method: 'GET'
    });
}

export function getUserProfile(username) {
    return request({
        url: API_BASE_URL + "/users/" + username,
        method: 'GET'
    });
}

export function getPatientsbyPatientsId(id) {
    return request({
        url: API_BASE_URL + "/patients/clinic/"+id,
        method: 'GET'
    });
}

export function getPatientsbyId(id) {
    return request({
        url: API_BASE_URL + "/patients/" + id,
        method: 'GET'
    });
}

export function fetchclinicdatabyId(id){
    return request({
        url: API_BASE_URL + "/clinics/" + id,
        method: 'GET'
    });
}

export function getAllClinicsInfobyClinicId(id) {
    console.log(id);
    return request({
        url: API_BASE_URL + "/clinics/" + id,
        method: 'GET'
    });
}

export function getUserById(id) {
    return request({
        url: API_BASE_URL + "/users/one/" + id,
        method: 'GET'
    });
}

export function deleteUser(id) {
    return request({
        url: API_BASE_URL + "/users/" + id,
        method: 'DELETE'
    });
}

export function updateUser(userdata) {
    return request({
        url: API_BASE_URL + "/users/" + userdata.id,
        method: 'POST',
        body: JSON.stringify(userdata)
    });
}