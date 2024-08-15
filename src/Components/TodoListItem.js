import React, { useEffect, useState, useContext } from "react";
import TodoContext from "../Contexts/TODO/TodoContext";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function random() {
  const colorArray = [
    "#DFCFBE",
    "#EFC050",
    "#45B8AC",
    "#D65076",
    "#F7CAC9",
    "#88B04B",
    "#c6e2ff",
    "#ffc13b",
    "#c6d7eb",
    "#e0a96d",
    "#e1dd72",
    "#a8c66c",
    "#e3b448",
    "#cbd18f",
    "#f5beb4",
    "#9bc472",
    "#cbf6db",
  ];
  const randomIndex = Math.floor(Math.random() * colorArray.length);
  return colorArray[randomIndex];
}

function TodoListItem(props) {
  // this is a state to manage the color of the notes becuase it was rendering for infinite times so we used 
  // useEffect with [] which made it to render only once after the 
  const [color, setColor] = useState("");
  useEffect(() => {
    setColor(random());
  }, []);


  // this state is being here to manage whether the modal shows up or not it is linked to edit button
  // we click on edit icon and the setShow(true) is beig called the function rerenders and shows the modal
  // the modal has property of show = {show} on base of which it is deciding that it will show or not 
  let [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);

  // we are getting our todo context from which we need delete and update functions and we are calling them
  // accordingly
  let Context = useContext(TodoContext);
  let { deleteTodo, updateTodo } = Context;

  // this form data is being here for edit function it handlees both the description and the isCompleted means 
  // the checkbox changes(default set to true)
  const [formData, setFromData] = React.useState({
    description: props.description,
    isCompleted: false,
  });

  // it takes the new values means on the event they are being called then make a new object before retruning
  // it is calling the update function with new updated data and after that retruning newState
  function handleChange(event) {
    let { name, value, type, checked } = event.target;
    // since the set functions takes the prev and return the new valyue means we can store the new value
    // use it to call our update function and then return it
    setFromData((prevForm) => {
      let updatedForm = {
        ...prevForm,
        [name]: type === "checkbox" ? checked : value,
      };
      updateTodo(updatedForm.description, updatedForm.isCompleted, props.id);
      return updatedForm
      
    });
  }

  function handleSubmit() {
    updateTodo(formData.description, formData.isCompleted, props.id);
  }

 
  return (
    <div
      className="container my-2 d-flex align-items-center justify-content-between"
      style={{ backgroundColor: color, borderRadius: "20px" }}
    >
      {/* we do not need the onClick becuase right now have the check box and we deal its state wit onChange
      now we have our item with its checked state being handled uisng the checked state when user changes it
      the change functuin is called which will toggle the value at start it is false now it if someone clicks
      it is true and hence after the whole todolist item runs we have used useEffect to run at last and make the
      chnaged in backend
      */}
      <div className="checkbox-container">
        <input
          type="checkbox"
          id={`checkbox-${props.id}`}
          // check that if it is marked true in database if true then hard code as true else take the new value
          // that is formData.isCompleted 
          // we are doing this because otherwise the checkbox was not marking true since props is the data
          // being coming from some other function which also got it from db so we also need to check that
          // so if db has updated value mark th value as that
          checked={props.checked ? true : formData.isCompleted}
          onChange={handleChange}
          name="isCompleted"
        />
        <label
          htmlFor={`checkbox-${props.id}`}
          className="custom-checkbox"
        ></label>
        <span
          className={`checkbox-text ${
            // in this case we are checking two conditions that whether the line should be cut or not
            // props.checked is entered becasuse it will be to cut the line based on the data read from
            // db means if someone has already marked it true when this item will be read again from db
            // check if it was true then cut and the second condition is there maybe currenlty we marked a
            // true and  that true will also place a cut 
            props.checked || formData.isCompleted ? "cut" : ""
          }`}
        >
          {props.description}
        </span>
      </div>

      {/* edit and delete button */}
      <div>
        <button
          className="btn"
          onClick={() => {
            console.log(props.id);
            deleteTodo(props.id);
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
            console.log("before calling update todo " + props.id);
            // updateTodo(formData.description, formData.checked, props.id)
          }}
        >
          <i className="fas fa-edit" style={{ color: "black" }}></i>
        </button>
        {/* {show && (
          <UpdateListItem
            id={props.id}
            checked={formData.checked}
            description={props.description}
          />
        )} */}
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update TODO</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
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
          </form>
          {/* {console.log(props)}
          <p>{props.note.title}</p> */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            style={{
              backgroundColor: "rgb(247, 202, 201)",
              border: "1px solid rgb(247, 202, 201)",
              color: "black",
            }}
            onClick={() => {
              handleSubmit();
              handleClose();
            }}
            // if both false only then mark as false if any is true means if len < 5 or if there is no des
            // it will be true
            disabled={!formData.description || formData.description.length < 5}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default TodoListItem;
