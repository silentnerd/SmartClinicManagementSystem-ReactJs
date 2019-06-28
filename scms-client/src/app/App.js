import React, { Component } from 'react';
import './App.css';
import {
  Route,
  withRouter,
  Switch
} from 'react-router-dom';
import BarcodeReader from 'react-barcode-reader'

import { getCurrentUser, createQueue, updateUserStatus, updatePatientStatus, getPatientsbyPatientsId, getLatestActiveQueue } from '../util/APIUtils';
import { ACCESS_TOKEN } from '../constants';

import PatientDashboard from '../patient/Dashboard';
import PatientList from '../patient/PatientList';
import UserList from '../user/signup/UserList';
import Login from '../user/login/Login';
import NewUser from '../user/signup/Signup';
import Profile from '../user/profile/Profile';
import AppHeader from '../common/AppHeader';
import NotFound from '../common/NotFound';
import LoadingIndicator from '../common/LoadingIndicator';
import PrivateRoute from '../common/PrivateRoute';
import Welcome from '../Welcome';


import { Layout, notification, message } from 'antd';
import Aside from '../common/Aside';
import NewPatient from '../patient/NewPatient';
import EditPatient from '../patient/EditPatient';
import EditUser from '../user/signup/EditUser';
import QueuesList from '../queue/QueueList';
import FileUpload from '../patient/FileUpload';
const { Sider } = Layout;
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      isAuthenticated: false,
      isLoading: false,
      result: 'No result',
       show: {
        display: 'none'
      },
      patientinfo: [({
        clinic_id: '',
        fname: '',
        lname: '',
        dob: '',
        nic: '',
        gender: '',
        phone: '',
        address: '',
        doc_specialization: '',
        email: '',
      })],
    }
    this.handleLogout = this.handleLogout.bind(this);
    this.loadCurrentUser = this.loadCurrentUser.bind(this);
    this.handleLogin = this.handleLogin.bind(this);

    this.handleScan = this.handleScan.bind(this)

    notification.config({
      placement: 'topRight',
      top: 70,
      duration: 3,
    });    
  }

  loadCurrentUser() {
    this.setState({
      isLoading: true
    });
    getCurrentUser()
    .then(response => {
       if(response.usertype === 'rfid'){
         this.setState({
        currentUser: response,
        isAuthenticated: true,
        isLoading: false,
        show: {display: 'none'}
      });
       }else{
      this.setState({
        currentUser: response,
        isAuthenticated: true,
        isLoading: false,
        show: {display: 'block'}
      });
    }
this.updateUserStatusfunc(1);

    }).catch(error => {
      this.setState({
        isLoading: false
      });  
    });
  }

  componentDidMount() {
    this.loadCurrentUser();

  }

  handleLogout(redirectTo="/login", notificationType="success", description="You're successfully logged out.") {
    localStorage.removeItem(ACCESS_TOKEN);
this.updateUserStatusfunc(0);
    this.setState({
      currentUser: null,
      isAuthenticated: false,
      show: {display: 'none'}
    });

    this.props.history.push(redirectTo);
    
    notification[notificationType]({
      message: 'Smart Clinic Management System',
      description: description,
    });
  }

  handleLogin() {
    notification.success({
      message: 'Smart Clinic Managment System',
      description: "You're successfully logged in.",
    });

    this.loadCurrentUser();

    this.props.history.push("/");
 

   

  }

  updateUserStatusfunc(status) {
     console.log(this.state.currentUser.id);
    updateUserStatus(status, this.state.currentUser.id);
  }
  // RFID scanner handler
  handleScan(data) {
    this.setState({
      result: data,
    })
    if(this.state.currentUser.usertype === 'rfid'){
        console.log(this.state.patientinfo);
          getPatientsbyPatientsId(data).then((response) => {  
        
            if(response.status==0){
              const queue = {
                patientid: data,
                doc_specialization: response.doc_specialization,
              };
            //Create new Queue  
            createQueue(queue);
            //Update patient status
            updatePatientStatus(1, response.clinic_id);
              message.success('Patient Registered ' + data);
            }else{
                message.error('Patient already scanned');
            }
            this.state.patientinfo = ({
              clinic_id: response.clinic_id,
              fname: response.fname,
              lname: response.lname,
              dob: response.dob,
              nic: response.nic,
              gender: response.gender,
              phone: response.phone,
              address: response.address,
              doc_specialization: response.doc_specialization,
              email: response.email,
            });
          });
    } else if (this.state.currentUser.usertype === 'doctor') {
      getLatestActiveQueue(this.state.currentUser.specialization).then((response1) => {

      if(response1.patientid === data){
      getPatientsbyPatientsId(data).then((response) => {
        if (response.status == 1) {
          //Update patient status
          updatePatientStatus(2, response.clinic_id);
             this.props.history.push("/patient/dashboard/"+response.clinic_id);
          
           this.setState(this.state);
           window.location.reload();
        } else {
          message.error('Queue already closed');
          this.props.history.push("/patient/dashboard/"+response.clinic_id);
        }
          
      });
      }else{
        message.error('The patient came in a wrong order or wrong doctor!');
      }
      });
    }
 
  }
  handleError(err) {
    console.error(err)
  }

  render() {

    if(this.state.isLoading) {
      return <LoadingIndicator />
    }
     
    return (
         <Layout>
     <AppHeader isAuthenticated={this.state.isAuthenticated} 
            currentUser={this.state.currentUser} 
            onLogout={this.handleLogout} 
            show={this.state.show}/>
    <Layout>
      <Sider width={200} style={{ background: '#fff'}} style={this.state.show}>
        <Aside/>
      </Sider>
      <Layout>
         <Switch>      
                <Route exact path="/patients" 
                  render={(props) => <PatientList isAuthenticated={this.state.isAuthenticated} 
                      currentUser={this.state.currentUser} handleLogout={this.handleLogout} {...props} />}>
                </Route>
                <Route exact path="/users" 
                  render={(props) => <UserList isAuthenticated={this.state.isAuthenticated} 
                      currentUser={this.state.currentUser} handleLogout={this.handleLogout} {...props} />}>
                </Route>
                <Route path="/login" render={(props) => <Login onLogin={this.handleLogin} {...props} />}></Route>
                
                <Route path="/users/:username" 
                  render={(props) => <Profile isAuthenticated={this.state.isAuthenticated} currentUser={this.state.currentUser} {...props}  />}>
                </Route>
                <PrivateRoute authenticated={this.state.isAuthenticated} path="/patient/new" component={NewPatient} handleLogout={this.handleLogout}></PrivateRoute>
                <PrivateRoute authenticated={this.state.isAuthenticated} path="/patient/edit/:id" component={EditPatient} handleLogout={this.handleLogout}></PrivateRoute>
                <PrivateRoute authenticated={this.state.isAuthenticated} path="/user/edit/:id" component={EditUser} handleLogout={this.handleLogout}></PrivateRoute>
                
                <Route authenticated={this.state.isAuthenticated} path="/queue/monitor" component={QueuesList} ></Route>
                <Route authenticated={this.state.isAuthenticated} path="/fileupload" component={FileUpload} ></Route>
              <Route path="/patient/dashboard/:id" 
                  render={(props) => <PatientDashboard isAuthenticated={this.state.isAuthenticated} currentUser={this.state.currentUser} {...props}  />}>
                </Route>
               <Route path="/user/new" component={NewUser}></Route>
               <Route path="/" component={Welcome}></Route>
                <Route component={NotFound}></Route>
              </Switch>
               <BarcodeReader
          onError={this.handleError}
          onScan={this.handleScan}
          />
      
      </Layout>
    </Layout>
  </Layout>
    );
  }

}

export default withRouter(App);
 