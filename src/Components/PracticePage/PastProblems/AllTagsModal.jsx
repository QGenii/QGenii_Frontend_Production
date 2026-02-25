import React, { useState } from "react";

// Tag data grouped by category
const TAGS = {
  "Algorithms": [
    { label: "Greedy", count: 3721 },
    { label: "Dynamic Programming", count: 245 },
    { label: "Divide And Conquer", count: 589 },
    { label: "Back Tracking", count: 2345 }
  ],
  "Data Structures": [
    { label: "Linked List", count: 3721 },
    { label: "Tree", count: 3721 },
    { label: "Stack", count: 3721 },
    { label: "Queue", count: 3721 }
  ],
  "Math": [
    { label: "Number Theory", count: 3721 },
    { label: "Combinatorics", count: 3721 },
    { label: "Probability", count: 3721 }
  ]
};

const AVATAR_URL = "https://randomuser.me/api/portraits/men/32.jpg";

const AllTagsModal = ({ open, onClose }) => {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([
    "Dynamic Programming",
    "Stack",
    "Number Theory",
    "Number Theory",
    "Number Theory",
    "Number Theory"
  ]);

  // Filter tags by search
  const filterTags = (tags) =>
    tags.filter((tag) =>
      tag.label.toLowerCase().includes(search.toLowerCase())
    );

  // Handle tag selection
  const handleCheck = (tagLabel) => {
    setSelected((prev) =>
      prev.includes(tagLabel)
        ? prev.filter((t) => t !== tagLabel)
        : [...prev, tagLabel]
    );
  };

  // Clear all selected tags
  const clearAll = () => setSelected([]);

  if (!open) return null;

  return (
    <div style={{
      position: "fixed",
      top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(0,0,0,0.08)",
      zIndex: 1000,
      overflowY: "auto"
    }}>
      <div style={{
        background: "#F8FAFF",
        borderRadius: 12,
        margin: "32px auto",
        maxWidth: 1100,
        minHeight: 600,
        padding: 32,
        boxShadow: "0 2px 16px rgba(33, 150, 243, 0.13)"
      }}>
        {/* Search */}
        <div style={{ marginBottom: 18, position: "relative" }}>
          <input
            type="text"
            placeholder="Search Tags"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: 420,
              padding: "18px 18px 18px 54px",
              borderRadius: 8,
              border: "1.5px solid #b7c6d9",
              fontSize: 20,
              background: "#fff",
              outline: "none",
              fontWeight: 400,
              boxShadow: "none"
            }}
          />
          <svg
            width="32"
            height="32"
            fill="#133b77"
            style={{ position: "absolute", left: 14, top: 12 }}
            viewBox="0 0 24 24"
          >
            <path d="M9.5 3A6.5 6.5 0 1 1 3 9.5 6.5 6.5 0 0 1 9.5 3m0-2A8.5 8.5 0 1 0 18 9.5 8.5 8.5 0 0 0 9.5 1zm13.71 20.29-5.4-5.39A9.48 9.48 0 0 0 19 9.5a9.5 9.5 0 1 0-9.5 9.5 9.48 9.48 0 0 0 6.4-2.19l5.39 5.4a1 1 0 0 0 1.42-1.42z"/>
          </svg>
        </div>
        {/* Selected Tags */}
        <div style={{
          border: "1.5px solid #AFE8F3",
          borderRadius: 8,
          background: "#fff",
          padding: "18px 18px 12px 18px",
          marginBottom: 24
        }}>
          <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 10 }}>Selected Tags</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {selected.length === 0 ? (
              <span style={{ color: "#888", fontSize: 16 }}>None</span>
            ) : (
              selected.map((tag, idx) => (
                <span key={tag + idx} style={{
                  background: "#AFE8F3",
                  color: "#133b77",
                  borderRadius: 6,
                  padding: "7px 14px 7px 14px",
                  fontSize: 16,
                  fontWeight: 500,
                  display: "flex",
                  alignItems: "center",
                  marginBottom: 6,
                  border: "1px solid #b7c6d9"
                }}>
                  {tag}
                  <span style={{
                    background: "#133b77",
                    color: "#fff",
                    borderRadius: 6,
                    padding: "2px 10px",
                    fontSize: 13,
                    fontWeight: 500,
                    marginLeft: 10
                  }}>3721</span>
                  <svg
                    onClick={() => handleCheck(tag)}
                    width="18"
                    height="18"
                    fill="#133b77"
                    style={{ marginLeft: 8, cursor: "pointer" }}
                    viewBox="0 0 24 24"
                  >
                    <path d="M18.3 5.71a1 1 0 0 0-1.41 0L12 10.59 7.11 5.7A1 1 0 0 0 5.7 7.11l4.89 4.89-4.89 4.89a1 1 0 1 0 1.41 1.41L12 13.41l4.89 4.89a1 1 0 0 0 1.41-1.41l-4.89-4.89 4.89-4.89a1 1 0 0 0 0-1.41z"/>
                  </svg>
                </span>
              ))
            )}
          </div>
        </div>
        {/* All Tags Header */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 18
        }}>
          <span style={{ fontWeight: 700, fontSize: 22, textDecoration: "underline" }}>All Tags</span>
          <button
            onClick={clearAll}
            style={{
              background: "#fff",
              color: "#1976d2",
              border: "1.5px solid #b7c6d9",
              borderRadius: 8,
              fontWeight: 600,
              fontSize: 16,
              padding: "8px 22px",
              cursor: "pointer"
            }}
          >
            Clear All
          </button>
        </div>
        {/* Tags Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "32px 24px",
          marginBottom: 32
        }}>
          {Object.entries(TAGS).map(([category, tags], catIdx) => (
            <div key={category} style={{}}>
              <div style={{
                fontWeight: 700,
                fontSize: 18,
                marginBottom: 12,
                marginTop: catIdx !== 0 ? 18 : 0
              }}>{category}</div>
              {filterTags(tags).map((tag, idx) => (
                <label key={tag.label} style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  fontSize: 16,
                  fontWeight: 500,
                  marginBottom: 12,
                  background: "#fff",
                  borderRadius: 6,
                  padding: "2px 0 2px 0"
                }}>
                  <input
                    type="checkbox"
                    checked={selected.includes(tag.label)}
                    onChange={() => handleCheck(tag.label)}
                    style={{
                      width: 18,
                      height: 18,
                      accentColor: "#133b77",
                      marginRight: 6
                    }}
                  />
                  <span>{tag.label}</span>
                  <span style={{
                    background: "#133b77",
                    color: "#fff",
                    borderRadius: 6,
                    padding: "2px 10px",
                    fontSize: 13,
                    fontWeight: 500,
                    marginLeft: 6
                  }}>{tag.count}</span>
                  {/* Avatar for demo, as in your screenshot */}
                  {(category === "Algorithms" && tag.label === "Back Tracking" && idx === 3) ||
                  (category === "Data Structures" && tag.label === "Stack" && idx === 2) ||
                  (category === "Math" && tag.label === "Number Theory" && idx === 0) ? (
                    <img
                      src={AVATAR_URL}
                      alt="avatar"
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        border: "2px solid #1976d2",
                        marginLeft: 8,
                        boxShadow: "0 2px 8px #2224"
                      }}
                    />
                  ) : null}
                </label>
              ))}
            </div>
          ))}
        </div>
        {/* Buttons */}
        <div style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: 24
        }}>
          <button
            onClick={onClose}
            style={{
              background: "#133b77",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              fontWeight: 600,
              fontSize: 16,
              padding: "10px 20px",
              cursor: "pointer",
              transition: "background 0.3s"
            }}
          >
            Show Less
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllTagsModal;