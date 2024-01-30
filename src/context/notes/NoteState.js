import React, { useState } from "react";
import NoteContext from "./noteContext";


 

 
const NoteState = (props) => {
     const host ="http://localhost:5000"

    const noteItems = []
    const [notes, setNotes] = useState(noteItems)

    // GET all  Note
    const GetNotes = async () => {
        // API Call   
        try {
            const response = await fetch(`${host}/api/notes/fetchallnotes`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token')
                },
            });
            if (response.status === 401) {
                localStorage.removeItem('token');
                alert("Token expired! Please log in again."); // Display alert
                window.location.reload(); // Refresh the page
                return;
            }
            const json = await response.json();
            console.log(json)
            setNotes(json)
        } catch (error) {
            console.error("Error fetching notes:", error.message);
            // Handle the error as needed (e.g., show an error message to the user)
        }

    }
    // Function to generate a unique ID
    const generateUniqueId = () => {
        return '_' + Math.random().toString(36).substr(2, 9);
    }
    // Add a Note
    const addNote = async (title, description, tag) => {

        // Generate a unique ID for the note
        const noteId = generateUniqueId();
        // API Call   
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ id: noteId, title, description, tag }), // body data type must match "Content-Type" header
        });
        const json = await response.json();
        console.log(json)

        console.log("Adding a new note", noteId)
        const note = {
            "_id": noteId,
            "user": "6565ca138a9d11348202262b",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2021-09-03T14:20:09.668Z",
            "__v": 0
        };
        setNotes(notes.concat(note))
    }

    // Delete a Note
    const deleteNote = async (id) => {

        // Display confirmation dialog
        const isConfirmed = window.confirm("Are you sure you want to delete this note?");

        if (!isConfirmed) {
            return; // If not confirmed, do nothing
        }
        // TODO: API Call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
        });
        const json = await response.json();
        console.log(json)

        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)
        console.log("Deleting Note with id", id);
    }
    // Edit a Note
    const editNote = async (id, title, description, tag) => {
        // API Call   
        const response = await fetch(`${host}/api/notes/updatanote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
        });
        const json = await response.json();
        console.log(json)

        let newNotes = JSON.parse(JSON.stringify(notes))
        // Logic To Edit in client side..   
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break
            }

        }
        setNotes(newNotes);
    }

    return (

        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, GetNotes }}>
            {props.children}
        </NoteContext.Provider>

    )
}
export default NoteState;
