import mongoose from "mongoose";
const GuarantorSchema = new mongoose.Schema({
    cnic : { type: Number , required: true },
    guarantor_name: { type: String, required: true },
    relationship: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    occupation: { type: String, required: true },
    income: { type: Number, required: true },
    address: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    date: { type: Date, default: Date.now }
})

const Guarantor = mongoose.model('Guarantor', GuarantorSchema);
export default Guarantor