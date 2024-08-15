import React, { useContext, useEffect } from "react";
import noteContext from "../Contexts/notes/noteContext";
import AddNote from "./AddNote";
import Note from "./Note";

// this will be holding our addNotes function and then show all components
function NotesContainer(props) {
  // we are getting the context
  let context = useContext(noteContext);
  let { notes, getNotes } = context;
  let [show, setShow] = React.useState(false);

  function toggle() {
    setShow((prevShow) => {
      return !prevShow;
    });
  }

  // and from the context values that were being passed we are getting notes array and add note function

  useEffect(() => {

    getNotes();
  }, []);

  // just displaying it
  let notesArrayToBeDispalyed = notes.map((note) => {
    return (
      <Note
        key={note._id}
        title={note.title}
        description={note.description}
        tag={note.tag}
        _id={note._id}
        showAlert = {props.showAlert}
      />
    );
  });
  return (
    <div className="row">
      <div className="col-md-1"
    
        onClick={() => {
          toggle();
        }}

        style={{marginTop : "70px", borderRight:"2px solid black"}}
      >
        <span className="plusIcon" >
          <i className="fa-solid fa-plus"></i>
        </span>
      </div>
      {show && <AddNote showAlert = {props.showAlert}/>}

      <div className="container my-5 col-md-10" >
        <h2>
          <span style={{ borderBottom: "2px solid rgba(25, 135, 84, 1)" }}>
            Your notes
          </span>
        </h2>
        {notesArrayToBeDispalyed.length ==0 ? 
        <h4>No Notes</h4> : 
        <div className="row my-5">{notesArrayToBeDispalyed}</div>
      }
      </div>
    </div>
  );
}

export default NotesContainer;
