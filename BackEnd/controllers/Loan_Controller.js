import { enum_state } from "../enum/enum.js";
import Loan from "../Models/LoanModel.js";
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';


const loan_Submit_Req = async(req,res)=>{
    try {
        const {username , category ,guarantor, amount , duration} = req.body;

        if(!username || !category || !guarantor || !amount || !duration){
            return res.status(400).json({ status: 400, message: enum_state.INVALID_REQUEST });
        }
    
        const user = await Loan.findOne({username : req.body.username})
            if(user){
                return res.status(409).json({ status: 409, message: enum_state.FAILED });
            }
    
        const NewLoan = await Loan.create({
            username,
            category,
            guarantor,
            amount,
            duration,
        })   
        
        const user_loan_token = jwt.sign({ id : NewLoan._id}, process.env.JWT , {expiresIn: '24hrs'})

        return res.status(201).json({status: 201 , message: enum_state.LOAN , NewLoan ,  user_loan_token  })

    } catch (error) {
        res.status(500).json({status: 500 , message: error})
        console.error("Error Submitting Loan Request:", error); 
    } 
    
}



export {loan_Submit_Req}