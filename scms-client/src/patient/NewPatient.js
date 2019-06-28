import React, { Component } from 'react';
import { createPatient } from '../util/APIUtils';
import './NewPatient.css';  
import { 
    NAME_MIN_LENGTH, NAME_MAX_LENGTH, 
    USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH,
    EMAIL_MAX_LENGTH,
    PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH
} from '../constants';
import { Form,Layout, Input, Button, notification, PageHeader, message, Select, DatePicker} from 'antd';
const { Content} = Layout;
const FormItem = Form.Item;
const Option = Select.Option;
class NewPatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clinic_id: {value: ''},
            fname: {value: ''},
            lname: {value: ''},
            dob: {value: ''},
            nic: {value: ''},
            gender: {value: ''},
            phone: {value: ''},
            address: {value: ''},
            doc_specialization: {value: ''},
            email: {value: ''},
            show: false,
        };
    
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.isFormInvalid = this.isFormInvalid.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const patientData = {
            clinic_id: this.state.clinic_id.value,
            fname: this.state.fname.value,
            lname: this.state.lname.value,
            dob: this.state.dob.value,
            nic: this.state.nic.value,
            gender: this.state.gender.value,
            phone: this.state.phone.value,
            address: this.state.address.value,
            doc_specialization: this.state.doc_specialization.value,
            email: this.state.email.value
           
        };
console.log(patientData);
        createPatient(patientData)
        .then(response => {
            message.success('Successfully new patient inserted!');
             
            this.props.history.push("/");
        }).catch(error => {
            if(error.status === 401) {
                this.props.handleLogout('/login', 'error', 'You have been logged out. Please login create poll.');    
            } else {
                notification.error({
                    message: 'Polling App',
                    description: error.message || 'Sorry! Something went wrong. Please try again!'
                });              
            }
        });
    }
    /*
hanleFormChange = (e) =>{
    const{name, value} = e.target;
    this.setState({[name]: value,});
}*/
handleInputChange(event, validationFun) {
        const target = event.target;
        const inputName = target.name;        
        const inputValue = target.value;

        this.setState({
            [inputName] : {
                value: inputValue,
                ...validationFun(inputValue)
            }
        });
    }

 componentDidMount(){
   
 }

 
        handleChangeGender = (value) => {
        console.log(`selected ${value}`);
        this.setState({gender: {value: value}});
    }
onChangePhone = (value) => {
  console.log('changed', value);
  this.setState({phone: {value: value}});
}
onChangeDob = (date, dateString) => {
    
    console.log(date, dateString);
    this.setState({dob: {value: dateString}});
}
 handleChangeSpecialization = (value) => {
     console.log(`selected ${value}`);
     this.setState({doc_specialization: {value: value}});
 }


    isFormInvalid() {
        console.log(this.state.fname)
        return !(this.state.clinic_id.validateStatus === 'success' &&
            this.state.fname.validateStatus === 'success');
    }

  render() {

        return (
             <React.Fragment>
      
           <PageHeader
    onBack={() => window.history.back()}
    title="Add new Patient">

  </PageHeader>
  <Content style={{background: '#fff', padding: 24, margin: 0, minHeight: 280,}}>
         <div className="new-poll-container">
         
                <div className="new-poll-content">
                    <Form onSubmit={this.handleSubmit} className="create-poll-form">
                <FormItem className="poll-form-row">
                   <FormItem 
                            label="Clinic ID"
                            validateStatus={this.state.clinic_id.validateStatus}
                            help={this.state.clinic_id.errorMsg}>
            <Input 
                placeholder = {"Enter clinic id"}
                size="large" 
                className={this.clinic_id}
                name="clinic_id"
                onChange={(event) => this.handleInputChange(event, this.validateClinic_id)}
                />
                </FormItem>
                <FormItem 
                            label="First name"
                            validateStatus={this.state.fname.validateStatus}
                            help={this.state.fname.errorMsg}>
                <Input 
                placeholder = {"Enter first name"}
                size="large" 
                className={this.fname}
                name="fname"
                onChange={(event) => this.handleInputChange(event, this.validateName)}
                />
                 </FormItem>
                 <FormItem 
                            label="Last name"
                            validateStatus={this.state.lname.validateStatus}
                            help={this.state.lname.errorMsg}>
                <Input 
                placeholder = {"Enter last name"}
                size="large" 
                className={this.lname}
                name="lname"
                onChange={(event) => this.handleInputChange(event, this.validateName)}
                /></FormItem>
                 <FormItem 
                            label="Date of Birth"
                            validateStatus={this.state.dob.validateStatus}
                            help={this.state.dob.errorMsg}>
                           
                                <DatePicker 
                                size="large"
                                name="dob"
                                autoComplete="off"
                                placeholder="Your date of birth"
                                onChange={this.onChangeDob} /> 
                        </FormItem>
                <FormItem 
                            label="National Identity Card"
                            validateStatus={this.state.nic.validateStatus}
                            help={this.state.nic.errorMsg}>
                            <Input 
                                size="large"
                                name="nic"
                                autoComplete="off"
                                placeholder="Your NIC"
                                value={this.state.nic.value} 
                                onChange = {
                                    (event) => this.handleInputChange(event, this.validateName)
                                }
                                />    
                        </FormItem>
                        <FormItem 
                            label="Gender"
                            validateStatus={this.state.gender.validateStatus}
                            help={this.state.gender.errorMsg}>
                                <Select  size="large"
                                name="gender"
                                autoComplete="off"
                                placeholder="Your Gender"
                                defaultValue="Select Gender" 
                                style={{ width: 120 }} 
                                onChange={this.handleChangeGender}>
                                <Option value="male">Male</Option>
                                <Option value="female">Female</Option>
                                </Select>
                        </FormItem>
                        
                        <Form.Item
                            label="Phone Number"
                            validateStatus={this.state.phone.validateStatus}
                            help={this.state.phone.errorMsg}
                            >
                            
                            <Input size="large" name="phone" placeholder="Your phone number" value={this.state.phone.value}  onChange={(event) => this.handleInputChange(event, this.validateName)}  style={{ width: '100%' }} />
                            
                            </Form.Item>
                        <FormItem 
                            label="Address"
                            validateStatus={this.state.address.validateStatus}
                            help={this.state.address.errorMsg}>
                            <Input 
                                size="large"
                                name="address"
                                autoComplete="off"
                                placeholder="Your address"
                                value={this.state.address.value} 
                                onChange={(event) => this.handleInputChange(event, this.validateName)} />    
                        </FormItem>
                        <FormItem 
                            label="Specialization"
                            validateStatus={this.state.doc_specialization.validateStatus}
                            help={this.state.doc_specialization.errorMsg}>
                             <Select  size="large"
                                name = "specialization"
                                autoComplete="off"
                                placeholder = "Your specialization"
                                defaultValue = "Select specialization"
                                onChange={this.handleChangeSpecialization}>
                                <Option value="General Medicine">General Medicine</Option>
                                <Option value="Pediatrics">Pediatrics</Option>
                                <Option value="Geriatric Medicine">Geriatric Medicine</Option>
                                <Option value="Endocrinologist">Endocrinologist</Option>
                                <Option value="Dermatology">Dermatology</Option>
                                <Option value="Anesthesia">Anesthesia</Option>
                                <Option value="General Surgery">General Surgery</Option>
                                <Option value="Obstetrics and Gynecology">Obstetrics and Gynecology</Option>
                                <Option value="Otorhinolaryngology">Otorhinolaryngology</Option>
                                <Option value="Ophthalmology">Ophthalmology</Option>
                                </Select>    
                        </FormItem>
                        <FormItem 
                            label="Email address"
                            validateStatus={this.state.email.validateStatus}
                            help={this.state.email.errorMsg}>
                            <Input 
                                size="large"
                                name="email"
                                autoComplete="off"
                                placeholder="Your email"
                                value={this.state.email.value} 
                                onChange={(event) => this.handleInputChange(event, this.validateName)} />    
                        </FormItem>
                    </FormItem>
                        <FormItem className="poll-form-row">
                            <Button type="primary" 
                                htmlType="submit" 
                                size="large" 
                                disabled={this.isFormInvalid()}
                                className="create-poll-form-button">Create Patient</Button>
                                
                        </FormItem>
                    </Form>
                   
                </div>    
                
            </div>
        </Content>
        </React.Fragment>
        );
    }

     validateName = (name) => {
         if (name.length < NAME_MIN_LENGTH) {
             return {
                 validateStatus: 'error',
                 errorMsg: `Name is too short (Minimum ${NAME_MIN_LENGTH} characters needed.)`
             }
         } else if (name.length > NAME_MAX_LENGTH) {
             return {
                 validationStatus: 'error',
                 errorMsg: `Name is too long (Maximum ${NAME_MAX_LENGTH} characters allowed.)`
             }
         } else {
             return {
                 validateStatus: 'success',
                 errorMsg: null,
             };
         }
     }

         validateClinic_id = (name) => {
             if (name.length < NAME_MIN_LENGTH) {
                 return {
                     validateStatus: 'error',
                     errorMsg: `Clinic ID is too short (Minimum ${NAME_MIN_LENGTH} characters needed.)`
                 }
             } else if (name.length > NAME_MAX_LENGTH) {
                 return {
                     validationStatus: 'error',
                     errorMsg: `Clinic ID is too long (Maximum ${NAME_MAX_LENGTH} characters allowed.)`
                 }
             } else {
                 return {
                     validateStatus: 'success',
                     errorMsg: null,
                 };
             }
         }
}



export default NewPatient;