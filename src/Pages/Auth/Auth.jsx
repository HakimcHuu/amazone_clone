import React,{useState,useContext} from 'react'
import classes from './Signup.module.css'
import {Link,useNavigate,useLocation} from "react-router-dom"
import { auth } from '../../Utility/firebase' 
import {signInWithEmailAndPassword,createUserWithEmailAndPassword} from 'firebase/auth'
import {DataContext} from '../../Components/DataProvider/DataProvider'
import { Type } from '../../Utility/action.type'
import {ClipLoader} from 'react-spinners'
function Auth() {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [error,setError]=useState("");
  // console.log(password,email);
  const [loading,setLoading]=useState({
    signIn:false,
    signUp:false
  })

  const [{user}, dispatch] = useContext(DataContext);
  // console.log(user);
  const navigate = useNavigate();
  const navStateData = useLocation();
  console.log(navStateData);


  const authHandler =async (e) => {
    e.preventDefault();
    // console.log(e.target.name);
    if ( e.target.name==="signin"){
      //firebase.auth
      setLoading({...loading,signIn:true})
      signInWithEmailAndPassword(auth,email,password).then((userInfo)=>{
        // console.log(userInfo);
        dispatch({
          type:Type.SET_USER,
          user:userInfo.user
        })
        setLoading({...loading,signIn:false})
        navigate(navStateData?.state?.redirect || "/")
        
      }).catch((error)=>{
        // console.log(error.message);
        setError(error.message);
        setLoading({...loading,signUp:false})

        
      })

    }else{
      setLoading({...loading,signUp:true})
      createUserWithEmailAndPassword(auth,email,password).then((userInfo)=>{
        // console.log(userInfo);
        dispatch({
          type:Type.SET_USER,
          user:userInfo.user
        })
        setLoading({...loading,signUp:false})
        navigate(navStateData?.state?.redirect || "/");


      })
      .catch((error)=>{
        // console.log(error);
        setError(error.message);
        setLoading({...loading,signUp:false})



      })
    }
  }
  

  return <section className={classes.login}>
    {/* logo */}
    <Link to={"/"}>
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/905px-Amazon_logo.svg.png" alt="amazon-logo" />
    </Link>

    {/* form */}
    <div className={classes.login_container}>
      <h1>Sign In</h1>
      {
        navStateData?.state?.msg && (
          <small style={{
            padding: "5px",
            color: "red",
            textAlign:"center",
            fontWeight:"bold",
            }}
            >
              {navStateData?.state?.msg}
          </small>
        )}

      <form action="">
        <div>
        <label htmlFor="email">Email</label>
        <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" id="email"/>
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" id="password"/>
        </div>

        <button type="submit" onClick={authHandler} name="signin" className={classes.login_signInbutton}>
          {
            loading.signIn? <ClipLoader size={15} color="#000" /> : ("Sign In")
          }
        </button> 
      
      </form>
      {/* agreement */}
      <p>By signing in, you agree to Amazon's Fake Clone Conditions of Use and Sale.please see our privacy policy Notice, our cookies Notice and our Interest Based Ads Notice. 
      </p>
      {/* create account btn */}
      <button
      type="submit"
      onClick={authHandler}
      name="signup"
      className={classes.login__registerButton}
      >
          {
            loading.signUp? <ClipLoader size={15} color="#000" /> : (
              "Create your Amazon Account"
            )}
      </button>
      {
  error && <small style={{ paddingTop: "5px", color: "red" }}>{error}</small>
      }

    </div>





  </section>
  
}

export default Auth