import React, { useEffect } from "react";
import NotesContainer from "./NotesContainer";
import { useNavigate } from "react-router-dom";

function Home(props) {
  let navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      {localStorage.getItem("token") ? (
        <NotesContainer showAlert={props.showAlert} />
      ) : null}
    </div>
  );
}

export default Home;
