import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../../lib/api';
import './Contest.css';

const PastContestDetailsPage = () => {
  const { contestId } = useParams();
  const [contestData, setContestData] = useState(null);
  const [upcomingContests, setUpcomingContests] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [leaderboardLoading, setLeaderboardLoading] = useState(false);
  const [leaderboardError, setLeaderboardError] = useState(null);

  useEffect(() => {
    // Fetch contest details
    api.get(`/contests/${contestId}`)
      .then(res => setContestData(res.data?.contest))
      .catch(err => console.error('Error fetching contest:', err));

    // Fetch upcoming contests for sidebar
    api.get('/contests', { params: { limit: 5 } })
      .then(res => {
        const list = res.data?.data || [];
        const upcoming = list.filter(c => c.status?.toUpperCase() === 'UPCOMING').slice(0, 2);
        setUpcomingContests(upcoming);
      })
      .catch(err => console.error('Error fetching upcoming:', err));

    // Fetch contest leaderboard
    const fetchLeaderboard = async () => {
      try {
        setLeaderboardLoading(true);
        setLeaderboardError(null);
        const res = await api.get(`/contests/${contestId}/leaderboard`, { params: { limit: 20 } });
        console.log('Leaderboard response:', res.data);
        
        // Handle different response formats
        const leaderboardData = res.data?.data?.leaderboard || res.data?.leaderboard || [];
        setLeaderboard(leaderboardData);
      } catch (err) {
        console.error('Error fetching leaderboard:', err);
        setLeaderboardError(err.response?.data?.message || 'Failed to load leaderboard');
      } finally {
        setLeaderboardLoading(false);
      }
    };

    fetchLeaderboard();
  }, [contestId]);

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const formatTime = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true }) + ' IST';
  };

  const getDuration = (start, end) => {
    if (!start || !end) return '';
    const diff = (new Date(end) - new Date(start)) / (1000 * 60 * 60);
    return diff >= 1 ? `${Math.round(diff)} Hrs` : `${Math.round(diff * 60)} Min`;
  };

  return (
    <div className=" bg-gray-50 rounded-md shadow-lg px-4 py-8">
      <div className='bg-white
  w-[58.0625rem]
  h-[143.125rem]
  shadow-[4px_4px_4px_0_rgba(0,0,0,0.25),_-5px_4px_4px_0_rgba(0,0,0,0.25)] mx-auto'>
      <div className="px-6 py-4 flex flex-col  items-center mx-auto">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-4 flex justify-start w-[55rem]">
        <Link to="/" className="text-blue-600 cursor-pointer hover:underline">Home</Link> &gt;{" "}
        <Link to="/contest" className="text-blue-600 cursor-pointer hover:underline">Contest</Link> &gt;{" "}
        <span className="text-gray-700 font-medium">{contestData?.title || 'Starters 106'}</span>
      </div>

      {/* Layout */}
      <div className="flex gap-2 ">
        {/* LEFT SECTION */}
        <div className="lg:col-span-2 w-[33.3rem] ">
          {/* Banner */}
          <div className="h-40 rounded-md bg-gradient-to-r from-blue-400 to-blue-600" />

          {/* Participate Section */}
          <div className="bg-white rounded-md border p-4">
            <h2 className="font-semibold mb-2">
              Participate in the contest based on your rating
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              If you're a new user, please register, or if an existing user, please login to participate accordingly based on your ratings.
            </p>

            {[
              { div: "Division 1", rating: ">= 2000", btn: "Div-1" },
              { div: "Division 2", rating: ">= 1600 and <= 1999", btn: "Div-2" },
              { div: "Division 3", rating: ">= 1400 and <= 1599", btn: "Div-3" },
              { div: "Division 4", rating: "<= 1399", btn: "Div-4" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between border rounded-lg px-4 py-3 mb-2"
              >
                <div>
                  <p className="font-medium">{item.div}</p>
                </div>
                <div className="text-sm text-gray-500">
                  Rating: {item.rating}
                </div>
                <Link to={`/contest/history/${contestId}/division/${idx + 1}`}>
                  <button className="bg-blue-800 text-white text-sm px-4 py-1 rounded hover:bg-blue-900">
                    {item.btn} &gt;
                  </button>
                </Link>
              </div>
            ))}
          </div>

          {/* About Division */}
          <div className="bg-white rounded-md border p-4 text-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-semibold">About Division & Rating System</span>
              <span className="inline-block bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs">
                Introduced Div-4
              </span>
            </div>
            <p className="text-gray-600">
              We have newly introduced DIV-4 for users with <strong>Rating &lt;= 1399</strong>
            </p>
            <Link
              to="/rating-system"
              className="text-blue-600 mt-2 inline-block font-medium hover:underline"
            >
              More about Division & Rating System
            </Link>
          </div>

          {/* Announcements */}
          <div className="bg-white rounded-md border">
            <div className="bg-gray-100 px-4 py-2 font-semibold text-sm">
              ANNOUNCEMENTS
            </div>
            <p className="p-4 text-sm text-gray-500">No announcement</p>
          </div>

          {/* Leaderboard Section */}
          <div className="bg-white rounded-md border">
            <div className="bg-gray-100 px-4 py-2 font-semibold text-sm">
              LEADERBOARD
            </div>
            <div className="p-4">
              {leaderboardLoading ? (
                <p className="text-sm text-gray-500 text-center py-4">Loading leaderboard...</p>
              ) : leaderboardError ? (
                <p className="text-sm text-red-600 text-center py-4">{leaderboardError}</p>
              ) : leaderboard.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-4">No submissions yet</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b">
                        <th className="px-4 py-2 text-left font-semibold text-gray-700">Rank</th>
                        <th className="px-4 py-2 text-left font-semibold text-gray-700">User</th>
                        <th className="px-4 py-2 text-left font-semibold text-gray-700">Status</th>
                        <th className="px-4 py-2 text-left font-semibold text-gray-700">Score</th>
                        <th className="px-4 py-2 text-left font-semibold text-gray-700">Submission Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leaderboard.map((entry, idx) => (
                        <tr key={entry._id} className="border-b hover:bg-gray-50">
                          <td className="px-4 py-2 text-gray-700 font-semibold">{idx + 1}</td>
                          <td className="px-4 py-2 text-gray-700">{entry.user?.name || 'User'}</td>
                          <td className="px-4 py-2">
                            <span className={`inline-block px-3 py-1 rounded text-xs font-medium ${
                              entry.status === 'SUBMITTED' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {entry.status || 'PENDING'}
                            </span>
                          </td>
                          <td className="px-4 py-2 text-gray-700 font-semibold">{entry.score ?? '-'}</td>
                          <td className="px-4 py-2 text-gray-600 text-xs">
                            {entry.submittedAt ? new Date(entry.submittedAt).toLocaleString('en-IN') : '-'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="bg-white rounded-md border p-4 space-y-4 text-sm">
            <h3 className="font-semibold text-gray-700">STARTERS 106 - DETAILS</h3>

            <div>
              <h4 className="font-semibold mb-1">
                Qgenii: A Platform for Aspiring Programmers
              </h4>
              <p className="text-gray-600">
                Qgenii was created as a platform to help programmers make it big in the world of algorithms, computer programming, and programming contests. At Qgenii, our dedicated efforts are aimed at reviving the inner geek within you, as we proudly host a thrilling programming (coding) contest every Wednesday.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-1">About Qgenii Starters:</h4>
              <p className="text-gray-600">
                Qgenii Starters is a short programming contest which takes place on every Wednesday
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-1">Contest Details:</h4>
              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                <li>Duration: {contestData ? getDuration(contestData.startTime, contestData.endTime) : '2.00 hours'}</li>
                <li>
                  Start Date: {contestData ? `${formatDate(contestData.startTime)} at ${formatTime(contestData.startTime)}` : 'Wednesday, 23rd July, 2025 at 20:00 HRS (IST)'}
                </li>
                <li>
                  End Date: {contestData ? `${formatDate(contestData.endTime)} at ${formatTime(contestData.endTime)}` : 'Wednesday, 23rd July, 2025 at 22:00 HRS (IST)'}
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-1">Eligibility Criteria: Anyone with a knack for programming</h4>
              <p className="text-gray-600">Our contests are open to all programmers across the globe.</p>
            </div>

            <div>
              <h4 className="font-semibold mb-1">What's in it for you?</h4>
              <p className="text-gray-600">
                The idea behind these programming contests is that we want you to learn while competing. Also, we believe that it is alright to refer to tutorials, books, and other materials, learn a concept, and then apply the same to solve a problem during a contest. But it is not alright to copy other people's solutions or seek other people's help to solve a problem. All the participants are expected to abide to
              </p>
              <Link to="/contest/code-of-conduct">
                <button className="bg-blue-900 text-white px-4 py-2 rounded text-sm mt-3 hover:bg-blue-800">
                  Qgenii code of Conduct Test
                </button>
              </Link>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Rules and Regulations:</h4>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>This is an IOI-style contest. This means that the problems will be partially graded. You will get the score for passing certain test data.</li>
                <li>The details of the failed test cases will also be visible on your solution page.</li>
                <li>You can submit solutions as many times as you'd like, there are no penalties for incorrect submissions. Only your best correct submission will be considered.</li>
                <li>Those who achieve the score first will be placed higher in the ranklist in case of a tie.</li>
                <li>We have removed all the Institutions that we could not identify from our database. We request you to update your institutions once again by going to your profile page.</li>
                <li>You can also send in your queries in an email to <a href="mailto:help@qgenii.com" className="text-blue-600 hover:underline">help@qgenii.com</a>, during the contest.</li>
                <li>Please do not discuss strategy, suggestions, or tips in the comments during a live contest. Posting questions clarifying the problem statement is ok. If you are unsure, email us at feedback <a href="mailto:feedback@qgenii.com" className="text-blue-600 hover:underline">@qgenii.com</a>.</li>
                <li>Discussing Qgenii problems or any aspect of a problem, on any other platform on the web, on identification, could lead to the disabling of the respective account and banning from the community.</li>
              </ul>
            </div>

            <div className="mt-4">
              <p className="text-gray-700 font-medium">Note: You can now "Code, Compile, and Run" your codes on our Online IDE.</p>
              <p className="text-gray-600 mt-2">
                However, if you are using any other online development environment, make sure that other contestants don't have access to your code. As a contestant, you are responsible for making sure others don't access the code that you submit. If you use Ideone, make sure to mark your submission "private" (not secret)".
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-6  w-[21.625rem]">
          {/* Contest Starts */}
          <div className="bg-white border rounded-md p-4 text-sm">
            <h3 className="font-semibold text-center mb-3">
              Contest Starts In:
            </h3>

            <table className="w-full text-left border text-xs">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2">Contest</th>
                  <th className="p-2">Date</th>
                  <th className="p-2">Duration</th>
                </tr>
              </thead>
              <tbody>
                {upcomingContests.length > 0 ? upcomingContests.map((c, idx) => (
                  <tr key={idx} className="border-t">
                    <td className="p-2 text-blue-600">
                      <Link to={`/contest/upcoming/${c._id}`} className="hover:underline">
                        {c.title}
                      </Link>
                    </td>
                    <td className="p-2">{formatDate(c.startTime)}<br />{formatTime(c.startTime)}</td>
                    <td className="p-2">{getDuration(c.startTime, c.endTime)}</td>
                  </tr>
                )) : (
                  <>
                    <tr className="border-t">
                      <td className="p-2 text-blue-600">Start 107</td>
                      <td className="p-2">30th Jul 2025<br />08:00 pm IST</td>
                      <td className="p-2">2 Hrs</td>
                    </tr>
                    <tr className="border-t">
                      <td className="p-2 text-blue-600">DeepWeekend08</td>
                      <td className="p-2">26th Jul 2025<br />12:00 pm IST</td>
                      <td className="p-2">24 Hrs</td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>

            <Link to="/contest" className="text-blue-600 block text-right mt-2 hover:underline">
              See More
            </Link>
          </div>

          {/* Important Links */}
          <div className="bg-white border rounded-md p-4 text-sm">
            <h3 className="font-semibold mb-3 text-center">
              Important Links
            </h3>
            <div className="space-y-2">
              <Link to="#" className="flex items-center gap-2 text-blue-600 bg-blue-50 p-3 rounded hover:bg-blue-100">
                <span>↗</span> Contest Introduction
              </Link>
              <Link to="#" className="flex items-center gap-2 text-blue-600 bg-blue-50 p-3 rounded hover:bg-blue-100">
                <span>↗</span> Textual Problem Solutions
              </Link>
            </div>
          </div>

          {/* Master DSA */}
          <div className="bg-white border rounded-md p-4">
            <h3 className="font-semibold text-center mb-3">Master DSA</h3>
            <div className="h-40 bg-blue-500 rounded-md" />
          </div>
        </div>
      </div>
      </div>
      </div>
    </div>
  );
};

export default PastContestDetailsPage;