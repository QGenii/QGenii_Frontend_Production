import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from "../../lib/api";
import { useAuth } from "../../hooks/useAuth";

const CreatePostBox = ({ onPostCreated }) => {
  const [postText, setPostText] = useState('');
  const navigate = useNavigate();
  const [isPosting, setIsPosting] = useState(false);

  const handleCreatePost = async () => {
    const trimmed = postText.trim();
    if (!trimmed || isPosting) return;

    setIsPosting(true);
    try {
      const firstLine = trimmed.split('\n')[0] || 'New post';
      const title = firstLine.slice(0, 80) || 'New post';

      await api.post("/blogs/", {
        title,
        content: trimmed,
      });

      setPostText('');
      if (onPostCreated) {
        onPostCreated();
      }
    } catch (err) {
      console.error("Failed to create quick post", err);
    } finally {
      setIsPosting(false);
    }
  };
  const EnterTitle = (e) => {
    setPostText(e.target.value);
    console.log(e.target.value);
  };

  const { user } = useAuth()
  ;
 const initials = (user?.name || 'User')
    .split(' ')
    .map((s) => s.charAt(0))
    .slice(0, 2)
    .join('')
    .toUpperCase()
  return (
    // <div className="create-post card mb-4 shadow-sm ">
    //   <div className="card-body p-4">
    //     <div className="d-flex align-items-center">
    //       <div className="user-avatar me-3">
    //         <div className="rounded-circle overflow-hidden" style={{ 
    //           width: '50px', 
    //           height: '50px', 
    //           backgroundColor: '#a0a0a0', 
    //           border: '1px solid #eee',
    //           display: 'flex',
    //           justifyContent: 'center',
    //           alignItems: 'center'
    //         }}>
    //           <span className="d-flex justify-content-center align-items-center text-white" 
    //             style={{ width: '100%', height: '100%', fontSize: '18px' }}>
    //             US
    //           </span>
    //         </div>
    //       </div>
    //       <input 
    //         type="text" 
    //         className="form-control rounded-pill border"
    //         placeholder="Write your post here"
    //         value={postText}
    //         onChange={EnterTitle}
           
    //         style={{ fontSize: '15px' }}
    //       />
    //     </div>
        
    //     <div className="d-flex pt-3 mt-2">
    //       <div className="d-flex">
    //         <button className="btn btn-link text-decoration-none me-4 d-flex align-items-center" onClick={handlePhotoUpload} style={{ color: '#555' }}>
    //           <AiOutlinePicture className="me-1" /> Photo
    //         </button>
    //         <button className="btn btn-link text-decoration-none d-flex align-items-center" onClick={handleVideoUpload} style={{ color: '#555' }}>
    //           <AiOutlineVideoCamera className="me-1" /> Video
    //         </button>
    //       </div>
    //       <div className="ms-auto">
    //         <button className="btn btn-primary px-4 rounded-pill" onClick={handleCreatePost}>
    //           Write Article
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </div>

     <div className="card mt-4  bg-white shadow-sm" style={{ borderRadius: 12 }}>
      <div className="card-body" style={{ padding: '22px' }}>
        <div className="d-flex align-items-center gap-3">
          {/* Avatar */}
          <div
            className="rounded-circle flex items-center justify-center rounded-full"
            style={{
              width: 36,
              height: 36,
              backgroundColor: '#e9ecef',
              color: '#6c757d',
              fontWeight: 600,
              border: '1px solid #eef2f5',
              flexShrink: 0,
            }}
          >
            {initials}
          </div>

          {/* Input (full width, multiline) */}
          <textarea
            className="form-control w-full mt-2"
            placeholder="Write your post here"
            value={postText}
            onChange={EnterTitle}
            rows={2}
            style={{
              borderRadius: 30,
              paddingLeft: 20,
              paddingRight: 20,
              paddingTop: 15,
              paddingBottom: 15,
              fontSize: 15,
              border: '1px solid #e6e9ee',
              background: 'white',
              resize: 'none',
            }}
          />
        </div>

        {/* Actions row */}
        <div className="d-flex align-items-center justify-content-end mt-3">
          <div className='flex justify-end '>
            <button
              type="button"
              className="btn"
              onClick={handleCreatePost}
              style={{
                backgroundColor: '#0C66FF',
                color: 'white',
                padding: '8px 22px',
                borderRadius: 999,
                boxShadow: '0 6px 18px rgba(5, 93, 246, 0.18)',
                border: 'none',
                fontWeight: 600,
              }}
              disabled={isPosting || !postText.trim()}
              >
              {isPosting ? 'Posting...' : 'Post'}
            </button>
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default CreatePostBox;