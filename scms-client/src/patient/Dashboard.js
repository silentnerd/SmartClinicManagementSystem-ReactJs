import React, { Component } from 'react';
import { getAllSymptoms, getAllIssues, getAllTests, getAllMedicals, getPatientsbyPatientsId, updatePatientStatus,
          createClinic, closequeue, getAllClinicsInfobyClinicId, getAllClinicsbyPatId
          }
          from '../util/APIUtils';
import './Dashboard.css';  
import { ACCESS_TOKEN } from '../constants';

import { Form, Layout, Radio, Input, Upload, InputNumber, Icon, Table, Modal, AutoComplete, Button, Select, Col, Checkbox, PageHeader, Tag, Tabs, Row, Steps, message } from 'antd';
const { Content } = Layout;
const Option = Select.Option;
const FormItem = Form.Item;
const Step = Steps.Step;
const RadioGroup = Radio.Group;
const InputGroup = Input.Group;

const props = {
  name: 'file',
  action: 'http://localhost:5000/api/files/',
  headers: {
  'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const clinicsteps = [
      {
        id: 1,
        title: 'Issue record',
      },
      {
        id: 2,
        title: 'Test to be taken',
      },
      {
        id: 3,
        title: 'Diagnosis/Prescription',
      }
    ];


const symptomschildren = [];
  getAllSymptoms().then((response) => {
    //console.log(response[1].name); // or whatever
     for (let i = 0; i < 100; i++) {
  symptomschildren.push(<Option key={response[i].name}>{response[i].name}</Option>);
}
  });

  const issueschildren = [];
  getAllIssues().then((response) => {
    //console.log(response[1].name); // or whatever
     for (let i = 0; i < 29; i++) {
  issueschildren.push(<Option key={response[i].name}>{response[i].name}</Option>);
}
  });

    const testschildren = [];
  getAllTests().then((response) => {
    //console.log(response[1].name); // or whatever
     for (let i = 0; i < 62; i++) {
  testschildren.push(<Option key={response[i].name}>{response[i].name}</Option>);

}
  });

     const medicallist = [];
  getAllMedicals().then((response) => {
    for (let i = 0; i <3;i++) {
      medicallist.push(response[i].name);
    }
    
  });

 
class Dashboard extends Component {
  
    constructor(props) {
        super(props);
           this.handleSubmit = this.handleSubmit.bind(this);
           this.hanleFormChange = this.hanleFormChange.bind(this);
           this.isFormInvalid = this.isFormInvalid.bind(this);
           this.fetchpatientinfo = this.fetchpatientinfo.bind(this);
           this.fetchclinicdata = this.fetchclinicdata.bind(this);
        this.state = {
            id: '',
            datapatient: '',
            visible: false,
            confirmLoading: false,
            current: 0,
            testchecked: true,
            testinputdisabled: true,
            visibleMedicineModal: false,
            dataSource: [],
            bodylocationList: [],
            symptomList: [],
            issueList: [],
            patienttestresultList: [],
            patientMedicalList: [],
            tempPML: [],
            meditemselect: '',
            meditemtype: '',
            meditemqtd: '',
            foodvalue: 1,
            meditemmorg: '0',
            meditemday: '0',
            meditemevening: '0',
            meditemnight: '0',
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
              patientcurrentstatuscolor: '',
            patientcurrentstatusstatus: '',
            clinicslist: [],
           
              bodylocationlist: [{id: '',
                                 name:'',}],
              symptomlist: [{id: '',
                            name: '',}],
              issuelist: [{id: '',
                          name: '',}],
              patienttestresult: [{id: '',
                                  name: '',
                                  laborist_id: '',
                                  file_path: '',
                                  status: '',
                                  created_at: '',
                                  updated_at: '',}],
              prescriptionlist: [{id: '',
                                  name: '',
                                  qtd: '',
                                  type: '',
                                  food: '',
                                  morning: '',
                                  day: '',
                                  evening: '',
                                  night: '',}],
            clinicid: '',
            clinicdoc_id: '',
            clinicaddinfo: '',
            cliniccreatedAt: '',
            clinicupdatedAt: '',  
            
           
            
        };
  
    }

    handleSubmit(event) {
        event.preventDefault();
        const patientData = {
            id: this.state.id,
            clinic_id: this.state.clinic_id,
            fname: this.state.fname       
        };
    }


    isFormInvalid() {
        console.log(this.state.fname)
        if(this.state.fname == null) {
            return true;
        }else{
            return false;
        }
    }
     

     
      
         fetchpatientinfo() {
           console.log(this.props.match.params.id);
           getPatientsbyPatientsId(this.props.match.params.id).then((response) => {
            if(response.status == 1){
              this.setState({ patientcurrentstatuscolor: "yellow" },() => {console.log(this.state.patientcurrentstatuscolor)});
              this.setState({ patientcurrentstatusstatus: "Waiting outside" },() => {console.log(this.state.patientcurrentstatuscolor)});
              
            }else if(response.status == 2){
              this.setState({ patientcurrentstatuscolor: "green" },() => {console.log(this.state.patientcurrentstatuscolor)});
              this.setState({ patientcurrentstatusstatus: "In progress" },() => {console.log(this.state.patientcurrentstatuscolor)});
            
            }else if(response.status == 0){
              this.setState({ patientcurrentstatuscolor: "red" },() => {console.log(this.state.patientcurrentstatuscolor)});
              this.setState({ patientcurrentstatusstatus: "Offline" },() => {console.log(this.state.patientcurrentstatuscolor)});
              
            }
            
             console.log(response);
             this.setState({clinic_id: response.clinic_id});
              this.setState({fname: response.fname});
               this.setState({lname: response.lname});
                this.setState({dob: response.dob});
                 this.setState({nic: response.nic});
                  this.setState({gender: response.gender});
                   this.setState({phone: response.phone});
                    this.setState({address: response.address});
                    this.setState({doc_specialization: response.doc_specialization});
                    this.setState({email: response.email});
                  
           });

           
         }
 fetchclinicdata(){
   console.log(this.props.match.params.id);
   getAllClinicsbyPatId(this.props.match.params.id).then((response) => {
     console.log(response.status);
     if(response[0]){
   if(response.length==0){
     this.state.clinicslist.push({
       id: response[0].id,
       doc_id: response[0].doc_id,
       createdAt: response[0].createdAt
     });
     this.forceUpdate();
   }else if(response.length>0){
   
    console.log("casdf");
    
     for (var i = 0; i < response.length; i++) {
      
      
       this.state.clinicslist.push({
         id: response[i].id,
         doc_id: response[i].doc_id,
        createdAt: response[i].createdAt
       });
      this.forceUpdate();
     }
 console.log(this.state.clinicslist);
 } else {}
 }
   });
  
 }
 componentWillMount() {
   console.log('First this called');
   this.unlisten = this.props.history.listen((location, action) => {
     this.fetchpatientinfo();
     this.fetchclinicdata();
     window.location.reload();
   });
 }

   componentDidMount() {
     this.fetchpatientinfo();
     this.fetchclinicdata();
    
     console.log(this.props.currentUser);
   }

  componentWillUnmount() {
    this.unlisten();
  }

    hanleFormChange = (e) =>{
        const{name, value} = e.target;
        this.setState({[name]: value,});
    }
     showModal = () => {
       this.setState({
         visible: true,
       });
     }

     handleOk = () => {
       this.setState({
         ModalText: 'The modal will be closed after two seconds',
         confirmLoading: true,
       });
       setTimeout(() => {
         this.setState({
           visible: false,
           confirmLoading: false,
         });
       }, 2000);
     }

     handleCancel = () => {
       console.log('Clicked cancel button');
       this.state.patientMedicalList.splice(0, this.state.patientMedicalList.length);

       this.setState({
         visible: false,
       });
     }

  showMedicineModal = () => {
    this.setState({
      visibleMedicineModal: true,
    });
  }
  // Main Methode------------------------------------
    handleOkClinicModal = (e) => {
    
      const clinicdetails1 = {
        doc_id: this.props.currentUser.id,
        patient_clinic_id: this.state.clinic_id,
        addinfo: 'addinfo',
      };

     const prescriptionData1 = [];
      for (var index = 0; index < this.state.patientMedicalList.length; ++index) {

        prescriptionData1.push({
          name: this.state.patientMedicalList[index].name,
          qtd: this.state.patientMedicalList[index].qtd,
          type: this.state.patientMedicalList[index].type,
          food: this.state.patientMedicalList[index].food,
          morning: this.state.patientMedicalList[index].morning,
          day: this.state.patientMedicalList[index].day,
          evening: this.state.patientMedicalList[index].evening,
          night: this.state.patientMedicalList[index].night,
        });
      }

 const datafinal = {
   clinic: clinicdetails1,
   bodylocationlist: this.state.bodylocationList,
   symptomlist: this.state.symptomList,
   issuelist: this.state.issueList,
   patienttestresult: this.state.patienttestresultList,
   prescriptionlist: prescriptionData1,
 }
    
      createClinic(datafinal).then(function (value) {
       
      });
   

    //Reset modal
    
      this.state.patientMedicalList.splice(0, this.state.patientMedicalList.length);

     this.setState({
       visibleMedicineModal: false,
     });
     message.success('Processing complete!');
      this.forceUpdate();
    }

    handleChangeBodylocation = (value) => {
     this.state.bodylocationList.splice(0, this.state.bodylocationList.length);

      for (const [index, value1] of value.entries()) {
          this.state.bodylocationList.push({
            name: value1
          });
      }
    }

      handleChangeSymptom = (value) => {
          this.state.symptomList.splice(0, this.state.symptomList.length);

          for (const [index, value1] of value.entries()) {
            this.state.symptomList.push({
              name: value1
            });
          }
        }
          handleChangeIssue = (value) => {
              this.state.issueList.splice(0, this.state.issueList.length);

              for (const [index, value1] of value.entries()) {
                this.state.issueList.push({
                  name: value1
                });
              }
            }
              handleChangePatienttestresult = (value) => {
                  this.state.patienttestresultList.splice(0, this.state.patienttestresultList.length);

                  for (const [index, value1] of value.entries()) {
                    this.state.patienttestresultList.push({
                      name: value1,
                      patient_clinic_id: this.state.clinic_id,
                      status: '0'
                    });
                  }
                
      
      console.log(this.state.bodylocationList);
    }

  handleOkMedicineModal = (e) => {

   
    console.log(e.key);
    this.setState({
      visibleMedicineModal: false,
    });

    var itemno = this.state.patientMedicalList.length + 1
    this.state.patientMedicalList.push({
      key: itemno, 
      name: this.state.meditemselect,
      qtd: this.state.meditemqtd, 
      type: this.state.meditemtype,
      food: this.state.foodvalue, 
      morning: this.state.meditemmorg, 
      day: this.state.meditemday, 
      evening: this.state.meditemevening, 
      night: this.state.meditemnight, 
      actions: [itemno]
      });
        this.setState({meditemselect: ''});
        this.setState({meditemqtd: ''});
        this.setState({meditemtype: ''});
        this.setState({foodvalue: 1});
        this.setState({meditemmorg: '0'});
        this.setState({meditemday: '0'});
        this.setState({meditemevening: '0'});
        this.setState({meditemnight: '0'});
    console.log(this.state.patientMedicalList);
  }

  
 removePrescriptionItem = (no) => {
console.log("removebtn"+no);
if(this.state.patientMedicalList.length===1){
  console.log("singlerow");
   
    this.state.patientMedicalList.splice(0, this.state.patientMedicalList.length);
    this.state.tempPML.splice(0, this.state.tempPML.length);
   this.forceUpdate();
   console.log(this.state.patientMedicalList);
}else{
     this.state.patientMedicalList.splice(no-1, no);
     console.log(this.state.patientMedicalList);
     for (var index = 0; index < this.state.patientMedicalList.length; ++index) {
       
       this.state.tempPML.push({
         key: index+1,
         name: this.state.patientMedicalList[index].name,
         qtd: this.state.patientMedicalList[index].qtd,
         type: this.state.patientMedicalList[index].type,
         food: this.state.patientMedicalList[index].food,
         morning: this.state.patientMedicalList[index].morning,
         day: this.state.patientMedicalList[index].day,
         evening: this.state.patientMedicalList[index].evening,
         night: this.state.patientMedicalList[index].night,
         actions: [index+1]
       });
     }
this.state.patientMedicalList.splice(0, this.state.patientMedicalList.length);
     for (var index = 0; index < this.state.tempPML.length; ++index) {
       
       this.state.patientMedicalList.push({
         key: index+1,
         name: this.state.tempPML[index].name,
         qtd: this.state.tempPML[index].qtd,
         type: this.state.tempPML[index].type,
         food: this.state.tempPML[index].food,
         morning: this.state.tempPML[index].morning,
         day: this.state.tempPML[index].day,
         evening: this.state.tempPML[index].evening,
         night: this.state.tempPML[index].night,
         actions: [index+1]
       });
     }
     console.log(this.state.tempPML);
/*
      this.state.patientMedicalList.forEach(function (patientML, index) {
      console.log("loop1" + patientML.name);
       this.state.tempPML.push({key: 1, name: patientML.name, qtd: patientML.qtd, food: patientML.food, morning: patientML.morning, day: patientML.day, evening: patientML.evening, night: patientML.night, actions: [1]});
     });
     console.log("temp"+this.state.tempPML);
     this.state.patientMedicalList.splice(0, this.state.patientMedicalList.length);
    */
    /* this.state.tempPML.forEach(function (tempPML, index) {
      console.log("loop2"+tempPML);
       this.state.patientMedicalList.push({key: 1, name: tempPML.name, qtd: tempPML.qtd, food: tempPML.food, morning: tempPML.morning, day: tempPML.day, evening: tempPML.evening, night: tempPML.night, actions: [1]});     
      });*/
    //this.state.patientMedicalList.push({key: '1', name: 'Panadol', qtd: '2', food: 'After', morning: '1', day: '', evening: '2', night: '2', actions: ['1']});
     this.forceUpdate();
     }
   }
   

  handleCancelMedicineModal = (e) => {
    console.log(e);
    this.setState({
      visibleMedicineModal: false,
    });
  }

  closeSession = () => {
      closequeue('1', this.state.clinic_id);
      message.success('Queue closed');
    updatePatientStatus(0, this.state.clinic_id);
     window.location.reload();
  }

     next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  onTestChkboxChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
    this.setState({
      testchecked: e.target.checked,
    });
    if(e.target.checked == true){
     this.setState({testinputdisabled: true});
    }else{
      this.setState({testinputdisabled: false});
    }
  }

  handleSearch = (value) => {
    this.setState({
      dataSource: medicallist.filter(medicallist => medicallist.toLowerCase().indexOf(value.toLowerCase()) > -1),
    });
    console.log(this.state.dataSource);
  }

    onMedicineSelect = (value) => {
    this.setState({
      meditemselect: value,
    });
   console.log(value);
    }
  
    handleMedicalQtdChange = (value) => {
      this.setState({
        meditemqtd: value,
      });
     console.log(value);
    }

     handleMedicalItemType = (value) => {
       this.setState({
         meditemtype: value,
       });
console.log(value);
     }

       onFoodRboxChange = (e) => {
      
         this.setState({
           foodvalue: e.target.value,
         });
         console.log(this.state.foodvalue);
       }
       
  
    onMorningInChange = (value) => {
      this.setState({
        meditemmorg: value,
      });
    
    }
      onDayInChange = (value) => {
        this.setState({
          meditemday: value,
        });
        
      }
        onEveningInChange = (value) => {
          this.setState({
            meditemevening: value,
          });
         
        }
          onNightInChange = (value) => {
            this.setState({
              meditemnight: value,
            });
           
          }

           onClinicTblChange = (value) => {
            
         
              getAllClinicsInfobyClinicId(value).then((response) => {
               // console.log(response.clinic1.id);
             
this.state.bodylocationlist.splice(0, this.state.bodylocationlist.length);
this.state.symptomlist.splice(0, this.state.symptomlist.length);
this.state.issuelist.splice(0, this.state.issuelist.length);
this.state.patienttestresult.splice(0, this.state.patienttestresult.length);
this.state.prescriptionlist.splice(0, this.state.prescriptionlist.length);

              this.setState({clinicid: response.clinic1.id}, () => {console.log(this.state.clinicid)});
              this.setState({clinicdoc_id: response.clinic1.doc_id}, () => {console.log(this.state.clinicdoc_id)});
              this.setState({clinicaddinfo: response.clinic1.addinfo}, () => {console.log(this.state.clinicaddinfo)});
              
              this.setState({cliniccreatedAt: response.clinic1.createdAt}, () => {console.log(this.state.cliniccreatedAt)});
              this.setState({clinicupdatedAt: response.clinic1.updatedAt}, () => {console.log(this.state.clinicupdatedAt)});
             /* this.setState({clinicfullinfo:{clinic: {doc_id: response.clinic1.id,}}});
              this.setState({clinicfullinfo:{clinic: {addinfo: response.clinic1.addinfo,}}});
              this.setState({clinicfullinfo:{clinic: {created_at: response.clinic1.createdAt,}}});
              this.setState({clinicfullinfo:{clinic: {updated_at:response.clinic1.updatedAt,}}});*/

           for (let i = 0; i < response.bodylocationlist.length; i++) {
             //console.log(i);
             
             this.state.bodylocationlist.push({
                            id: response.bodylocationlist[i].id,
                            name: response.bodylocationlist[i].name,
                          });
              }
              

              for (let i = 0; i < response.symptomlist.length; i++) {
                this.state.symptomlist.push({
                            id: response.symptomlist[i].id,
                            name: response.symptomlist[i].name,
                            });
              }
              

              for (let i = 0; i < response.issuelist.length; i++) {
                this.state.issuelist.push({
                          id: response.issuelist[i].id,
                          name: response.issuelist[i].name,
                          });
              }
              
              for (let i = 0; i < response.patienttestresult.length; i++) {
                this.state.patienttestresult.push({
                                  id: response.patienttestresult[i].id,
                                  name: response.patienttestresult[i].name,
                                  laborist_id: response.patienttestresult[i].laborist_id ,
                                  file_path: response.patienttestresult[i].file_path,
                                  status: response.patienttestresult[i].status,
                                  created_at: response.patienttestresult[i].created_at,
                                  updated_at: response.patienttestresult[i].updated_at,
                                  });
              }

              for (let i = 0; i < response.prescriptionlist.length; i++) {
                this.state.prescriptionlist.push({
                                  id: response.prescriptionlist[i].id,
                                  name: response.prescriptionlist[i].name,
                                  qtd: response.prescriptionlist[i].qtd,
                                  type: response.prescriptionlist[i].type,
                                  food: response.prescriptionlist[i].food,
                                  morning: response.prescriptionlist[i].morning,
                                  day: response.prescriptionlist[i].day,
                                  evening: response.prescriptionlist[i].evening,
                                  night: response.prescriptionlist[i].night,
                                  });
              }
              this.forceUpdate();
      
             });
            /*console.log(this.state.clinicfullinfo.bodylocationlist);
             console.log(this.state.clinicfullinfo.symptomlist);
             console.log(this.state.clinicfullinfo.issuelist);
             console.log(this.state.clinicfullinfo.patienttestresult);
             console.log(this.state.clinicfullinfo.prescriptionlist);*/
                console.log(this.state.bodylocationlist);
                console.log(this.state.symptomlist);
           }
      

    render() {
        const TabPane = Tabs.TabPane;
 const { visible, confirmLoading } = this.state;
     const { current } = this.state;
const Description = ({ term, children, span = 12 }) => (
  <Col span={span}>
    <div className="description">
      <div className="term">{term}</div>
      <div className="detail">{children}</div>
    </div>
  </Col>
);
function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}
const   patientMedicalListColumns = [{
  title: 'No',
  dataIndex: 'key',
}, {
  title: 'Name',
  dataIndex: 'name',
}, {
  title: 'Qtd',
  dataIndex: 'qtd',
}, {
  title: 'Type',
  dataIndex: 'type',
}, {
  title: 'Food',
  dataIndex: 'food',
}, {
  title: 'Morning',
  dataIndex: 'morning',
}, {
  title: 'Day',
  dataIndex: 'day',
}, {
  title: 'Evening',
  dataIndex: 'evening',
}, {
  title: 'Night',
  dataIndex: 'night',
}, {
  title: 'Actions',
  dataIndex: 'actions',
  render: (no) => (
    <span>
      <a onClick={() => this.removePrescriptionItem(no)} >Remove</a>
    </span>
  ),
}]; 

const Option = Select.Option;

const clinicscolumns = [{
  title: 'Clinic ID',
  dataIndex: 'id',
  key: 'id',
  defaultSortOrder: 'descend',
  sorter: (a, b) => a.id - b.id,
  width: '25%'
}, {
  title: 'Doctor ID',
  dataIndex: 'doc_id',
  key: 'doc_id',
  width: '25%'
}, {
  title: 'Created At',
  dataIndex: 'createdAt',
  key: 'createdAt',
  width: '40%'
}, {
  title: 'Actions',
  dataIndex: 'actions',
  key: 'actions',
  width: '10%',
   render: (text, data = this.state.clinicslist) => (
    <span>
      <a href="javascript:;" onClick={() => this.onClinicTblChange(data.id)}>View</a>
    </span>
  )
}];

const ptrcolumns = [{
  title: 'ID',
  dataIndex: 'id',
  key: 'id',
  width: '10%'
}, {
  title: 'Test',
  dataIndex: 'name',
  key: 'name',
  width: '20%'
}, {
  title: 'Laborist ID',
  dataIndex: 'laborist_id',
  key: 'laborist_id',
  width: '10%'
}, {
  title: 'Status',
  dataIndex: 'status',
  key: 'status',
  width: '20%'
}, {
  title: 'Filepath',
  dataIndex: 'filepath',
  key: 'filepath',
  width: '30%'
}, {
  title: 'Actions',
  dataIndex: 'actions',
  key: 'actions',
  width: '10%',
   render: (text, data = this.state.clinicslist) => (
    <span>
      <Upload {...props}><Button>
                                <Icon type="upload" /> Click to Upload
                              </Button>
                            </Upload>
    </span>
  )
}];
    
      
        return (
             <React.Fragment>
      
           <PageHeader
    onBack={() => window.history.back()}
    title="Patient"
    subTitle="Patient full information panel"
    tags={<Tag color={this.state.patientcurrentstatuscolor}>{this.state.patientcurrentstatusstatus}</Tag>}
    extra={[
      <Button onClick={() => this.closeSession()} key="3">Close session</Button>,
      <Button key="2">Operation</Button>,
      <Button key="1" type="primary" onClick={this.showModal}>
        + Add Clinic
      </Button>,
    ]}
    footer={<React.Fragment>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Clinic's" key="1"><Content style={{background: 'white', padding: 24, margin: 0, height: '100%'}}>
        <h3>Body Locations</h3>{this.state.bodylocationlist.map(function(item, i){
  
        return <li key={i}>{item.name}</li>
        })}
        <h3>Symptoms</h3>{this.state.symptomlist.map(function(item, i){
  
        return <li key={i}>{item.name}</li>
        })}
        <h3>Issues</h3>{this.state.issuelist.map(function(item, i){
  
        return <li key={i}>{item.name}</li>
        })}
        <h3>Additional Information</h3>
        {this.state.clinicaddinfo}
        
       
        </Content></TabPane>
        <TabPane tab="Patient Test Results" key="2" ><Content style={{background: 'white', padding: 24, margin: 0, height: '100%'}}>
        <h3>Patient Test Results</h3>
        <Table pagination={{ pageSize: 10 }}  dataSource={this.state.patienttestresult} columns={ptrcolumns} size="small" rowKey={record => record.uid}/>
        </Content></TabPane>
        <TabPane tab="Prescription" key="3" ><Content style={{background: 'white', padding: 24, margin: 0, height: '100%'}}>
        <h3>Prescriptions</h3>{this.state.prescriptionlist.map(function(item, i){
  
        return <li key={i}>{item.name}</li>
        })}
        
        </Content></TabPane>
      </Tabs></React.Fragment>
    }>
    <div className="wrap" style={{width: '100%'}}>
      <div className="content padding"><Row><Col span={12}>
    <b><Description term="Clinic ID:"></Description></b>{this.state.clinic_id}<br></br>
    <b><Description term="Full name:"></Description></b>{this.state.fname} {this.state.lname}<br></br>
    <b><Description term="Age:"></Description></b>{getAge(this.state.dob)}<br></br>
    <b><Description term="Gender:"></Description></b>{this.state.gender}<br></br>
    <b><Description term="Specialization needed"></Description></b>{this.state.doc_specialization}<br></br>
    </Col><Col span={12}>
    <Table pagination={{ pageSize: 50 }} scroll={{ y: 150 }} dataSource={this.state.clinicslist} columns={clinicscolumns} size="small" rowKey={record => record.uid}/>
    </Col>
  </Row></div>
  
    </div>
  </PageHeader>
 

        <Modal
          title="Create new Clinic sesssion"
          visible={visible}
          onOk={this.handleOkClinicModal}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
          width={'70%'}
        >
          <Steps current={current}>
          {clinicsteps.map(item => <Step key={item.title} title={item.title} />)}
        </Steps>
        <div className="steps-content">
        {
            current === 0
            &&
            <React.Fragment>
            <FormItem label="Select Body location">
                    <Select
                      mode="tags"
                      style={{ width: '100%' }}
                      placeholder="Body Location"
                      onChange={this.handleChangeBodylocation}
                    >
                      <Option key="Abdomen, pelvis & buttocks">Abdomen, pelvis & buttocks</Option>
                      <Option key="Arms & shoulder">Arms & shoulder</Option>
                      <Option key="Back">Back</Option>
                      <Option key="Chest">Chest</Option>
                      <Option key="Lateral chest">Lateral chest</Option>
                      <Option key="Head, throat & neck">Head, throat & neck</Option>
                      <Option key="Legs">Legs</Option>
                      <Option key="Skin, joints & general">Skin, joints & general</Option>
                    </Select>
                  </FormItem>    
            <FormItem label="Select Symptoms">
                    <Select
                      mode="tags"
                      style={{ width: '100%' }}
                      placeholder="Symptoms"
                      onChange={this.handleChangeSymptom}
                    >
                      {symptomschildren}
                    </Select>
                  </FormItem>
                  <FormItem label="Select Issues">
                    <Select
                      mode="tags"
                      style={{ width: '100%' }}
                      placeholder="Issues"
                      onChange={this.handleChangeIssue}
                    >
                      {issueschildren}
                    </Select>
                  </FormItem>
                  </React.Fragment>
          }
          {
            current === 1
            &&
             <React.Fragment> 
            <Checkbox checked={this.state.testchecked} onChange={this.onTestChkboxChange}>Tests <b>NOT</b> needed</Checkbox>
            <FormItem label="Select Test to be taken">
                    <Select
                      mode="tags"
                      style={{ width: '100%' }}
                      placeholder="Test"
                      disabled={this.state.testinputdisabled}
                      onChange={this.handleChangePatienttestresult}
                    >
                      {testschildren}
                    </Select>
                  </FormItem>
                   </React.Fragment>
          }
          {
            current === 2
            && (
              <React.Fragment>
             <Button type="primary" onClick={this.showMedicineModal}> + Add Medicine</Button><br/><br/>
            <h3>Prescription List</h3>

    <Table columns={patientMedicalListColumns} dataSource={this.state.patientMedicalList} size="small" /></React.Fragment>
            )
          }
        </div>
        <div className="steps-action">
          {
            current < clinicsteps.length - 1
            && <Button type="primary" onClick={() => this.next()}>Next</Button>
          }
          {
            current === clinicsteps.length - 1
            && <React.Fragment></React.Fragment>
          }
          {
            current > 0
            && (
            <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
              Previous
            </Button>
            )
          }
        </div>
        </Modal>
           <Modal
          title="Add Medicine"
          visible={this.state.visibleMedicineModal}
          onOk={this.handleOkMedicineModal}
          onCancel={this.handleCancelMedicineModal}
          footer={[
            <Button key="back" onClick={this.handleCancel}>Return</Button>,
            <Button key="add" type="primary" onClick={this.handleOkMedicineModal}>
              Add
            </Button>,
          ]}
        >
        <FormItem 
        label="Medicine"
       ><InputGroup compact>
          
          
           <AutoComplete
        dataSource={this.state.dataSource}
        style={{ width: 200 }}
        onSelect={this.onMedicineSelect}
        onSearch={this.handleSearch}
        placeholder="Search medicine"
        value={this.state.meditemselect}
      /><InputNumber placeholder="Qtd" value={this.state.meditemqtd} onChange={this.handleMedicalQtdChange} />
       <Select defaultValue="Type" style={{ width: 120 }} onChange={this.handleMedicalItemType}>
      <Option value="tbl">Tablet</Option>
      <Option value="ml">ml</Option>
    </Select>
    
        </InputGroup>
        </FormItem>
     <FormItem 
        label="To be taken"
        validateStatus={this.state.foodvalue.validateStatus}
        help={this.state.foodvalue.errorMsg}>
     <RadioGroup onChange={this.onFoodRboxChange} value={this.state.foodvalue}>
        <Radio value={1}>Before Food</Radio>
        <Radio value={2}>After Food</Radio>
      </RadioGroup>
      </FormItem>
      
       < FormItem
       label = "Usage (Morning/Day/Evening/Night)">
        <InputNumber min={0} max={4} placeholder="Morg" value={this.state.meditemmorg}onChange={this.onMorningInChange} />
      
        <InputNumber min={0} max={4} placeholder="Day" value={this.state.meditemday} onChange={this.onDayInChange} />

        <InputNumber min={0} max={4} placeholder="Even" value={this.state.meditemevening} onChange={this.onEveningInChange} />
      
        <InputNumber min={0} max={4} placeholder="Night" value={this.state.meditemnight} onChange={this.onNightInChange} />

      
     </FormItem>
        </Modal>
        </React.Fragment>
        );
    }
   
}




export default Dashboard;
