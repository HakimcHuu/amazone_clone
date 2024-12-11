import React,{useEffect,useContext} from 'react'
import Routing from "./Routers";
import {DataContext} from "./Components/DataProvider/DataProvider.jsx"
import { Type } from './Utility/action.type';
import {auth} from './Utility/firebase'


function App() {
  const [{user},dispatch]=useContext(DataContext) 

  useEffect(()=>{
    auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        // console.log(authUser);
        dispatch({
          type:Type.SET_USER,
          user:authUser
        })
      }else{
        // console.log('No user is signed in');
        dispatch({
          type:Type.SET_USER,
          user:null
        })
      }
    })


  },[])






  return (
    <div>
      <Routing/>
    </div>
  );
}

export default App;


