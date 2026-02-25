import { useState, useEffect } from 'react';
import { listContestReviews, replyContestReview } from '../../lib/contestApi';
import { Spinner } from '../../Components/ui/Spinner';
import { Button } from '../../Components/ui/Button';
import { Star, MessageCircle, Send, Calendar } from 'lucide-react';

export default function ContestReviewsTab({ contestId }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (contestId) {
      fetchReviews();
    }
  }, [contestId]);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await listContestReviews(contestId);
      setReviews(response.data?.reviews || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load reviews');
    } finally {
      setLoading(false);
    }
  };

  const handleReplySubmit = async (reviewId) => {
    if (!replyText.trim()) return;
    try {
      setSubmitting(true);
      await replyContestReview(contestId, reviewId, { replyText: replyText.trim() });
      setReplyText('');
      setReplyingTo(null);
      await fetchReviews();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit reply');
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const renderStars = (rating) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
        <span className="ml-2 text-sm font-semibold text-gray-700">{rating}/5</span>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error && reviews.length === 0) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
        {error}
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
        <MessageCircle className="w-12 h-12 mx-auto text-gray-400 mb-3" />
        <h3 className="text-lg font-semibold text-gray-700 mb-1">No Reviews Yet</h3>
        <p className="text-gray-500">
          Reviews will appear here after the contest ends and participants submit feedback.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
        <div className="flex items-center text-blue-700">
          <MessageCircle className="w-5 h-5 mr-2" />
          <span className="font-semibold">Total Reviews: {reviews.length}</span>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">
          {error}
        </div>
      )}

      <div className="space-y-4">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Review Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">
                  {review.user?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">
                    {review.user?.name || 'Anonymous'}
                  </p>
                  <div className="flex items-center text-xs text-gray-500">
                    <Calendar className="w-3 h-3 mr-1" />
                    {formatDate(review.createdAt)}
                  </div>
                </div>
              </div>
              {renderStars(review.rating)}
            </div>

            {/* Review Text */}
            <div className="mb-4">
              <p className="text-gray-700 whitespace-pre-wrap">{review.reviewText}</p>
            </div>

            {/* Existing Reply */}
            {review.reply && (
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-3">
                <p className="text-sm font-semibold text-blue-900 mb-1">Creator's Reply:</p>
                <p className="text-sm text-gray-700 whitespace-pre-wrap">{review.reply.replyText}</p>
                <p className="text-xs text-gray-500 mt-2">
                  Replied on {formatDate(review.reply.repliedAt)}
                </p>
              </div>
            )}

            {/* Reply Form */}
            {replyingTo === review._id ? (
              <div className="space-y-3">
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Write your reply..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                  rows={3}
                  disabled={submitting}
                />
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleReplySubmit(review._id)}
                    disabled={!replyText.trim() || submitting}
                    size="sm"
                    className="flex items-center"
                  >
                    {submitting ? (
                      <Spinner size="sm" className="mr-2" />
                    ) : (
                      <Send className="w-4 h-4 mr-2" />
                    )}
                    {review.reply ? 'Update Reply' : 'Send Reply'}
                  </Button>
                  <Button
                    onClick={() => {
                      setReplyingTo(null);
                      setReplyText('');
                    }}
                    variant="outline"
                    size="sm"
                    disabled={submitting}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <Button
                onClick={() => {
                  setReplyingTo(review._id);
                  setReplyText(review.reply?.replyText || '');
                }}
                variant="outline"
                size="sm"
                className="flex items-center"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                {review.reply ? 'Edit Reply' : 'Reply'}
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
