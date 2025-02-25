import Guarantor from "../Models/Guarantor.js";
import { enum_state } from "../enum/enum.js";
import jwt from 'jsonwebtoken';

export const register_guarantor_controller = async(req, res) =>{
    try{
        const {cnic ,guarantor_name ,relationship ,dateOfBirth ,occupation ,income,address,phoneNumber,email}= req.body;

    if(!cnic || !guarantor_name || !relationship
        ||!dateOfBirth ||!occupation ||!income ||!address ||!phoneNumber || !email ){
        return res.status(400).json({status: 400, message: enum_state.INVALID_REQUEST});
    }
    const guarantor = await Guarantor.findOne({cnic})
    if(guarantor){
        return res.status(409).json({ status: 409, message: enum_state.ALREADY });
    }

    const newGuarantor = await Guarantor.create({
        cnic,
        guarantor_name,
        relationship,
        dateOfBirth,
        occupation,
        income,
        address,
        phoneNumber,
        email,
    })

    const guarantor_token = jwt.sign({ id: newGuarantor._id }, process.env.JWT);
        return res.status(201).json({ 
        status: 201,
        message: enum_state.SUCCESS,
        newGuarantor: {
            _id: newGuarantor._id,
            cnic : newGuarantor.cnic,
            guarantor_name : newGuarantor.guarantor_name,
            relationship : newGuarantor.relationship,
            dateOfBirth : newGuarantor.dateOfBirth,
            occupation : newGuarantor.occupation,
            income : newGuarantor.income,
            address : newGuarantor.address,
            phoneNumber : newGuarantor.phoneNumber,
            email : newGuarantor.email,
            
        },
        guarantor_token,
    });
}
    catch(error){
        console.log(error);
        return res.status(500).json({status: 500, message: enum_state.INTERNAL_SERVER_ERROR});
    }
}