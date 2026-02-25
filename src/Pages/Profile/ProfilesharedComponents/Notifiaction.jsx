import React, { useState } from "react";

/**
 * NotificationsPanel.jsx
 * - Tailwind v3
 * - Simple local state for tabs + sample notifications
 * - Usage: <NotificationsPanel />
 */

const SAMPLE = {
  instructors: new Array(5).fill(0).map((_, i) => ({
    id: `ins-${i}`,
    avatar: null, // replace with URL
    title: "Notification Information Here",
    time: "2h ago",
  })),
  students: new Array(4).fill(0).map((_, i) => ({
    id: `stu-${i}`,
    avatar: null,
    title: "Student: Notification Information Here",
    time: `${i + 1}d ago`,
  })),
  mentors: new Array(3).fill(0).map((_, i) => ({
    id: `men-${i}`,
    avatar: null,
    title: "Mentor: Notification Information Here",
    time: `${i + 3}h ago`,
  })),
};

export default function Notification() {
  const tabs = [
    { key: "instructors", label: "Instructors" },
    { key: "students", label: "Students" },
    { key: "mentors", label: "Mentors" },
  ];
  const [active, setActive] = useState("instructors");
  const notifications = SAMPLE[active];

  return (
    <div className="min-h-screen bg-[#F4F7FA] p-8">
      {/* Tabs */}
      <div className="flex gap-4 justify-center mb-8">
        {tabs.map((t) => {
          const isActive = t.key === active;
          return (
            <span
              key={t.key}
              onClick={() => setActive(t.key)}
              className={`px-6 py-3 rounded-full shadow-sm transition
                ${isActive
                  ? "bg-[#2800AE] text-white shadow-lg"
                  : "bg-white text-gray-700 hover:shadow"}
              `}
            >
              {t.label}
            </span>
          );
        })}
      </div>

      {/* List */}
      <div className="max-w-3xl space-y-6 mx-auto">
        {notifications.map((n) => (
          <article
            key={n.id}
            className="flex items-start gap-6 bg-white rounded-xl p-5 shadow-[0_10px_20px_rgba(95,0,255,0.07)]"
            role="article"
            aria-labelledby={`notif-${n.id}`}
          >
            {/* avatar */}
            <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
              {/* replace with <img src={n.avatar} .../> when available */}
              <svg className="w-8 h-8 text-gray-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.2" />
                <path d="M4 20c1.6-3 5.4-5 8-5s6.4 2 8 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </div>

            {/* text */}
            <div className="flex-1">
              <h4 id={`notif-${n.id}`} className="text-sm font-semibold text-gray-800">
                {n.title}
              </h4>
              <h4 className="text-xs text-gray-400 mt-3">{n.time}</h4>
            </div>
          </article>
        ))}

        {/* empty state */}
        {notifications.length === 0 && (
          <div className="text-center text-gray-500 py-10 bg-white rounded-xl shadow-sm">No notifications</div>
        )}
      </div>
    </div>
  );
}
