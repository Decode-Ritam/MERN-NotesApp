import React, { useEffect } from 'react'
import { Link, useLocation, useHistory } from "react-router-dom";

export const Navbar = (props) => {
    let location = useLocation();
    useEffect(() => {

    }, [location])

    if (location.pathname === '/login') {
        document.title = ("NotePad - Login")
    }
    if (location.pathname === '/singup') {
        document.title = ("NotePad - Singup")
    }

    let history = useHistory();
    const handaleLogout = () => {
        localStorage.removeItem('token')
        history.push('/login')
        props.showAlert("You are successfully logout", "success")

    }
    return (

        <nav className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode} `}>
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Navbar</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/' ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/about' ? "active" : ""}`} to="/about">About</Link>
                        </li>
                    </ul>
                    {!localStorage.getItem('token') || location.pathname === '/login' ?
                        <form className="d-flex" role="search">
                            <Link className={`${location.pathname === '/login' ? "bg-success text-white" : ""} button btn btn-outline-success mx-1`} to="/login" type="submit">Login</Link>
                            <Link className={`${location.pathname === '/singup' ? "bg-success text-white" : ""} button btn btn-outline-success mx-3`} to="/singup" type="submit">Singup</Link>
                        </form> : <button onClick={handaleLogout} className="button btn btn-primary mx-2"> Logout</button>
                    }


                    <form className="d-flex flexform" role="search">
                        {/* <input className="form-control me-2 " type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Search</button> */}
                        <div className={`form-check form-switch text-${props.mode === 'light' ? 'dark' : 'light'} `}>
                            <input className="form-check-input" onClick={props.toggleMode} style={{ border: '2px solid black' }} type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                            <label className="form-check-label margin-left" htmlFor="flexSwitchCheckDefault"> Enabale Daekmode  </label>
                        </div>

                    </form>
                </div>
            </div>
        </nav>





    )
}
export default Navbar