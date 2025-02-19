import axios from "axios";


const API_Base_Url = "https://remotive.com/api/remote-jobs";


const ApiService = axios.create({
    baseURL: API_Base_Url,
    headers: {
        "Content-Type": "application/json",
       
    },
});



export default ApiService