import Data from "../Models/Data.js"
import { enum_state } from "../enum/enum.js";

export const getAllData = async (req, res) =>{
    try {
        const data = await Data.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({status : 500 , message : enum_state.ERROR});
    }
     
}


export const createData = async (req, res) => {
    try {
        const { title, description , img_url } = req.body;
        if (!title || !description || !img_url) {
            return res.status(400).json({
                status: 400,
                message: 'Title and description are required'
            });
        } 
        const newData = new Data({ title, description, img_url });
        const savedData = await newData.save();   

        res.status(201).json({
            status: 201,
            message: 'Resource created successfully',
            data: savedData
        });
    } catch (error) {
        res.status(500).json({status : 500, message : enum_state.ERROR});
        console.log(error)
    }
}

export const updateData = async(req , res) =>{
    try {
        const {id} = req.params;
        const latestData = await Data.findByIdAndUpdate(id , req.body, {new : true});
        res.status(200).json(latestData);
    } catch (error) {
        res.status(400).json({status: 400 , message : enum_state.ERROR})
    }
    
}

export const deleteData = async(req , res)=>{
    try {
        const {id} = req.params;
        const deletedData = await Data.findByIdAndDelete(id);
        res.status(200).json(deletedData);
    } catch (error) {
        res.status(400).json({status: 400 , message : enum_state.ERROR})
    }
}