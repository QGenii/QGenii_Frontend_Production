import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlinePicture, AiOutlineVideoCamera } from 'react-icons/ai';
import { useAuth } from "../../hooks/useAuth";

const CreatePostBox = () => {
  const [postText, setPostText] = useState('');
  const [image, setImage] = useState(null);
   const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  const handleCreatePost = (e) => {
    console.log(e.target);
    // navigate('/blog/new-post');
  };
  const EnterTitle = (e) => {
    setPostText(e.target.value);
    console.log(e.target.value);
  };

  const handlePhotoUpload = (e) => {

       const file = e.target.files[0];

    console.log(setImage(file));
    setImage(file);

    setImagePreview(URL.createObjectURL(file));
    navigate('/blog/new-post');
  };

  const handleVideoUpload = () => {
    navigate('/blog/new-post');
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

          {/* Input (full width) */}
          <input
            type="text"
            className="form-control w-full mt-2"
            placeholder="Write your post here"
            value={postText}
            onChange={EnterTitle}
            style={{
              borderRadius: 30,
              paddingLeft: 20,
              paddingRight: 20,
              height: 44,
              fontSize: 15,
              border: '1px solid #e6e9ee',
              background: 'white',
            }}
          />
        </div>

        {/* Actions row */}
        <div className="d-flex align-items-center justify-content-between mt-3">
          <div className="flex align-items-center gap-[3rem]">
            <button
              type="button"
              className="btn btn-link d-flex align-items-center"
              onClick={handlePhotoUpload}
              style={{ color: '#6c757d', textDecoration: 'none' }}
            >
              <AiOutlinePicture style={{ marginRight: 8 }} />
              <span style={{ fontSize: 15 }}>Photo</span>
            </button>

            <button
              type="button"
              className="btn btn-link d-flex align-items-center"
              onClick={handleVideoUpload}
              style={{ color: '#6c757d', textDecoration: 'none' }}
            >
              <AiOutlineVideoCamera style={{ marginRight: 8 }} />
              <span style={{ fontSize: 15 }}>Video</span>
            </button>
          </div>

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
                boxShadow: '0 6px 18px rgba(12,102,255,0.18)',
                border: 'none',
                fontWeight: 600,
              }}
            >
              Write Article
            </button>
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default CreatePostBox;