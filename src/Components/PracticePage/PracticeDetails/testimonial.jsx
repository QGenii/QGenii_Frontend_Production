import React from "react";

const testimonials = [
  {
    username: "Username",
    country: "🇮🇳",
    text:
      "It was a very nice experience for me, as it was my first time doing something like that. Today, I just started learning C++, and I am thankful that I was able to solve this much on my first day. I am literally very happy. Thanks for this."
  },
  {
    username: "Username",
    country: "🇮🇳",
    text:
      "It was a very nice experience for me, as it was my first time doing something like that. Today, I just started learning C++, and I am thankful that I was able to solve this much on my first day. I am literally very happy. Thanks for this."
  },
  {
    username: "Username",
    country: "🇮🇳",
    text:
      "It was a very nice experience for me, as it was my first time doing something like that. Today, I just started learning C++, and I am thankful that I was able to solve this much on my first day. I am literally very happy. Thanks for this."
  }
];

const LearnerTestimonials = () => (
  <div
    style={{
      border: "3px solid #2196f3",
      borderRadius: "10px",
      padding: "18px 18px 24px 18px",
      background: "#fff",
      marginTop: "32px"
    }}
  >
    <div style={{ fontWeight: 600, fontSize: "1.15rem", marginBottom: "10px" }}>
      What our learners are saying
    </div>
    <div className="row" style={{ margin: 0 }}>
      {testimonials.map((t, idx) => (
        <div className="col-md-4" key={idx} style={{ padding: "0 12px" }}>
          <div
            className="card"
            style={{
              borderRadius: "8px",
              background: "#f8f9fb",
              border: "none",
              boxShadow: "0 2px 8px rgba(33,150,243,0.07)",
              minHeight: "170px"
            }}
          >
            <div className="card-body">
              <div style={{ fontSize: "2rem", color: "#2196f3", marginBottom: "6px" }}>
                &quot;
              </div>
              <div style={{ fontSize: "0.98rem", fontWeight: 500, marginBottom: "4px" }}>
                <span role="img" aria-label="user" style={{ marginRight: 4 }}>👤</span>
                {t.username} <span style={{ fontSize: "1.1rem", marginLeft: 4 }}>{t.country}</span>
              </div>
              <div style={{ fontSize: "0.98rem", color: "#222" }}>
                {t.text}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default LearnerTestimonials;