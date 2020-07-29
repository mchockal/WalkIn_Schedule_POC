import React, { Component } from 'react';
import axios from 'axios';

export default class AddPatient extends Component {
    constructor(props) {
        super(props);

        this.onChangeFName = this.onChangeFName.bind(this);
        this.onChangeLName = this.onChangeLName.bind(this);

        this.state = {
            fname: '',
            lname: ''
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

    onSubmit(e) {
        e.preventDefault();
        const url = "http://localhost:4000/patient";//Replace with Constants
        axios.post(url, {
            fName : this.state.fname,
            lName  : this.state.lname
        })
        .then(async(response) => {
          let res = response;
          if(response.status === 200 )
          {
            alert(`Patient ${res.data.fName} ${res.data.lName} added`);
          }
          else
          {
              alert("Failure adding new patient");
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
                <h3>Patient Sign Up</h3>
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
                        <input type="submit" value="Sign Up" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}