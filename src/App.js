import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Login from './components/Login';
import Singup from './components/Singup';
import Alert from './components/Alert';
 

const App = () => {
    const [alert, setAlert] = useState(null);
    const [mode, setMode] = useState('light'); // Whether dark mode is enabled or not
 
    const showAlert = (message, type) => {
        setAlert({
            msg: message,
            type: type
        })
        setTimeout(() => {
            setAlert(null);
        }, 2000);
    }
    const toggleMode = () => {
        if (mode === 'light') {
            setMode('dark');
            document.body.style.backgroundColor = '#042743';
            showAlert("Dark mode has been enabled", "success");
            // document.title = ("NotePad - Dark Mode")
        }
        else {
            setMode('light');
            document.body.style.backgroundColor = 'white';
            showAlert("Light mode has been enabled", "success");
            // document.title = ("NotePad - Light Mode")

        }
    }

    return (
        <>
            <div>
                <NoteState>
                    <Router>
                        <Navbar showAlert={showAlert} mode={mode}  toggleMode={toggleMode} />
                        <Alert alert={alert} />
                        <Switch>
                            <Route exact path="/" > <Home showAlert={showAlert} mode={mode}/> </Route>
                            <Route exact path="/about"> <About showAlert={showAlert} mode={mode}/></Route>
                            <Route exact path="/login"> <Login  showAlert={showAlert} mode={mode}/></Route>
                            <Route exact path="/Singup"> <Singup showAlert={showAlert} mode={mode}/></Route>
                        </Switch>
                    </Router>
                </NoteState>
            </div>
        </>
    );
};

export default App;
