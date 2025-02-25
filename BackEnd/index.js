import express from 'express';
import dotenv from 'dotenv';
import { db_connection } from './DB_connection/mongoDB.js';
import cors from 'cors';
import { Auth_Router } from './Routes/Auth_Routes.js';
import { Loan_Route } from './Routes/Loan_Routes.js';
import { Guarantor_Router } from './Routes/Guarantor_Routes.js';
import {Curd_Router} from './Routes/Curd_Routes.js';
import { Admin_Router } from './Routes/Admin_Routes.js';


const app = express();

app.use(express.json())
app.use(cors())
dotenv.config();


app.get("/", (req,res)=>{
    res.send("Welcome to the Show!")
})

app.use('/auth', Auth_Router)
app.use('/loan', Loan_Route)
app.use('/guarantor', Guarantor_Router)
app.use('/admin', Admin_Router)

db_connection();
const Port = process.env.PORT || 5000;

app.listen(Port,()=>{
    console.log(`Your port is Working ${Port}`)
})