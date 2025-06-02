import React, { useState, useContext } from "react";
import classes from "./Signup.module.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth } from "../../Utility/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import { Type } from "../../Utility/action.type";
import { ClipLoader } from "react-spinners";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // console.log(password,email);
  const [loading, setLoading] = useState({
    signIn: false,
    signUp: false,
  });

  const [{ user }, dispatch] = useContext(DataContext);
  // console.log(user);
  const navigate = useNavigate();
  const navStateData = useLocation();
  // console.log(navStateData);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const authHandler = async (e) => {
    e.preventDefault();
    setError("");

    // Validate email
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    // Validate password
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    if (e.target.name === "signin") {
      setLoading({ ...loading, signIn: true });
      try {
        console.log("Attempting to sign in with:", { email }); // Debug log
        const userInfo = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        console.log("Sign in successful:", userInfo); // Debug log
        
        dispatch({
          type: Type.SET_USER,
          user: userInfo.user,
        });

        // Navigate after state is updated
        navigate(navStateData?.state?.redirect || "/", { replace: true });
      } catch (error) {
        console.error("Sign in error:", error.code, error.message); // Debug log
        let errorMessage = "An error occurred during sign in";
        switch (error.code) {
          case "auth/invalid-credential":
            errorMessage = "Invalid email or password";
            break;
          case "auth/invalid-email":
            errorMessage = "Invalid email address";
            break;
          case "auth/user-not-found":
            errorMessage = "No account found with this email";
            break;
          case "auth/wrong-password":
            errorMessage = "Incorrect password";
            break;
          case "auth/email-already-in-use":
            errorMessage = "Please sign in instead";
            break;
          default:
            errorMessage = error.message;
        }
        setError(errorMessage);
      } finally {
        setLoading({ ...loading, signIn: false });
      }
    } else if (e.target.name === "signup") {
      setLoading({ ...loading, signUp: true });
      try {
        console.log("Attempting to sign up with:", { email }); // Debug log
        const userInfo = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        console.log("Sign up successful:", userInfo); // Debug log
        
        dispatch({
          type: Type.SET_USER,
          user: userInfo.user,
        });

        // Navigate after state is updated
        navigate(navStateData?.state?.redirect || "/", { replace: true });
      } catch (error) {
        console.error("Sign up error:", error.code, error.message); // Debug log
        let errorMessage = "An error occurred during sign up";
        switch (error.code) {
          case "auth/invalid-credential":
            errorMessage = "Invalid email or password";
            break;
          case "auth/email-already-in-use":
            errorMessage = "An account already exists with this email. Please sign in instead.";
            break;
          case "auth/invalid-email":
            errorMessage = "Invalid email address";
            break;
          case "auth/weak-password":
            errorMessage = "Password is too weak";
            break;
          default:
            errorMessage = error.message;
        }
        setError(errorMessage);
      } finally {
        setLoading({ ...loading, signUp: false });
      }
    }
  };

  return (
    <section className={classes.login}>
      {/* logo */}
      <Link to={"/"}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/905px-Amazon_logo.svg.png"
          alt="amazon-logo"
        />
      </Link>

      {/* form */}
      <div className={classes.login_container}>
        <h1>Sign In</h1>
        {navStateData?.state?.msg && (
          <small
            style={{
              padding: "5px",
              color: "red",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            {navStateData?.state?.msg}
          </small>
        )}

        <form onSubmit={authHandler}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="button"
            onClick={authHandler}
            name="signin"
            className={classes.login_signInbutton}
          >
            {loading.signIn ? <ClipLoader size={15} color="#000" /> : "Sign In"}
          </button>
        </form>
        {/* agreement */}
        <p>
          By signing in, you agree to Amazon's Fake Clone Conditions of Use and
          Sale.please see our privacy policy Notice, our cookies Notice and our
          Interest Based Ads Notice.
        </p>
        {/* create account btn */}
        <button
          type="submit"
          onClick={authHandler}
          name="signup"
          className={classes.login__registerButton}
        >
          {loading.signUp ? (
            <ClipLoader size={15} color="#000" />
          ) : (
            "Create your Amazon Account"
          )}
        </button>
        {error && (
          <small
            style={{
              paddingTop: "10px",
              color: "red",
              display: "block",
              textAlign: "center",
              fontWeight: "500",
            }}
          >
            {error}
          </small>
        )}
      </div>
    </section>
  );
}

export default Auth;
