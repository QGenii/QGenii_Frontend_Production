import React from 'react';
import { Link } from 'react-router-dom';
// import RecentContextNavbar from './ContextNavbar';

const problems = [
  {
    name: 'Independence Day',
    code: 'INNDAY',
    submissions: 34314,
    contest: 'START 197',
    difficulty: 173,
    link: '#'
  },
  {
    name: 'Bowling Balls',
    code: 'BOWLBALL',
    submissions: 31638,
    contest: 'START 197',
    difficulty: 88,
    link: '#'
  },
  {
    name: 'Split',
    code: 'SPLIT7',
    submissions: 3761,
    contest: 'START 197',
    difficulty: 1813,
    link: '#'
  },
  {
    name: 'Expected Case',
    code: 'EVCOST',
    submissions: 3761,
    contest: 'START 197',
    difficulty: 1813,
    link: '#'
  }
];

const RecentContestProblems = () => (
    
  <div style={{ background: '#F8FAFF', minHeight: '100vh', padding: 0 }}>
    {/* <RecentContextNavbar /> */}


    {/* Table */}
    <div style={{
      background: '#fff',
      borderRadius: 8,
      maxWidth: 1100,
      margin: '0 auto',
      boxShadow: '0 2px 8px rgba(33, 150, 243, 0.08)'
    }}>
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        fontSize: 16,
        borderRadius: 8,
        overflow: 'hidden'
      }}>
        <thead>
          <tr style={{ background: '#AFE8F3', color: '#222', fontWeight: 600 }}>
            <th style={{ padding: '16px 12px', textAlign: 'left' }}>Name</th>
            <th style={{ padding: '16px 12px', textAlign: 'left' }}>Status</th>
            <th style={{ padding: '16px 12px', textAlign: 'left' }}>ID</th>
            <th style={{ padding: '16px 12px', textAlign: 'left' }}>Submissions</th>
            <th style={{ padding: '16px 12px', textAlign: 'left' }}>Contest ID</th>
            <th style={{ padding: '16px 12px', textAlign: 'left' }}>Difficulty</th>
          </tr>
        </thead>
        <tbody>
          {problems.map((p, idx) => (
            <tr key={p.name} style={{
              borderBottom: idx === problems.length - 1 ? 'none' : '1px solid #e0e0e0',
              background: idx % 2 === 0 ? '#F8FAFF' : '#fff'
            }}>
              <td style={{ padding: '14px 12px' }}>
                <Link to={`/problems/${p.code}`} style={{ color: '#1976d2', fontWeight: 500, textDecoration: 'underline' }}>{p.name}</Link>
              </td>
              <td style={{ padding: '14px 12px' }}>
                <span style={{
                  display: 'inline-block',
                  width: 28,
                  height: 28,
                  borderRadius: '0%',
                  background: '#FDDAA5',
                  color: '#1976d2',
                  textAlign: 'center',
                  lineHeight: '28px',
                  fontSize: 18,
                  fontWeight: 700
                }}></span>
              </td>
              <td style={{ padding: '14px 12px' }}>{p.code}</td>
              <td style={{ padding: '14px 12px' }}>{p.submissions}</td>
              <td style={{ padding: '14px 12px' }}>{p.contest}</td>
              <td style={{ padding: '14px 12px' }}>{p.difficulty}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '18px 24px'
      }}>
        <span style={{ color: '#02307d', fontSize: 14, marginRight: 8 }}>
          <svg width="16" height="16" fill="#02307d" viewBox="0 0 16 16" style={{ verticalAlign: 'middle' }}>
            <path d="M11 2 5 8l6 6" stroke="#02307d" strokeWidth="2" fill="none" />
          </svg>
        </span>
        <span style={{ color: '#222', fontSize: 14 }}>1 of 1 page</span>
            </div>
    </div>
  </div>
);

export default RecentContestProblems;