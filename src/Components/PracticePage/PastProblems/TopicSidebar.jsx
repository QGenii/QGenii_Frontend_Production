import React, { useState } from "react";
import AllTagsModal from "./AllTagsModal";

const TopicsSidebar = () => {
  const [showAllTags, setShowAllTags] = useState(false);

  return (
    <div
      style={{
        background: "transparent",
        borderRadius: 12,
        padding: 0,
        minWidth: 220,
        maxWidth: 320,
        width: 260,
        margin: "0 auto"
      }}
    >
      {/* Placeholder for avatar/box */}
      <div
        style={{
          width: "100%",
          height: 120,
          background: "#e0e0e0",
          borderRadius: 12,
          marginBottom: 18
        }}
      />
      {/* Topics Section */}
      <div
        style={{
          background: "#AFE8F3",
          borderRadius: 12,
          padding: "18px 18px 18px 18px",
          marginBottom: 14
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 8
          }}
        >
          <span style={{ fontWeight: 600, fontSize: 17 }}>Topics</span>
          <span
            style={{
              color: "#1976d2",
              fontWeight: 500,
              fontSize: 14,
              cursor: "pointer"
            }}
          >
            Clear
          </span>
        </div>
        <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 6 }}>
          Popular Topics
        </div>
        {[
          "Basic Programming Concepts",
          "Arrays",
          "Strings",
          "Basic Math",
          "Sorting",
          "Binary Search",
          "Data Structures",
          "Greedy",
          "Dynamic Programming",
          "Graphs",
          "Segment Trees"
        ].map((topic) => (
          <div
            key={topic}
            style={{
              color: "#23406e",
              fontWeight: 500,
              fontSize: 15,
              marginBottom: 10
            }}
          >
            {topic}
          </div>
        ))}
      </div>
      {/* Tags Section */}
      <div
        style={{
          background: "#fff",
          borderRadius: 12,
          padding: "18px 18px 18px 18px",
          marginBottom: 0
        }}
      >
        <div style={{ fontWeight: 600, fontSize: 15, margin: "0 0 12px 0" }}>
          Tags
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            { label: "Algorithms", count: 3721 },
            { label: "Mathematics", count: 3721 },
            { label: "Basic Math", count: 3721 },
            { label: "Data Structures", count: 3721 },
            { label: "Constructive", count: 3721 },
            { label: "Basic Programming Concepts", count: 3721 },
            { label: "Ad-Hoc", count: 3721 }
          ].map((tag) => (
            <div
              key={tag.label}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: "#AFE8F3",
                borderRadius: 8,
                padding: "6px 12px",
                fontWeight: 500,
                fontSize: 15,
                cursor: "pointer"
              }}
            >
              <span>{tag.label}</span>
              <span
                style={{
                  background: "#133b77",
                  color: "#fff",
                  borderRadius: 6,
                  padding: "2px 10px",
                  fontSize: 13,
                  fontWeight: 500,
                  marginLeft: 12
                }}
              >
                {tag.count}
              </span>
            </div>
          ))}
        </div>
        <div
          style={{
            color: "#1976d2",
            fontWeight: 500,
            fontSize: 15,
            marginTop: 16,
            cursor: "pointer",
            display: "flex",
            alignItems: "center"
          }}
          onClick={() => setShowAllTags(true)}
        >
          Show All Tags{" "}
          <svg
            width="16"
            height="16"
            fill="#1976d2"
            style={{ marginLeft: 4, verticalAlign: "middle" }}
            viewBox="0 0 24 24"
          >
            <path d="M10 17l5-5-5-5v10z" />
          </svg>
        </div>
        <AllTagsModal open={showAllTags} onClose={() => setShowAllTags(false)} />
      </div>
    </div>
  );
};

export default TopicsSidebar;