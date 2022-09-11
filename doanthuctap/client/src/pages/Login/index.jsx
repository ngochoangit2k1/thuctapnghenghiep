
import axios from "axios"
import { useDispatch, useSelector } from "react-redux";
import { loginStart, loginSuccess, loginFailure, logout } from "../../redux/userSlice"

import { auth, provider } from "../../firebase";
import {signInWithPopup} from "firebase/auth"
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { useState } from "react";
import Home from "../Home"


const Login = () => {
  
    const [error, setError] = useState("");

    const [name,setName] = useState("");
  const [email,setEmail] = useState("");

  const [password,setPassword] = useState("");

  const { currentUser } = useSelector((state) => state.user);


  const dispatch = useDispatch()

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart())
    try {
      const res = await axios.post("/auth/signin",{name, password})
      dispatch(loginSuccess(res.data))
      console.log(res.data)
      e.replaceState("/")
    } catch (err) {
      dispatch(loginFailure(err))
    }
  }

  const SignInWithGoogle = () => {
    dispatch(loginStart())
    signInWithPopup(auth, provider)
    .then((result) => {
     axios.post("auth/google",{
      name: result.user.displayName,
      email: result.user.email,
      img: result.user.photoURL,


     }).then((res) => {dispatch((loginSuccess(res.data)))})
    }).catch((error)=> {
      dispatch(loginFailure())
    }
    )
  }

    return (
        <>{currentUser?(<Home type="/random"/>):(<div className={styles.login_container}>
            <div className={styles.login_form_container}>
                <div className={styles.left}>
                <form className={styles.form_container} >
                        <h1>Login to your account</h1>
                 
                
                        <input
                            type="text"
                            placeholder="usename"
                            
                            onChange={e => setName(e.target.value)}
                           
                            required
                            className={styles.input}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                          
                            onChange={e => setPassword(e.target.value)}
                           
                            required
                            className={styles.input}
                        />
                       
                        <button  className={styles.green_btn} onClick={handleLogin}>
                            Sing in
                        </button>
                        <button  className={styles.red_btn} onClick={SignInWithGoogle}>
                        Sign in with Google
                        </button>
                    </form>

                    
                </div>
                <div className={styles.right}>
                    <h1>New here</h1>
                    <Link to="/signup">
                        <button type="button" className={styles.white_btn}>
                            Sing Up
                        </button>
                    </Link>
                  
                </div>
            </div>
        </div>)}</>
        
    );
};

export default Login;