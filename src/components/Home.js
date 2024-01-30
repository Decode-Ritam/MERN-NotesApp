import React from 'react'
import '../App.css';
import Notes from './Notes';

const Home = (props) => {
  const {showAlert}= props;
  return (
    <>
      <div className="contentTable">
        <Notes  showAlert={showAlert} mode={props.mode}  />
      </div>
    </>
  )
}

export default Home