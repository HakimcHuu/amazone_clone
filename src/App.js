import React,{useEffect,useContext} from 'react'
import Routing from "./Routers";
import {DataContext} from "./Components/DataProvider/DataProvider.jsx"
import { Type } from './Utility/action.type';
import {auth} from './Utility/firebase'

function App() {
  const [{user},dispatch]=useContext(DataContext) 

  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        dispatch({
          type:Type.SET_USER,
          user:authUser
        })
      }else{
        dispatch({
          type:Type.SET_USER,
          user:null
        })
      }
    }, (error) => {
      console.error("Auth state change error:", error);
      dispatch({
        type:Type.SET_USER,
        user:null
      })
    });

    // Cleanup subscription on unmount
    // return () => unsubscribe();
  },[])

  return (
    <div>
      <Routing/>
    </div>
  );
}

export default App;


