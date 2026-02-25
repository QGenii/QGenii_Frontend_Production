import React, { useState, useEffect } from "react";
import BlogPost from "./BlogPost";
import CreatePostBox from "./CreatePostBox";
import api from "../../lib/api";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { useAuth } from "../../hooks/useAuth";
import {
  AiOutlineCloudUpload,
  AiOutlinePicture,
  AiOutlineClose,
  AiOutlineSend,
  AiOutlineCheckCircle,
} from "react-icons/ai";


const BlogFeed = () => {
  const [posts, setposts] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // 1: Upload, 2: Edit, 3: Success
  const [preview, setPreview] = useState(null);
  const [postTitle, setPostTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const { user } = useAuth();

  const fetchPosts = async () => {
    try {
      const res = await api.get("/blogs");
      console.log(res.data.data);
      setposts(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleOpenDialog = () => {
    setDialogOpen(true);
    setCurrentStep(1);
    setPreview(null);
    setPostTitle("");
    setPostText("");
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setCurrentStep(1);
    setPreview(null);
    setPostTitle("");
    setPostText("");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    document.getElementById("dialog-file-upload").click();
  };

  const handleNextToEdit = () => {
    setCurrentStep(2);
  };

  const handleBackToUpload = () => {
    setCurrentStep(1);
  };

  const handlePost = async () => {
    if (!postTitle.trim() || !postText.trim()) return;

    setIsPosting(true);
    try {
      const postCreate = await api.post("/blogs/", {
        title: postTitle,
        content: postText,
        coverImage: preview,
      });
      console.log(postCreate.data);
      setCurrentStep(3);
      // Refresh posts list
      await fetchPosts();
    } catch (err) {
      console.log(err);
    } finally {
      setIsPosting(false);
    }
  };

  const handleDone = () => {
    handleCloseDialog();
  };

  // const posts = [
  //   {
  //     id: 1,
  //     author: 'Journal of the user dewline',
  //     authorId: 'dewline',
  //     content: 'Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description',
  //     image: '/placeholder-image.jpg',
  //     hasImage: true,
  //     hasVideo: false,
  //     timestamp: '2 hours ago'
  //   },
  //   {
  //     id: 2,
  //     author: 'Journal of the user dewline',
  //     authorId: 'dewline',
  //     content: 'Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description',
  //     image: null,
  //     hasImage: false,
  //     hasVideo: true,
  //     timestamp: '5 hours ago'
  //   }
  // ];

  // Step 1: Upload Content
  const renderUploadStep = () => (
    <div className="p-4 text-center">
      <h2 className="mb-4" style={{ color: "#0C316E", fontWeight: "bold" }}>
        NEW POST
      </h2>
      <div
        className="mb-4"
        style={{
          height: "120px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "100px",
            height: "100px",
            border: "2px solid #0C316E",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AiOutlinePicture style={{ fontSize: "50px", color: "#0C316E" }} />
        </div>
      </div>
      <h5 className="mb-3" style={{ color: "#0C316E" }}>
        Share The Images And Videos
      </h5>
      {preview && (
        <div className="mb-4">
          <img
            src={preview}
            alt="Preview"
            className="img-thumbnail"
            style={{ maxHeight: "180px" }}
          />
        </div>
      )}
      <input
        type="file"
        id="dialog-file-upload"
        style={{ display: "none" }}
        onChange={handleFileChange}
        accept="image/*,video/*"
      />
      <div className="flex justify-center items-center ">
        <button
          className="btn d-block w-100 py-2 rounded-pill text-white bg-red-400 mb-3 flex items-center justify-center px-4 rounded-2xl"
          onClick={handleUploadClick}
          style={{ backgroundColor: "#0C316E" }}
        >
          <AiOutlineCloudUpload
            style={{ marginRight: "8px", fontSize: "18px" }}
          />{" "}
          Upload from device
        </button>
      </div>
      {preview && (
        <button
          className="btn px-5 py-2 text-white rounded-pill rounded-2xl"
          onClick={handleNextToEdit}
          style={{ backgroundColor: "#0C316E" }}
        >
          Next
        </button>
      )}
    </div>
  );

  // Step 2: Edit/Write Content
  const renderEditStep = () => {


    const initials = (user?.name || "John Doe")
      .split(" ")
      .map((w) => w.charAt(0))
      .slice(0, 2)
      .join("")
      .toUpperCase();
    return (
      <div className="max-w-2xl mx-auto  backdrop-blur-md rounded-2xl  border border-gray-100 py-3">
        <div className="flex items-start gap-4 flex-col  ">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-semibold text-white bg-gradient-to-br from-indigo-500 via-cyan-500 to-emerald-400 shadow-md">
              {initials}
            </div>
          </div>

          {/* User info */}
          <div className="flex-1  w-full">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-800">
                  {user?.name || "John Doe"}
                </h3>
                <p className="text-sm text-slate-500">
                  Posting to{" "}
                  <span className="font-medium text-slate-700">Everyone</span>
                </p>
              </div>
              <div className="text-xs text-slate-400">Draft</div>
            </div>

            {/* Title Input */}
            <input
              type="text"
              className="mt-4 w-full rounded-xl border border-gray-200 p-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-300 transition-shadow font-semibold"
              placeholder="Add a title for your blog..."
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
              maxLength={200}
            />

            {/* Textarea */}
            <textarea
              className="mt-3 w-full min-h-[120px] rounded-xl border border-gray-200 p-4 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-300 transition-shadow resize-none"
              placeholder="What do you want to talk about..?"
              rows={4}
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              style={{ WebkitOverflowScrolling: "touch" }}
            />

            {/* Preview (if any) */}
            {preview && (
              <div className="mt-4 rounded-lg overflow-hidden border border-gray-100 bg-gray-50 p-2">
                <img
                  src={preview}
                  alt="Post preview"
                  className="w-full h-40 object-cover rounded-md"
                />
              </div>
            )}

            {/* Actions */}
            <div className="mt-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                {/* Example quick actions (icons can be added) */}
                <button
                  onClick={handleBackToUpload}
                  className="px-3 py-2 rounded-full border border-transparent hover:border-slate-200 text-sm bg-slate-50 shadow-sm transition"
                >
                  Back
                </button>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 mr-2">
                  {postText?.trim().length || 0} chars
                </span>

                <button
                  onClick={handlePost}
                  disabled={!postTitle?.trim() || !postText?.trim() || isPosting}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium shadow-md transition-transform active:scale-95
${!postTitle?.trim() || !postText?.trim() || isPosting
                      ? "opacity-60 cursor-not-allowed bg-slate-300 text-slate-600"
                      : "bg-[#0C316E] text-white"
                    }`}
                >
                  <AiOutlineSend className="text-lg" />
                  {isPosting ? "Posting..." : "Post"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  // );

  // Step 3: Success
  const renderSuccessStep = () => (
    <div className="p-5 text-center  flex flex-col justify-center items-center">
      <AiOutlineCheckCircle
        style={{ fontSize: "80px", color: "#28a745", marginBottom: "20px" }}
      />
      <h3 style={{ color: "#0C316E", marginBottom: "15px" }}>
        Post Created Successfully!
      </h3>
      <p className="text-muted mb-4">
        Your post has been published and is now visible in the blog section
        below.
      </p>
      <button
        className="btn px-5 py-2 text-white rounded-pill"
        onClick={handleDone}
        style={{ backgroundColor: "#0C316E" }}
      >
        Done
      </button>
    </div>
  );

  return (
    <div className="">
      <div className="mb-4 gap-4 mx-auto max-w-[50rem] ">
        <div className="flex justify-end gap-3">
          {/* <Button
          variant="contained"
          onClick={handleOpenDialog}
          style={{ backgroundColor: "#0C66FF" }}
        >
          Create New Post
        </Button> */}
          <Button
            variant="contained"
            onClick={handleOpenDialog}
            style={{ backgroundColor: "#0C66FF" }}
          >
            Create New Blog
          </Button>
        </div>
        <Dialog
          open={dialogOpen}
          onClose={handleCloseDialog}
          fullWidth
          PaperProps={{ style: { maxWidth: '50rem', width: '100%' } }}
        >
          <div style={{ position: "relative" }}>
            <IconButton
              onClick={handleCloseDialog}
              style={{ position: "absolute", right: 8, top: 8, zIndex: 1 }}
            >
              <AiOutlineClose />
            </IconButton>
            <DialogContent style={{ padding: 0 }}>
              {currentStep === 1 && renderUploadStep()}
              {currentStep === 2 && renderEditStep()}
              {currentStep === 3 && renderSuccessStep()}
            </DialogContent>
          </div>
        </Dialog>

        <CreatePostBox />
      </div>
      <div className="blog-feed w-full mx-auto backdrop-blur-md rounded-2xl border border-gray-100">

        <div className="w-full max-w-[50rem] mx-auto">
          {/* Single Page Dialog for Blog Creation Flow */}

          {posts.map((post) => (
            <BlogPost
              key={post._id || post.id}
              post={post}
              onPostUpdated={fetchPosts}
            />
          ))}
        </div>
      </div>
    </div>
  );
};



export default BlogFeed;

