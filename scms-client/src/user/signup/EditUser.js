import React, { Component } from 'react';
import { signup, checkUsernameAvailability, checkEmailAvailability, getUserById, updateUser } from '../../util/APIUtils';
import './Signup.css';
import { Link } from 'react-router-dom';
import { 
    NAME_MIN_LENGTH, NAME_MAX_LENGTH, 
    USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH,
    EMAIL_MAX_LENGTH,
    PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH
} from '../../constants';
import moment from 'moment';
import { Form, Input, Button, notification, DatePicker, Select, InputNumber, Layout, PageHeader } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const {Content} = Layout;
class EditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fname: {value: ''},
            lname: {value: ''},
            username: {value: ''},
            dob: {value: ''},
            nic: {value: ''},
            gender: {value: ''},
            phone: {value: ''},
            address: {value: ''},
            specialization: {value: ''},
            usertype: {value: ''},
            email: { value: ''},
            password: {value: ''}
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateUsernameAvailability = this.validateUsernameAvailability.bind(this);
        this.validateEmailAvailability = this.validateEmailAvailability.bind(this);
    }

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
   componentDidMount() {
            getUserById(this.props.match.params.id).then(response => {
                    this.setState({
                        id:{value: response.id},
                        clinic_id: {value: response.clinic_id},
                        fname: {value: response.fname},
                        lname: {value: response.lname},
                        username: {value: response.username},
                        dob: {value: response.dob},
                        nic: {value: response.nic},
                        gender: {value: response.gender},
                        phone: {value: response.phone},
                        address: {value: response.address},
                        specialization: {value: response.specialization},
                        usertype: {value:response.usertype},
                        email: {value: response.email},
                    });
                    console.log(response);
                    
                })
                .catch(function (error){
                    console.log(error);
                })
            
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
     this.setState({specialization: {value: value}});
 }
  handleChangeUsertype = (value) => {
      console.log(`selected ${value}`);
      this.setState({usertype: {value: value}});
  }

    handleSubmit(event) {
        event.preventDefault();
    
        const updateUserRequest = {
            id: this.props.match.params.id,
            fname: this.state.fname.value,
            lname: this.state.lname.value,
            dob: this.state.dob.value,
            nic: this.state.nic.value,
            gender: this.state.gender.value,
            phone: this.state.phone.value,
            address: this.state.address.value,
            specialization: this.state.specialization.value,
            usertype: this.state.usertype.value,
            email: this.state.email.value,
            password: this.state.password.value
        };
        console.log(updateUserRequest);
        updateUser(updateUserRequest)
        .then(response => {
            notification.success({
                message: 'User Updated',
                description: "Successfully user updated!",
            });          
            this.props.history.push("/login");
        }).catch(error => {
            notification.error({
                message: 'Error',
                description: error.message || 'Sorry! Something went wrong. Please try again!'
            });
        });
    }

  

    render() {
      
        return (
            <React.Fragment>
            <PageHeader
    onBack={() => window.history.back()}
    title="Edit User">

  </PageHeader>
              <Content style={{background: '#fff', padding: 24, margin: 0, minHeight: 280,}}>
            <div className="signup-container">
            
                <div className="signup-content">
                    <Form onSubmit={this.handleSubmit} className="signup-form">
                        <FormItem 
                            label="First Name"
                            validateStatus={this.state.fname.validateStatus}
                            help={this.state.fname.errorMsg}>
                            <Input 
                                size="large"
                                name="fname"
                                autoComplete="off"
                                placeholder="Your first name"
                                value={this.state.fname.value} 
                                onChange={(event) => this.handleInputChange(event, this.validateName)} />    
                        </FormItem>
                        <FormItem 
                            label="Last Name"
                            validateStatus={this.state.lname.validateStatus}
                            help={this.state.lname.errorMsg}>
                            <Input 
                                size="large"
                                name="lname"
                                autoComplete="off"
                                placeholder="Your last name"
                                value={this.state.lname.value} 
                                onChange={(event) => this.handleInputChange(event, this.validateName)} />    
                        </FormItem>
                        <FormItem label="Username">
                            
                            <Input 
                                size="large"
                                name="username" 
                                autoComplete="off"
                                placeholder="A unique username"
                                value={this.state.username.value} 
                                disabled/>    
                        </FormItem>
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
                        <FormItem 
                            label="Phone number"
                            validateStatus={this.state.phone.validateStatus}
                            help={this.state.phone.errorMsg}>
                 
                                <InputNumber size="large"
                                name="phone"
                                autoComplete="off"
                                placeholder="Your phone number"
                                value={this.state.phone.value}  
                                style={{ width: '100%' }} 
                                 defaultValue={'Phone number'} 
                                 onChange={this.onChangePhone} />   
                        </FormItem>
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
                            validateStatus={this.state.specialization.validateStatus}
                            help={this.state.specialization.errorMsg}>
                             <Select  size="large"
                                name = "specialization"
                                autoComplete="off"
                                placeholder = "Your specialization"
                                value={this.state.specialization.value}
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
                            label="User Type"
                            validateStatus={this.state.usertype.validateStatus}
                            help={this.state.usertype.errorMsg}>
                             <Select size="large"
                                name="usertype"
                                autoComplete="off"
                                placeholder="Your Usertype"
                                value={this.state.usertype.value}  
                                defaultValue="Select Usertype"
                                onChange={this.handleChangeUsertype}>
                                <Option value="rfid">RFID</Option>
                                <Option value="nurse">Nurse</Option>
                                <Option value="labourist">Labourist</Option>
                                <Option value="pharmacist">Pharmacist</Option>
                                <Option value="attender">Attender</Option>
                                <Option value="soctor">Doctor</Option>
                                <Option value="sirector">Director</Option>
                                <Option value="admin">Admin</Option>
                                </Select>    
                        </FormItem>
                        <FormItem 
                            label="Email"
                            hasFeedback
                            validateStatus={this.state.email.validateStatus}
                            help={this.state.email.errorMsg}>
                            <Input 
                                size="large"
                                name="email" 
                                type="email" 
                                autoComplete="off"
                                placeholder="Your email"
                                value={this.state.email.value} 
                                onBlur={this.validateEmailAvailability}
                                onChange={(event) => this.handleInputChange(event, this.validateEmail)} />    
                        </FormItem>
                        <FormItem 
                            label="Password"
                            validateStatus={this.state.password.validateStatus}
                            help={this.state.password.errorMsg}>
                            <Input 
                                size="large"
                                name="password" 
                                type="password"
                                autoComplete="off"
                                placeholder="A password between 6 to 20 characters" 
                                value={this.state.password.value} 
                                onChange={(event) => this.handleInputChange(event, this.validatePassword)} />    
                        </FormItem>
                        <FormItem>
                            <Button type="primary" 
                                htmlType="submit" 
                                size="large" 
                                className="signup-form-button">Update User</Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
            </Content>
            </React.Fragment>
        );
    }

    // Validation Functions

    validateName = (name) => {
        if(name.length < NAME_MIN_LENGTH) {
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

    validateEmail = (email) => {
        if(!email) {
            return {
                validateStatus: 'error',
                errorMsg: 'Email may not be empty'                
            }
        }

        const EMAIL_REGEX = RegExp('[^@ ]+@[^@ ]+\\.[^@ ]+');
        if(!EMAIL_REGEX.test(email)) {
            return {
                validateStatus: 'error',
                errorMsg: 'Email not valid'
            }
        }

        if(email.length > EMAIL_MAX_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Email is too long (Maximum ${EMAIL_MAX_LENGTH} characters allowed)`
            }
        }

        return {
            validateStatus: null,
            errorMsg: null
        }
    }

    validateUsername = (username) => {
        if(username.length < USERNAME_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Username is too short (Minimum ${USERNAME_MIN_LENGTH} characters needed.)`
            }
        } else if (username.length > USERNAME_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `Username is too long (Maximum ${USERNAME_MAX_LENGTH} characters allowed.)`
            }
        } else {
            return {
                validateStatus: null,
                errorMsg: null
            }
        }
    }

    validateUsernameAvailability() {
        // First check for client side errors in username
        const usernameValue = this.state.username.value;
        const usernameValidation = this.validateUsername(usernameValue);

        if(usernameValidation.validateStatus === 'error') {
            this.setState({
                username: {
                    value: usernameValue,
                    ...usernameValidation
                }
            });
            return;
        }

        this.setState({
            username: {
                value: usernameValue,
                validateStatus: 'validating',
                errorMsg: null
            }
        });

        checkUsernameAvailability(usernameValue)
        .then(response => {
            if(response.available) {
                this.setState({
                    username: {
                        value: usernameValue,
                        validateStatus: 'success',
                        errorMsg: null
                    }
                });
            } else {
                this.setState({
                    username: {
                        value: usernameValue,
                        validateStatus: 'error',
                        errorMsg: 'This username is already taken'
                    }
                });
            }
        }).catch(error => {
            // Marking validateStatus as success, Form will be recchecked at server
            this.setState({
                username: {
                    value: usernameValue,
                    validateStatus: 'success',
                    errorMsg: null
                }
            });
        });
    }

    validateEmailAvailability() {
        // First check for client side errors in email
        const emailValue = this.state.email.value;
        const emailValidation = this.validateEmail(emailValue);

        if(emailValidation.validateStatus === 'error') {
            this.setState({
                email: {
                    value: emailValue,
                    ...emailValidation
                }
            });    
            return;
        }

        this.setState({
            email: {
                value: emailValue,
                validateStatus: 'validating',
                errorMsg: null
            }
        });

        checkEmailAvailability(emailValue)
        .then(response => {
            if(response.available) {
                this.setState({
                    email: {
                        value: emailValue,
                        validateStatus: 'success',
                        errorMsg: null
                    }
                });
            } else {
                this.setState({
                    email: {
                        value: emailValue,
                        validateStatus: 'error',
                        errorMsg: 'This Email is already registered'
                    }
                });
            }
        }).catch(error => {
            // Marking validateStatus as success, Form will be recchecked at server
            this.setState({
                email: {
                    value: emailValue,
                    validateStatus: 'success',
                    errorMsg: null
                }
            });
        });
    }

    validatePassword = (password) => {
        if(password.length < PASSWORD_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Password is too short (Minimum ${PASSWORD_MIN_LENGTH} characters needed.)`
            }
        } else if (password.length > PASSWORD_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `Password is too long (Maximum ${PASSWORD_MAX_LENGTH} characters allowed.)`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null,
            };            
        }
    }

}

export default EditUser;