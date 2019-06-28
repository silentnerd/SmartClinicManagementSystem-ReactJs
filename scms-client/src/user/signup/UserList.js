import React, { Component } from 'react';
import { deleteUser, getAllUsers } from '../../util/APIUtils';
import { Layout, Icon, Divider, Table, PageHeader} from 'antd';
import { Link } from 'react-router-dom';
const { Content } = Layout;

class UserList extends Component {
   constructor(props) {
       super(props);
       this.state = {
         users: [],
         data1:[],
       }
      
 }
        componentDidMount() {

            this.refreshuserlist();
            
           
        }

        refreshuserlist(){
          this.state.users.splice(0, this.state.users.length);
          getAllUsers().then((response) => {
            for (let i = 0; i < response.length; i++) {
              this.state.users.push({
                id: response[i].id,
                fname: response[i].fname,
                lname: response[i].lname,
                username: response[i].username,
                dob: response[i].dob,
                nic: response[i].nic,
                gender: response[i].gender,
                phone: response[i].phone,
                address: response[i].address,
                specialization: response[i].specialization,
                usertype: response[i].usertype,
                email: response[i].email
              });
            }

          });
        }
        
   
render() {
  
 

const columns = [{
  title: 'ID',
  dataIndex: 'id',
  key: 'id',
}, {
  title: 'Firstname',
  dataIndex: 'fname',
  key: 'fname',
}, {
  title: 'Lastname',
  dataIndex: 'lname',
  key: 'lname',
}, {
  title: 'Username',
  dataIndex: 'username',
  key: 'username',
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
  title: 'Specialization',
  dataIndex: 'specialization',
  key: 'specialization',
}, {
  title: 'Usertype',
  dataIndex: 'usertype',
  key: 'usertype',
}, {
  title: 'Email',
  dataIndex: 'email',
  key: 'email',
}, {
  title: 'Actions',
  dataIndex: 'actions',
  key: 'actions',
   render: (text, data = this.state.users) => (
    <span>
      <Link to={'/user/edit/'+data.id}><Icon type="edit" className="datatable-icon" /></Link>
      <Divider type="vertical" />
      <a onClick={() => deleteUser(data.id)}><Icon type="delete" className="datatable-icon" /></a>
    </span>
  )
}];
 

      return (   <React.Fragment>
      
           <PageHeader
    onBack={() => window.history.back()}
    title="List of Users">

  </PageHeader>
  <Content style={{background: '#fff', padding: 24, margin: 0, minHeight: 280,}}>
       <Table dataSource={this.state.users} columns={columns} />
        </Content>
        </React.Fragment>
);
}
}
export default UserList;