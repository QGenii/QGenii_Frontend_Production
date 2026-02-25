import React from "react";
import { FaStar } from "react-icons/fa";

const BeneficialCourseCard = ({
  title = "Learn C++",
  level = "Beginner",
  description = "Learn the basics of C++ programming language with practice oriented course. You will get to write code in our online editor.",
  learners = "230.5K",
  lessons = 25,
  rating = 4.0,
  reviews = 5000,
  onLearn = () => {}
}) => (
  <div className="card shadow-sm mb-3" style={{ borderRadius: "16px", background: "#fff", padding: "18px", maxWidth: 340 }}>
    <div className="d-flex justify-content-between align-items-center mb-2">
      <span style={{ fontWeight: 600, color: "#222", fontSize: "1.08rem" }}>
        <span style={{ marginRight: 6, fontSize: "1.1rem" }}>➤</span> Beneficial
      </span>
      <button
        className="btn btn-outline-primary btn-sm"
        style={{ borderRadius: "8px", fontWeight: 500, fontSize: "0.95rem" }}
        onClick={onLearn}
      >
        Learn
      </button>
    </div>
    <div style={{ fontSize: "0.98rem", color: "#555", marginBottom: "12px" }}>
      We recommend you to complete this course before you jump into the practice C++, this will help you understand this even better
    </div>
    <div className="card" style={{ borderRadius: "12px", border: "2px solid #4285f4", padding: "16px", background: "#f8fbff" }}>
      <div className="d-flex align-items-center mb-2">
        <img
          src="https://cdn-icons-png.flaticon.com/512/6132/6132222.png"
          alt="C++"
          style={{
            width: 40,
            height: 40,
            borderRadius: "8px",
            background: "#fff",
            marginRight: "14px",
            padding: "4px"
          }}
        />
        <span className="badge bg-primary" style={{ fontSize: "0.95rem", fontWeight: 500 }}>{level}</span>
      </div>
      <h5 style={{ fontWeight: 700, color: "#174ea6", marginBottom: "6px" }}>{title}</h5>
      <div style={{ fontSize: "0.98rem", color: "#555", marginBottom: "8px" }}>{description}</div>
      <div className="d-flex align-items-center mb-2" style={{ fontSize: "1rem", color: "#222" }}>
        <span>
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              color={i < Math.round(rating) ? "#fbc02d" : "#e0e0e0"}
              style={{ marginRight: 2, fontSize: "1.1rem" }}
            />
          ))}
        </span>
        <span style={{ marginLeft: 8, fontWeight: 600 }}>{rating}</span>
        <span style={{ marginLeft: 6, color: "#888" }}>({reviews})</span>
      </div>
      <div style={{ fontSize: "0.98rem", color: "#555" }}>
        <span style={{ fontWeight: 600 }}>{learners} Learners</span> &nbsp;•&nbsp; <span style={{ fontWeight: 600 }}>{lessons} Lessons</span>
      </div>
    </div>
  </div>
);

export default BeneficialCourseCard;