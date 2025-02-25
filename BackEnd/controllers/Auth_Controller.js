import { enum_state } from "../enum/enum.js";
import Auth from "../Models/AuthModel.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config()


export const register_controller = async (req, res) => {
    try {
        const { username, phone, cnic, purpose, address , email , password } = req.body;

        if (!username || !phone || !cnic || !purpose || !address  || !email || !password) {
            return res.status(400).json({ status: 400, message: enum_state.INVALID_REQUEST });
        }


        const user = await Auth.findOne({ cnic } , {email});
        if (user) {
            return res.status(409).json({ status: 409, message: enum_state.ALREADY });
        }

        const hashPassword =  await bcrypt.hash(password , 10)

        const newUser = await Auth.create({
            username,
            email,
            phone,
            cnic,
            purpose,
            address,
            password: hashPassword,
        });

      
        const sign_token = jwt.sign({ id: newUser._id }, process.env.JWT, { expiresIn: '1h' });

        return res.status(201).json({
            status: 201,
            message: enum_state.CREATE,
            user: {
                username: newUser.username,
                phone: newUser.phone,
                cnic: newUser.cnic, 
                purpose: newUser.purpose,
                address: newUser.address,
                email: newUser.email
            },
            sign_token,
        })
    }
         catch (error) {
        console.error("Error in register_controller:", error);
        return res.status(500).json({ status: 500, message: enum_state.ERROR});
    }
}

export const login_controller = async (req, res) => {
    try {
        const { password, email, cnic } = req.body;

        if (!password || !email || !cnic) {
            return res.status(400).json({ status: 400, message: "All fields (password, email, cnic) are required" });
        }

        const user = await Auth.findOne({ cnic, email });

        if (!user) {
            return res.status(409).json({ status: 409, message: "User not found" });
        }

        if (!user.password) {
            return res.status(401).json({ status: 401, message: "Invalid user data: password missing" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ status: 401, message: "Incorrect password" });
        }

        
        const login_token = jwt.sign({ id: user._id }, process.env.Jwt, { expiresIn: '1h' });

        
        // console.log("Generated Token:", token);
        // console.log("User:", user);

        // Return success response
        return res.status(200).json({ 
            status: 200, 
            message: "Login successful", 
            login_token, 
            user: { 
                id: user._id, 
                email: user.email, 
                cnic: user.cnic 
            } 
        });

    } catch (error) {
        console.error("Error in login_controller:", error);
        return res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
};


export const logout_controller = (req,res)=>{
    return res.status(200).json({status : 200, message : "Logged out successfully"})
}