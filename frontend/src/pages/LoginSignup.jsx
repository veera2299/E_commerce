import React, { useContext, useState } from 'react';
import './CSS/LoginSignup.css'
import { ShopContext } from '../context/ShopContext';

const LoginSignup = () => {

  const [state, setState] = useState("Login");

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: ""
  })

  const { Backend_URL } = useContext(ShopContext);

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const validateForm = () => {
    const { username, password, email } = formData;
    if (state === "SignUp" && (!username || !email || !password)) {
      alert("Please fill in all fields for Signup")
      return false;
    }
    if(state === "Login" && (!email || !password)){
      alert("Please fill in both email and password for Login")
      return false;
    }
    return true;
  }

  const login = async () => {
    if(!validateForm()) return;
    console.log("Login function executed", formData);
    let responseData;
    await fetch(`${Backend_URL}/user/login`, {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    }).then((res) => res.json()).then(data => { responseData = data })

    if (responseData.success) {
      localStorage.setItem("auth-token", responseData.token);
      window.location.replace("/")
    } else {
      alert(responseData.error)
    }

  }

  const signUp = async () => {

    if(!validateForm()) return;
    console.log("signUp function executed", formData);

    let responseData;
    await fetch(`${Backend_URL}/user/signup`, {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    }).then(res => res.json()).then(data => responseData = data);
    if (responseData.success) {
      localStorage.setItem("auth-token", responseData.token);
      window.location.replace("/")
    } else {
      alert(responseData.error)
    }

  }

  return (
    <div className='loginsignup '>
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "SignUp" ? <input type="text" name='username' value={formData.username} onChange={changeHandler} placeholder='Your Name' /> : <></>}
          <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder='Email Address' />
          <input name='password' value={formData.password} onChange={changeHandler} type="password" placeholder='Password' />
        </div>
        <button onClick={() => { state === "Login" ? login() : signUp() }}>Continue</button>
        {state === "SignUp" ?
          <p className="loginsignup-login">Already have an account? <span onClick={() => { setState("Login") }}>Login Here</span></p>
          :
          <p className="loginsignup-login">Create an account? <span onClick={() => { setState("SignUp") }}>Click Here</span></p>
        }
        <div className="loginsignup-agree">
          <input type="checkbox" name='' id='' />
          <p>By continuing , i agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup
