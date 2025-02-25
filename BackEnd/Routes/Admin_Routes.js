import express from 'express';
import { viewApplications, updateApplication } from '../controllers/Admin_Controller.js';


export const Admin_Router = express.Router();

Admin_Router.get("/applications", viewApplications)
Admin_Router.put("/update/:id", updateApplication)