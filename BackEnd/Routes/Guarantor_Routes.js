import express from 'express';
import { register_guarantor_controller } from '../controllers/Guarantor_Controller.js';


export const Guarantor_Router = express.Router();

Guarantor_Router.post('/register' , register_guarantor_controller)
