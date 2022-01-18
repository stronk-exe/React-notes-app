import React, { useState, useEffect } from 'react'
//import notes from '../assets/data'
import { Link } from 'react-router-dom'
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'

export const NotePage = ({ match, history }) => {
    let noteId = match.params.id;

    let [note, setNote] = useState(null);

    useEffect(() =>{
        getNote();
    }, [noteId])

    let getNote = async() => {
        if (noteId === 'new') return
        let response = await fetch(`http://localhost:8000/notes/${noteId}`);
        let data = await response.json();
        setNote(data);
    }
    //let note = notes.find(note => note.id === Number(noteId));

    let updateNotes = async () => {
        await fetch(`http://localhost:8000/notes/${noteId}`, {
            method: 'PUT',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({ ...note, 'updated': new Date() })
        })
    }

    let createNotes = async () => {
        await fetch(`http://localhost:8000/notes/`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({ ...note, 'updated': new Date() })
        })
    }

    let deleteNote = async () => {
        await fetch(`http://localhost:8000/notes/${noteId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(note)
        })
        history.push('/')
    }

    let hundleSubmit = () => {
        if (noteId !== 'new' && !note.body)
            deleteNote();
        else if (noteId !== 'new')
            updateNotes();
        else if (noteId === 'new' && note !== null)
            createNotes();

        history.push('/');
    }

    return (
        <div className="note">
            <div className="note-header">
                <h3>
                    <Link to="/">
                        <ArrowLeft onClick={hundleSubmit} />
                    </Link>
                </h3>
                {noteId !== 'new' ? (
                    <button onClick={deleteNote}>Delete</button>
                ) : (
                    <button onClick={hundleSubmit}>Done</button>
                )}
                
            </div>
            <textarea onChange={(e)=> { setNote({...note, 'body':e.target.value})}} value={note?.body}></textarea>
        </div>
    )
}

export default NotePage;