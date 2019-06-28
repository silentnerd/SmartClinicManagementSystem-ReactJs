import React, { Component } from 'react';
import axios from 'axios';
import { ACCESS_TOKEN } from '../constants';

class FileUpload extends Component {
  constructor () {
    super();
    this.state = {
      file: null
    };
  }

  submitFile = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', this.state.file[0]);
    axios.post('http://localhost:5000/api/files/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data' ,
        'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
          
      }
    }).then(response => {
      console.log(response);
    }).catch(error => {
      // handle your error
    });
  }

  handleFileUpload = (event) => {
    this.setState({file: event.target.files});
  }

  render () {
    return (
      <form onSubmit={this.submitFile}>
        <input label='upload file' type='file' onChange={this.handleFileUpload} />
        <button type='submit'>Send</button>
      </form>
    );
  }
}

export default FileUpload;