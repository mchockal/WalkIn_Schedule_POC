//patientController.js

import { patient } from '../models/patientModel.js';

export const addNewPatient = async(request, response) => {
    const Patient = await patient.create(request.body);
    response.json(Patient);
};

export const getAllPatients = (request, response) => {
    patient.find({}, (err, patient) => {
        if(err){
            response.send(err);
        }
        response.json(patient);
    });
};