import React,{useEffect,useContext} from 'react'
import Routing from "./Routers";
import {DataContext} from "./Components/DataProvider/DataProvider.jsx"
import { Type } from './Utility/action.type';
import {auth} from './Utility/firebase'

function App() {
  const [{user},dispatch]=useContext(DataContext) 

  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged((authUser)=>{
      console.log("Auth state changed:", authUser); // Debug log
      if(authUser){
        // When user signs in, load their cart
        dispatch({
          type:Type.SET_USER,
          user:authUser
        })
      }else{
        // When user signs out, clear the cart from state but keep it in localStorage
        dispatch({
          type:Type.SET_USER,
          user:null
        })
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  },[dispatch])

  // Debug log for user state
  useEffect(() => {
    console.log("Current user state:", user);
  }, [user]);

  return (
    <div>
      <Routing/>
    </div>
  );
}

export default App;


