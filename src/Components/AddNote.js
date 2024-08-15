import React, { useContext, useState } from "react";
import noteContext from "../Contexts/notes/noteContext";

function AddNote(props) {
  // we are getting the context
  let context = useContext(noteContext);
  let [show,setShow] = useState(true)
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // and from the context values that were being passed we are getting notes array and add note function
  let { addNote } = context;

  const [formData, setFromData] = React.useState({
    title: "",
    description: "",
    tag: "",
  });

  function handleChange(event) {
    let { name, value } = event.target;
    setFromData((prevForm) => {
      return {
        ...prevForm,
        [name]: value,
      };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(formData);

  }
  
  //
  function handleAddNoteClick() {
    // we are passing it the data we got from the user
    addNote(formData.title, formData.description, formData.tag);
    props.showAlert("Added Successfully", "success")
    // 
    // setShow(false)
    // setting the form fields back to empty 
    setFromData({
      title: "",
      description: "",
      tag: "",
    })
  }

  return (
    <div className="col-md-9"
    style={{marginTop:"50px"}}
    >
      <h2>
        <span style={{ borderBottom: "2px solid rgba(25, 135, 84, 1)" }}>Add a note</span>
      </h2>
      <form onSubmit={handleSubmit}
      
      show={show} onHide={handleClose}
      >
        {console.log("In add note")}
        <div className="form-group my-4">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            aria-describedby="titleHelp"
            placeholder="Enter title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            minLength={3}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            type="textarea"
            className="form-control"
            id="description"
            placeholder="Enter description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            minLength={5}
          />
        </div>
        <div className="form-group">
          <label htmlFor="tags">Tags</label>
          <input
            type="text"
            className="form-control"
            id="tags"
            placeholder="Enter tags"
            name="tag"
            value={formData.tag}
            onChange={handleChange}
            minLength={3}
          />
        </div>

        <button
          type="submit"
          className="btn my-4"
          onClick={handleAddNoteClick}
          style={{backgroundColor : "rgb(247, 202, 201)"}}
          disabled={formData.title.length<3 || formData.description.length <5}>
          Add note
        </button>
      </form>
    </div>
  );
}

export default AddNote;
