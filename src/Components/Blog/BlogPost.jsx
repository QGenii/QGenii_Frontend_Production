import React, { useState, useEffect, useRef } from "react";
import {
  AiOutlineLike,
  AiFillLike,
  AiOutlineComment,
  AiOutlineRetweet,
  AiOutlineShareAlt,
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineSend,
  AiOutlineClose,
} from "react-icons/ai";
import {
  MoreVertical,
  Edit3,
  Trash2,
  Bookmark,
  Linkedin,
  Youtube,
  Twitch,
  Facebook,
  Codepen,
} from "lucide-react";

// import { AiOutlineLike, AiFillLike, AiOutlineComment, AiOutlineRetweet, AiOutlineShareAlt, AiOutlineEdit, AiOutlineDelete, AiOutlineSend, AiOutlineClose } from 'react-icons/ai';
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import api from "../../lib/api";
import { toast } from "react-hot-toast";
import ShareButton from "../ui/ShareButton";

export default function BlogPost({ post, onPostUpdated }) {
  // // UI state

  const [showEdit, setShowEdit] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  // // Domain state (merged from bootstrap example)
  // const [likeCount, setLikeCount] = useState(post.likeCount || post.likes || 0);
  // const [commentCount, setCommentCount] = useState(post.commentCount || (post.comments && post.comments.length) || 0);
  // const [repostCount, setRepostCount] = useState(post.repostCount || post.reposts || 0);

  // const [comments, setComments] = useState(post.comments || []);
  // const [newComment, setNewComment] = useState('');
  // const [loadingComments, setLoadingComments] = useState(false);
  // const [editContent, setEditContent] = useState(post.content || '');
  // const [repostComment, setRepostComment] = useState('');
  // const [isSubmitting, setIsSubmitting] = useState(false);

  // const isAuthor = post.author && currentUser && post.author._id === currentUser._id;

  const [likeCount, setLikeCount] = useState(post.likeCount || 0);
  const [isLiked, setIsLiked] = useState(false);
  const [commentCount, setCommentCount] = useState(post.commentCount || 0);
  const [repostCount, setRepostCount] = useState(post.repostCount || 0);
  const [isReposted, setIsReposted] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loadingComments, setLoadingComments] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editContent, setEditContent] = useState(post.content);
  const [showRepostDialog, setShowRepostDialog] = useState(false);
  const [repostComment, setRepostComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 3 dot states
  const [menuOpen, setMenuOpen] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  //  const [showEditModal, setShowEditModal] = useState(false);
  const menuRef = useRef();
  const [showFollowMenu, setShowFollowMenu] = useState(false);
  const followMenuRef = useRef();
  const [hidden, setHidden] = useState(false);

  // Get current user from localStorage
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
  const isAuthor = currentUser._id === post.author?._id;

  // Check if current user has liked/reposted
  useEffect(() => {
    const checkUserStatus = async () => {
      if (!currentUser._id) return;
      try {
        const [likesRes, repostsRes] = await Promise.all([
          api.get(`/blogs/${post._id}/likes`),
          api.get(`/blogs/${post._id}/reposts`),
        ]);
        const likes = likesRes.data.data.likes || [];
        const reposts = repostsRes.data.data.reposts || [];
        setIsLiked(likes.some((like) => like.user?._id === currentUser._id));
        setIsReposted(
          reposts.some((repost) => repost.user?._id === currentUser._id)
        );
      } catch (err) {
        console.log("Error checking status:", err);
      }
    };
    checkUserStatus();
  }, [post._id, currentUser._id]);

  // Check if current user has wishlisted this blog
  useEffect(() => {
    const checkWishlistStatus = async () => {
      if (!currentUser._id) return;
      try {
        const res = await api.get(`/wishlist/check/blogs/${post._id}`);
        setIsWishlisted(res.data.data.inWishlist);
      } catch (err) {
        console.log("Error checking wishlist status:", err);
      }
    };

    checkWishlistStatus();
  }, [post._id, currentUser._id]);

  // Like/Unlike
  const handleLike = async () => {
    if (!currentUser._id) {
      alert("Please login to like posts");
      return;
    }
    try {
      if (isLiked) {
        const res = await api.delete(`/blogs/${post._id}/like`);
        setLikeCount(res.data.data.likeCount);
        setIsLiked(false);
      } else {
        const res = await api.post(`/blogs/${post._id}/like`);
        setLikeCount(res.data.data.likeCount);
        setIsLiked(true);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update like");
    }
  };

  // Load comments
  const loadComments = async () => {
    setLoadingComments(true);
    try {
      const res = await api.get(`/blogs/${post._id}/comments`);
      setComments(res.data.data.comments || []);
    } catch (err) {
      console.log("Error loading comments:", err);
    } finally {
      setLoadingComments(false);
    }
  };

  const toggleComments = () => {
    if (!showComments) {
      loadComments();
    }
    setShowComments(!showComments);
  };

  // Add comment
  const handleAddComment = async () => {
    if (!currentUser._id) {
      alert("Please login to comment");
      return;
    }
    if (!newComment.trim()) return;
    setIsSubmitting(true);
    try {
      const res = await api.post(`/blogs/${post._id}/comments`, {
        content: newComment,
      });
      setComments([res.data.data.comment, ...comments]);
      setCommentCount((prev) => prev + 1);
      setNewComment("");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add comment");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete comment
  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("Delete this comment?")) return;
    try {
      await api.delete(`/blogs/${post._id}/comments/${commentId}`);
      setComments(comments.filter((c) => c._id !== commentId));
      setCommentCount((prev) => Math.max(0, prev - 1));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete comment");
    }
  };

  // Repost
  const handleRepost = async () => {
    console.log("Repost Clicked !");

    if (!currentUser._id) {
      toast("Please login to repost");
      return;
    }

    if (isAuthor) {
      toast("You cannot repost your own post");
      return;
    }
    if (isReposted) {
      // Unrepost
      try {
        const res = await api.delete(`/blogs/${post._id}/repost`);
        setRepostCount(res.data.data.repostCount);
        setIsReposted(false);
      } catch (err) {
        alert(err.response?.data?.message || "Failed to unrepost");
      }
    } else {
      setShowRepostDialog(true);
    }
  };

  useEffect(() => {
    console.log(isReposted);
  }, [isReposted]);

  const confirmRepost = async () => {
    setIsSubmitting(true);
    try {
      const res = await api.post(`/blogs/${post._id}/repost`, {
        comment: repostComment,
      });
      setRepostCount(res.data.data.repostCount);
      setIsReposted(true);
      setShowRepostDialog(false);
      setRepostComment("");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to repost");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Edit post
  const handleEdit = async () => {
    if (!editContent.trim()) return;
    setIsSubmitting(true);
    try {
      await api.patch(`/blogs/${post._id}`, { content: editContent });
      setShowEditDialog(false);
      if (onPostUpdated) onPostUpdated();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update post");
    } finally {
      setIsSubmitting(false);
    }
  };

  

  // Delete post
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    setIsSubmitting(true);
    try {
      await api.delete(`/blogs/${post._id}`);
      if (onPostUpdated) onPostUpdated();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete post");
    } finally {
      setIsSubmitting(false);
    }
  };
  const toggleWishlist = async () => {
    if (!currentUser._id) {
      toast.error("Please login to use wishlist");
      return;
    }

    try {
      if (isWishlisted) {
        await api.delete(`/wishlist/blogs/${post._id}`);
        setIsWishlisted(false);
        toast.success("Removed from wishlist");
      } else {
        await api.post(`/wishlist/blogs/${post._id}`);
        setIsWishlisted(true);
        toast.success("Added to wishlist");
      }
    } catch (err) {
      console.log("Error updating wishlist:", err);
      toast.error(err.response?.data?.message || "Failed to update wishlist");
    }
  };

  const handleNotInterested = async () => {
    if (!currentUser._id) {
      toast("Please login to continue");
      return;
    }
    // Optimistically hide the post
    setHidden(true);
    let res;
    try {
      res = await api.post(`/blogs/${post._id}/not-interested`);
    } catch (err) {
      // revert on error
      setHidden(false);
      toast.error(err.response?.data?.message || "Failed to update");
      return;
    }

    const marked = res.data?.data?.marked;

    // Show Instagram-like toast with Undo
    toast(
      (t) => (
        <div className="flex items-center gap-3">
          <div className="flex-1 text-black">
            We'll show you fewer posts like this.
          </div>
          <button
            className="px-3 py-1 bg-black text-white rounded text-sm "
            onClick={async () => {
              toast.dismiss(t.id);
              try {
                // toggle back
                await api.post(`/blogs/${post._id}/not-interested`);
                setHidden(false);
                if (onPostUpdated) onPostUpdated();
              } catch (err) {
                toast.error(err.response?.data?.message || "Failed to undo");
              }
            }}
          >
            Undo
          </button>
        </div>
      ),
      { duration: 6000 }
    );

    if (onPostUpdated) onPostUpdated();
  };

  const handleRemoveRepost = async () => {
    if (!window.confirm("Remove this repost?")) return;
    try {
      await api.delete(`/blogs/${post._id}/repost`);
      if (onPostUpdated) onPostUpdated();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to remove repost");
    }
  };

  return (
    <div className="w-full">
      <div className="w-full max-w-[50rem] mx-auto rounded-lg shadow-md overflow-hidden mt-3 flex flex-col justify-center">
        <div className="p-5 flex flex-col ">
          {/* Header */}
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-gray-100 border border-gray-200 overflow-hidden flex-shrink-0">
              <img
                src={
                  post.author?.avatar ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    post.author?.name || "User"
                  )}&background=random`
                }
                alt={post.author?.name || "User"}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1">
              <div className="flex items-center">
                <div>
                  <h6 className="text-sm font-medium text-gray-900">
                    {post.author?.name || "Anonymous"}
                  </h6>
                  <p className="text-xs text-gray-500">
                    {post.createdAt
                      ? new Date(post.createdAt).toLocaleString()
                      : "Just now"}
                  </p>
                </div>

                <div className="ml-auto flex items-center gap-2">
                  {isAuthor ? (
                    <>
                      <div className="relative">
                        <button
                          onClick={() => setShowMenu((prev) => !prev)}
                          className="px-2 py-1 text-gray-600 hover:bg-gray-100 rounded"
                        >
                          ⋮
                        </button>
                        {showMenu && (
                          <div className="absolute right-0 mt-1 w-28 bg-white border rounded shadow-md z-10">
                            <button
                              className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100"
                              onClick={() => {
                                setEditContent(post.content || "");
                                setShowEditDialog(true);
                                setShowMenu(false);
                              }}
                            >
                              Edit
                            </button>
                            <button
                              className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                              onClick={() => {
                                handleDelete();
                                setShowMenu(false);
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <div className="relative" ref={followMenuRef}>
                      <button
                        onClick={() => setShowFollowMenu((prev) => !prev)}
                        className="px-2 py-1 text-gray-600 hover:bg-gray-100 rounded"
                      >
                        ⋮
                      </button>
                      {showFollowMenu && (
                        <div className="absolute right-0 mt-1 w-48 bg-white border rounded shadow-md z-10">
                          <button
                            className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 text-gray-700"
                            onClick={() => {
                              handleNotInterested();
                              setShowFollowMenu(false);
                            }}
                          >
                            Not interested
                          </button>
                          <button
                            className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 text-gray-700"
                            onClick={() => {
                              toggleWishlist();
                              setShowFollowMenu(false);
                            }}
                          >
                            <Bookmark
                              size={16}
                              fill={isWishlisted ? "currentColor" : "none"}
                              className={isWishlisted ? "text-red-500" : ""}
                            />
                            {isWishlisted ? "Wishlisted" : "Wishlist"}
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                {/* 3 Dot Menu */}
                <div className="relative" ref={menuRef}>
                  <div
                    className="text-gray-500 hover:text-gray-700 cursor-pointer"
                    onClick={() => setMenuOpen(!menuOpen)}
                  >
                    {/* <MoreVertical size={18} /> */}
                  </div>
                  {menuOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg border p-2 z-20">
                      {isAuthor && !isReposted && (
                        <div
                          className="w-full flex  gap-2 px-2 py-2 hover:bg-gray-100 rounded-md cursor-pointer"
                          onClick={() => {
                            setShowEditDialog(true);
                            setMenuOpen(false);
                          }}
                        >
                          <Edit3 size={18} /> Edit
                        </div>
                      )}
                      {isAuthor && !isReposted && (
                        <div
                          className="w-full flex items-center gap-2 px-2 py-2 hover:bg-gray-100 rounded-md cursor-pointer text-red-600"
                          onClick={() => {
                            handleDelete();
                            setMenuOpen(false);
                          }}
                        >
                          <Trash2 size={18} /> Delete
                        </div>
                      )}
                      {isReposted && (
                        <div
                          className="w-full flex items-center gap-2 px-2 py-2 hover:bg-gray-100 rounded-md cursor-pointer text-red-600"
                          onClick={() => {
                            handleRemoveRepost();
                            setMenuOpen(false);
                          }}
                        >
                          <Trash2 size={18} /> Remove Repost
                        </div>
                      )}
                      <div
                        className={`w-full flex items-center gap-2 px-2 py-2 hover:bg-gray-100 rounded-md cursor-pointer ${
                          isWishlisted ? "text-red-500" : ""
                        }`}
                        onClick={() => {
                          toggleWishlist();
                          setMenuOpen(false);
                        }}
                      >
                        <Bookmark
                          size={18}
                          fill={isWishlisted ? "currentColor" : "none"}
                        />{" "}
                        {isWishlisted ? "Wishlisted" : "Wishlist"}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <p className="text-gray-700 text-sm mb-4 whitespace-pre-wrap">
            {post.content}
          </p>

          {/* Cover Image */}
          {post.coverImage ? (
            <div className="mb-4 text-center">
              <img
                src={post.coverImage}
                alt="cover"
                className="w-full max-h-80 object-cover rounded"
              />
            </div>
          ) : (
            <div className="mb-4 bg-gray-100 rounded h-48 flex items-center justify-center">
              <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center">
                <svg
                  width="36"
                  height="24"
                  viewBox="0 0 24 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="24" height="16" rx="2" fill="#E5E7EB" />
                  <path
                    d="M5 11l3-4 4 5 5-6 3 4"
                    stroke="#9CA3AF"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          )}

          {/* Stats */}
          <div className="flex text-gray-500 text-sm gap-4 mb-3">
            <div>{likeCount} likes</div>
            <div>{commentCount} comments</div>
            <div>{repostCount} reposts</div>
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center border-t pt-3 px-8">
            <button
              className={`flex items-center gap-2 text-sm ${
                isLiked ? "text-blue-700" : "text-gray-600"
              }`}
              onClick={handleLike}
            >
              {isLiked ? <AiFillLike /> : <AiOutlineLike />} <span>Like</span>
            </button>

            <button
              className={`flex items-center gap-2 text-sm ${
                showComments ? "text-blue-700" : "text-gray-600"
              }`}
              onClick={toggleComments}
            >
              <AiOutlineComment /> <span>Comment</span>
            </button>

            <button
              className={`flex items-center gap-2 text-sm ${
                isReposted ? "text-green-600" : "text-gray-600"
              }`}
              onClick={handleRepost}
            >
              <AiOutlineRetweet />{" "}
              <span>{isReposted ? "Reposted" : "Repost"}</span>
            </button>
            <ShareButton
              url={`${window.location.origin}/blog/view/${post._id}`}
            />
          </div>

          {/* Comments Section */}
          {showComments && (
            <div className="mt-4 border-t pt-4">
              <div className="flex gap-2 mb-3">
                <input
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
                  className="flex-1 border rounded px-3 py-2 text-sm"
                  placeholder="Write a comment..."
                />
                <button
                  className="px-3 py-2 bg-blue-600 text-white rounded"
                  onClick={handleAddComment}
                  disabled={isSubmitting}
                >
                  <AiOutlineSend />
                </button>
              </div>

              {loadingComments ? (
                <p className="text-muted text-center">Loading comments...</p>
              ) : comments.length === 0 ? (
                <p className="text-center text-gray-400 text-sm">
                  No comments yet
                </p>
              ) : (
                <div className="space-y-3">
                  {comments.map((c) => (
                    <div
                      key={c._id}
                      className="flex gap-3 p-3 bg-gray-50 rounded"
                    >
                      <img
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                          c.user?.name || "User"
                        )}&size=32&background=random`}
                        alt=""
                        className="w-8 h-8 rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <strong className="text-sm">
                            {c.user?.name || "User"}
                          </strong>
                          <small className="text-xs text-gray-400">
                            {new Date(c.createdAt).toLocaleString()}
                          </small>
                        </div>
                        <p className="text-sm text-gray-700 mt-1">
                          {c.content}
                        </p>
                        {(c.user?._id === currentUser._id || isAuthor) && (
                          <div className="mt-2">
                            <button
                              className="text-sm text-red-600"
                              onClick={() => handleDeleteComment(c._id)}
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Edit Modal */}
        {showEditDialog && (
          <div className="fixed inset-0 bg-black/40 z-40 flex items-start justify-center pt-20">
            <div className="bg-white w-full max-w-lg rounded shadow p-6 relative">
              <button
                className="absolute top-3 right-3 text-gray-500"
                onClick={() => setShowEditDialog(false)}
              >
                <AiOutlineClose />
              </button>
              <h5 className="text-lg font-medium mb-3">Edit Post</h5>
              <textarea
                className="w-full border rounded p-3 mb-3"
                rows={4}
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
              />
              <div className="flex justify-end gap-2">
                <button
                  className="px-4 py-2 border rounded"
                  onClick={() => setShowEdit(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                  onClick={handleEdit}
                  disabled={isSubmitting}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Repost Modal */}
        {showRepostDialog && (
          <div className="fixed inset-0 bg-black/40 z-40 flex items-start justify-center pt-20">
            <div className="bg-white w-full max-w-lg rounded shadow p-6 relative">
              <button
                className="absolute top-3 right-3 text-gray-500"
                onClick={() => setShowRepostDialog(false)}
              >
                <AiOutlineClose />
              </button>
              <h5 className="text-lg font-medium mb-3">Repost</h5>
              <textarea
                className="w-full border rounded p-3 mb-3"
                rows={3}
                placeholder="Add a comment (optional)"
                value={repostComment}
                onChange={(e) => setRepostComment(e.target.value)}
              />
              <div className="flex justify-end gap-2">
                <button
                  className="px-4 py-2 border rounded"
                  onClick={() => setShowRepostDialog(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-green-600 text-white rounded"
                  onClick={confirmRepost}
                  disabled={isSubmitting}
                >
                  Repost
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// export default BlogPost;
