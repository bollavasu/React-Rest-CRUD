import React, {Component} from 'react';
import CustomersList from './CustomersList';
import axios from 'axios';

class GetCustomersList extends Component {
    render() {
        return (
            <CustomersList customers={this.state.customers} />
        )
    }

    state = {
        customers: []
    };

    componentDidMount() {
       axios.get(`http://localhost:8080/getAllCustomers`)
      .then(res => {
        const persons = res.data;
        console.log(persons);
        this.setState({ customers: persons });
      })
    }

}

export default GetCustomersList;