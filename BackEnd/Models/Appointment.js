import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema({
    username : {type : 'string', required: true},
    tokenNumber : {type : 'number', required: true},
    officeLocation : {type : 'string', required: true},
    appointmentDate : {type : 'Date', required: true},
    appointmentTime : {type : 'string', required: true},
    appointmentReason : {type : 'string', required: true},
    status : {type : 'string', required: true, default: 'pending'}  
})


const Appointment = mongoose.model('Appointment', AppointmentSchema);
export default Appointment