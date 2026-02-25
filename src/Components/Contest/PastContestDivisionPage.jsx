import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../lib/api";

export default function PastContestDivisionPage() {
  const { contestId, divisionId } = useParams();
  const [contestData, setContestData] = useState(null);
  const [problems, setProblems] = useState([]);

  // Countdown (static target for demo)
  const target = new Date("2025-07-30T20:00:00");

  const [time, setTime] = useState(getTimeLeft());

  function getTimeLeft() {
    const diff = target - new Date();
    return {
      days: Math.max(Math.floor(diff / (1000 * 60 * 60 * 24)), 0),
      hrs: Math.max(Math.floor((diff / (1000 * 60 * 60)) % 24), 0),
      min: Math.max(Math.floor((diff / (1000 * 60)) % 60), 0),
      sec: Math.max(Math.floor((diff / 1000) % 60), 0),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Fetch contest details
    api.get(`/contests/${contestId}`)
      .then(res => setContestData(res.data?.contest))
      .catch(err => console.error('Error fetching contest:', err));

    // Fetch contest problems/questions
    api.get(`/contests/${contestId}/questions`)
      .then(res => setProblems(res.data?.questions || []))
      .catch(err => console.error('Error fetching problems:', err));
  }, [contestId]);

  // Sample problems if API doesn't return any
  const sampleProblems = [
    { id: 1, name: "Append Average", code: "APPAVG", submissions: 1234, accuracy: "78%" },
    { id: 2, name: "Binary Search", code: "BINSRC", submissions: 987, accuracy: "65%" },
    { id: 3, name: "Dynamic Sum", code: "DYNSUM", submissions: 756, accuracy: "52%" },
    { id: 4, name: "Graph Traversal", code: "GRPTRV", submissions: 543, accuracy: "41%" },
    { id: 5, name: "Tree Height", code: "TREHT", submissions: 432, accuracy: "38%" },
  ];

  const displayProblems = problems.length > 0 ? problems : sampleProblems;

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-4">

<div className='bg-white
  w-[58.0625rem]
  h-[143.125rem]
  shadow-[4px_4px_4px_0_rgba(0,0,0,0.25),_-5px_4px_4px_0_rgba(0,0,0,0.25)] mx-auto'>
      <div className="px-6 py-4 flex flex-col  items-center mx-auto">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-4">
        <Link to="/" className="text-blue-600 cursor-pointer hover:underline">Home</Link> &gt;{" "}
        <Link to="/contest" className="text-blue-600 cursor-pointer hover:underline">Compete</Link> &gt;{" "}
        <Link to={`/contest/history/${contestId}`} className="text-blue-600 cursor-pointer hover:underline">
          {contestData?.title || 'Starters 106'}
        </Link> &gt;{" "}
        <span className="font-medium text-gray-700">Division {divisionId}</span>
      </div>

      <div className="flex gap-2 ">
        {/* LEFT */}
        <div className="lg:col-span-2 space-y-6 w-[33.3rem]">
          {/* Banner */}
          <div className="h-40 rounded-md bg-gradient-to-r from-blue-400 to-blue-600 shadow-md" />

          {/* Scorable Problems */}
          <div className="bg-white border rounded-md shadow-md">
            <h2 className="px-4 py-3 font-semibold">
              Scorable Problems for Division {divisionId}
            </h2>

            <table className="w-full text-sm border-t">
              <thead className="bg-gray-100 text-gray-600">
                <tr>
                  <th className="p-2 text-left">Name</th>
                  <th className="p-2">Code</th>
                  <th className="p-2">Successful submission</th>
                  <th className="p-2">Accuracy</th>
                </tr>
              </thead>
              <tbody>
                {displayProblems.map((problem, i) => (
                  <tr key={problem.id || i} className="border-t hover:bg-gray-50">
                    <td className="p-2 text-blue-600 cursor-pointer hover:underline">
                      <Link to={`/contest/history/${contestId}/division/${divisionId}/problem/${problem.id || i + 1}`}>
                        {problem.name || problem.title || `Problem ${i + 1}`}
                      </Link>
                    </td>
                    <td className="p-2 text-center">{problem.code || `P${i + 1}`}</td>
                    <td className="p-2 text-center">{problem.submissions || problem.successfulSubmissions || 0}</td>
                    <td className="p-2 text-center">{problem.accuracy || '0%'}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="text-center py-3">
              <button className="bg-blue-600 text-white text-sm px-4 py-1 rounded hover:bg-blue-700">
                Load more
              </button>
            </div>

            <p className="text-xs text-gray-500 text-center pb-3">
              Problems will be available in {time.days} days {time.hrs} hrs {time.min} mins {time.sec} sec
            </p>
          </div>

          {/* Announcements */}
          <div className="bg-white border rounded-md shadow-md">
            <div className="bg-gray-100 px-4 py-2 font-semibold text-sm">
              ANNOUNCEMENTS
            </div>
            <p className="p-4 text-sm text-gray-500">No announcement</p>
          </div>

          {/* Details */}
          <div className="bg-white border rounded-md p-4 space-y-4 text-sm shadow-md">
            <h3 className="font-semibold">STARTERS 106 - DETAILS</h3>

            <p>
              <b>Qgenii:</b> A Platform for Aspiring Programmers. We aim to
              help programmers grow via contests every Wednesday.
            </p>

            <div>
              <b>About Qgenii Starters:</b>
              <p>Short programming contest held every Wednesday.</p>
            </div>

            <div>
              <b>Contest Details:</b>
              <ul className="list-disc pl-5">
                <li>Duration: 2.00 hours</li>
                <li>Start: Wed, 23rd July 2025 – 8:00 PM IST</li>
                <li>End: Wed, 23rd July 2025 – 10:00 PM IST</li>
              </ul>
            </div>

            <div>
              <b>Eligibility Criteria: Anyone with a knack for programming</b>
              <p>Our contests are open to all programmers across the globe.</p>
            </div>

            <div>
              <b>What's in it for you?</b>
              <p>
                The idea behind these programming contests is that we want you to learn while competing. Also, we believe that it is alright to refer to tutorials, books, and other materials, learn a concept, and then apply the same to solve a problem during a contest. But it is not alright to copy other people's solutions or seek other people's help to solve a problem. All the participants are expected to abide to
              </p>
            </div>

            <Link to="/contest/code-of-conduct">
              <button className="bg-blue-800 text-white px-4 py-2 rounded text-sm hover:bg-blue-900">
                Qgenii Code of Conduct Test
              </button>
            </Link>
          </div>

          {/* Rules */}
          <div className="bg-white border rounded-md p-4 text-sm shadow-md">
            <h3 className="font-semibold mb-2">Rules and Regulations:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>This is an IOI-style contest. This means that the problems will be partially graded. You will get the score for passing certain test data.</li>
              <li>The details of the failed test cases will also be visible on your solution page.</li>
              <li>You can submit solutions as many times as you'd like, there are no penalties for incorrect submissions. Only your best correct submission will be considered.</li>
              <li>Those who achieve the score first will be placed higher in the ranklist in case of a tie.</li>
              <li>We have removed all the Institutions that we could not identify from our database. We request you to update your institutions once again by going to your profile page.</li>
              <li>You can also send in your queries in an email to <a href="mailto:help@qgenii.com" className="text-blue-600 hover:underline">help@qgenii.com</a>, during the contest.</li>
              <li>Please do not discuss strategy, suggestions, or tips in the comments during a live contest. Posting questions clarifying the problem statement is ok. If you are unsure, email us at feedback <a href="mailto:feedback@qgenii.com" className="text-blue-600 hover:underline">@qgenii.com</a>.</li>
              <li>Discussing Qgenii problems or any aspect of a problem, on any other platform on the web, on identification, could lead to the disabling of the respective account and banning from the community.</li>
            </ul>
            
            <div className="mt-4">
              <p className="font-medium">Note: You can now "Code, Compile, and Run" your codes on our Online IDE.</p>
              <p className="text-gray-600 mt-2">
                However, if you are using any other online development environment, make sure that other contestants don't have access to your code. As a contestant, you are responsible for making sure others don't access the code that you submit. If you use Ideone, make sure to mark your submission "private" (not secret)".
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-6 w-[21.625rem]">
          {/* Countdown */}
          <div className="bg-white border rounded-md p-4 text-center shadow-md">
            <h3 className="font-semibold mb-3">Contest Starts In:</h3>
            <div className="flex justify-center gap-3">
              {[
                { label: "Days", value: time.days },
                { label: "Hrs", value: time.hrs },
                { label: "Min", value: time.min },
                { label: "Sec", value: time.sec },
              ].map((t, i) => (
                <div key={i}>
                  <div className="bg-yellow-400 px-3 py-2 font-bold rounded shadow-sm">
                    {t.value}
                  </div>
                  <p className="text-xs mt-1">{t.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Reminder */}
          <div className="bg-white border rounded-md p-4 text-center shadow-md">
            <h3 className="font-semibold mb-3">Contest Reminder</h3>
            <button className="bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700">
              Set Reminder for the contest
            </button>
          </div>

          {/* Live Ratings */}
          <div className="bg-white border rounded-md p-4 shadow-md">
            <h3 className="font-semibold mb-3">Live Ratings Graph</h3>
            <div className="h-40 rounded bg-gradient-to-t from-gray-300 via-green-300 via-blue-300 via-pink-300 to-red-300" />
            <p className="text-xs text-gray-500 mt-2">
              Please login and make at least one submission. Ratings update every
              15 minutes.
            </p>
          </div>
        </div>
      </div>

</div>
</div>
    </div>
  );
}