import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const patientSchema = new Schema({
    fName: {
        type: String,
        required: true,
    },  
    lName: {
        type: String,
        required: true,
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
});

export const patient = mongoose.model('patient', patientSchema);