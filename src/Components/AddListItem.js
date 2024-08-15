import React from "react";
import { useContext } from 'react'
import TodoContext from '../Contexts/TODO/TodoContext'

function AddListItem() {
  // getting the context
    let Context = useContext(TodoContext)
    let {addTodo} = Context
    // add item list has description and a checked state 
  let [formData, setFormData] = React.useState(
    {
        description : "",
        checked : false
    }
    
  );

  // gandling the change 
  function handleChange(event) {
    let { name, value } = event.target;
    setFormData((prevForm) => {
      return {
        ...prevForm,
        [name]: value,
      };
    });
  }

  function handleSubmit(event){
    console.log("in form " + formData.checked)
    event.preventDefault()
    addTodo(formData.description, formData.checked)
  }
  return (
    <div className="col-md-9" style={{ marginTop: "50px" }}>
      <h2>
        <span style={{ borderBottom: "2px solid rgba(25, 135, 84, 1)" }}>
          Add a todo
        </span>
      </h2>
      <form onSubmit={handleSubmit}
       >
        {console.log("In add note")}
        <div className="form-group my-4">
          <label htmlFor="desc">Description</label>
          <input
            type="text"
            className="form-control"
            id="desc"
            aria-describedby="descHelp"
            placeholder="Enter description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            minLength={3}
          />
        </div>

        <button
          type="submit"
          className="btn my-4"
          //   onClick={handleAddNoteClick}
          style={{ backgroundColor: "rgb(247, 202, 201)" }}
          disabled={formData.description.length < 5}
        >
          Add todo
        </button>
      </form>
    </div>
  );
}

export default AddListItem;
