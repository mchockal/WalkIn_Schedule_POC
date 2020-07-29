import React, { Component } from 'react';
import axios from 'axios';

export default class AddPractitioner extends Component {
    constructor(props) {
        super(props);

        this.onChangeFName = this.onChangeFName.bind(this);
        this.onChangeLName = this.onChangeLName.bind(this);
        this.onChangeSpeciality = this.onChangeSpeciality.bind(this);

        this.state = {
            fname: '',
            lname: '',
            specialty: ''
        }
    }

    onChangeFName(e) {
        this.setState({
            fname: e.target.value
        });
    }
    onChangeLName(e) {
        this.setState({
            lname: e.target.value
        });
    }
    onChangeSpeciality(e) {
        this.setState({
            specialty: e.target.value
        });
    }
    onSubmit(e) {
        e.preventDefault();
        const url = "http://localhost:4000/practitioner";//Replace with Constants
        axios.post(url, {
            fName : this.state.fname,
            lName  : this.state.lname,
            specialty : this.state.specialty
        })
        .then(async(response) => {
          let res = response;
          if(response.status === 200 )
          {
            alert(`Practitioner ${res.data.fName} ${res.data.lName} added`);
          }
          else
          {
              alert("Failure adding new practitioner");
          }
        })
        .catch((err) => {
            console.log("Error : " + err);
            alert("Error : " + err.data);
        });
    }

    render() {
        return (
                <div style={{marginTop: 10}}>
                <h3>Practitioner Sign Up</h3>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <div className="form-group"> 
                        <label>First Name : </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.fname}
                                onChange={this.onChangeFName}
                                />
                    </div>
                    <div className="form-group">
                        <label>Last Name : </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.lname}
                                onChange={this.onChangeLName}
                                />
                    </div>
                    <div className="form-group">
                        <label>Specialty : </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.specialty}
                                onChange={this.onChangeSpeciality}
                                />
                    </div>
                    
                    <div className="form-group">
                        <input type="submit" value="Sign Up" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}