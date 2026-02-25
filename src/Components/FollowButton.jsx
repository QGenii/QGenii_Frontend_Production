import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FollowButton.css';

const FollowButton = ({ userId, userName }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    checkFollowStatus();
  }, [userId]);

  const checkFollowStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setChecking(false);
        return;
      }

      const response = await axios.get(
        `http://localhost:5000/follow/status/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setIsFollowing(response.data.data.isFollowing);
    } catch (error) {
      console.error('Error checking follow status:', error);
    } finally {
      setChecking(false);
    }
  };

  const handleFollowToggle = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to follow users');
      return;
    }

    setLoading(true);
    try {
      if (isFollowing) {
        await axios.delete(`http://localhost:5000/follow/unfollow/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsFollowing(false);
      } else {
        await axios.post(
          `http://localhost:5000/follow/follow/${userId}`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setIsFollowing(true);
      }
    } catch (error) {
      console.error('Error toggling follow:', error);
      alert(error.response?.data?.message || 'Failed to update follow status');
    } finally {
      setLoading(false);
    }
  };

  if (checking) {
    return <div className="follow-button skeleton"></div>;
  }

  return (
    <button
      onClick={handleFollowToggle}
      disabled={loading}
      className={`follow-button ${isFollowing ? 'following' : 'not-following'}`}
    >
      {loading ? (
        <span className="loader"></span>
      ) : isFollowing ? (
        <>
          <i className="fas fa-check"></i> Following
        </>
      ) : (
        <>
          <i className="fas fa-user-plus"></i> Follow
        </>
      )}
    </button>
  );
};

export default FollowButton;
