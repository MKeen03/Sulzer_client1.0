import React from "react";
import "../components/modal.css";
import { useNavigate } from "react-router-dom";

function Thanks(closeModal, handleSubmit) {
  const navigate = useNavigate();

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <button className="titleCloseBtn" onClick={() => navigate("/form")}>
          X
        </button>
        <div className="title">
          <h1> Thank You! Your form has been submitted!</h1>
        </div>
        <div className="body"></div>
        <div className="footer">
          <button
            id="submission"
            variant="contained"
            type="submit"
            onClick={() => {
              navigate("/form");
            }}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default Thanks;
