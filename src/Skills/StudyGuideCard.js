import React from "react";

const StudyGuideCard = ({ image, title, description, content }) => (
  <div
    style={{
      background: "#fff",
      borderRadius: 12,
      boxShadow: "0 2px 12px rgba(20,59,110,0.10)",
      padding: 0,
      width: 260,
      minHeight: 280,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      margin: "0 auto 18px auto",
      border: "1.5px solid #e0e7ef",
    }}
  >
    <div
      style={{
        width: "100%",
        height: 140,
        background: "#f6f8fc",
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <img
        src={image}
        alt={title}
        style={{
          maxWidth: "100%",
          maxHeight: "100%",
          objectFit: "contain",
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
        }}
      />
    </div>
    <div style={{ padding: "16px 16px 10px 16px", width: "100%" }}>
      <div
        style={{
          fontWeight: 600,
          fontSize: 17,
          marginBottom: 4,
          minHeight: 38,
        }}
      >
        {title}
      </div>
      <div
        style={{
          color: "#222",
          fontWeight: 400,
          fontSize: 14,
          marginBottom: 4,
        }}
      >
        {description}
      </div>
      <div
        style={{
          color: "#777",
          fontWeight: 400,
          fontSize: 13,
          marginTop: 6,
          lineHeight: 1.5,
        }}
      >
        {content}
      </div>
    </div>
  </div>
);

export default StudyGuideCard;