import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";

const ProblemNavbar = ({ activeTab, setActiveTab, contentId }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  console.log(contentId)
  // Ensure setActiveTab is callable; provide a no-op fallback when parent
  // doesn't pass it (some views render this navbar without controlling tab)
  const safeSetActiveTab = typeof setActiveTab === 'function' ? setActiveTab : () => {};

  const NAVS = [
    {
      label: "Statement",
      path: (cid, id) => `/coursecatalog/${cid}/problems/${id}`
    },
    {
      label: "Submissions",
      path: (cid, id) => `/coursecatalog/${cid}/problems/${id}/submissions`
    },
    {
      label: "Solutions",
      path: (cid, id) => `/coursecatalog/${cid}/problems/${id}/solutions`
    },
    {
      label: "AI Help",
      path: (cid, id) => `/coursecatalog/${cid}/problems/${id}/ai-help`
    }
  ];

  const [localActive, setLocalActive] = useState('Statement');
  const displayedActive = activeTab || localActive;

  // ✅ Auto update activeTab when route changes
  useEffect(() => {
    let label = 'Statement';
    if (location.pathname.endsWith('/ai-help')) label = 'AI Help';
    else if (location.pathname.endsWith('/solutions')) label = 'Solutions';
    else if (location.pathname.endsWith('/submissions')) label = 'Submissions';

    safeSetActiveTab(label);
    setLocalActive(label);
  }, [location.pathname]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          background: "#F8FAFF",
          borderBottom: "1px solid #e0e0e0",
          minHeight: 48
        }}
      >
        {NAVS.map((tab) => (
          <div
            key={tab.label}
            onClick={() => {
              // derive the problem id and course content id from params or pathname
              const pid = id || (() => {
                const m = location.pathname.match(/problems\/([^/]+)/);
                return m ? m[1] : null;
              })();

              const cid = contentId || (() => {
                const m = location.pathname.match(/coursecatalog\/([^/]+)\/problems/);
                return m ? m[1] : null;
              })();

              // treat literal 'undefined'/'null' as missing
              const invalid = (s) => s === undefined || s === null || s === 'undefined' || s === 'null' || s === '';
              if (invalid(pid) || invalid(cid)) {
                console.warn('ProblemsNavbar: missing contentId or problem id; navigation aborted');
                return;
              }

              // use the resolved cid (not the outer-scope `contentId` which may be undefined)
              // Preserve current question index when switching tabs so returning
              // to Statement shows the same step the user was on.
              const params = new URLSearchParams(location.search);
              const currentQ = params.get('q') ?? '0';
              const target = `${tab.path(cid, pid)}?q=${encodeURIComponent(currentQ)}`;
              navigate(target);
              // update active state locally and in parent if provided
              setLocalActive(tab.label);
              safeSetActiveTab(tab.label);
            }}
            style={{
              padding: "0 32px",
              height: 48,
              display: "flex",
              alignItems: "center",
              fontWeight: displayedActive === tab.label ? 600 : 500,
              color: displayedActive === tab.label ? "#fff" : "#222",
              background: displayedActive === tab.label ? "#23406e" : "#e3f0fc",
              borderBottom:
                displayedActive === tab.label
                  ? "3px solid #23406e"
                  : "3px solid transparent",
              cursor: "pointer",
              fontSize: 15.5,
              transition: "background 0.2s"
            }}
            // className={`${displayedActive === tab.label ? "bg-blue-500" : ""}`}
            >
            {tab.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProblemNavbar;
