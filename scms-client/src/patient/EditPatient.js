import React, { Component } from 'react';
import { updatePatient, getPatientsbyId } from '../util/APIUtils';
import './NewPatient.css';  
import { 
    NAME_MIN_LENGTH, NAME_MAX_LENGTH, 
    USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH,
    EMAIL_MAX_LENGTH,
    PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH
} from '../constants';
import moment from 'moment';
import { Form,Layout, Input, Button, DatePicker, Select, PageHeader } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const {Content } = Layout;
class EditPatient extends Component {
    constructor(props) {
        super(props);
           this.handleSubmit = this.handleSubmit.bind(this);
           this.hanleFormChange = this.hanleFormChange.bind(this);
               this.handleInputChange = this.handleInputChange.bind(this);
           this.isFormInvalid = this.isFormInvalid.bind(this);
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
  
    }

    handleSubmit(event) {
        event.preventDefault();
        const patientData = {
            id: this.props.match.params.id,
            clinic_id: this.state.clinic_id.value,
            fname: this.state.fname.value,
            lname: this.state.lname.value,
            dob: this.state.dob.value,
            nic: this.state.nic.value,
            gender: this.state.gender.value,
            phone: this.state.phone.value,
            address: this.state.address.value,
            doc_specialization: this.state.doc_specialization.value,
            email: this.state.email.value,
        };
        console.log(JSON.stringify(patientData));
        updatePatient(patientData);
        
    }



    handleInputChange(event, validationFun) {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        this.setState({
            [inputName]: {
                value: inputValue,
                ...validationFun(inputValue)
            }
        });
    }
        componentDidMount() {
            getPatientsbyId(this.props.match.params.id).then(response => {
                    this.setState({
                        id:{value: response.id},
                        clinic_id: {value: response.clinic_id},
                        fname: {value: response.fname},
                        lname: {value: response.lname},
                        dob: {value: response.dob},
                        nic: {value: response.nic},
                        gender: {value: response.gender},
                        phone: {value: response.phone},
                        address: {value: response.address},
                        doc_specialization: {value: response.doc_specialization},
                        email: {value: response.email},
                    });
                    console.log(this.state.fname);
                })
                .catch(function (error){
                    console.log(error);
                })
            
        }

        componentDidUpdate(){

        }
       
        componentWillUnmount() {
            this.isCancelled = true;
        }
        
    hanleFormChange = (e) =>{
        const{name, value} = e.target;
        this.setState({[name]: value,});
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

    render() {
        
      // console.log(this.state.datapatient.clinic_id);
    
        return (
            <React.Fragment>
      
           <PageHeader
    onBack={() => window.history.back()}
    title="Edit Patient">

  </PageHeader>
  <Content style={{background: '#fff', padding: 24, margin: 0, minHeight: 280,}}>
         <div className="new-poll-container">
             
                <div className="new-poll-content">
                    <Form onSubmit={this.handleSubmit} className="create-poll-form">
                <FormItem className = "poll-form-row"> 
                

                         <FormItem 
                            label="Clinic ID"
                            validateStatus={this.state.clinic_id.validateStatus}
                            help={this.state.clinic_id.errorMsg}>
            <Input 
                placeholder = {"Enter clinic id"}
                size="large" 
                className={this.clinic_id}
                value={this.state.clinic_id.value}
                disabled
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
                value={this.state.fname.value}
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
                value={this.state.lname.value}
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
                                value={moment(this.state.dob.value)}
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
                                value={this.state.gender.value}
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
                            
                            <Input size="large" name="phone" value={this.state.phone.value} placeholder="Your phone number" value={this.state.phone.value}  onChange={(event) => this.handleInputChange(event, this.validateName)}  style={{ width: '100%' }} />
                            
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
                                value={this.state.doc_specialization.value}
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
                        <FormItem className="patient-form-row">
                            <Button type="primary" 
                                htmlType="submit" 
                                size="large"
                                className="create-patient-form-button">Update Patient</Button>
                                
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



export default EditPatient;
