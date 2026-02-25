import React from "react";
import "./StudyGuideCard.css";

const StudyGuideCard = ({ image, title, description, content }) => (
  <div className="study-guide-card">
    <div className="study-guide-image">
      <img src={image} alt={title} />
    </div>
    <div className="study-guide-content">
      <h4 className="study-guide-title">{title}</h4>
      <p className="study-guide-description">{description}</p>
      {content && <div className="study-guide-extra">{content}</div>}
    </div>
  </div>
);

export default StudyGuideCard;
