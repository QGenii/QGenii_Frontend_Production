import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardBody } from '../../Components/ui/Card';
import { Button } from '../../Components/ui/Button';
import { Spinner } from '../../Components/ui/Spinner';
import { Badge } from '../../Components/ui/Badge';
import enrollmentApi from '../../lib/enrollmentApi';
import { Star, MessageSquare, Clock } from 'lucide-react';

export default function CourseReviewsTab() {
  const { courseId } = useParams();
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [replyText, setReplyText] = useState({});
  const [showReplyForm, setShowReplyForm] = useState({});

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await enrollmentApi.getCourseEnrollments(courseId, { limit: 200 });
      const enrollments = res.data.data || [];
      
      // Filter only enrollments with reviews and sort by most recent
      const withReviews = enrollments
        .filter(en => en.rating || en.review)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      
      setReviews(withReviews);
    } catch (e) {
      console.error('Failed to load reviews', e);
      alert('Failed to load reviews');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [courseId]);

  const sendReply = async (enrollment) => {
    const text = replyText[enrollment._id]?.trim();
    if (!text) return alert('Reply cannot be empty');
    try {
      await enrollmentApi.replyToReview(courseId, enrollment.user._id, text);
      setReplyText(s => ({ ...s, [enrollment._id]: '' }));
      setShowReplyForm(s => ({ ...s, [enrollment._id]: false }));
      await fetchReviews();
    } catch (e) {
      console.error('Reply failed', e);
      alert(e.response?.data?.message || 'Reply failed');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderStars = (rating) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map(star => (
          <Star
            key={star}
            className={`w-4 h-4 ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
          />
        ))}
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

  return (
    <div className="space-y-4">
      {reviews.length === 0 ? (
        <Card>
          <CardBody>
            <div className="text-center py-12 text-gray-600">
              <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p>No reviews yet for this course</p>
            </div>
          </CardBody>
        </Card>
      ) : (
        <>
          <div className="mb-4">
            <h2 className="text-lg font-semibold">
              Course Reviews ({reviews.length})
            </h2>
            <p className="text-sm text-gray-600">Sorted by most recent</p>
          </div>

          {reviews.map((enrollment) => (
            <Card key={enrollment._id}>
              <CardBody>
                <div className="space-y-4">
                  {/* Student Info & Rating */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white font-semibold">
                        {enrollment.user?.name?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">
                          {enrollment.user?.name}
                        </div>
                        <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                          <Clock className="w-3 h-3" />
                          {formatDate(enrollment.createdAt)}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {renderStars(enrollment.rating)}
                      <span className="font-semibold text-gray-700">
                        {enrollment.rating}/5
                      </span>
                    </div>
                  </div>

                  {/* Review Text */}
                  {enrollment.review && (
                    <div className="pl-13">
                      <p className="text-gray-700 leading-relaxed">
                        {enrollment.review}
                      </p>
                    </div>
                  )}

                  {/* Progress Badge */}
                  <div className="pl-13">
                    <Badge variant={enrollment.completed ? 'success' : 'default'}>
                      {enrollment.completed ? 'Completed' : `${enrollment.progress}% progress`}
                    </Badge>
                  </div>

                  {/* Instructor Reply */}
                  {enrollment.reviewReply && (
                    <div className="pl-13 mt-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
                      <div className="flex items-center gap-2 mb-2">
                        <MessageSquare className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-semibold text-blue-900">
                          Instructor Reply
                        </span>
                        <span className="text-xs text-gray-500">
                          {formatDate(enrollment.reviewReplyAt)}
                        </span>
                      </div>
                      <p className="text-gray-700">{enrollment.reviewReply}</p>
                    </div>
                  )}

                  {/* Reply Form Toggle */}
                  <div className="pl-13 flex gap-2">
                    {!enrollment.reviewReply && (
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => setShowReplyForm(s => ({ ...s, [enrollment._id]: !s[enrollment._id] }))}
                      >
                        <MessageSquare className="w-3 h-3 mr-1" />
                        {showReplyForm[enrollment._id] ? 'Cancel' : 'Reply'}
                      </Button>
                    )}
                    {enrollment.reviewReply && (
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => setShowReplyForm(s => ({ ...s, [enrollment._id]: !s[enrollment._id] }))}
                      >
                        Update Reply
                      </Button>
                    )}
                  </div>

                  {/* Reply Input Form */}
                  {showReplyForm[enrollment._id] && (
                    <div className="pl-13 mt-3 p-4 bg-gray-50 rounded border">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Reply
                      </label>
                      <textarea
                        rows={3}
                        value={replyText[enrollment._id] || ''}
                        onChange={(e) => setReplyText(s => ({ ...s, [enrollment._id]: e.target.value }))}
                        placeholder="Write your response to the student..."
                        className="w-full border rounded px-3 py-2 text-sm"
                      />
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" onClick={() => sendReply(enrollment)}>
                          Send Reply
                        </Button>
                        <Button 
                          size="sm" 
                          variant="secondary"
                          onClick={() => setShowReplyForm(s => ({ ...s, [enrollment._id]: false }))}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </CardBody>
            </Card>
          ))}
        </>
      )}
    </div>
  );
}
