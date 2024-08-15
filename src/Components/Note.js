import React, { useContext } from "react";
import noteContext from "../Contexts/notes/noteContext";
import UpdateNote from "./UpdateNote";

function random() {
  
  let colorArray = ["#DFCFBE", "#EFC050","#45B8AC","#D65076","#F7CAC9","#88B04B","#c6e2ff","#ffc13b","#c6d7eb","#e0a96d","#e1dd72", "#a8c66c",
    "#e3b448", "#cbd18f","#f5beb4", "#9bc472","#cbf6db"
  ]
  let random =Math.floor( Math.random() * colorArray.length)
  let color = colorArray[random]
  return color;

}

function Note(props) {

  
  // we are getting the context
  let context = useContext(noteContext);

  // and from the context values that were being passed we are getting notes array and add note function
  let { deleteNote} = context;
  let [show, setShow] = React.useState(false);
  let color = random()
  // {console.log(color)}
  return (
    <div className="note col-md-3"
    
    style={{backgroundColor :color}}
    >
      {/* {console.log("Inside the note components")} */}
      <h5>
        <span style={{ borderBottom: "2px solid rgba(25, 135, 84, 1)" }}>
          Title
        </span>{" "}
      </h5>
      <p>{props.title}</p>
      <h5>
        <span style={{ borderBottom: "2px solid rgba(25, 135, 84, 1)" }}>
          Description
        </span>{" "}
      </h5>
      <p>{props.description}</p>
      <h5>
        <span style={{ borderBottom: "2px solid rgba(25, 135, 84, 1)" }}>
          Tags
        </span>{" "}
      </h5>
      <p>{props.tag}</p>
      <button
        className="btn"
        onClick={() => {
          console.log(props._id);
          deleteNote(props._id);
          props.showAlert("Deletion Successfully", "success")
        }}
      >
        <i
          className="fa fa-trash"
          aria-hidden="true"
          style={{ color: "black" }}
        ></i>
      </button>

      <button
        className="btn"
        onClick={() => {
          setShow(true);
        }}
      >
        <i
          className="fas fa-edit"
          style={{ color: "black" }}
        ></i>
      </button>
      {show && <UpdateNote note={props} />}
    </div>
  );
}

export default Note;
