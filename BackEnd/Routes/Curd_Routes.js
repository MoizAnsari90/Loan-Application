import express from 'express';
import { getAllData , createData , updateData , deleteData } from '../controllers/Curd_Controller.js';

export const Curd_Router = express.Router();

Curd_Router.get('/', getAllData);
Curd_Router.post('/profile', createData);
Curd_Router.put('/update/:id', updateData);
Curd_Router.delete('/delete/:id', deleteData);

// upload.single('image')