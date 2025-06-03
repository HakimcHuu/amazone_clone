import axios from 'axios'
const axiosInstance = axios.create({
  //localhost
  // baseURL: "http://localhost:5001",
  // deployed version of amazon server on render.com
  baseURL: "https://amazon-api-deploy-ydiy.onrender.com/",
});
export { axiosInstance};






//firbase changed code for security rules

// rules_version = '2';
// service cloud.firestore {
//   match /databases/{database}/documents {
//     match /users/{userId} {
//       match /orders/{orderId} {
//         allow read, write: if request.auth != null && request.auth.uid == userId;
//       }
//     }
//   }
// }