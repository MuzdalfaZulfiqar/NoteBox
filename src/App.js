import "./App.css";
import React from "react";
import Home from "./Components/Home";
import NavBar from "./Components/NavBar";
import { Route, Routes } from "react-router-dom";
import NoteState from "./Contexts/notes/NotesState";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import Alert from "./Components/Alert";
import "bootstrap/dist/css/bootstrap.min.css";
import Todo from "./Components/Todo";

function App() {
  let [alert, setAlert] = React.useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 2500);
  };
  return (
    <NoteState>
      {/* NoteState is the wrapper which is wrapping the components */}
      <NavBar />
      <Alert alert={alert} />
      <div className="container" >
        <Routes>
          {/* <Route path="/" element={<LandingPage />} /> */}
          <Route path="/" element={<Home showAlert={showAlert} />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/login" element={<Login showAlert={showAlert} />} />
          <Route path="/signUp" element={<SignUp showAlert={showAlert} />} />
        </Routes>

        
      </div>
   
    </NoteState>
  );
}

export default App;
