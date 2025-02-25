import mongoose from "mongoose";


const Data_Schema = mongoose.Schema({
    title : "string",
    description : "string",
    img_url : "string"
})

const Data = mongoose.model('Data', Data_Schema)

export default Data;