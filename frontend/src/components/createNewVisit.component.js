import React, { Component } from 'react';
import axios from 'axios';

export default class CreateNewVisit extends Component {
    constructor(props){
        super(props);
        
        this.onChangePatient = this.onChangePatient.bind(this);
        this.onChangeReason = this.onChangeReason.bind(this);
        this.onChangeConsultTime = this.onChangeConsultTime.bind(this);
        this.onChangeSpeciality = this.onChangeSpeciality.bind(this);
        this.onChangePractitioner = this.onChangePractitioner.bind(this);

        this.state = {
            patients: [],
            selectedPatient:"",
            reason:"",
            selectedConsultTime:"",
            specialty: [],
            selectedSpecialty: "",
            practitioners: [],
            selectedPractitioner: ""
        }
    }

    getPatientList()
    {
        const url = "http://localhost:4000/patient";
        axios.get(url)
        .then((response) => {            
            let patients = response.data.map(patient => {
                            return { value: patient._id, display: `${patient.fName} ${patient.lName}`}
            });// [value: 5f18c07ba0a6f52a0cf93624, display: Vignesh Kannan]
            this.setState({
                patients : [{value: '', display: '(Select patient)'}].concat(patients)
            });
        })
        .catch((error) => {
            console.log(error);
        });
    }

    getSpecialties()
    {
        const url = "http://localhost:4000/specialty";
        axios.get(url)
            .then((response) => {
                let data = response.data.map(specialty => {
                                return { value: specialty, display: specialty}
                });// ["Ortho", "General"]
    
                this.setState({
                    specialty : [{value: '', display: '(Select specialty)'}].concat(data)
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    componentDidMount() {
        this.getPatientList();
        this.getSpecialties();
    }

    onChangePatient(e) {
        this.setState({selectedPatient: e.target.value});
    }
    
    onChangeReason(e) {
        this.setState({
            reason: e.target.value
        });
    }

    onChangeConsultTime(e) {
        this.setState({selectedConsultTime: e.target.value});
    }

    onChangeSpeciality(e) {
        //AJAX - Get Practitioners based on specialty
        this.setState({selectedSpecialty: e.target.value});
        const url = `http://localhost:4000/practitioner/${e.target.value}`;
        axios.get(url)
            .then((response) => {            
                let practitioners = response.data.map(practitioner => {
                                return { value: practitioner._id, display: `${practitioner.fName} ${practitioner.lName}`}
                });// [value: 5f18c07ba0a6f52a0cf93624, display: Vignesh Kannan]
                this.setState({
                    practitioners : [{value: '', display: '(Select practitioner)'},
                                     {value: 'Any', display: 'Any'}].concat(practitioners)
                });
            })
            .catch((error) => {
                console.log(error);
            });

    }

    onChangePractitioner(e) {
        this.setState({selectedPractitioner: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();
        const url = "http://localhost:4000/visit";//Replace with Constants
        axios.post(url, {
            doctorId : this.state.selectedPractitioner,
            patientId : this.state.selectedPatient,
            reasonForVisit  : this.state.reason,
            consultationTime : this.state.selectedConsultTime,
            specialty : this.state.selectedSpecialty

        })
        .then(async(response) => {
          if(response.status === 200 )//Need to Check for error from server side as well
          {
            alert(response.data);
          }
          else
          {
              alert("Schedule visit failed. Try again");
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
            <h3>Schedule Visit</h3>
            <form onSubmit={this.onSubmit.bind(this)}>
                <div className="form-group">
                    <label>Select Patient : </label>
                    <select className="form-control" 
                            id="patientId"
                            name="patientId"
                            value={this.state.selectedPatient}
                            onChange={this.onChangePatient}>
                            {
                                this.state.patients.map((patients) => 
                                    <option key={patients.value} value={patients.value}>{patients.display}</option>
                            )}
                    </select>
                </div>
                <div className="form-group"> 
                    <label>Reason for visit : </label>
                    <input  type="text"
                            className="form-control"
                            name="reasonForVisit"
                            id="reasonForVisit"
                            value={this.state.reason}
                            onChange={this.onChangeReason}
                            />
                </div>

                <div className="form-group">
                    <label>Consultation time : </label>
                    <select className="form-control" 
                            id="consultationTime"
                            name="consultationTime"
                            value={this.state.selectedConsultTime}
                            onChange={this.onChangeConsultTime}>
                        <option key= "" value ="30"> (Select Consultation Time) </option>
                        <option key="15" value="15"> 15 min </option>
                        <option key="30" value="30"> 30 min </option>
                        <option key="60" value="60"> 60 min </option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Specialty : </label>
                    <select className="form-control" 
                            id="specialty" 
                            value={this.state.selectedSpecialty}
                            onChange={this.onChangeSpeciality}>
                        {   
                            this.state.specialty.map((specialty) => 
                                <option key={specialty.value} value={specialty.value}>{specialty.display}</option>
                        )}
                    
                    </select>
                </div>

                <div className="form-group">
                    <label>Available practitioners : </label>
                    <select className="form-control" 
                            id="doctorId"
                            name="doctorId"
                            value={this.state.selectedPractitioner}
                            onChange={this.onChangePractitioner}>
                        {
                            this.state.practitioners.map((practitioners) => 
                                 <option key={practitioners.value} value={practitioners.value}>{practitioners.display}</option>
                        )}
                    </select>
                </div>
           
                <div className="form-group">
                    <input type="submit" value="Create Visit" className="btn btn-primary" />
                </div>
            </form>
        </div>
        )
    }
}