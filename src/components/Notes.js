import React, { useContext, useEffect, useRef, useState } from 'react';
import NoteItem from './NoteItem';
import AddNotes from './AddNotes';
import NoteContext from '../context/notes/NoteContext';

const Notes = () => {
  const context = useContext(NoteContext);
  const {notes,getNotes, editNote} = context;
  useEffect(()=>{
    getNotes()
  },[])

  const ref = useRef(null)
  const refClose = useRef(null)
  const [note, setNote] = useState({id:"",etitle:"", edescription:"",etag:"Default"})

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id:currentNote._id, etitle:currentNote.title, edescription:currentNote.description, etag:currentNote.tag})
  }

  const onChange=(e) => {
    setNote({...note, [e.target.name] : e.target.value})
  }

  const handleClick=(e) => {
    editNote(note.id, note.etitle, note.edescription, note.etag)
    refClose.current.click();
  }

  return (
    <>
    <AddNotes />
    <button type="button" className="btn btn-primary d-none" ref={ref}  data-bs-toggle="modal" data-bs-target="#exampleModal">
    Launch demo modal
    </button>
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
          <form className="my-4">
            <div className="mb-3">
              <label htmlFor="etitle" className="form-label">Title</label>
              <input type="text" className="form-control" id="etitle" aria-describedby="titleText" name="etitle" value={note.etitle} minLength={5} required onChange={onChange}/>
            </div>
            <div className="mb-3">
              <label htmlFor="edescription" className="form-label">Description</label>
              <input type="text" className="form-control" id="edescription" name ="edescription" value={note.edescription} minLength={5} required onChange={onChange}/>
            </div>
            <div className="mb-3">
              <label htmlFor="etag" className="form-label">Tag</label>
              <input type="text" className="form-control" id="etag" name ="etag" value={note.etag} minLength={3} required onChange={onChange}/>
            </div>
          </form>
          </div>
          <div className="modal-footer">
            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" disabled={note.etitle.length < 5 || note.edescription.length <5}  onClick={handleClick} className="btn btn-primary">Update Note</button>
          </div>
        </div>
      </div>
    </div>

    <div className='row my-3'>
      <h3>Your Notes</h3>
      <div className='container'>
        {notes.length ===0 && 'No notes to display.'}
      </div>
      {notes.map((note)=> 
        {
          return <NoteItem key={note._id} updateNote={updateNote} note={note} />;
        })}
    </div>
    </>
  )
}

export default Notes;

