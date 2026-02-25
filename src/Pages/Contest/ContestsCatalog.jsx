import React, { useEffect, useState } from "react";
import { listContests, listMyContests } from "../../lib/contestApi";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Sidebar } from '../../Components/layout/Sidebar';

const StatusTabs = ["UPCOMING", "ONGOING", "ENDED"];

export function ContestsCatalog({ showOnlyMyContests = false }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("UPCOMING");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [contests, setContests] = useState([]);
  const [myContests, setMyContests] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        if (!showOnlyMyContests) {
          const res = await listContests({ status: activeTab });
          setContests(res.data || []);
        }

        if (user) {
          try {
            const mres = await listMyContests();
            const own = mres.data?.contests || mres.contests || [];

            // Sort my contests: ONGOING first, then UPCOMING, then ENDED
            const statusOrder = { ONGOING: 0, UPCOMING: 1, ENDED: 2 };
            const sortedMy = [...own].sort((a, b) => {
              const aStatus = statusOrder[a.status] ?? 99;
              const bStatus = statusOrder[b.status] ?? 99;
              if (aStatus !== bStatus) return aStatus - bStatus;
              const aTime = a.startTime ? new Date(a.startTime).getTime() : 0;
              const bTime = b.startTime ? new Date(b.startTime).getTime() : 0;
              return aTime - bTime;
            });

            setMyContests(sortedMy);
          } catch (err) {
            // silently ignore my contests error
          }
        } else {
          setMyContests([]);
        }
      } catch (e) {
        setError(e.response?.data?.message || e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [activeTab]);

  return (
    <div className="flex">
       <Sidebar />
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Programming Contests</h1>
          {user && (
            <button
              onClick={() => navigate("/contests/create")}
              className="px-3 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Create Contest
            </button>
          )}
        </div>
        {user && myContests.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-3">My Contests</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {myContests.map((c) => (
                <Link
                  to={`/contests/${c._id}`}
                  key={c._id}
                  className="border rounded-lg p-4 shadow-sm hover:shadow-md transition bg-white"
                >
                  <h3 className="font-semibold text-base mb-1 flex items-center justify-between">
                    <span>{c.title}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                      {c.status}
                    </span>
                  </h3>
                  <p className="text-xs text-gray-600 line-clamp-3 mb-2">
                    {c.description}
                  </p>
                  <div className="text-[10px] text-gray-500 space-y-1">
                    <p>Starts: {new Date(c.startTime).toLocaleDateString()}</p>
                    <p>Ends: {new Date(c.endTime).toLocaleDateString()}</p>
                    <p>
                      Participants: {c.participantCount}
                      {c.maxParticipants ? `/${c.maxParticipants}` : ""}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/manage/contests", { state: { contestId: c._id } });
                    }}
                    className="mt-3 inline-block text-blue-600 text-xs hover:underline"
                  >
                    Manage
                  </button>
                </Link>
              ))}
            </div>
          </div>
        )}
        {showOnlyMyContests &&
          // If only showing mentor contests, stop here
          (!loading && myContests.length === 0 ? (
            <p className="text-gray-600">
              You haven't created any contests yet.
            </p>
          ) : null)}
        <div className="flex gap-2 mb-6">
          {StatusTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-sm font-semibold border ${
                activeTab === tab
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        {loading && <p>Loading contests...</p>}
        {error && <p className="text-red-600">{error}</p>}
        {!loading && !error && contests.length === 0 && (
          <p>No contests found for {activeTab.toLowerCase()}.</p>
        )}
        {!showOnlyMyContests && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {contests.map((c) => (
              <Link
                to={`/contests/${c._id}`}
                key={c._id}
                className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
              >
                <h2 className="font-semibold text-lg mb-1">{c.title}</h2>
                <p className="text-sm text-gray-600 line-clamp-3 mb-2">
                  {c.description}
                </p>
                <div className="flex flex-wrap gap-1 mb-2">
                  {c.tags?.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="text-xs bg-gray-100 px-2 py-1 rounded"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="text-xs text-gray-500 space-y-1">
                  <p>
                    Status: <span className="font-medium">{c.status}</span>
                  </p>
                  <p>Starts: {new Date(c.startTime).toLocaleString()}</p>
                  <p>Ends: {new Date(c.endTime).toLocaleString()}</p>
                  <p>
                    Participants: {c.participantCount}
                    {c.maxParticipants ? ` / ${c.maxParticipants}` : ""}
                  </p>
                  <p>
                    Rating: {c.rating} ({c.reviewCount} reviews)
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ContestsCatalog;
