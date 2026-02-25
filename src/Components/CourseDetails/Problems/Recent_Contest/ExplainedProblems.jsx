import React from 'react';
import RecentContextNavbar from './ContextNavbar';
const ExplainedProblems = () => (
  <div style={{ background: '#F8FAFF', minHeight: '100vh', padding: 0 }}>
    <RecentContextNavbar />
    {/* Tabs */}
 

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
        fontSize: 15,
        borderRadius: 8,
        overflow: 'hidden'
      }}>
        <thead>
          <tr style={{ background: '#CFE0F7', color: '#222', fontWeight: 600 }}>
            <th style={{ padding: '12px 8px', textAlign: 'left' }}>Problem Name</th>
            <th style={{ padding: '12px 8px', textAlign: 'left' }}>Problem Code</th>
            <th style={{ padding: '12px 8px', textAlign: 'left' }}>Language</th>
            <th style={{ padding: '12px 8px', textAlign: 'left' }}>Popularity</th>
            <th style={{ padding: '12px 8px', textAlign: 'left' }}>View Solution</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={5} style={{
              textAlign: 'center',
              padding: '18px 0',
              color: '#222',
              fontSize: 14
            }}>
              Sorry No data found
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

export default ExplainedProblems;