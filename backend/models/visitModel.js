import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const visitSchema = new Schema({
    patientId: {
        type: String,
        required: true,
    },  
    doctorId: {
        type: String,
        required: true,
    },
    reasonForVisit: {
        type: String
    },  
    consultationTime: {
        type: Number,
        default: 15,
        min: 15,
        max: 60
    },
    createdOn: {
        type: Date,
        default: Date.now
    },
    updatedOn: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        default: "Created" // 'In Progress', 'Done'
    },
    token: {
        type: Number,
        default: 1
    }
});

export const visit = mongoose.model('visit', visitSchema);