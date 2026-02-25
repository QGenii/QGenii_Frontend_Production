import React, { useState, useMemo, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PracticeTabsNavbar from "./PracticeTabNavbar";
import TopicsSidebar from "./TopicSidebar";
import MainNavbar from "../../MainNavbar.jsx";
import ProblemsSidebar from "./ProblemsSidebar";

// Difficulty levels for dropdown
const difficultyLevels = [
  { label: "0-1000", level: "Beginner Level", min: 0, max: 1000 },
  { label: "1000-1200", level: "Beginner Level", min: 1000, max: 1200 },
  { label: "1200-1400", level: "Intermediate Level", min: 1200, max: 1400 },
  { label: "1400-1600", level: "Intermediate Level", min: 1400, max: 1600 },
  { label: "1600-1800", level: "Intermediate Level", min: 1600, max: 1800 },
  { label: "1800-2000", level: "Advanced Level", min: 1800, max: 2000 },
  { label: "2000-2200", level: "Advanced Level", min: 2000, max: 2200 },
  { label: "2200-2500", level: "Advanced Level", min: 2200, max: 2500 },
  { label: "2500-5000", level: "Advanced Level", min: 2500, max: 5000 },
  { label: "0-5000", level: "All levels", min: 0, max: 5000 }
];

// Dummy data for table
const allProblems = [
  { name: "Independence Day", code: "INNDAY", submissions: 34314, contest: "START 197", difficulty: 173 },
  { name: "Bowling Balls", code: "BOWLBALL", submissions: 31638, contest: "START 197", difficulty: 88 },
  { name: "Split", code: "SPLIT7", submissions: 3761, contest: "START 197", difficulty: 1813 },
  ...Array(8).fill({ name: "Expected Case", code: "EVCOST", submissions: 3761, contest: "START 197", difficulty: 1813 })
];

// Dropdown for filters
const FiltersDropdown = ({ open, anchorRef, filters, setFilters, onApply, onClose }) => {
  const dropdownRef = useRef();

  // Close dropdown on outside click
  useEffect(() => {
    if (!open) return;
    function handleClick(e) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        anchorRef.current &&
        !anchorRef.current.contains(e.target)
      ) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open, onClose, anchorRef]);

  if (!open) return null;
  return (
    <div
      ref={dropdownRef}
      style={{
        position: "absolute",
        top: "110%",
        right: 0,
        background: "#fff",
        borderRadius: 8,
        padding: "28px 24px 20px 24px",
        minWidth: 270,
        boxShadow: "0 2px 16px rgba(33, 150, 243, 0.13)",
        zIndex: 1000
      }}
    >
      <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 18 }}>
        Problems With:
      </div>
      <div style={{ fontSize: 18, marginBottom: 10 }}>
        <label style={{ display: "flex", alignItems: "center", marginBottom: 14 }}>
          <input
            type="checkbox"
            checked={filters.video}
            onChange={e => setFilters(f => ({ ...f, video: e.target.checked }))}
            style={{ width: 22, height: 22, marginRight: 12 }}
          />
          Video Solutions
        </label>
        <label style={{ display: "flex", alignItems: "center", marginBottom: 14 }}>
          <input
            type="checkbox"
            checked={filters.hints}
            onChange={e => setFilters(f => ({ ...f, hints: e.target.checked }))}
            style={{ width: 22, height: 22, marginRight: 12 }}
          />
          Hints
        </label>
        <label style={{ display: "flex", alignItems: "center", marginBottom: 14 }}>
          <input
            type="checkbox"
            checked={filters.wa}
            onChange={e => setFilters(f => ({ ...f, wa: e.target.checked }))}
            style={{ width: 22, height: 22, marginRight: 12 }}
          />
          WA Test Cases
        </label>
      </div>
      <div style={{ textAlign: "center" }}>
        <button
          onClick={onApply}
          style={{
            background: "none",
            border: "none",
            color: "#133b77",
            fontWeight: 700,
            fontSize: 20,
            cursor: "pointer",
            marginTop: 6
          }}
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

const PastProblemsPage = () => {
  const [difficultyIdx, setDifficultyIdx] = useState(0);
  const [sortField, setSortField] = useState("submissions");
  const [sortOrder, setSortOrder] = useState("desc");
  const [showDropdown, setShowDropdown] = useState(false);
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [filters, setFilters] = useState({ video: false, hints: false, wa: false });
  const filtersBtnRef = useRef();

  const navigate = useNavigate();

  // Filter, search, and sort problems
  const problems = useMemo(() => {
    const { min, max } = difficultyLevels[difficultyIdx];
    let filtered = allProblems.filter(
      (p) => p.difficulty >= min && p.difficulty <= max
    );
    if (search.trim()) {
      const s = search.trim().toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(s) ||
          p.code.toLowerCase().includes(s) ||
          p.contest.toLowerCase().includes(s)
      );
    }
    // Example: filter by video/hints/wa (add your own logic here)
    // if (filters.video) filtered = filtered.filter(...);
    // if (filters.hints) filtered = filtered.filter(...);
    // if (filters.wa) filtered = filtered.filter(...);
    filtered = [...filtered].sort((a, b) => {
      if (sortField === "submissions") {
        return sortOrder === "asc"
          ? a.submissions - b.submissions
          : b.submissions - a.submissions;
      }
      if (sortField === "difficulty") {
        return sortOrder === "asc"
          ? a.difficulty - b.difficulty
          : b.difficulty - a.difficulty;
      }
      return 0;
    });
    return filtered;
  }, [difficultyIdx, sortField, sortOrder, search, filters]);

  return (
    <div>
      <MainNavbar />
      <div style={{ background: "#F8FAFF", minHeight: "100vh", padding: 0 }}>
        {/* Top Tabs Navbar */}
        <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: 32 }}>
          <PracticeTabsNavbar activeTab="all" onTabChange={(tab) => {
            if (tab === "all") navigate("/past/problems");
            if (tab === "unattempted") navigate("/past/problems/unattempted");
            if (tab === "attempted") navigate("/past/problems/attempted");
          }} />
        </div>

        {/* Main Container for all content */}
        <div style={{
          width: "90%",
          maxWidth: 1150,
          margin: "36px auto 0",
          display: "flex",
          alignItems: "flex-start",
          gap: 28
        }}>
          {/* Left Section */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            {/* Search Bar */}
            <div style={{ marginBottom: 16, position: "relative" }}>
              <input
                type="text"
                placeholder="Search problems here"
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{
                  width: "100%",
                  padding: "18px 18px 18px 54px",
                  borderRadius: 8,
                  border: "1.5px solid #b7c6d9",
                  fontSize: 18,
                  background: "#fff",
                  outline: "none",
                  fontWeight: 400,
                  boxShadow: "none"
                }}
              />
              <svg
                width="28"
                height="28"
                fill="#133b77"
                style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)" }}
                viewBox="0 0 24 24"
              >
                <path d="M9.5 3A6.5 6.5 0 1 1 3 9.5 6.5 6.5 0 0 1 9.5 3m0-2A8.5 8.5 0 1 0 18 9.5 8.5 8.5 0 0 0 9.5 1zm13.71 20.29-5.4-5.39A9.48 9.48 0 0 0 19 9.5a9.5 9.5 0 1 0-9.5 9.5 9.48 9.48 0 0 0 6.4-2.19l5.39 5.4a1 1 0 0 0 1.42-1.42z" />
              </svg>
            </div>

            {/* Difficulty and Filters Row */}
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              position: "relative",
              marginBottom: 24
            }}>
              {/* Difficulty */}
              <div style={{ display: "flex", alignItems: "center" }}>
                <span style={{ color: "#222", fontWeight: 500, fontSize: 16, marginRight: 8 }}>Difficulty:</span>
                <div style={{ display: "inline-block", position: "relative" }}>
                  <button
                    onClick={() => setShowDropdown((v) => !v)}
                    style={{
                      background: "#AFE8F3",
                      color: "#133b77",
                      borderRadius: 6,
                      padding: "6px 16px",
                      fontWeight: 500,
                      fontSize: 13,
                      border: "1.5px solid #b7c6d9",
                      cursor: "pointer",
                      minWidth: 160,
                      textAlign: "left"
                    }}
                  >
                    {difficultyLevels[difficultyIdx].label}: {difficultyLevels[difficultyIdx].level}
                    <svg
                      width="16"
                      height="16"
                      fill="#133b77"
                      style={{ marginLeft: 8, verticalAlign: "middle", transform: showDropdown ? "rotate(180deg)" : "none" }}
                      viewBox="0 0 24 24"
                    >
                      <path d="M7 10l5 5 5-5z" />
                    </svg>
                  </button>
                  {showDropdown && (
                    <div style={{
                      position: "absolute",
                      top: "110%",
                      left: 0,
                      background: "#e3f0fc",
                      borderRadius: 6,
                      boxShadow: "0 2px 8px rgba(33, 150, 243, 0.13)",
                      zIndex: 10,
                      minWidth: 180,
                      padding: 8
                    }}>
                      {difficultyLevels.map((d, idx) => (
                        <div
                          key={d.label}
                          onClick={() => {
                            setDifficultyIdx(idx);
                            setShowDropdown(false);
                          }}
                          style={{
                            padding: "8px 12px",
                            cursor: "pointer",
                            color: difficultyIdx === idx ? "#133b77" : "#23406e",
                            fontWeight: difficultyIdx === idx ? 700 : 500,
                            background: difficultyIdx === idx ? "#d0e6fa" : "transparent",
                            borderRadius: 4
                          }}
                        >
                          <div>{d.label}</div>
                          <div style={{ fontSize: 12 }}>{d.level}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              {/* Filters Button */}
              <div style={{ position: "relative" }}>
                <button
                  ref={filtersBtnRef}
                  style={{
                    background: "#fff",
                    color: "#133b77",
                    border: "1.5px solid #b7c6d9",
                    borderRadius: 6,
                    fontWeight: 600,
                    fontSize: 15,
                    padding: "10px 24px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center"
                  }}
                  onClick={() => setShowFilters(v => !v)}
                >
                  <svg width="22" height="22" fill="#133b77" style={{ marginRight: 8 }} viewBox="0 0 24 24">
                    <path d="M3 5h18v2H3zm4 7h10v2H7zm2 7h6v2H9z" />
                  </svg>
                  Filters
                </button>
                <FiltersDropdown
                  open={showFilters}
                  anchorRef={filtersBtnRef}
                  filters={filters}
                  setFilters={setFilters}
                  onApply={() => setShowFilters(false)}
                  onClose={() => setShowFilters(false)}
                />
              </div>
            </div>

            {/* Sidebar and Table Container - Horizontal Layout */}
            <div style={{
              display: "flex",
              gap: 24
            }}>
              {/* Left sidebar */}
              <div style={{
                flex: "0 0 140px",
              }}>
                <ProblemsSidebar
                  activeTab={activeTab}
                  setActiveTab={tab => {
                    setActiveTab(tab);
                    if (tab === "all") navigate("/past/problems");
                    if (tab === "unattempted") navigate("/past/problems/unattempted");
                    if (tab === "attempted") navigate("/past/problems/attempted");
                  }}
                />
              </div>

              {/* Table */}
              <div style={{
                flex: 1,
                background: "#fff",
                borderRadius: 12,
                boxShadow: "0 2px 8px rgba(33, 150, 243, 0.08)",
                padding: "0 0 24px 0",
                overflow: "hidden"
              }}>
                <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 0 }}>
                  <thead>
                    <tr style={{ background: "#AFE8F3", color: "#222", fontWeight: 600 }}>
                      <th style={{ padding: "12px 8px", textAlign: "left" }}>Title</th>
                      <th style={{ padding: "12px 8px", textAlign: "left" }}>Status</th>
                      <th style={{ padding: "12px 8px", textAlign: "left" }}>ID</th>
                      <th
                        style={{ padding: "12px 8px", textAlign: "left", cursor: "pointer", userSelect: "none" }}
                        onClick={() => {
                          setSortField("submissions");
                          setSortOrder(sortField === "submissions" && sortOrder === "desc" ? "asc" : "desc");
                        }}
                      >
                        Submissions{" "}
                        <span style={{ fontSize: 13, verticalAlign: "middle" }}>
                          {sortField === "submissions" ? (
                            sortOrder === "asc" ? "↓" : "↑"
                          ) : "↑"}
                        </span>
                      </th>
                      <th style={{ padding: "12px 8px", textAlign: "left" }}>Challenge ID</th>
                      <th
                        style={{ padding: "12px 8px", textAlign: "left", cursor: "pointer", userSelect: "none" }}
                        onClick={() => {
                          setSortField("difficulty");
                          setSortOrder(sortField === "difficulty" && sortOrder === "desc" ? "asc" : "desc");
                        }}
                      >
                        Difficulty{" "}
                        <span style={{ fontSize: 13, verticalAlign: "middle" }}>
                          {sortField === "difficulty" ? (
                            sortOrder === "asc" ? "↓" : "↑"
                          ) : "↑"}
                        </span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {problems.map((row, idx) => (
                      <tr key={idx} style={{ background: "#fff", borderBottom: "1px solid #e0e0e0" }}>
                        <td style={{ padding: "12px 8px" }}>
                          <button
                            style={{
                              background: "none",
                              border: "none",
                              color: "#1976d2",
                              textDecoration: "underline",
                              cursor: "pointer",
                              fontSize: 15,
                              fontWeight: 500,
                              padding: 0,
                              margin: 0
                            }}
                            onClick={() => navigate(`/past/problems/${row.code}/submissions`)}
                          >
                            {row.name}
                          </button>
                        </td>
                        <td style={{ padding: "12px 8px" }}>
                          <span style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 24,
                            height: 24,
                            borderRadius: "50%",
                            background: "#2ecc40"
                          }}>
                            <svg width="16" height="16" fill="#fff" viewBox="0 0 24 24">
                              <path d="M20.285 6.709a1 1 0 0 0-1.414-1.418l-9.192 9.192-4.242-4.242a1 1 0 1 0-1.414 1.414l4.949 4.95a1 1 0 0 0 1.414 0l9.899-9.896z" />
                            </svg>
                          </span>
                        </td>
                        <td style={{ padding: "12px 8px" }}>{row.code}</td>
                        <td style={{ padding: "12px 8px" }}>{row.submissions}</td>
                        <td style={{ padding: "12px 8px" }}>{row.contest}</td>
                        <td style={{ padding: "12px 8px" }}>{row.difficulty}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {/* Pagination */}
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  marginTop: 18,
                  marginRight: 24,
                  fontSize: 15,
                  color: "#23406e"
                }}>
                  <svg width="22" height="22" fill="#23406e" style={{ marginRight: 8, cursor: "pointer" }} viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" /></svg>
                  1 of 1 page
                  <svg width="22" height="22" fill="#23406e" style={{ marginLeft: 8, cursor: "pointer" }} viewBox="0 0 24 24"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" /></svg>
                </div>
              </div>
            </div>
          </div>

          {/* Right sidebar */}
          <div style={{
            flex: "0 0 340px",
            minWidth: 260,
            maxWidth: 340
          }}>
            <TopicsSidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PastProblemsPage;