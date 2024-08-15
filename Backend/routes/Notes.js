const express = require("express");
const router = express.Router();
// for fetching the notes we need the particular user who made the request or who logged in so we need
// the fetchUser middleware to get the id of the user from the token
const fetchUser = require("../Middleware/fetchUser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

// route 1 - fetchAllNotes : GET method
// this will give the notes of the user who is already logged in
router.get(
  "/fetchAllNotes",

  fetchUser,

  async (req, res) => {
    try {
        // here user is the entery which is basically storing the id of the logged user so we are saying
        // search for the notes of the user with this id 
      let notes = await Notes.find({ user: req.user.id });
      res.json(notes);
    } catch (error) {
      res.json(error);
    }
  }
);

//Route -2  createnewnotes
router.post(
    // define the path
  "/addnote",
  // add a middleware to get the current loggedIn user'sid 
  fetchUser,
  // add a validation rules array
  [
    body("title", "title error").isLength({ min: 3 }),
    body("description", "description error").isLength({ min: 5 }),
  ],
  async (req, res) => {
    // check for any errors
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      // if error return bad request and errors
      return res.status(400).json({ error: errors.array() });
    }

    try {
      // since we have used the fetchUser middleware now so we can use the req.user
      // but our notes schema has no record of our user so we need to link them somehow

      // create a note and also add the entry id of the user who logged in as after the middleware the req bpdy
      // now has the user object with id property appended to it
      let note = await Notes.create({
        title: req.body.title,
        description: req.body.description,
        tag: req.body.tag,
        user: req.user.id,
      });
      // send in response to the user
      res.json(note);
    } catch (error) {
      res.json(error);
    }
  }
);

// route 3 - update a note : PUT method
// to update a note we need to provide the id of the note we need to update
router.put(
    // define the path
  "/updatenote/:id",
  // add a middleware to get the current loggedIn user'sid 
  fetchUser,
  async (req, res)=>{
    // destructre from req.body
    let {title, description, tag}  = req.body;

    try {
      
      // create a new note
      let newNote ={}
  
      // if got title from the re body means user has updated it so we need to add it into the newNote
  
      if(title){newNote.title = title}
      if(description){newNote.description = description}
      if(tag){newNote.tag = tag}
  
  
      // find note with the id that we got from the url
      let note = await Notes.findById(req.params.id)
      if(!note){
         return res.status(404).send("not found")
      }
      if(note.user.toString() != req.user.id){
        // in the url we are only getting the id of the note now after finding the note with that id
        // from the database we need to get the id of the user stored with that note and then we need the id
        // of the user who logged in from the middleware
        return res.status(401).send("Not accessible")
      }
  
      // means not found and person is only updating its own note
      // find the note with id = req.params.id and set it equal to newNote if you find changed and new is true
      // means kind of ensuring the change that we will add the newchnages
      note = await Notes.findByIdAndUpdate(req.params.id, {$set  : newNote}, {new :true})
      res.json(note);
    } catch (error) {
        res.send("Internal Server error")
    }
  }

)

// route 4 delete a note using DELETE method
router.delete(
    // define the path
  "/deletenote/:id",
  // add a middleware to get the current loggedIn user'sid 
  fetchUser,
  async (req, res)=>{
    try {
      
      // find note with the id that we got from the url
    let note = await Notes.findById(req.params.id)
    if(!note){
       return res.status(404).send("not found")
    }
    if(note.user.toString() != req.user.id){
      // in the url we are only getting the id of the note now after finding the note with that id
      // from the database we need to get the id of the user stored with that note and then we need the id
      // of the user who logged in from the middleware
      return res.status(401).send("Not accessible")
    }

    // this will return the deleted document
    note = await Notes.findByIdAndDelete(req.params.id)
    res.json(note);
    } catch (error) {
        res.send("Internal server error")
    }

    
  }

)

module.exports = router;
