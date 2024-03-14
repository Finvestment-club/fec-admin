import React from "react";

const image = ({ imageUrl, onClose }) => {
  return (
    <div className="resume-modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <img src={imageUrl} alt="image" />
      </div>
    </div>
  );
};

export default image;