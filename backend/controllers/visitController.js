//visitController.js

import { visit } from '../models/visitModel.js';
import { scheduleWalkIn } from '../utils/producer.js'
import { updateLock, getCollectionIdByName } from './lockController.js';
import { getPractitionerById, getNextAvailableDoctor } from './pracititionerController.js'

export const addNewVisit = async(request, response) => {
    /*before any operation,  acquire lock on collection to exclusively work on it*/
    let collectionId = await getCollectionIdByName("visit");
    let doctorId;
    let condition = true;
    let token;
    try{
        do{
            const oldLock = await updateLock(collectionId, true);
            condition = oldLock.lock;
            if(false == condition)//findOneAndUpdate returns the old value. 
            {
                //create a new visit and update token
                if(request.body.doctorId == "Any")
                {
                    doctorId = await getNextAvailableDoctor(request.body.specialty);
                    console.log(doctorId);
                }
                else {
                    doctorId = request.body.doctorId;
                }
                const count = await visit.countDocuments({
                    doctorId: doctorId
                 });
                token = count+1;
                let newVisit = {
                    patientId : request.body.patientId,
                    doctorId : doctorId,
                    consultationTime : request.body.consultationTime,
                    reasonForVisit : request.body.reasonForVisit,
                    token : token
                }
                const Visit = await visit.create(newVisit);
                scheduleWalkIn(Visit);
                await updateLock(collectionId, false);       
            }
            else
            {
                continue;
            }
        }while(condition == true);
        //Push to queue and send the token number
        let practitioner = await getPractitionerById(doctorId);
        response.json(`Your token number for your visit with doctor ${practitioner.fName} ${practitioner.lName} is ${token}`);
    }
    catch (error)
    {
        console.log("Error" + error);
        await updateLock(collectionId, false);
        response.json(error);
    }
};

export const getAllVisits = (request, response) => {
    visit.find({}, async(err, visit) => {
        if(err){
            response.send(err);
        }
        response.json(visit);
    });
};

/* To update status field in collection*/
export const updateVisitStatus = async(visitId, visitStatus) =>
{
    return await visit.findOneAndUpdate({_id : visitId}, {$set:{status:visitStatus, updatedOn: Date.now()}});
};