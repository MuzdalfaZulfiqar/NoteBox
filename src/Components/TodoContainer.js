import React, { useEffect } from "react";
import { useContext } from "react";
import TodoContext from "../Contexts/TODO/TodoContext";
import TodoListItem from "./TodoListItem";
import AddListItem from "./AddListItem";

function TodoContainer() {
  let Context = useContext(TodoContext);
  let { todo, getToDO } = Context;
  let [show, setShow] = React.useState(false);

  function toggle() {
    setShow((prevShow) => {
      return !prevShow;
    });
  }

  useEffect(() => {
    getToDO();
  }, []);

  let List = todo.map((item) => {

    return (
      <TodoListItem
        key={item._id}
        id={item._id}
        checked={item.checked}
        description={item.description}
      />
    );
  });

  return (
    <>
      <div className="row">
        {/* column for plus icon  */}
        <div
          className="col-md-1"
          onClick={() => {
            toggle();
          }}
          style={{ marginTop: "70px", borderRight: "2px solid black" }}
        >
          <span className="plusIcon"><i className="fa-solid fa-plus"></i></span>
        </div>
        {show && <AddListItem />}

        <div className="container my-5 col-md-10">
          {List.length == 0 ? 
          (
            <h5>"WOOHHOOOOO there is nothing to do 😆🙌👍🎉"</h5>
          ) : 
          (
            <div>
              <h4>TODO</h4>
              <small>If you face any issue just hit the reload </small>
              {List}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default TodoContainer;
