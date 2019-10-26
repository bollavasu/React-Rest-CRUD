import React, { Component } from 'react';
import contact from './contact';

class CustomerForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
                     name:'',
                     age: '',
                     sal:'',
                     address:'',
                     qualification:'',
                     isMarried:false,
                     gender:''
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
      fetch("http://localhost:8080/addCustomer", {
          method: "POST",
          body: JSON.stringify(this.state),
          headers: {
              "Content-Type": "application/json"
          }
      })
      .then(res => {
          console.log("CREATE RESULT : " + res);
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
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
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
            <select name="qualification" value={this.state.qualification} onChange={this.handleChange}>
              <option value="">Please Select</option>
              <option value="BCA">BCA</option>
              <option value="MCA">MCA</option>
              <option value="BTECH">BTECH</option>
              <option value="MTECH">MTECH</option>
            </select>
          </label>  <br/>
          <label>
            Is Married :
            <input type="checkbox" name="isMarried" checked={this.state.isMarried} onChange={this.handleChange} />
          </label> <br/>
          <label>
            Gender :
            Male
            <input type="radio" name="gender" value="M" onChange={this.handleChange} />
            Female
            <input type="radio" name="gender" value="F" onChange={this.handleChange} />
          </label> <br/>
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }

  export default CustomerForm;