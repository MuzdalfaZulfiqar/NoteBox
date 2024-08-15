import React from "react";
import noteContext from "./noteContext";

// we have got our context from notecontext file now we need to wrap the child in context provider
const NoteState = (props) => {
    // for now we are hardcoding them
    // we will be fetching
    
    // get the link/port where you are listening to your backend
    let host = "http://localhost:3001";
    
    const [notes, setNotes] = React.useState([]);
  // a function to fetch all notes using Fetch All Notes endpoint

   //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  async function getNotes() {
    const response = await fetch(`${host}/api/notes/fetchAllNotes`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "auth-token":
        localStorage.getItem("token")},
    });
    const json =  await response.json();
    // console.log(json)
    setNotes(json)
  }


 //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  async function addNote(title, description, tag) {
    // add an api call later
    const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "auth-token":
          localStorage.getItem("token")},
        body : JSON.stringify({title, description,tag})
      });
    
 
    // we are getting title, desc and tag from the input fiels and based on that we are updating our
    // setNotes
    let note = { title, description, tag };
    // setNotes(notes.push(note))

    setNotes((prevNotes) => {
      return [...prevNotes, note];
    });
  }

  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  async function deleteNote(id) {


    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          "auth-token":
           localStorage.getItem("token")
          }
      });
    

    // update the state
    setNotes((prevNotes) => {
      console.log("Deleting a note");
      // use the filter method it will return an array based on the condition fulfilled
      return prevNotes.filter((note) => {
        // return the element whose id is not matching the id of the node to be deleted id
        return note._id !== id;
      });
    });
    // props.showAlert("Deletion successful", "Success")
  }



   //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  async function editNote(title, description, tag, id) {
    // api/notes/updatenote/66b52a92826083a47c57271b

    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          "auth-token":
          localStorage.getItem("token") },
        body : JSON.stringify({title, description,tag})
      })

    let note = {};
    setNotes((prevNotes) => {
      return prevNotes.map((note) => {
        if (note._id === id) {
          let newNote = {
            _id: id,
            title: title,
            description: description,
            tag: tag,
          };
          return newNote
        } 
        else {
          return note
        }
      });
      // for (let index = 0; index < prevNotes.length; index++) {
      //     const note = prevNotes[index];
      //     if(note._id === id){

      //         console.log(note)
      //         note._id = id
      //         note.description = description
      //         note.tag = tags
      //         note.title = title
      //     }
      // }
      // return prevNotes.map((note)=>{

      // })
    });
  }

  // This function is allowing us to update the notes and pass this update function to others to incorporate the
  // changes
  // function update(){
  //     // setTimeout(() => {
  //         setState({
  //             "name" : "asma",
  //             "class" :"15"
  //         })
  //     // }, 1000);
  // }

  return (
    // we created a notes array a function to add note delete and edit and passed these as a value so that
    // every element or the child which is accessing it can view it
    <noteContext.Provider
      value={{ notes, setNotes,getNotes, addNote, deleteNote, editNote }}
    >
      {props.children}
    </noteContext.Provider>

  );
};
export default NoteState;

