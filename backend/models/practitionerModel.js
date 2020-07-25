import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const practitionerSchema = new Schema({
    fName: {
        type: String,
        required: true,
    },  
    lName: {
        type: String,
        required: true,
    },
    specialty: {
        type: String,
        required: true
    },  
    workingDays: {
        type: [String],
        default: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    },
    startTime: {
        type: String,
        default: "9:00am",
        required: true
    },  
    duration: {
        type: Number,
        default: 1,
        min: 1,
        max: 9
    },
    createdOn: {
        type: Date,
        default: Date.now
    },
    updatedOn: {
        type: Date,
        default: Date.now
    }
});

export const practitioner = mongoose.model('practitioner', practitionerSchema);