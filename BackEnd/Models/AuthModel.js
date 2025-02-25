import mongoose from "mongoose";


const Auth_Schema = mongoose.Schema({
  cnic: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true},
  password : { type: String, required: true, unique: true},
  username: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  purpose: { type: String, required: true },
  date: { type: Date, default: Date.now }
    
})

const Auth = mongoose.model('Auth', Auth_Schema);

export default Auth;