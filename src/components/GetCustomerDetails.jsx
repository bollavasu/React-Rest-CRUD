import React, {Component} from 'react';
import CustomersList from './CustomersList';
import CustomerEditForm from './CustomerEditForm';
import axios from 'axios';

class GetCustomerDetails extends Component {

    render() {
        return (
            <CustomerEditForm customer={this.state.customer} />
        )
    }

    state = {
        customer: []
    };

    componentDidMount() {
       const { params } = this.props.match;
       const id = params.id;
       axios.get(`http://localhost:8080/getCustomer/`+id)
      .then(res => {
        const person = res.data;
        console.log(person);
        this.setState({ customer: person });
      })
    }

}

export default GetCustomerDetails;