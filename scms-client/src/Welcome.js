import React, { Component } from 'react';
import { Layout, Table, PageHeader, Row, Col, Badge} from 'antd';
const { Content } = Layout;

 
class Welcome extends Component {
   constructor(props) {
       super(props);
       this.state = {
       }
       
      
 }

render() {
      return (<React.Fragment>
      
           <PageHeader
    onBack={() => window.history.back()}
    title="Welcome Page">

  </PageHeader>
  <Content style={{background: 'white', padding: 24, margin: 0, height: '100%'}}>
     <h3>Latest News</h3><br></br><br></br><br></br>

     <h3>Latest Blog</h3><br></br><br></br><br></br>

     <h3>Alert</h3><br></br><br></br><br></br>
    

     
        </Content>
        </React.Fragment>
);
}
}
export default Welcome;