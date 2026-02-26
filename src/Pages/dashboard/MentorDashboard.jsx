import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody } from '../../Components/ui/Card';
import { Button } from '../../Components/ui/Button';
import { Spinner } from '../../Components/ui/Spinner';
import api from '../../lib/api';
import { BookOpen, Plus, Edit, Eye, Trash2, FileText } from 'lucide-react';
import { Badge } from '../../Components/ui/Badge';
import { Sidebar } from '../../Components/layout/Sidebar';
import ContestsCatalog from '../Contest/ContestsCatalog';

export const MentorDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [stats, setStats] = useState({ total: 0, published: 0, draft: 0, pending: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMentorData();
  }, []);

  const fetchMentorData = async () => {
    try {
      // Fetch courses - backend automatically filters to show only mentor's courses
      const response = await api.get('/courses?limit=100');
      const myCourses = response.data.data;
      
      console.log('Mentor courses:', myCourses);
      setCourses(myCourses);
      
      // Calculate stats
      const total = myCourses.length;
      const published = myCourses.filter(c => c.isPublished && c.isApproved).length;
      const draft = myCourses.filter(c => !c.isPublished).length;
      const pending = myCourses.filter(c => !c.isApproved).length;
      
      setStats({ total, published, draft, pending });
    } catch (error) {
      console.error('Failed to fetch courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (courseId) => {
    if (!confirm('Are you sure you want to delete this course?')) return;

    try {
      await api.delete(`/courses/${courseId}`);
      fetchMentorData();
    } catch (error) {
      console.error('Failed to delete course:', error);
      alert('Failed to delete course');
    }
  };
  if (loading) {
    return (
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl py-2 flex gap-6">
        <Sidebar />
        <div className="flex-1">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Mentor Dashboard</h1>
            <p className="text-gray-600 mt-2">Manage your courses and track performance</p>
          </div>
          <Link to="/mentor/courses/create">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Course
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardBody>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Courses</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <div className="bg-blue-500 p-3 rounded-lg">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Published</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.published}</p>
                </div>
                <div className="bg-green-500 p-3 rounded-lg">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Drafts</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.draft}</p>
                </div>
                <div className="bg-yellow-500 p-3 rounded-lg">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Pending Approval</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.pending}</p>
                </div>
                <div className="bg-orange-500 p-3 rounded-lg">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Courses List */}
        <Card>
          <CardBody>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">My Courses</h2>
              <p className="text-sm text-gray-500">Showing only courses created by you</p>
            </div>
            {courses.length === 0 ? (
              <div className="text-center py-12 text-gray-600">
                <BookOpen className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p className="mb-4">You haven't created any courses yet</p>
                <Link to="/mentor/courses/create">
                  <Button>Create Your First Course</Button>
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Course
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Students
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {courses.map((course) => (
                      <tr key={course._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            {course.thumbnail && (
                              <img
                                src={course.thumbnail}
                                alt={course.title}
                                className="w-16 h-16 object-cover rounded"
                              />
                            )}
                            <div>
                              <div className="font-medium text-gray-900">
                                {course.title}
                              </div>
                              <div className="flex gap-2 mt-1">
                                <Badge variant="default">{course.type}</Badge>
                                <Badge variant="default">{course.level}</Badge>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {course.category?.name}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-1">
                            {course.isPublished ? (
                              <Badge variant="success">Published</Badge>
                            ) : (
                              <Badge variant="warning">Draft</Badge>
                            )}
                            {course.isApproved ? (
                              <Badge variant="success">Approved</Badge>
                            ) : (
                              <Badge variant="warning">Pending</Badge>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {course.enrollmentCount || 0}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <Link to={`/courses/${course._id}`} target="_blank">
                              <Button variant="secondary" className="text-xs">
                                <Eye className="w-3 h-3" />
                              </Button>
                            </Link>
                            <Link to={`/mentor/courses/${course._id}/manage`}>
                              <Button variant="primary" className="text-xs" title="Manage Course">
                                <FileText className="w-3 h-3" />
                              </Button>
                            </Link>
                            <Link to={`/mentor/courses/${course._id}/enrollments`}>
                              <Button variant="secondary" className="text-xs" title="Manage Students">
                                Students
                              </Button>
                            </Link>
                            <Link to={`/mentor/courses/edit/${course._id}`}>
                              <Button variant="secondary" className="text-xs">
                                <Edit className="w-3 h-3" />
                              </Button>
                            </Link>
                            <Button
                              variant="danger"
                              className="text-xs"
                              onClick={() => handleDelete(course._id)}
                            >
                              <Trash2 className="w-3 h-3" />
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
        {/* Mentor's contests */}
        <div className="mt-8">
          {/* <ContestsCatalog showOnlyMyContests /> */}
        </div>
      </div>
      </div>
    </div>
  );
};
