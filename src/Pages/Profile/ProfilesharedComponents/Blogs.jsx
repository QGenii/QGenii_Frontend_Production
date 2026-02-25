import {
  MoreVertical,
  Heart,
  MessageSquare,
  Repeat,
  Share,
  Edit3,
  Trash2,
  Bookmark,
  X,

} from "lucide-react";
import {  AiOutlineLike, AiFillLike, AiOutlineComment, AiOutlineRetweet, AiOutlineShareAlt, AiOutlineEdit, AiOutlineDelete, AiOutlineSend, AiOutlineClose} from 'react-icons/ai';
import { useState, useRef, useEffect } from "react";
import api from "../../../lib/api";
import { toast } from "react-hot-toast";

// Single Blog Card Component
function BlogCard({
  post,
  isRepost = false,
  repostData = null,
  onRefresh,
  currentUser,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post?.likeCount || 0);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editContent, setEditContent] = useState(post?.content || "");
  const [isWishlisted, setIsWishlisted] = useState(false);

  const [showComments, setShowComments] = useState(false);
  const [loadingComments, setLoadingComments] = useState(false);

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [commentCount, setCommentCount] = useState(post.commentCount || 0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const menuRef = useRef();

  const isAuthor = currentUser?._id === post?.author?._id;

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Check if user liked this post
  useEffect(() => {
    const checkLikeStatus = async () => {
      if (!currentUser?._id || !post?._id) return;
      try {
        const res = await api.get(`/blogs/${post._id}/likes`);
        const likes = res.data.data.likes || [];
        setIsLiked(likes.some((like) => like.user?._id === currentUser._id));
      } catch (err) {
        console.log(err);
      }
    };
    checkLikeStatus();
  }, [post?._id, currentUser?._id]);

  // Check if this blog is in wishlist
  useEffect(() => {
    const checkWishlistStatus = async () => {
      if (!currentUser?._id || !post?._id) return;
      try {
        const res = await api.get(`/wishlist/check/blogs/${post._id}`);
        setIsWishlisted(res.data.data.inWishlist);
      } catch (err) {
        console.log("Error checking wishlist status:", err);
      }
    };

    checkWishlistStatus();
  }, [post?._id, currentUser?._id]);

  const handleLike = async () => {
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
      alert(err.response?.data?.message || "Failed");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this post?")) return;
    try {
      await api.delete(`/blogs/${post._id}`);
      onRefresh();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete");
    }
  };

  const handleRemoveRepost = async () => {
    if (!window.confirm("Remove this repost?")) return;
    try {
      await api.delete(`/blogs/${post._id}/repost`);
      onRefresh();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to remove repost");
    }
  };

  const handleEdit = async () => {
    try {
      await api.patch(`/blogs/${post._id}`, { content: editContent });
      setShowEditModal(false);
      onRefresh();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update");
    }
  };

  const handleAddComment = async () => {
    console.log("hello");
    if (!currentUser._id) {
      toast.error("Please login to comment");
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
      toast.error(err.response?.data?.message || "Failed to add comment");
    } finally {
      setIsSubmitting(false);
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

  const handleShare = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/blog/view/${post._id}`
    );
    alert("Link copied!");
  };
  const toggleWishlist = async () => {
    if (!currentUser?._id) {
      toast.error("Please login to use wishlist");
      return;
    }

    try {
      if (isWishlisted) {
        await api.delete(`/wishlist/blogs/${post._id}`);
        setIsWishlisted(false);
        toast.success("Removed from wishlist");
        if (onRefresh) {
          onRefresh();
        }
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

  const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    if (seconds < 60) return "just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  if (!post) return null;

  return (
    <div className="max-w-md w-full rounded-2xl shadow-sm border p-4 relative bg-white">
      {/* Repost indicator */}
      {isRepost && (
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-2 pb-2 border-b">
          <Repeat size={14} /> You reposted
          {repostData?.comment && <span>: "{repostData.comment}"</span>}
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex gap-3">
          <img
            src={`https://ui-avatars.com/api/?name=${
              post.author?.name || "User"
            }&background=random`}
            alt=""
            className="h-10 w-10 rounded-full"
          />
          <div>
            <p className="font-semibold text-gray-900 text-sm">
              {post.author?.name || "User"}
            </p>
            <p className="text-xs text-gray-500">{timeAgo(post.createdAt)}</p>
          </div>
        </div>

        {/* 3 Dot Menu */}
        <div className="relative" ref={menuRef}>
          <div
            className="text-gray-500 hover:text-gray-700 cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <MoreVertical size={18} />
          </div>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg border p-2 z-20">
              {isAuthor && !isRepost && (
                <div
                  className="w-full flex  gap-2 px-2 py-2 hover:bg-gray-100 rounded-md cursor-pointer"
                  onClick={() => {
                    setShowEditModal(true);
                    setMenuOpen(false);
                  }}
                >
                  <Edit3 size={18} /> Edit
                </div>
              )}
              {isAuthor && !isRepost && (
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
              {isRepost && (
                <div
                  className="w-full text-nowrap flex items-center gap-2 px-2 py-2 hover:bg-gray-100 rounded-md cursor-pointer text-red-600"
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

      {/* Content */}
      <p className="mt-3 text-sm text-gray-700 leading-relaxed">
        {post.content}
      </p>

      {/* Image */}
      {post.coverImage && (
        <div className="mt-4 w-full rounded-xl overflow-hidden">
          <img
            src={post.coverImage}
            alt=""
            className="w-full h-64 object-cover"
          />
        </div>
      )}

      {/* Stats */}
      <div className="mt-2 text-xs text-gray-500">
        {likeCount} likes • {commentCount || 0} comments •{" "}
        {post.repostCount || 0} reposts
      </div>  

      {/* Footer */}
      <div className="mt-3 flex items-center justify-between border-t pt-3 text-sm text-gray-600">
        <div
          className={`flex items-center gap-2 cursor-pointer ${
            isLiked ? "text-red-500" : "hover:text-black"
          }`}
          onClick={handleLike}
        >
          <Heart size={16} fill={isLiked ? "currentColor" : "none"} /> Like
        </div>
        <div
          className="flex items-center gap-2 hover:text-black cursor-pointer"
           onClick={toggleComments}
        >
          <MessageSquare size={16} /> Comment
        </div>
        <div className="flex items-center gap-2 hover:text-black cursor-pointer">
          <Repeat size={16} /> Repost
        </div>
        <div
          className="flex items-center gap-2 hover:text-black cursor-pointer"
          onClick={handleShare}
        >
          <Share size={16} /> Share
        </div>
      </div>

      {/* Comments Section */}
        {showComments && (
          <div className="mt-4 border-t pt-4">
            <div className="flex gap-2 mb-3">
              <input
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
                className="flex-1 border rounded px-3 py-2 text-sm"
                placeholder="Write a comment..."
              />
              <button className="px-3 py-2 bg-blue-600 text-white rounded" onClick={handleAddComment} disabled={isSubmitting}><AiOutlineSend /></button>
            </div>

            {loadingComments ? (
              <p className="text-muted text-center">Loading comments...</p>
            ) : comments.length === 0 ? (
              <p className="text-center text-gray-400 text-sm">No comments yet</p>
            ) : (
              <div className="space-y-3">
                {comments.map(c => (
                  <div key={c._id} className="flex gap-3 p-3 bg-gray-50 rounded">
                    <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(c.user?.name || 'User')}&size=32&background=random`} alt="" className="w-8 h-8 rounded-full" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <strong className="text-sm">{c.user?.name || 'User'}</strong>
                        <small className="text-xs text-gray-400">{new Date(c.createdAt).toLocaleString()}</small>
                      </div>
                      <p className="text-sm text-gray-700 mt-1">{c.content}</p>
                      {(c.user?._id === currentUser._id || isAuthor) && (
                        <div className="mt-2">
                          <button className="text-sm text-red-600" onClick={() => handleDeleteComment(c._id)}>Delete</button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}


      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md relative">
            <button
              className="absolute top-4 right-4"
              onClick={() => setShowEditModal(false)}
            >
              <X size={20} />
            </button>
            <h3 className="text-lg font-semibold mb-4">Edit Post</h3>
            <textarea
              className="w-full border rounded-lg p-3 min-h-[120px]"
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
            />
            <button
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              onClick={handleEdit}
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Blogs() {
  const [myBlogs, setMyBlogs] = useState([]);
  const [myReposts, setMyReposts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlistBlogs, setWishlistBlogs] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

  const fetchData = async () => {
    setLoading(true);
    try {
      const [blogsRes, repostsRes, wishlistRes] = await Promise.all([
        api.get("/blogs/my/posts"),
        api.get("/blogs/my/reposts"),
        api.get("/wishlist"),
      ]);
      // Backend returns data as array directly
      setMyBlogs(blogsRes.data.data || []);
      setMyReposts(repostsRes.data.data || []);

      const wishlistData = wishlistRes.data?.data?.wishlist || {};
      const blogs = wishlistData.blogs || [];
      setWishlistBlogs(blogs);
    } catch (err) {
      console.log("Error fetching blogs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500">Loading blogs...</div>
    );
  }

  return (
    <div>
      {/* My Blogs */}
      <h1 className="text-lg font-semibold px-2 py-3">My Blogs</h1>
      <div className="flex flex-wrap px-4 gap-6 ">
        {myBlogs.length === 0 ? (
          <p className="text-gray-500 text-sm">
            No blogs yet. Create your first post!
          </p>
        ) : (
          myBlogs.map((post) => (
            <BlogCard
              key={post._id}
              post={post}
              onRefresh={fetchData}
              currentUser={currentUser}
            />
          ))
        )}
      </div>

      {/* My Reposts */}
      <h1 className="text-lg font-semibold px-2 py-3 mt-6">Reposted Blogs</h1>
      <div className="flex flex-wrap px- gap-6 ">
        {myReposts.length === 0 ? (
          <p className="text-gray-500 text-sm">No reposts yet.</p>
        ) : (
          myReposts.map((repost) => (
            <BlogCard
              key={repost.repostId || repost._id}
              post={repost}
              isRepost={true}
              repostData={{
                comment: repost.repostComment,
                _id: repost.repostId,
              }}
              onRefresh={fetchData}
              currentUser={currentUser}
            />
          ))
        )}
      </div>

      {/* Wishlisted Blogs */}
      <h1 className="text-lg font-semibold px-2 py-3 mt-6">Wishlisted Blogs</h1>
      <div className="flex flex-wrap px-4 gap-6 ">
        {wishlistBlogs.length === 0 ? (
          <p className="text-gray-500 text-sm">No wishlisted blogs yet.</p>
        ) : (
          wishlistBlogs.map((post) => (
            <BlogCard
              key={post._id}
              post={post}
              onRefresh={fetchData}
              currentUser={currentUser}
            />
          ))
        )}
      </div>
    </div>
  );
}
