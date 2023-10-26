import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import "./Login.css";
import { TextField } from "@mui/material";
import {useHistory} from 'react-router-dom'
import axios from "axios";
// import BackgroundImage from "../../assets/images/background.png";
// import Logo from "../../assets/images/logo.png";

export default function Login(props){
  const { isForgot} = props;
  const history = useHistory()
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(!inputPassword && !inputUsername){
      setShowError('All field are required!')
      return
    }else if(!inputUsername){
      setShowError('Email address is required!')
      return
    }else if(!inputPassword){
      setShowError('Password is required!')
      return
    }

    setLoading(true);
    try{
      const response = await axios.post('http://18.234.24.104/internal/api/admin/admin-login', {email: inputUsername, password: inputPassword})
      if(response && response.data && response.data.status){
        const data = response.data.data
        sessionStorage.setItem('loggedInUser', data.email)
        setShowError('')
        history.push('/dashboard')
      }else{
        setShowError('Invalid Credintial!')
      }
      setLoading(false);
    }catch (e){
      setLoading(false)
    }
    
  };

  const redirect = () => {
    if(isForgot){
        history.push('/login')
    }else{
        history.push('/forgot-password')
    }
  }

  return (
    <div
      className="sign-in__wrapper">
      <div className="sign-in__backdrop"></div>
      
      <Form className="shadow p-4 bg-white rounded" style={{display: 'flex', flexDirection: 'column', gap: '10px'}} onSubmit={handleSubmit}>
      <p style={{color: 'red', margin: '10px 0', textAlign: 'center'}}>{showError}</p>
      <div style={{display: 'flex', flexDirection: 'column',}}>
      <label>Email Address</label>
      <input value={inputUsername} onChange={(e) => setInputUsername(e.target.value)} className="form-item" placeholder="Email" />
      </div>
      {!isForgot && <div style={{display: 'flex', flexDirection: 'column',}}>
      <label>Password</label>
        <input type="password" value={inputPassword} onChange={(e) => setInputPassword(e.target.value)} className="form-item"placeholder="Password" />
      </div>}
      <div style={{display: 'flex', justifyContent: 'center'}}>
      <input
          className="form-item form-submit btn btn-primary"
          type="submit" disabled={loading ? true : false}
        />
      </div>
      </Form>
    </div>
  );
};