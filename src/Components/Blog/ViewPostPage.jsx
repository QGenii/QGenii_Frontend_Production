import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// import MainNavbar from '../MainNavbar';
import { AiOutlineLike, AiOutlineComment, AiOutlineShareAlt, AiOutlinePicture } from 'react-icons/ai';

const ViewPostPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const postData = location.state || {
    title: 'Title of the post',
    description: 'Description',
    image: '/placeholder-image.jpg'
  };

  const handleBack = () => {
    navigate('/blog');
  };

  return (
    <div className="view-post-page" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      {/* <MainNavbar /> */}
      
      <div className="container py-5">
        <h2 className="text-center mb-5" style={{ fontWeight: '600' }}>View Post</h2>
        
        <div className="card shadow-sm mx-auto" style={{ maxWidth: '560px', borderRadius: '8px', overflow: 'hidden' }}>
          <div className="card-body p-0">
            <div className="post-image bg-light p-4 text-center" style={{ backgroundColor: '#f8f9fa' }}>
              <div style={{ width: '70px', height: '70px', margin: '0 auto' }}>
                <div className="d-flex justify-content-center align-items-center" style={{ 
                  width: '100%', 
                  height: '100%', 
                  border: '2px solid #0C316E',
                  borderRadius: '4px'
                }}>
                  <AiOutlinePicture style={{ color: '#0C316E', fontSize: '32px' }} />
                </div>
              </div>
            </div>
            
            <div className="p-4">
              <h4 className="mb-2" style={{ fontWeight: '600' }}>Title of the post</h4>
              <p className="text-muted" style={{ fontSize: '14px' }}>Description</p>
              
              <div className="d-flex align-items-center mt-4 mb-4">
                <div className="d-flex align-items-center me-5">
                  <div className="d-flex align-items-center justify-content-center me-1" style={{ marginRight: '8px' }}>
                    <AiOutlineLike style={{ color: '#0C316E', fontSize: '20px' }} />
                  </div>
                  <span className="text-muted" style={{ fontSize: '14px' }}>30</span>
                </div>
                
                <div className="d-flex align-items-center me-5">
                  <div className="d-flex align-items-center justify-content-center me-1" style={{ marginRight: '8px' }}>
                    <AiOutlineComment style={{ color: '#0C316E', fontSize: '20px' }} />
                  </div>
                  <span className="text-muted" style={{ fontSize: '14px' }}>1</span>
                </div>
                
                <div className="d-flex align-items-center">
                  <div className="d-flex align-items-center justify-content-center me-1" style={{ marginRight: '8px' }}>
                    <AiOutlineShareAlt style={{ color: '#0C316E', fontSize: '20px' }} />
                  </div>
                  <span className="text-muted" style={{ fontSize: '14px' }}>2</span>
                </div>
              </div>
              
              <div className="mt-4 mb-3" style={{ backgroundColor: '#f8f9fa', padding: '12px', borderRadius: '4px' }}>
                <p className="mb-0" style={{ fontSize: '14px', color: '#666' }}>Top comment display</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-4">
          <button 
            className="btn px-5 py-2 text-white"
            onClick={handleBack}
            style={{ 
              borderRadius: '4px', 
              backgroundColor: '#0C316E',
              borderColor: '#0C316E',
              fontWeight: '500',
              minWidth: '120px',
              width: '120px'
            }}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewPostPage;