import Api_Client from "./axios";

const getRequest = async(path)=>{
    try {
        const response = await Api_Client.get(path)
        return response.data 
    } catch (error) {
        console.log(error)
        throw new Error('Failed to post data')
    }
    
}

const postRequest = async(path, data)=>{
    try {
        const response = await Api_Client.post(path, data)
        return response.data
        
    } catch (error) {
        console.log(error)
        throw new Error('Failed to post data')
    }
    
}

const putRequest = async(path,data)=>{
    try {
        const response = await Api_Client.put(path,data)
        return response.data 
    } catch (error) {
        console.log(error)
        throw new Error('Failed to put data')
    }
    
}
const deleteRequest = async(path,data)=>{
    try {
        const response = await Api_Client.delete(path,data)
        return response.data 
    } catch (error) {
        console.log(error)
        throw new Error('Failed to delete data')
    }
    
}

export {getRequest,postRequest,putRequest,deleteRequest}