import React, { useContext, useState } from 'react';
import NoteContext from '../context/notes/NoteContext';


const AddNotes = () => {
    const context = useContext(NoteContext);
    const {addNote} = context;
    const [note, setNote] = useState({title:"", description:"",tag:""})

    const onChange=(e) => {
        setNote({...note, [e.target.name] : e.target.value})
    }

    const handleClick=(e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title:"", description:"",tag:""})
    }

  return (
    <div>
       <div className="container my-3">
        <h3>Add a Note</h3>

      <form className="my-4">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" aria-describedby="titleText" name="title" minLength={5} required value={note.title} onChange={onChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input type="text" className="form-control" id="description" name ="description"minLength={5} required value={note.description} onChange={onChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input type="text" className="form-control" id="tag" name ="tag" minLength={3} required onChange={onChange}  value={note.tag}/>
        </div>
      
      
        <button disabled={note.title.length < 5 || note.description.length <5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
      </form>
    </div>

    </div>
  )
}

export default AddNotes
