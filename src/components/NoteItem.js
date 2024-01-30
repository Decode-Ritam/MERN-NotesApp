import React, { useState, useContext } from 'react';
import NoteContext from '../context/notes/noteContext';

const NotItem = (props) => {

  const context = useContext(NoteContext)
  const { deleteNote } = context;
  const { note, updateNote } = props;

  // Destructure title and description from the note
  const { title, tag, description, date } = note;

  const handleMouseOver = (event) => {
    event.target.classList.add('fa-bounce');
    setTimeout(() => {
      event.target.classList.remove('fa-bounce');
    }, 1500);
  };


  const formattedDate = formatToLocaleDateString(date);
  const formattedTime = formatToLocaleTimeString(date);

  function formatToLocaleDateString(timestamp) {
    const dateObj = new Date(timestamp);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return dateObj.toLocaleDateString(undefined, options);
  }

  function formatToLocaleTimeString(timestamp) {
    const dateObj = new Date(timestamp);
    return dateObj.toLocaleTimeString();
  }
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };


  return (
    <>
      <div className="col-md-3 my-3">
        <div className="card" >
          <img className="completeCheck" style={{ opacity: isChecked ? 1 : 0 }} src="icons8-check-96.png" alt="images" />
          <input title=" Checked If It's Complete.." className={`Checkmark form-check-input ${isChecked ? 'checked' : ''}`} type="checkbox" id="flexCheckDefault" onChange={handleCheckboxChange} />

          <div className={` card-body ${isChecked ? 'opacity-style complete' : ''}`} >
            {/* <h1>complete</h1> */}
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {tag}
            </span>
            <div className="d-flex justify-content-between">
              <h5 className="card-title">{title} </h5>
              {/* <input title="Checked If It's Complete.." className={`form-check-input ${isChecked ? 'checked':''}`} type="checkbox" id="flexCheckDefault" onChange={handleCheckboxChange} /> */}
            </div>
            <p className="card-timestamp">{formattedTime}  {formattedDate}</p>
            <p className="card-text">{description}. </p>
            <i className="fa-solid fa-trash mx-3 icon" title='Delete items!' onClick={() => { deleteNote(note._id); props.showAlert("Note Successfully Deleted ", "success") }} onMouseOver={handleMouseOver} style={{ color: "#0d0d0d" }}></i>
            <i className="fa-solid fa-pen-to-square mx-3 icon" title='Edit items!' onClick={() => { updateNote(note) }} onMouseOver={handleMouseOver} style={{ color: "#0d0d0d" }}></i>


          </div>
        </div>
      </div>
    </>
  )
}

export default NotItem