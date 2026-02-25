import React from "react";

const CertificateCard = () => (
  <div
    className="card shadow-sm"
    style={{
      borderRadius: "28px",
      background: "#fff",
      padding: "32px 32px 24px 32px",
      maxWidth: 420,
      margin: "0 auto",
      boxShadow: "0 2px 12px rgba(33,150,243,0.08)"
    }}
  >
    <div
      style={{
        border: "6px solid #0d2c6b",
        borderRadius: "16px",
        padding: "32px 0 24px 0",
        textAlign: "center",
        marginBottom: "24px"
      }}
    >
      <img
        src="/solar_cup-star-bold (1).png"
        alt="Certificate"
        style={{
          width: 64,
          height: 64,
          marginBottom: "18px"
        }}
      />
      <div style={{ fontWeight: 700, fontSize: "1.35rem", marginBottom: "16px" }}>
        Certificate Of Completion
      </div>
      <div
        style={{
          height: "12px",
          width: "60%",
          background: "#e3eafc",
          borderRadius: "8px",
          margin: "0 auto 10px auto"
        }}
      ></div>
      <div
        style={{
          height: "12px",
          width: "60%",
          background: "#e3eafc",
          borderRadius: "8px",
          margin: "0 auto"
        }}
      ></div>
    </div>
    <div style={{ fontWeight: 600, fontSize: "1.15rem", marginBottom: "8px" }}>
      Certification available
    </div>
    <div style={{ color: "#222", fontSize: "1rem" }}>
      On Completing workshop you will get certificate only if you attend live till last.
    </div>
  </div>
);

export default CertificateCard;