import React, { Component } from 'react';
import './Aside.css';
import {Link} from 'react-router-dom';
import { Menu, Icon } from 'antd';

const SubMenu = Menu.SubMenu;

class Aside extends Component {
 
          handleClick = (e) => {
    console.log('click ', e);
  }

  handleSearch = (value) =>{
    this.props.history.push("/patient/dashboard/"+value);
    
  }
    render() {
            return (

               <Menu
        onClick={this.handleClick}
        style={{ height: '100%', borderRight: 0 }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        style={this.props.show}
      >
     
      <Menu.Item key="2"><Link to="/welcome"><span><Icon type="home" /><span>Dashboard</span></span></Link></Menu.Item>
        <SubMenu key="sub1" title={<span><Icon type="user" /><span>Patient</span></span>}>
            <Menu.Item key="3"><Link to="/patient/new">Add patient</Link></Menu.Item>
            <Menu.Item key="4"><Link to="/patients">List patient</Link></Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" title={<span><Icon type="user" /><span>User</span></span>}>
            <Menu.Item key="5"><Link to="/user/new">Add user</Link></Menu.Item>
            <Menu.Item key="6"><Link to="/users">List user</Link></Menu.Item>
        </SubMenu>
        
        <SubMenu key="sub5" title={<span><Icon type="setting" /><span>Setting</span></span>}>
          <Menu.Item key="7">Option 9</Menu.Item>
         
        </SubMenu>
      </Menu>
          
      );
      }
      }

      export default Aside;