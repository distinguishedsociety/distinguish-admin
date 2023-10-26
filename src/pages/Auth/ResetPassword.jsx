import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import "./Login.css";
import { TextField } from "@mui/material";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Loader } from "../../components/Loader";
export default function ForgotPassword() {
  const history = useHistory()
    const [ cPass, setCPass] = useState('')
    const [ nPass, setNPass] = useState('')
    const [ rPass, setrPass] = useState('')
    const [isLoading, setLoading] = useState(false);
    const [showError, setShowError] = useState('')
    
  const handleSubmit = async (event) => {
    setLoading(true)
    event.preventDefault();
    const keys =[cPass,nPass,rPass]
    const error = keys.filter((item) => {
        return !item
    })
    
    if(error.length > 0){
        setShowError("All fields are required!")
        setLoading(false)
        return
    }else if(nPass != rPass){
      setLoading(false)
      setShowError('Confirm Password does not match')
        return
    }else{
        setShowError('')
    }
    const email = sessionStorage.getItem('loggedInUser')
    const response = await axios.post('http://18.234.24.104/internal/api/admin/admin-reset-password', {email: email, cPass: cPass, nPass: nPass})
    console.log('response',response)
    if(response && response.data && response.data.status){
        
        toast(response.data.message);
        setShowError('')
        setTimeout(() => {
          sessionStorage.clear()
          history.push('/')
        },3000)
        setLoading(false)
      }else{
        setShowError(response.data.message)
      }
      setLoading(false);
  };

  return (
    <>
      <div className="mainpage">
      <ToastContainer theme="dark" />
        <form
          className="addForm"
          onSubmit={handleSubmit}
        >
            <p style={{color: 'red', margin: '10px 0', textAlign: 'center'}}>{showError}</p>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label className="label_text">Current Password</label>
            <input
            type="password"
                value={cPass}
                onChange={(e) => setCPass(e.target.value)}
              className="form-item"
              placeholder="Current Password"
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label className="label_text">New Password</label>
            <input
            type="password"
                value={nPass}
                onChange={(e) => setNPass(e.target.value)}
              className="form-item"
              placeholder="New Password"
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label className="label_text">Confirm Password</label>
            <input
            type="password"
                value={rPass}
                onChange={(e) => setrPass(e.target.value)}
              className="form-item"
              placeholder="Confrim Password"
            />
            <div className="form-item form-submit btn btn-primary">
            {isLoading ? <Loader/> : <input
              type="submit"
              className="btn btn-primary rest-password"
              value={'Update'}
              disabled={isLoading}
            />}
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
