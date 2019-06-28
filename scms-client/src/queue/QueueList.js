import React, { Component } from 'react';
import { getAllActiveQueues, getPatientsbyPatientsId} from '../util/APIUtils';
import { API_BASE_URL, ACCESS_TOKEN } from '../constants';
import { Layout, Table, PageHeader, Row, Col, Badge} from 'antd';
import './QueueList.css';
import { endianness } from 'os';
const { Content } = Layout;

 
class QueueList extends Component {
   constructor(props) {
       super(props);
       this.state = {
         queuelistgeneralmedicine: [{
           no: '',
           id: '',
           patientid: '',
           status: '',
         }],
         queuelistpediatrics: [{
           no: '',
           id: '',
           patientid: '',
           status: '',
         }],
         data1:[],
         patstatus: '',
       }
       
      
 }

 componentWillMount() {
   console.log('First this called');
 }

 
refreshData() {
    
 
      // method to be executed;
 //console.log(this.state.queuelistgeneralmedicine.length);
//if (this.state.queuelistgeneralmedicine.length >= 1) {
/*  setInterval(function () {
      //Put All Your Code Here, Which You Want To Execute After Some Delay Time.
    
 //console.log("1" + this.state.queuelistgeneralmedicine);
 let count = 0;
  this.state.queuelistgeneralmedicine.splice(0, this.state.queuelistgeneralmedicine.length);
  console.log(this.state.queuelistgeneralmedicine);
      getAllActiveQueues().then((response) => {
       // console.log(response);
         for (let i = 0; i < response.length; i++) {
              if (response[i].doc_specialization === 'General Medicine') {
                     
                      
                getPatientsbyPatientsId(response[i].patientid).then((response1) => {
                  console.log(response1.clinic_id);
                  
             if(count==0 && response1.status=='2'){
              console.log("inprogress"+response1.status+" "+response[i].patientid);
 
                this.state.queuelistgeneralmedicine.push({
                  key: i,
                  no:count,
                  id: response[i].id,
                  patientid: response[i].patientid,
                  status: response1.status,
                });
              count++;
              
            }else if(count==0 && response1.status=='1'){  
             
              console.log("REady" + count + response1.status+" "+response[i].patientid);
              count++;
               this.state.queuelistgeneralmedicine.push({
                 key: i,
                 no: count,
                 id: response[i].id,
                 patientid: response[i].patientid,
                 status: 3,
               });
               
               
              
            }else{}
                  
                  this.forceUpdate(); 
              });
              
           } 
        } 
        });
      
   
      }.bind(this), 5000);*/
   // }
  }
   
 componentDidMount() {

   setInterval(function () {
     //Put All Your Code Here, Which You Want To Execute After Some Delay Time.

     //console.log("1" + this.state.queuelistgeneralmedicine);
    
 
     getAllActiveQueues().then((response) => {
       // console.log(response);
       
       for (let i = 0; i < response.length; i++) {
         
         if (response[i].doc_specialization === 'General Medicine') {
         
         
           this.state.queuelistgeneralmedicine = [];
           getPatientsbyPatientsId(response[i].patientid).then((response1) => {
            // console.log(response1.clinic_id);
           
            
        if(i==0 && response1.status==='2'){
         console.log("inprogress"+response1.status+" "+response[i].patientid);
 
           this.state.queuelistgeneralmedicine.push({
             key: i,
             no:i+1,
             id: response[i].id,
             patientid: response[i].patientid,
             status: response1.status,
           });
           
           
       }else if(i==0 && response1.status==='1'){  
          
         console.log("REady"  + response1.status+" "+response[i].patientid);
         
          this.state.queuelistgeneralmedicine.push({
            key: i,
            no: i+1,
            id: response[i].id,
            patientid: response[i].patientid,
            status: 3,
          });
          
            
       }else if(!(i==0) && response1.status==='1'){  
        
         console.log("Wait"  + response1.status+" "+response[i].patientid);
         
          this.state.queuelistgeneralmedicine.push({
            key: i,
            no: i+1,
            id: response[i].id,
            patientid: response[i].patientid,
            status: response1.status,
          });
       
       }else{}
             
             this.forceUpdate(); 
           });

         }
       }
     });


   }.bind(this), 5000);
  /*setInterval(function () {
let count=1;
let x=0
   if(!count===0 && x===0){
     console.log(1);
     count++;
   }else if(count===1){
     count++;
     console.log(2);
   }else if(count===1){
     console.log(3);

   }else{}
  }.bind(this), 5000);*/

 }

       
    
render() {
  


const columns = [{
  title: 'No',
  dataIndex: 'no',
  key: 'no',
  defaultSortOrder: 'ascend',
    sorter: (a, b) => a.no - b.no,
}, {
  title: 'Patient ID',
  dataIndex: 'patientid',
  key: 'patientid',
},{ 
  title: 'Status', 
  dataIndex: 'status',
  key: 'status', 
render: (status) => (status==3) ? (<span><Badge status="success" /></span>) : ((status==2) ? (<span><Badge status="processing" /></span>) : (<span><Badge status="warning" /></span>)), 
}];


      return (   <React.Fragment>
      
           <PageHeader
    onBack={() => window.history.back()}
    title="List of Queues">

  </PageHeader>
  <Content style={{background: 'white', padding: 24, margin: 0, height: '100%'}}>
       <Row gutter={16} style={{height:'50%'}}>
                              
  <Col span={4} ><h2><b>Counter 1</b></h2><Table style={{ height: '300px'}} dataSource={this.state.queuelistgeneralmedicine} columns={columns} pagination={false} size="small" /></Col>
  <Col span={4} ><h2><b>Counter 2</b></h2><Table style={{ height: '300px'}} dataSource={this.state.queuelistpediatrics} columns={columns} pagination={false} size="small" rowKey={record => record.uid}/></Col>
 
</Row>

     
        </Content>
        </React.Fragment>
);
}
}
export default QueueList;