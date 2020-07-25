//visitController.js

import { visit } from '../models/visitModel.js';
import { scheduleWalkIn } from '../utils/producer.js'
import { updateLock, getCollectionIdByName } from './lockController.js';

export const addNewVisit = async(request, response) => {
    /*before any operation, first acquire lock on collection to exclusively work on it*/
    let collectionId = await getCollectionIdByName("visit");
    let condition = true;
    let token;
    try{
        do{
            const oldLock = await updateLock(collectionId, true);
            condition = oldLock.lock;
            if(false == condition)//findOneAndUpdate returns the old value. 
            {
                //create a new visit and update token
                const count = await visit.countDocuments({
                    docId: request.body.docId
                 });
                token = count+1;
                let newVisit = {
                    patientId : request.body.patientId,
                    doctorId : request.body.doctorId,
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
        response.json("Your token number : "+ token);
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

/* To update token field in collection*/
const updateToken = async(visitId, token) =>
{
    return await visit.findOneAndUpdate({_id : visitId}, {$set:{token:token, updatedOn: Date.now()}});
};

const getVisitsByDocId = async(docId) => {
    let visits = await visit.findById(docId);
    return visits;
};