import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FollowModal.css';

const FollowModal = ({ userId, userName, type, onClose }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, [userId, type, page]);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const endpoint =
        type === 'followers'
          ? `http://localhost:5000/follow/${userId}/followers`
          : `http://localhost:5000/follow/${userId}/following`;

      const response = await axios.get(endpoint, {
        params: { page, limit: 20 },
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      const newUsers = response.data.data[type];
      setUsers(page === 1 ? newUsers : [...users, ...newUsers]);
      setHasMore(newUsers.length === 20);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    setPage(page + 1);
  };

  return (
    <div className="follow-modal-overlay" onClick={onClose}>
      <div className="follow-modal" onClick={(e) => e.stopPropagation()}>
        <div className="follow-modal-header">
          <h2>
            {type === 'followers'
              ? `${userName}'s Followers`
              : `${userName} Following`}
          </h2>
          <button className="close-btn" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="follow-modal-body">
          {loading && page === 1 ? (
            <div className="loading-container">
              <div className="spinner"></div>
              <p>Loading...</p>
            </div>
          ) : users.length === 0 ? (
            <div className="empty-state">
              <i className="fas fa-users"></i>
              <p>
                {type === 'followers'
                  ? 'No followers yet'
                  : 'Not following anyone yet'}
              </p>
            </div>
          ) : (
            <>
              <div className="users-list">
                {users.map((user) => (
                  <div key={user._id} className="user-item">
                    <img
                      src={
                        user.profileImage ||
                        'https://via.placeholder.com/50?text=User'
                      }
                      alt={user.name}
                      className="user-avatar"
                    />
                    <div className="user-info">
                      <h3>{user.name}</h3>
                      <p>{user.role || 'User'}</p>
                      {user.bio && <p className="user-bio">{user.bio}</p>}
                    </div>
                    <button
                      className="view-profile-btn"
                      onClick={() =>
                        (window.location.href = `/profile/${user._id}`)
                      }
                    >
                      View Profile
                    </button>
                  </div>
                ))}
              </div>

              {hasMore && (
                <button
                  className="load-more-btn"
                  onClick={loadMore}
                  disabled={loading}
                >
                  {loading ? 'Loading...' : 'Load More'}
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FollowModal;