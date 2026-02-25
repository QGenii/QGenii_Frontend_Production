import React, { useState } from "react";

// Example filter options (expand as needed)
const filterOptions = [
  { label: "Video Solutions", key: "video" },
  { label: "Hints", key: "hints" },
  { label: "WA Test Cases", key: "wa" }
];

const ProblemsHeader = ({
  activeTab,
  setActiveTab,
  difficultyIdx,
  setDifficultyIdx,
  difficultyLevels,
  search,
  setSearch,
  showFilters,
  setShowFilters,
  filters,
  setFilters,
  sortField,
  sortOrder,
  onSort
}) => {
  return (
    <div style={{
      width: "100%",
      background: "transparent",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>
      {/* Search Bar */}
      <div style={{
        width: "98%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        margin: "24px 0 0 0",
        position: "relative"
      }}>
        <div style={{ flex: 1, position: "relative" }}>
          <input
            type="text"
            placeholder="Search problems here"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: "100%",
              padding: "16px 18px 16px 48px",
              borderRadius: 8,
              border: "1.5px solid #d1d9e6",
              fontSize: 17,
              background: "#fff",
              boxShadow: "0 2px 8px rgba(33, 150, 243, 0.08)",
              outline: "none"
            }}
          />
          <svg
            width="22"
            height="22"
            fill="#23406e"
            style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)" }}
            viewBox="0 0 24 24"
          >
            <path d="M9.5 3A6.5 6.5 0 1 1 3 9.5 6.5 6.5 0 0 1 9.5 3m0-2A8.5 8.5 0 1 0 18 9.5 8.5 8.5 0 0 0 9.5 1zm13.71 20.29-5.4-5.39A9.48 9.48 0 0 0 19 9.5a9.5 9.5 0 1 0-9.5 9.5 9.48 9.48 0 0 0 6.4-2.19l5.39 5.4a1 1 0 0 0 1.42-1.42z"/>
          </svg>
        </div>
        {/* Difficulty Dropdown */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginLeft: 24,
          minWidth: 260,
          justifyContent: "flex-end"
        }}>
          <span style={{ color: "#222", fontWeight: 500, fontSize: 15 }}>Difficulty:</span>
          <select
            value={difficultyIdx}
            onChange={e => setDifficultyIdx(Number(e.target.value))}
            style={{
              background: "#fff",
              color: "#133b77",
              borderRadius: 6,
              padding: "6px 12px",
              fontWeight: 500,
              fontSize: 14,
              border: "1px solid #d1d9e6",
              cursor: "pointer",
              minWidth: 180,
              outline: "none"
            }}
          >
            {difficultyLevels.map((d, idx) => (
              <option key={d.label} value={idx}>
                {d.label} : {d.level}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* Tabs and Filters */}
      <div style={{
        width: "98%",
        margin: "24px auto 0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}>
        {/* Tabs */}
        <div style={{
          display: "flex",
          background: "#f5f8fc",
          borderRadius: "8px 8px 0 0",
          overflow: "hidden",
          width: "60%"
        }}>
          <button
            style={{
              background: activeTab === "all" ? "#133b77" : "#f5f8fc",
              color: activeTab === "all" ? "#fff" : "#133b77",
              fontWeight: 600,
              fontSize: 15,
              border: "none",
              outline: "none",
              padding: "14px 0",
              width: "33.33%",
              cursor: "pointer",
              transition: "background 0.2s"
            }}
            onClick={() => setActiveTab("all")}
          >
            All
          </button>
          <button
            style={{
              background: activeTab === "unattempted" ? "#133b77" : "#f5f8fc",
              color: activeTab === "unattempted" ? "#fff" : "#133b77",
              fontWeight: 600,
              fontSize: 15,
              border: "none",
              outline: "none",
              padding: "14px 0",
              width: "33.33%",
              cursor: "pointer",
              transition: "background 0.2s"
            }}
            onClick={() => setActiveTab("unattempted")}
          >
            Unattempted
          </button>
          <button
            style={{
              background: activeTab === "attempted" ? "#133b77" : "#f5f8fc",
              color: activeTab === "attempted" ? "#fff" : "#133b77",
              fontWeight: 600,
              fontSize: 15,
              border: "none",
              outline: "none",
              padding: "14px 0",
              width: "33.33%",
              cursor: "pointer",
              transition: "background 0.2s"
            }}
            onClick={() => setActiveTab("attempted")}
          >
            Attempted
          </button>
        </div>
        {/* Sort and Filters */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {/* Sort Arrow (for demonstration, you can hook this up to your sort logic) */}
          <button
            style={{
              background: "#fff",
              border: "1px solid #d1d9e6",
              borderRadius: 6,
              padding: "6px 10px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center"
            }}
            onClick={onSort}
            title="Sort"
          >
            <svg width="18" height="18" fill="#133b77" viewBox="0 0 24 24">
              {sortOrder === "asc" ? (
                <path d="M7 14l5-5 5 5z" />
              ) : (
                <path d="M7 10l5 5 5-5z" />
              )}
            </svg>
          </button>
          {/* Filters Button */}
          <button
            style={{
              background: "#fff",
              color: "#133b77",
              border: "1px solid #d1d9e6",
              borderRadius: 6,
              fontWeight: 600,
              fontSize: 15,
              padding: "8px 18px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center"
            }}
            onClick={() => setShowFilters(v => !v)}
          >
            <svg width="20" height="20" fill="#133b77" style={{ marginRight: 6 }} viewBox="0 0 24 24">
              <path d="M3 5h18v2H3zm4 7h10v2H7zm2 7h6v2H9z" />
            </svg>
            Filters
          </button>
        </div>
      </div>
      {/* Filters Dropdown */}
      {showFilters && (
        <div style={{
          position: "absolute",
          right: 40,
          top: 120,
          background: "#fff",
          borderRadius: 12,
          boxShadow: "0 2px 16px rgba(33, 150, 243, 0.13)",
          padding: 24,
          minWidth: 220,
          zIndex: 20
        }}>
          <div style={{ fontWeight: 600, fontSize: 17, marginBottom: 16 }}>Problems With:</div>
          {filterOptions.map(opt => (
            <label key={opt.key} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <input
                type="checkbox"
                checked={filters[opt.key]}
                onChange={e => setFilters(f => ({ ...f, [opt.key]: e.target.checked }))}
              />
              <span style={{ fontSize: 15 }}>{opt.label}</span>
            </label>
          ))}
          <button
            style={{
              marginTop: 8,
              background: "none",
              border: "none",
              color: "#133b77",
              fontWeight: 600,
              fontSize: 15,
              cursor: "pointer",
              textDecoration: "underline"
            }}
            onClick={() => setShowFilters(false)}
          >
            Apply Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default ProblemsHeader;