import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const lockSchema = new Schema({
    collectionName: {
                type: String,
                required: true,
                unique : true
    },  
    lock: {
                type: Boolean,
                default : false
    }

});

export const lock = mongoose.model('lock', lockSchema);