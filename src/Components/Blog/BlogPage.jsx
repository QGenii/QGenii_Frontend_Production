import React from 'react';
import { Link } from 'react-router-dom';
// import MainNavbar from '../MainNavbar';
import BlogFeed from './BlogFeed';
import './Blog.css';

const BlogPage = () => {
  return (
    <div className="blog-page mx-auto bg-red-300">
      {/* <MainNavbar /> */}
      <div className="container mt-5  mx-auto">
        <div className="row mb-4">
          <div className="col-md-8 mx-auto">
            <div className="flex justify-content-between align-items-center  w-[50rem] mx-auto">
              <h1 className="h2 text-4xl text-black" style={{ fontWeight: 'bold', color: '#333' }}>Blog</h1>
            </div>
          </div> 
        </div>

        <div className="row">
          <div className="col-md-8 mx-auto">
            <BlogFeed />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;