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

export const getPractitionerById = async(docId) => {
    let Practitioner = await practitioner.findById(docId);
    return Practitioner;
}