import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import CustomerForm from './components/CustomerForm';
import CustomerEditForm from './components/CustomerEditForm';
import GetCustomerDetails from './components/GetCustomerDetails';
import GetCustomersList from './components/GetCustomersList';
import Home from './components/home';
import Users from './components/users';
import Contact from './components/contact';
import Notfound from './components/notfound'

const routing = (
    <Router>
      <div>
      <ul>
        <li>
          <Link to="/">Customers List</Link>
        </li>
        <li>
          <Link to="/create">Create Customer</Link>
        </li>
      </ul>
      <Switch>
        <Route exact path="/" component={GetCustomersList} />
        <Route path="/create" component={CustomerForm} />
        <Route path="/contact" component={Contact} />
        <Route path="/customerDetails/:id" component={CustomerEditForm} />
        <Route component={Notfound} />
      </Switch>
      </div>
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

