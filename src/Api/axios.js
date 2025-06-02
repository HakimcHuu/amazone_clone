import axios from 'axios'
const axiosInstance = axios.create({
    //localhost
    // baseURL: "http://localhost:5001",
    // deployed version of amazon server on render.com
    baseURL: "https://amazon-api-deploy-1-s1uj.onrender.com",
});
export { axiosInstance};