import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./logo192.png";
import  AddPatient from './components/addNewPatient.component.js';
import  AddPractitioner from './components/addNewPractitioner.component.js';
import  CreateNewVisit from './components/createNewVisit.component.js';

class App extends Component {
  render() {
    return (
       <Router>
        <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="https://myremedy.com/" target="_blank">
              <img src={logo} width="30" height="30" alt="RemedyPoc" />
            </a>
            <Link to="/" className="navbar-brand">Walk In Schedule POC</Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/addPractitoner" className="nav-link">Practitioner</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/addPatient" className="nav-link">Patient</Link>
                </li>
                <li className="navbar-item">
                  <Link to={"/createNewVisit"} className="nav-link">Schedule Visit</Link>
                </li>
              </ul>
            </div>
          </nav>
          <br/>
          <Route path="/createNewVisit" exact component={CreateNewVisit} />
          <Route path="/addPractitoner" component={AddPractitioner} />
          <Route path="/addPatient" component={AddPatient} />
        </div>
      </Router>
    );
  }
}

export default App;