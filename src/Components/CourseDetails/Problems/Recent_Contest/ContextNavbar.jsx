import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// import MainNavbar from '../../MainNavbar';

const tabs = [
  {
    label: 'Recent Contest Problems',
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" style={{ marginRight: 10, verticalAlign: 'middle' }}>
        <path d="M12 2l2.09 6.26L20 9.27l-5 3.64L16.18 20 12 16.9 7.82 20 9 12.91l-5-3.64 5.91-.91z" />
      </svg>
    ),
    path: '/recent-context/contest'
  },
  // {
  //   label: 'Explained Problems',
  //   icon: (
  //     <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" style={{ marginRight: 10, verticalAlign: 'middle' }}>
  //       <path d="M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20zm0 6v4l3 3" />
  //     </svg>
  //   ),
  //   path: '/recent-context/explained'
  // },
  {
    label: 'My Bookmarks',
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" style={{ marginRight: 10, verticalAlign: 'middle' }}>
        <path d="M6 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16l-7-5-7 5V4z" />
      </svg>
    ),
    path: '/recent-context/bookmarked'
  }
];

const RecentContextNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div>
        {/* <MainNavbar /> */}
    <div style={{
      display: 'flex',
      background: '#fff',
      borderRadius: 8,
      margin: '24px auto 24px auto',
      maxWidth: 1100,
      minHeight: 56,
      boxShadow: '0 2px 8px rgba(33, 150, 243, 0.08)'
    }}>
      {tabs.map((tab, idx) => {
        const isActive = location.pathname === tab.path;
        return (
          <div
            key={tab.label}
            onClick={() => !isActive && navigate(tab.path)}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0',
              height: 56,
              fontWeight: isActive ? 600 : 500,
              fontSize: 15.5,
              color: isActive ? '#fff' : '#222',
              background: isActive ? '#0A2C5E' : '#fff',
              borderTopLeftRadius: idx === 0 ? 8 : 0,
              borderBottomLeftRadius: idx === 0 ? 8 : 0,
              borderTopRightRadius: idx === tabs.length - 1 ? 8 : 0,
              borderBottomRightRadius: idx === tabs.length - 1 ? 8 : 0,
              borderBottom: isActive ? '3px solid #0A2C5E' : '3px solid transparent',
              borderRight: idx !== tabs.length - 1 ? '1px solid #f0f0f0' : 'none',
              cursor: isActive ? 'default' : 'pointer',
              transition: 'background 0.2s, color 0.2s'
            }}
          >
            <span style={{ color: isActive ? '#fff' : '#222', display: 'flex', alignItems: 'center' }}>{tab.icon}</span>
            {tab.label}
          </div>
        );
      })}
    </div>
    </div>
  );
};

export default RecentContextNavbar;