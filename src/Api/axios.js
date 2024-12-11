import axios from 'axios'
const axiosInstance = axios.create({
    //localhost
//   baseURL: "http://127.0.0.1:5001/clone-d909e/us-central1/api",
  // deployed version of amazon server on render.com
  baseURL: "https://amazon-api-deploy-1-s1uj.onrender.com/",
});
export { axiosInstance};