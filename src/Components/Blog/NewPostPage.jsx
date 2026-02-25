import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import MainNavbar from '../MainNavbar';
import { AiOutlinePicture, AiOutlineCloudUpload } from 'react-icons/ai';

const NewPostPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    document.getElementById('file-upload').click();
  };

  const handleNext = () => {
    // Proceed to the edit page with the selected image
    navigate('/blog/new-post/edit', { 
      state: { 
        imagePreview: preview 
      } 
    });
  };

  return (
    <div className="new-post-page">
      {/* <MainNavbar /> */}
      <div className="container py-5">
        <h1 className="text-center mb-5">NEW POST</h1>
        
        <div className="card shadow-sm mx-auto" style={{maxWidth: '600px'}}>
          <div className="card-body p-5 text-center">
            <div className="illustration-placeholder mb-4" style={{height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <div style={{ 
                width: '120px', 
                height: '120px', 
                border: '2px solid #0C316E',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <AiOutlinePicture style={{ fontSize: '60px', color: '#0C316E' }} />
              </div>
            </div>
            
            <h4 className="text-primary mb-3">Share The Images And Videos</h4>
            
            {preview ? (
              <div className="preview-container mb-4">
                <img 
                  src={preview} 
                  alt="Preview" 
                  className="img-thumbnail" 
                  style={{maxHeight: '200px'}}
                />
              </div>
            ) : null}
            
            <input
              type="file"
              id="file-upload"
              style={{display: 'none'}}
              onChange={handleFileChange}
              accept="image/*,video/*"
            />
            
            <button 
              className="btn d-block w-100 py-2 rounded-pill text-white"
              onClick={handleUploadClick}
              style={{ backgroundColor: '#0C316E', borderColor: '#0C316E' }}
            >
              <AiOutlineCloudUpload style={{ marginRight: '8px', fontSize: '18px' }} /> 
              Upload from device
            </button>
          </div>
        </div>
        
        {preview && (
          <div className="text-center mt-4">
            <button 
              className="btn px-5 py-2 text-white"
              onClick={handleNext}
              style={{ backgroundColor: '#0C316E', borderColor: '#0C316E' }}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewPostPage;