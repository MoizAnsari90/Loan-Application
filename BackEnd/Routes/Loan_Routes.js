import express from 'express';
import { loan_Submit_Req } from '../controllers/Loan_Controller.js';



export const Loan_Route = express.Router()

Loan_Route.post('/submit', loan_Submit_Req)