import React from "react";
import Button from "react-bootstrap/Button";

function LandingPage({ startApp }) {
  return (
    <div
      className="d-flex align-items-center flex-row"
      style={{
        width: "100vw",
        height: "100vh",
        boxSizing: "border-box",
        margin: "0px",
        padding: "0px",
      }}
    >
      <img src="/notesLogo.png" className="imgset" alt="Notes Logo"></img>
      <div
        className="container d-flex flex-column my-4 align-items-center"
        style={{ gap: "6px", borderLeft: "2px solid black" }}
      >
        {/* this div is being added to use custome text animation */}
        <div className="logo-container">
          <h1 id="page-logo">NoteBox</h1>
        </div>
        <h3 style={{ fontSize: "40px" }}>Note it. Do it.</h3>
        <Button className="loginSubmit btn" onClick={startApp}>
          Start Now
        </Button>
      </div>
    </div>
  );
}

export default LandingPage;
