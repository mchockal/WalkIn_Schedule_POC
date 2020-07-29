//practitionerController.js

import { practitioner } from '../models/practitionerModel.js';

export const addNewPractitioner = async(request, response) => {
    const Practitioner = await practitioner.create(request.body);
    response.json(Practitioner);
};

export const getAllPractitioners = (request, response) => {
    practitioner.find({}, (err, Practitioner) => {
        if(err){
            response.send(err);
        }
        response.json(Practitioner);
    });
};

export const getPractitionersBySpecialty = (request, response) => {
    practitioner.find({ specialty: request.params.specialty }, (err, Practitioners) => {
        if(err){
            response.send(err);
        }
        response.json(Practitioners);
    });
};

export const getPractitionerById = async(docId) => {
    try
    {
        let Practitioner = await practitioner.findById(docId);
        return Practitioner;
    }
    catch(error)
    {
        //Handle error and return something meaningful
        return error;
    }
}

export const getAllSpecialties = async(request, response) => {
    try
    {
        let specialty = await practitioner.distinct("specialty"); 
        response.json(specialty); 
    }
    catch(error)
    {
        response.json(error);
    }
     
}