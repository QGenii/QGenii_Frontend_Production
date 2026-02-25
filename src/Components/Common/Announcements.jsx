import React from 'react';

const Announcements = () => {
  return (
    <div className="announcements-section mt-5">
      <h5 className="text-uppercase mb-3" style={{ fontSize: '14px', fontWeight: 'bold' }}>ANNOUNCEMENTS</h5>
      <div className="bg-light p-3">
        <p className="text-muted">No announcements</p>
      </div>
      
      <h5 className="text-uppercase mt-4 mb-3" style={{ fontSize: '14px', fontWeight: 'bold' }}>CODEIQGENIOUS: A Platform for Aspiring Programmers</h5>
      <div className="bg-light p-3">
        <p>Codeiqgenious was created as a platform to help programmers make it big in the world of algorithms, computer programming, and programming contests. It hosts three featured contests every month and gives away prizes and goodies to the winners as encouragement.</p>
        <p>Apart from providing a platform for programming competitions, Codeiqgenious also has various algorithm tutorials and forum discussions to help those who are new to the world of computer programming.</p>
      </div>
      
      <div className="about-section mt-4">
        <h5 className="mb-3">About Codeiqgenious Features:</h5>
        <p>Codeiqgenious conducts a programming contest at the start of every month and two smaller programming challenges at the middle and end of the month.</p>
        <h6 className="mb-2 mt-3">Contest Details:</h6>
        <ul>
          <li>Long Challenge - Ten days at the start of the month</li>
          <li>Cook-off - 2.5 hours in the evening of the second-last Sunday</li>
          <li>Lunchtime - 3 hours on the last Saturday of the month</li>
        </ul>
      </div>
      
      <div className="eligibility-section mt-4">
        <h5 className="mb-3">Eligibility Criteria: Anyone with a knack for programming</h5>
        <p>For students and working professionals. All individuals across the globe.</p>
      </div>
      
      <div className="benefits-section mt-4">
        <h5 className="mb-3">WHAT'S IN IT FOR YOU?</h5>
        <p>The best-rated programmers on platforms like these are known to be at par with International Mathematics Olympiad winners. We believe in learning by doing, especially when it comes to programming. Solving programming problems on a regular basis not only helps you become a better programmer but also makes you suitable for bigger coding arenas like ACM ICPC and Google Code Jam.</p>
        <div className="d-flex justify-content-center mt-4">
          <button className="btn btn-primary px-4 py-2">COMPETE NOW FOR FREE!</button>
        </div>
      </div>
      
      <div className="rules-section mt-4">
        <h5 className="mb-3">Rules and Regulations:</h5>
        <ul>
          <li>You are free to use any language that is supported on our platforms.</li>
          <li>You will get points based on passing cases and time efficiency.</li>
          <li>All results on this platform are final and at the discretion of your teacher/admin.</li>
          <li>Problems may be divided into subtasks with each having a specific score.</li>
          <li>In case you're locked out of the event because you've attempted to share code, please write to help@Codeiqgenious.com</li>
        </ul>
      </div>
    </div>
  );
};

export default Announcements;