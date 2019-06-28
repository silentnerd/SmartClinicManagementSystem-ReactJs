import React, { Component } from 'react';
import { deletePatient, getAllPatients } from '../util/APIUtils';
import { Layout, Icon, Divider, Table, PageHeader, Popconfirm, message} from 'antd';
import { Link } from 'react-router-dom';
const { Content } = Layout;


class PatientList extends Component {
   constructor(props) {
       super(props);
       this.state = {
         patients: [],
         data1:[],
       }
     
 }
        componentDidMount() {
          this.refreshpatientlist();
          
            
           
        }
       

        refreshpatientlist() {
          this.state.patients.splice(0, this.state.patients.length);
          getAllPatients().then((response) => {
            for (let i = 0; i < response.length; i++) {
              this.state.patients.push({
                id: response[i].id,
                clinic_id: response[i].clinic_id,
                fname: response[i].fname,
                lname: response[i].lname,
                dob: response[i].dob,
                nic: response[i].nic,
                gender: response[i].gender,
                phone: response[i].phone,
                address: response[i].address,
                doc_specialization: response[i].doc_specialization,
                email: response[i].email
              });
            }

          });
        }
        handleClick(param, e) {
          console.log(param);
          deletePatient(param);
          message.success('Successfully deleted patient!');
          this.forceUpdate();
        }
    
         cancel(e) {
          console.log(e);
          message.error('Not deleted');
        }
   
render() {
  
 

const columns = [{
  title: 'Clinic ID',
  dataIndex: 'clinic_id',
  key: 'clinic_id',
}, {
  title: 'Firstname',
  dataIndex: 'fname',
  key: 'fname',
}, {
  title: 'Lastname',
  dataIndex: 'lname',
  key: 'lname',
}, {
  title: 'DOB',
  dataIndex: 'dob',
  key: 'dob',
}, {
  title: 'NIC',
  dataIndex: 'nic',
  key: 'nic',
}, {
  title: 'Gender',
  dataIndex: 'gender',
  key: 'gender',
}, {
  title: 'Phone',
  dataIndex: 'phone',
  key: 'phone',
}, {
  title: 'Address',
  dataIndex: 'address',
  key: 'address',
}, {
  title: 'Doc_Specialization',
  dataIndex: 'doc_specialization',
  key: 'doc_specialization',
}, {
  title: 'Email',
  dataIndex: 'email',
  key: 'email',
}, {
  title: 'Actions',
  dataIndex: 'actions',
  key: 'actions',
   render: (text, data = this.state.patients) => (
    <span>
      <Link to={'/patient/edit/'+data.id}><Icon type="edit" className="datatable-icon" /></Link>
      <Divider type="vertical" />
      <Popconfirm title="Are you sure, do you want delete this patient?" icon={<Icon type="question-circle-o" style={{ color: 'red' }} />} onConfirm={this.handleClick.bind(this, data.id)} onCancel={this.cancel} okText="Yes" cancelText="No">
    <a href="#"><Icon type="delete" className="datatable-icon" /></a>
  </Popconfirm>
    </span>
  )
}];
 

      return (   <React.Fragment>
      
           <PageHeader
    onBack={() => window.history.back()}
    title="List of Patients">

  </PageHeader>
  <Content style={{background: '#fff', padding: 24, margin: 0, minHeight: 280,}}>
       <Table dataSource={this.state.patients} columns={columns} />
        </Content>
        </React.Fragment>
);
}
}
export default PatientList;