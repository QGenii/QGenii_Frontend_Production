import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AiOutlineCheck } from 'react-icons/ai';

const PostSuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [postData, setPostData] = useState(null);
  
  useEffect(() => {
    // Store the post data if available from the location state
    if (location.state) {
      setPostData(location.state);
    }
  }, [location.state]);
  
  const handleViewPost = () => {
    // Navigate to the view post page with the post data
    navigate('/blog/view-post', { state: postData });
  };

  return (
    <div className="post-success-page d-flex flex-column min-vh-100" style={{ backgroundColor: '#f8f9fa' }}>
      <div className="container py-5 my-auto">
        <div className="card shadow-sm mx-auto text-center" style={{maxWidth: '400px'}}>
          <div className="card-body py-5">
            <h2 className="mb-4">Posted successfully</h2>
            
            <div className="success-icon mb-4">
              <div className="rounded-circle mx-auto d-flex align-items-center justify-content-center" 
                style={{
                  width: '100px', 
                  height: '100px',
                  backgroundColor: '#e6f0ff'
                }}>
                <AiOutlineCheck style={{ 
                  fontSize: '3rem', 
                  color: '#0C316E' 
                }}/>
              </div>
            </div>
            
            <button 
              className="btn w-100 py-2 text-white"
              onClick={handleViewPost}
              style={{ 
                borderRadius: '4px', 
                backgroundColor: '#0C316E',
                borderColor: '#0C316E',
                fontWeight: '500',
                fontSize: '1rem'
              }}
            >
              View post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostSuccessPage;