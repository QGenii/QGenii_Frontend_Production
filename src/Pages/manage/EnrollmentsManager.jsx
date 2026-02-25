import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardBody } from '../../Components/ui/Card';
import { Button } from '../../Components/ui/Button';
import { Spinner } from '../../Components/ui/Spinner';
import { Badge } from '../../Components/ui/Badge';
import enrollmentApi from '../../lib/enrollmentApi';

export default function EnrollmentsManager() {
  const { courseId } = useParams();
  const [loading, setLoading] = useState(true);
  const [enrollments, setEnrollments] = useState([]);
  const [replyText, setReplyText] = useState({});

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await enrollmentApi.getCourseEnrollments(courseId, { limit: 100 });
      setEnrollments(res.data.data || []);
    } catch (e) {
      console.error('Failed to load enrollments', e);
      alert('Failed to load enrollments');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [courseId]);

  const toggleBlock = async (en) => {
    const nextBlocked = !en.blocked;
    const reason = nextBlocked ? prompt('Reason for blocking (optional):') : undefined;
    try {
      await enrollmentApi.setEnrollmentBlock(courseId, en.user._id, nextBlocked, reason);
      await fetchData();
    } catch (e) {
      console.error('Block/unblock failed', e);
      alert(e.response?.data?.message || 'Action failed');
    }
  };

  const sendReply = async (en) => {
    const text = replyText[en.user._id]?.trim();
    if (!text) return alert('Reply cannot be empty');
    try {
      await enrollmentApi.replyToReview(courseId, en.user._id, text);
      setReplyText((s) => ({ ...s, [en.user._id]: '' }));
      await fetchData();
    } catch (e) {
      console.error('Reply failed', e);
      alert(e.response?.data?.message || 'Reply failed');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Manage Enrollments</h1>
          <Link to={`/mentor/courses/${courseId}/modules`}>
            <Button variant="secondary">Back to Content</Button>
          </Link>
        </div>

        <Card>
          <CardBody>
            {enrollments.length === 0 ? (
              <div className="text-center text-gray-600 py-10">No students enrolled yet.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Progress</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Review</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {enrollments.map((en) => (
                      <tr key={en._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div>
                              <div className="font-medium text-gray-900">{en.user?.name}</div>
                              <div className="text-xs text-gray-500">{en.user?.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{en.progress || 0}%</td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {en.rating ? (
                            <div>
                              <div className="mb-1">Rating: <span className="font-semibold">{en.rating}</span>/5</div>
                              {en.review && <div className="text-gray-600">{en.review}</div>}
                              {en.reviewReply && (
                                <div className="mt-2 p-2 bg-gray-100 rounded text-gray-700">
                                  <div className="text-xs uppercase text-gray-500 mb-1">Your reply</div>
                                  {en.reviewReply}
                                </div>
                              )}
                              <div className="mt-2 flex gap-2">
                                <input
                                  type="text"
                                  value={replyText[en.user?._id] || ''}
                                  onChange={(e) => setReplyText((s) => ({ ...s, [en.user?._id]: e.target.value }))}
                                  className="border rounded px-2 py-1 text-sm w-64"
                                  placeholder="Write a reply..."
                                />
                                <Button size="sm" onClick={() => sendReply(en)}>Reply</Button>
                              </div>
                            </div>
                          ) : (
                            <span className="text-gray-400">No review</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-1">
                            {en.blocked ? (
                              <Badge variant="danger">Blocked</Badge>
                            ) : (
                              <Badge variant="success">Active</Badge>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant={en.blocked ? 'secondary' : 'danger'} size="sm" onClick={() => toggleBlock(en)}>
                              {en.blocked ? 'Unblock' : 'Block'}
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
