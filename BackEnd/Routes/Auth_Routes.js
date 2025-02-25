import express from 'express';
import { register_controller , login_controller , logout_controller } from "../controllers/Auth_Controller.js";



export const Auth_Router = express.Router();

Auth_Router.post("/register", register_controller); 
Auth_Router.post("/login", login_controller); 
Auth_Router.post("/logout", logout_controller); 