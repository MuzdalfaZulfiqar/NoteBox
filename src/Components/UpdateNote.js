import React ,{useContext} from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import noteContext from "../Contexts/notes/noteContext";

function UpdateNote(props) {
  console.log(props)

  let context = useContext(noteContext);

  // and from the context values that were being passed we are getting notes array and add note function
  let {editNote } = context;
  const [show, setShow] = React.useState(true);

  const handleClose = () => setShow(false);
  
  const [formData, setFromData] = React.useState({
    title: props.note.title,
    description: props.note.description,
    tag: props.note.tag,
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

  function handleSubmit() {
    // title, description, tag, id
    console.log(formData);
    editNote(formData.title, formData.description, formData.tag,props.note._id)
    console.log(props)
    props.note.showAlert("Updated Successfully", "success")
  }

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow} className="d-none">
        Launch demo modal
      </Button> */}
    {/* {console.log("here")} */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={handleSubmit}>
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
          />
        </div>
      </form>
          {/* {console.log(props)}
          <p>{props.note.title}</p> */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
          style={{backgroundColor : "rgb(247, 202, 201)",border:"1px solid rgb(247, 202, 201)", color:"black"}}
          onClick={()=>{
            handleSubmit()
            handleClose()
            
          }}
          
          disabled={formData.title.length<3 || formData.description.length <5}
          
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateNote;
