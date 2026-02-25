import React, { useState } from 'react';

import RecentContextNavbar from './ContextNavbar';

const initialBookmarks = [
  {
    code: 'PYROJPR01',
    name: 'Project- Guess the number',
    date: '5 aug 2025',
    difficulty: 'NA',
    link: '#'
  },
  {
    code: 'PYROJPR01',
    name: 'Get a random Number',
    date: '5 aug 2025',
    difficulty: 'NA',
    link: '#'
  }
];

const BookmarkedProblems = () => {
  const [search, setSearch] = useState('');
  const [bookmarks, setBookmarks] = useState(initialBookmarks);

  const filtered = bookmarks.filter(
    b => b.name.toLowerCase().includes(search.toLowerCase()) || b.code.toLowerCase().includes(search.toLowerCase())
  );

  const handleRemove = idx => {
    setBookmarks(bookmarks => bookmarks.filter((_, i) => i !== idx));
  };

  return (
    <div>
        
    <div style={{ background: '#F8FAFF', minHeight: '100vh', padding: 0 }}>
        < RecentContextNavbar />
      

      {/* Search */}
      <div style={{ maxWidth: 1100, margin: '0 auto 18px auto' }}>
        <input
          type="text"
          placeholder="Search Bookmarks here"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            width: 350,
            padding: '10px 16px',
            borderRadius: 6,
            border: '1px solid #bdbdbd',
            fontSize: 15,
            marginBottom: 18,
            outline: 'none'
          }}
        />
      </div>

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
            <tr style={{ background: '#AFE8F3', color: '#222', fontWeight: 600 }}>
              <th style={{ padding: '12px 8px', textAlign: 'left' }}>Problem Code</th>
              <th style={{ padding: '12px 8px', textAlign: 'left' }}>Problem Name</th>
              <th style={{ padding: '12px 8px', textAlign: 'left' }}>Added</th>
              <th style={{ padding: '12px 8px', textAlign: 'left' }}>Difficulty</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* Section header */}
            <tr>
              <td colSpan={5} style={{
                background: '#02307d',
                color: '#fff',
                fontWeight: 600,
                fontSize: 14,
                padding: '8px 12px',
                letterSpacing: 1
              }}>
                PYTHON PROJECT FOR BEGINNERS
              </td>
            </tr>
            {filtered.length > 0 ? (
              filtered.map((b, idx) => (
                <tr key={b.name + idx} style={{ borderBottom: '1px solid #e0e0e0', background: '#fff' }}>
                  <td style={{ padding: '12px 8px' }}>{b.code}</td>
                  <td style={{ padding: '12px 8px' }}>
                    <a href={`/problems/${b.code}`} style={{ color: '#1976d2', textDecoration: 'underline', fontWeight: 500 }}>
                      {b.name}
                    </a>
                  </td>
                  <td style={{ padding: '12px 8px' }}>{b.date}</td>
                  <td style={{ padding: '12px 8px' }}>{b.difficulty}</td>
                  <td style={{ padding: '12px 8px', textAlign: 'center' }}>
                    <button
                      onClick={() => handleRemove(idx)}
                      style={{
                        background: '#fff',
                        border: 'none',
                        borderRadius: '50%',
                        width: 32,
                        height: 32,
                        boxShadow: '0 2px 8px rgba(33, 150, 243, 0.18)',
                        cursor: 'pointer'
                      }}
                      title="Remove Bookmark"
                    >
                      <span style={{ color: '#F44336', fontSize: 22, fontWeight: 700 }}>×</span>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} style={{
                  textAlign: 'center',
                  padding: '32px 0',
                  color: '#222',
                  fontSize: 15
                }}>
                  No Bookmarks found,{' '}
                  <a href="#" style={{ color: '#1976d2', textDecoration: 'underline', fontWeight: 500 }}>
                    Start Exploring!
                  </a>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};
export default BookmarkedProblems;