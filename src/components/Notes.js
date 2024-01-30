import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import AddNote from './Addnote';
import { useHistory } from 'react-router-dom';

const Notes = (props) => {
    const context = useContext(NoteContext)
    const { notes, GetNotes, editNote } = context;
    const [note, setNote] = useState({ etitle: "", edescription: "", etag: "" })

    let history = useHistory();
    const ref = useRef(null)
    const refClose = useRef(null)

    useEffect(() => {
        if (localStorage.getItem('token')) {
            GetNotes()
        } else {
            history.push("/login")
        }
        // eslint-disable-next-line
    }, [])

    const updateNote = (currentNote) => {
        ref.current.click()
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })

    }

    const handleClick = (e) => {
        console.log("Updating This Note..", note)
        refClose.current.click()
        editNote(note.id, note.etitle, note.edescription, note.etag)
        props.showAlert("Note Successfully Updated ", "success")

    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })

    }

    return (
        <>
            <AddNote showAlert={props.showAlert} mode={props.mode}  />

            {/* <!-- Button trigger modal --> */}
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            {/* Modal  */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edite Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {/* This is form field */}
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Write a Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" placeholder="Write Tag here.." value={note.etag} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Write a Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" placeholder="Write Title here.." value={note.etitle} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">
                                        Write Note
                                    </label>
                                    <textarea className="form-control" id="edescription" name="edescription" rows="3" placeholder="Write Note Description here.." value={note.edescription} onChange={onChange}></textarea>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button onClick={handleClick} disabled={note.etitle.length < 5 || note.edescription.length < 5 || note.etag.length < 5} type="button" className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>


            <div className='row my-2'>
                <p className='hading' > {notes.length === 0 ? "Sorry No Notes to be Show!!" : "Your All Notes."}</p>
                <hr />
                {notes.map((note) => {

                    return <NoteItem note={note} updateNote={updateNote} showAlert={props.showAlert} key={note._id} />

                })}
            </div>
        </>
    )
}

export default Notes