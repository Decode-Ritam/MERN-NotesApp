import React, { useContext, useState } from 'react'
import noteContext from "../context/notes/noteContext"

const AddNote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "" })

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" });
        props.showAlert("Note Successfully Add ", "success")

    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })

    }
    return (
        <>
            <p className='hading' >This is Home Page.</p>

            <div className='my-container' style={{ color: props.mode === 'light' ? 'black' : 'white'}}>
                <form className="my-3">
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Write a Title</label>
                        <input type="text" className="form-control" id="title" name="title" placeholder="Write Title here.." value={note.title} minLength={5} onChange={onChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">
                            Write Note
                        </label>
                        <textarea className="form-control" id="description" name="description" rows="3" placeholder="Write Note Description here.." minLength={5} value={note.description} onChange={onChange} required></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Write a Tag</label>
                        <input type="text" className="form-control" id="tag" name="tag" placeholder="Write Tag here.." value={note.tag} minLength={5} onChange={onChange} required />
                    </div>
                    <button type="submit" disabled={note.title.length < 5 || note.description.length < 5 || note.tag.length < 5} className="btn btn-primary" onClick={handleClick}>Submit</button>
                </form>
            </div>
        </>
    )
}

export default AddNote