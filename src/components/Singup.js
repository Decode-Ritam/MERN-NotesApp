import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';


function Singup(props) {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
  const host = "http://localhost:5000"
  let history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if password and confirm password match
    if (credentials.password !== credentials.cpassword) {
      props.showAlert("Password and Confirm Password do not match", "danger");
      return;
    }

    // API Call   
    const { name, email, password } = credentials;
    const response = await fetch(`${host}/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }), // body data type must match "Content-Type" header
    });
    const json = await response.json();
    console.log(json)

    if (json.success) {
      // Save the auth token and redirect..
      localStorage.setItem('token', json.token)
      history.push("/")
      props.showAlert("Accaunt Create Successfuly", "success");
    } else {
      props.showAlert("Invalid Credentials ", "danger");
    }

  }


  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })

  }

  return (

    <>
      <p className="hading"> This is Singup Component!!</p>

      <div className="my-container" style={{ color: props.mode === 'light' ? 'black' : 'white' }}>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" name='name' value={credentials.name} onChange={onChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={onChange} />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" name='password' minLength={5} required value={credentials.password} onChange={onChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">Confirm Password</label>
            <input type="password" className="form-control" id="cpassword" name='cpassword' minLength={5} required value={credentials.cpassword} onChange={onChange} />
          </div>

          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>

    </>


  )
}

export default Singup