import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../../lib/api';

import { AiOutlineEye, AiOutlineSend } from 'react-icons/ai';

const EditPostPage = () => {
  const [postText, setPostText] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the image preview from location state or use a placeholder
  const [imagePreview, setImagePreview] = useState('null');
  
  useEffect(() => {
    // If we have an image from the previous step, use it
    if (location.state && location.state.imagePreview) {
      setImagePreview(location.state?.imagePreview);
    }
  }, [location.state]);  
  
  const handlePost = async () => {
    // For a direct post, go straight to success page


    const postCreate = await api.post('/blogs/', {
     
      content: postText,
      
      coverImage: imagePreview,
      
    });

    console.log(postCreate.data);

    if (postText.trim()) {



      navigate('/blog/post-success');
    }
  };
  
  const handlePreview = () => {
    // For preview, go to the preview page with both image and text
    navigate('/blog/new-post/preview', {
      state: {
        postText,
        imagePreview
      }
    });
  };
  
  const handleRewriteWithAI = () => {
    // AI rewrite logic would go here
    console.log('Rewriting with AI');
  };

  return (
    <div className="edit-post-page">
      {/* <MainNavbar /> */}
      <div className="container py-4">
        <div className="card shadow-sm mx-auto" style={{maxWidth: '600px'}}>
          <div className="card-body p-4">
            <div className="d-flex align-items-center mb-3">
              <img 
                src="https://ui-avatars.com/api/?name=Ritesh+Kumar&background=random" 
                alt="User" 
                className="rounded-circle me-3"
                width="50"
                height="50"
              />
              <div>
                <h6 className="mb-0">Ritesh Kumar</h6>
                <small className="text-muted">post to everyone</small>
              </div>
            </div>
            
            <div className="mb-4">
              <textarea 
                className="form-control border-0 mb-3"
                placeholder="what do you want to talk about..?"
                rows="4"
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                style={{resize: 'none'}}
              ></textarea>
              
              {imagePreview && (
                <div className="text-center bg-light p-3 mb-3">
                  <img 
                    src={imagePreview}
                    alt="Post content"
                    className="img-fluid"
                    style={{maxHeight: '200px'}}
                  />
                </div>
              )}
            </div>
            
            <div className="d-flex justify-content-between">
              <button 
                className="btn btn-outline-primary rounded-pill px-4"
                onClick={handleRewriteWithAI}
              >
                Rewrite With AI
              </button>
              
              <div>
                <button 
                  className="btn btn-outline-secondary rounded-pill px-4 me-2"
                  onClick={handlePreview}
                  disabled={!postText.trim()}
                  style={{ borderColor: '#0C316E', color: '#0C316E' }}
                >
                  <AiOutlineEye style={{ marginRight: '5px' }} /> Preview
                </button>
                <button 
                  className="btn rounded-pill px-5 text-white"
                  onClick={handlePost}
                  disabled={!postText.trim()}
                  style={{ backgroundColor: '#0C316E', borderColor: '#0C316E' }}
                >
                  <AiOutlineSend style={{ marginRight: '5px' }}  /> Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPostPage;