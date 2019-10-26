import React, { Component } from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import contact from './contact';

class CustomerEditForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
                     customerId:'',
                     name:'',
                     age: '',
                     sal:'',
                     address:'',
                     qualification:'',
                     isMarried:'N',
                     gender:'',
                     message:''
                   };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
      this.setState({
                       [name]: value
                    });
    }
  
    handleSubmit(event) {
        fetch("http://localhost:8080/updateCustomer", {
            method: "PUT",
            body: JSON.stringify(this.state),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => {
            console.log("UPDATE RESULT : " + res);
            this.setState({ message: res });
            return res;
        })
        .then(data => {
            console.log(data);
            !data.hasOwnProperty("error")
                ? this.setState({ message: data.success })
                : this.setState({ message: data.error, isError: true });
        });
        this.props.history.push('/contact/');
    }

    handleDelete(event) {
        const id = this.state.customerId;
        fetch("http://localhost:8080/deleteCustomer/"+id, {
            method: "DELETE",
            body: JSON.stringify(this.state),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => {
            this.setState({ message: res });
            return res;
        })
        .then(data => {
            console.log(data);
            !data.hasOwnProperty("error")
                ? this.setState({ message: data.success })
                : this.setState({ message: data.error, isError: true });
        });
        this.props.history.push('/contact/');
    }    

    componentDidMount() {
        const { params } = this.props.match;
        const id = params.id;
        axios.get(`http://localhost:8080/getCustomer/`+id)
       .then(res => {
         const person = res.data;
         console.log(person);
         this.setState({ 
             customerId:person.customerId,
             name: person.name,
             age: person.age,
             sal:person.sal,
             address:person.address,
             qualification:person.qualification,
             isMarried:person.isMarried,
             gender:person.gender
          }); 
          document.getElementById("qualification").options[document.getElementById("qualification").selectedIndex].text = this.state.qualification;
          if(this.state.isMarried == 'Y' || this.state.isMarried == 'true'){
            document.getElementById("isMarried").checked = true;
          } else {
            document.getElementById("isMarried").checked = false;  
          }
          if(this.state.gender == 'M'){
            document.getElementById("male").checked = true;
          } else {
            document.getElementById("female").checked = false;  
          }
       })
     }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
            Message : {this.state.message}
          <label>
            Name :
            <input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
          </label> <br/>
          <label>
            Age :
            <input type="text" name="age" value={this.state.age} onChange={this.handleChange} />
          </label> <br/>
          <label>
            Salary :
            <input type="text" name="sal" value={this.state.sal} onChange={this.handleChange} />
          </label>  <br/>
          <label>
            Address :
            <textarea name="address" value={this.state.address} onChange={this.handleChange} />
          </label>  <br/>
          <label>
            Qualification :
            <select name="qualification" id="qualification" value={this.state.qualification} onChange={this.handleChange}>
              <option value="">Please Select</option>
              <option value="BCA">BCA</option>
              <option value="MCA">MCA</option>
              <option value="BTECH">BTECH</option>
              <option value="MTECH">MTECH</option>
            </select>
          </label>  <br/>
          <label>
            Is Married :
            <input type="checkbox" name="isMarried" id="isMarried" checked={this.state.isMarried} onChange={this.handleChange} />
          </label> <br/>
          <label>
            Gender :
            Male
            <input type="radio" id="male" name="gender" value="M" onChange={this.handleChange} />
            Female
            <input type="radio" id="female" name="gender" value="F" onChange={this.handleChange} />
          </label> <br/>
          <input type="submit" value="Update" />
          <input type="button" value="Delete" onClick={this.handleDelete.bind(this)} />
        </form>
      );
    }
  }

  export default CustomerEditForm;