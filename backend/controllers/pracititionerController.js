//practitionerController.js

import { practitioner } from '../models/practitionerModel.js';
import { visit } from '../models/visitModel.js';

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

const getPractitionerIdBySpecialty = async(specialty) => {
    let result = await practitioner.find({ specialty: specialty }, '_id');
    return result;
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

//Get doctorId with minimum number of tokens in their pipeline
export const getNextAvailableDoctor = async(specialty) => {
    try{

        let practitioners = await getPractitionerIdBySpecialty(specialty);
        practitioners = practitioners.map(function(practitioner) { return practitioner._id.toString(); });
        let result = await visit.aggregate(
            [
                //Match doctorId for chosen specialtiy
                { $match : 
                    { doctorId : 
                        { $in : practitioners,
                }}} ,
                // Grouping pipeline
                { $group: { 
                    _id: "$doctorId", 
                    count:{$sum:1}
                }},
                // Sorting pipeline
                { $sort: { "count": 1 } },
                // limit results
                { $limit: 1 }
            ]);
        return result[0]._id;
    }
    catch(error)
    {
        return error;
    }   
}