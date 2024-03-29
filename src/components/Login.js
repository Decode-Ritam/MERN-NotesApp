import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

function Login(props) {
  const [credentials, setCredentials] = useState({ email: "", password: "" })
  const host = "http://localhost:5000"
  let history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();
    // API Call   
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password }), // body data type must match "Content-Type" header
    });
    const json = await response.json();
    console.log(json)
    if (json.success) {
      // Save the auth token and redirect..
      localStorage.setItem('token', json.token)
      history.push("/")
      props.showAlert("Welcome Back You are successfuly login ", "success")
    } else {
      props.showAlert("Invalid Credentials ", "danger")
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })

  }

  return (
    <>
      <p className="hading">This is Login Component!!</p>

      <div className="my-container" style={{ color: props.mode === 'light' ? 'black' : 'white' }}>

        <form onSubmit={handleSubmit} >
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={credentials.email} onChange={onChange} name="email" />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" value={credentials.password} onChange={onChange} name="password" />
          </div>
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
            <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>

    </>
  )
}

export default Login