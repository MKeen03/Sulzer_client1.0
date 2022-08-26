import React from "react";
import "./modal.css";

function Modal({ closeModal, handleSubmit, stars, projectName, typeOfBid, quotationSelection, files }) {
  const filesArr = Array.from(files);

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <button className="titleCloseBtn button" onClick={() => closeModal(false)}>
          X
        </button>
        <div className="title">
          <h1> Are You Sure You Are Ready To Submit?</h1>
        </div>
        <div className="body">
          <span className="modalBold">Stars#</span>
          <span className="modalSelection">
            <i> {stars}</i>
          </span>
          <span className="modalBold">Project Name</span>{" "}
          <span className="modalSelection">
            <i>{projectName}</i>
          </span>
          <span className="modalBold">Type Of Bid</span>{" "}
          <span className="modalSelection">
            <i>{typeOfBid}</i>
          </span>
          <span className="modalBold">Quote Selection</span>
          <span className="modalSelection">
            {" "}
            <i>{quotationSelection}</i>
          </span>
          <span className="modalBold">Files</span>
          <span>
            {filesArr.map((file) => {
              return (
                <div className="modalSelection" key={file.name}>
                  <i>{file.name}</i>
                </div>
              );
            })}
          </span>
        </div>
        <div className="footer">
          <button onClick={() => closeModal(false)}>Cancel</button>
          <button
            id="submission"
            variant="contained"
            type="submit"
            onClick={() => {
              handleSubmit();
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
