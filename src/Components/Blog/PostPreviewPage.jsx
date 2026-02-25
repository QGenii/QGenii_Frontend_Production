import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';


const PostPreviewPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [postData, setPostData] = useState({
    postText: '',
    imagePreview: '/placeholder-image.jpg'
  });
  
  useEffect(() => {
    // Get post data from location state
    if (location.state) {
      setPostData({
        postText: location.state.postText || '',
        imagePreview: location.state.imagePreview || '/placeholder-image.jpg'
      });
    }
  }, [location.state]);
  
  // Format image for preview display
  const images = [
    { id: 1, src: postData.imagePreview }
  ];
  
  const handleNext = () => {
    // Pass the post data to the success page
    navigate('/blog/post-success', {
      state: postData
    });
  };

  return (
    <div className="post-preview-page py-4">
      {/* <MainNavbar /> */}
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="preview-count">
            <span>01/01</span>
          </div>
          <div></div>
        </div>
        
        <div className="row">
          <div className="col-md-5">
            <div className="preview-thumbnail mb-4">
              <img 
                src={images[0].src}
                alt="Preview"
                className="img-fluid"
                style={{maxWidth: '300px'}}
              />
              <button className="btn btn-light btn-sm edit-btn">
                <i className="fa fa-pencil"></i>
              </button>
            </div>
          </div>
          
          <div className="col-md-7">
            <div className="preview-main">
              <div className="card shadow-sm mb-3">
                <div className="card-body text-center p-4">
                  <img 
                    src={images[0].src}
                    alt="Main preview"
                    className="img-fluid mb-3"
                  />
                  <div className="d-flex justify-content-center">
                    <button className="btn btn-outline-primary btn-sm mx-1">
                      <i className="fa fa-copy"></i>
                    </button>
                    <button className="btn btn-outline-danger btn-sm mx-1">
                      <i className="fa fa-trash"></i>
                    </button>
                    <button className="btn btn-outline-primary btn-sm mx-1">
                      <i className="fa fa-plus"></i>
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="text-end">
                <button 
                  className="btn btn-outline-secondary me-2"
                  onClick={() => navigate('/blog/new-post/edit', { state: postData })}
                >
                  Back to Edit
                </button>
                <button 
                  className="btn btn-primary px-5"
                  onClick={handleNext}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPreviewPage;