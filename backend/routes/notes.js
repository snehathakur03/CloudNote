const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require("express-validator");


// Route 1 : Get all the notes using "/api/notes/getuser" Login Required

router.get('/fetchallnotes', fetchuser,async (req, res) => {
    try{
        const note = await Note.find({user:req.user.id})
        res.json(note);
    }catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server error");
      }
})

// Route 2 : Add a new note notes using "/api/notes/addnote" Login Required

router.post('/addnote', fetchuser , [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be at least 5 characters").isLength({min: 5,}),] ,async (req, res) => {

    try{
        const {title,description,tag} = req.body; 
            
        //If there are errors then return bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Note({
        title,description,tag, user:req.user.id
        })
        const savedNote = await note.save()

        res.json(savedNote);

    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server error");
    }
})


// Route 3 : Update an existing note notes using "/api/notes/updatenote" Login Required

router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try{

        // Create a new note object
        const {title,description,tag} = req.body;
        const newNote = {};
        if(title){newNote.title = title};
        if(description){newNote.description = description};
        if(tag){newNote.tag = tag};
    
        // Find the note to be update and update it
        let note = await Note.findById(req.params.id);
        if(!note){return res.status(404).send("Not Found")}
    
        if(note.user.toString() !== req.user.id){
           return res.status(401).send("Not Allowed");
        }
        
        note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
        res.json({note});
    }catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server error");
      }

    })


// Route 3 : Delete an existing note notes using "/api/notes/deletenote" Login Required

router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try{
    const {title,description,tag} = req.body;
    const newNote = {};
    if(title){newNote.title = title};
    if(description){newNote.description = description};
    if(tag){newNote.tag = tag};

    // Find the note to be delete and delete it
    let note = await Note.findById(req.params.id);
    if(!note){return res.status(404).send("Not Found")}

    // Allow delete only if user own this note
    if(note.user.toString() !== req.user.id){
       return res.status(401).send("Not Allowed");
    }
    
    note = await Note.findByIdAndDelete(req.params.id, {$set: newNote}, {new:true})
    res.json({"Success" : "Note has been deleted", note:note});
    }catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server error");
    }
    })



// Export the router
module.exports = router;
