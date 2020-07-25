import { lock } from '../models/lockModel.js';

/* To add new document in collection*/
export const addNewDocument = async(request, response) => {
    const newDocument = await lock.create(request.body);
    response.json(newDocument);
};

export const getCollectionIdByName = async(collectionName) => {
    let collection = await lock.findOne({ collectionName: collectionName });
    return collection._id;
}

/* To update lock field in collection*/
export const updateLock = (collectionId, value) =>
{
    return lock.findOneAndUpdate({_id : collectionId}, {$set:{lock:value}});
};



