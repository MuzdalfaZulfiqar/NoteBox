import React, { useEffect, useState, useContext } from "react";
import TodoContext from "../Contexts/TODO/TodoContext";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function UpdateListItem(props) {
    // console.log(elementsProp)
  let Context = useContext(TodoContext);
  let { updateTodo } = Context;
  const [show, setShow] = React.useState(true);

  const handleClose = () => setShow(false);

  const [formData, setFromData] = React.useState({
    description: props.description,
    checked : props.checked
  });

  function handleChange(event) {
    let { name, value ,type, checked} = event.target;
    setFromData((prevForm) => {
      return {
        ...prevForm,
        [name]: type === "checkbox" ? checked : value
      };
    });
  }
  function handleSubmit() {
    // title, description, tag, id
    // console.log(formData.checked);
    updateTodo(formData.description, props.checked, props.id);
    // console.log(props)
    // props.note.showAlert("Updated Successfully", "success")
  }

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow} className="d-none">
        Launch demo modal
      </Button> */}
      {/* {console.log("here")} */}

      
    </>
  );
}

export default UpdateListItem;
