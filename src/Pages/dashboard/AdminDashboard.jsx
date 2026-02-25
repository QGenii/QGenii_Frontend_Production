import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sidebar } from '../../Components/layout/Sidebar';
import { Card, CardBody } from '../../Components/ui/Card';
import { Button } from '../../Components/ui/Button';
import { Spinner } from '../../Components/ui/Spinner';
import { Badge } from '../../Components/ui/Badge';
import api from '../../lib/api';
import { 
  Users, 
  UserCheck, 
  UserX, 
  Activity,
  BookOpen,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Settings
} from 'lucide-react';


export const AdminDashboard = () => {
  const [metrics, setMetrics] = useState(null);
  const [courses, setCourses] = useState([]);
  const [contests, setContests] = useState([]);
  const [courseStats, setCourseStats] = useState({ total: 0, approved: 0, pending: 0 });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview'); // overview, courses

  useEffect(() => {
    fetchMetrics();
    fetchCourses();
    fetchContests();
  }, []);

  const fetchContests = async () => {
    try {
      const resp = await api.get('/contests', { params: { limit: 20 } });
      // API returns { data: [...], pagination }
      const list = resp.data?.data || resp.data || [];
      setContests(list);
      console.log('Fetched contests:', list);
    } catch (err) {
      console.error('Failed to fetch contests', err);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await api.get('/courses?limit=100');
      const allCourses = response.data.data;
      setCourses(allCourses);
      
      const total = allCourses.length;
      const approved = allCourses.filter(c => c.isApproved).length;
      const pending = allCourses.filter(c => !c.isApproved).length;
      setCourseStats({ total, approved, pending });
    } catch (error) {
      console.error('Failed to fetch courses:', error);
    }
  };

  const handleApproveCourse = async (courseId, isApproved) => {
    const action = isApproved ? 'approve' : 'reject';
    if (!confirm(`Are you sure you want to ${action} this course?`)) return;

    try {
      await api.patch(`/courses/${courseId}/approve`, { isApproved });
      fetchCourses();
    } catch (error) {
      console.error(`Failed to ${action} course:`, error);
      alert(`Failed to ${action} course`);
    }
  };

  const fetchMetrics = async () => {
    try {
      const response = await api.get('/admin/metrics');
      setMetrics(response.data.data);
    } catch (error) {
      console.error('Failed to fetch metrics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex">
        <Sidebar />
        <div className="flex-1 flex justify-center items-center min-h-screen">
          <Spinner size="lg" />
        </div>
      </div>
    );
  }

  const stats = [
    {
      name: 'Total Users',
      value: metrics?.totalUsers || 0,
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      name: 'Total Courses',
      value: courseStats.total,
      icon: BookOpen,
      color: 'bg-purple-500',
    },
    {
      name: 'Pending Courses',
      value: courseStats.pending,
      icon: Clock,
      color: 'bg-orange-500',
    },
    {
      name: 'Pending Approvals',
      value: metrics?.pendingApprovals || 0,
      icon: UserCheck,
      color: 'bg-yellow-500',
    },
  ];

  return (
    <div className="flex ">
      <Sidebar />
      <div className="flex-1 p-8 ">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Overview of your platform</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 ">
          {stats.map((stat) => (
            <Card key={stat.name}>
              <CardBody>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.name}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>

        

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-6 border-b">
          <button
            className={`pb-2 px-4 font-medium ${
              activeTab === 'overview'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`pb-2 px-4 font-medium ${
              activeTab === 'courses'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
            onClick={() => setActiveTab('courses')}
          >
            Course Approvals ({courseStats.pending})
          </button>
          <button
            className={`pb-2 px-4 font-medium ${
              activeTab === 'recent-contests'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
            onClick={() => setActiveTab('recent-contests')}
          >
           Recent Contests 
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardBody>
                <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
                <p className="text-gray-600">Activity tracking coming soon...</p>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                <div className="space-y-2">
                  <button
                    onClick={() => setActiveTab('courses')}
                    className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                  >
                    Review Pending Courses ({courseStats.pending})
                  </button>
                    <Link
                      to="/admin/courses/create"
                      className="block p-3 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition"
                    >
                      + Create New Course
                    </Link>
                    {/* <div className="mt-2">
                      <AdminContestPanel onCreated={(c) => { console.log('created', c); }} />
                    </div> */}
                  <a
                    href="/dashboard/approvals"
                    className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                  >
                    Review Pending Approvals
                  </a>
                  <a
                    href="/dashboard/users"
                    className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                  >
                    Manage Users
                  </a>
                  <a
                    href="/dashboard/categories"
                    className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                  >
                    Manage Categories
                  </a>
                </div>
              </CardBody>
            </Card>
          </div>
        )}

        {/* Courses Tab */}
        {activeTab === 'courses' && (
          <Card>
            <CardBody>
              <h2 className="text-xl font-semibold mb-4">Course Approvals</h2>
              {courses.length === 0 ? (
                <div className="text-center py-12 text-gray-600">
                  <BookOpen className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p>No courses found</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Course</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mentor</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Students</th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {courses.map((course) => (
                        <tr key={course._id} className="hover:bg-gray-50">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              {course.thumbnail && (
                                <img src={course.thumbnail} alt={course.title} className="w-12 h-12 object-cover rounded" />
                              )}
                              <div className="text-sm font-medium text-gray-900">{course.title}</div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">{course.mentor?.name}</td>
                          <td className="px-4 py-3">
                            {course.isApproved ? (
                              <Badge variant="success">Approved</Badge>
                            ) : (
                              <Badge variant="warning">Pending</Badge>
                            )}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">{course.enrollmentCount || 0}</td>
                          <td className="px-4 py-3 text-right">
                            <div className="flex justify-end gap-2">
                              <Link to={`/courses/${course._id}`} target="_blank">
                                <Button variant="secondary" className="text-xs">
                                  <Eye className="w-3 h-3" />
                                </Button>
                              </Link>
                              {!course.isApproved ? (
                                <Button variant="primary" className="text-xs" onClick={() => handleApproveCourse(course._id, true)}>
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Approve
                                </Button>
                              ) : (
                                <Button variant="danger" className="text-xs" onClick={() => handleApproveCourse(course._id, false)}>
                                  <XCircle className="w-3 h-3 mr-1" />
                                  Reject
                                </Button>
                              )}
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
        )}

        {activeTab === 'recent-contests' && (
            <Card>
              <CardBody>
                <h3 className="text-lg font-semibold mb-3">Recent Contests</h3>
                {contests.length === 0 ? (
                  <p className="text-sm text-gray-500">No contests yet</p>
                ) : (
                  <ul className="space-y-2">
                    {contests.slice(0, 8).map((c) => (
                      <li key={c._id} className="flex items-start justify-between">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{c.title}</div>
                          <div className="text-xs text-gray-500">{new Date(c.startTime).toLocaleString()}</div>
                        </div>
                        <div className="text-xs text-gray-500">{c.status}</div>
                      </li>
                    ))}
                  </ul>
                )}
              </CardBody>
            </Card>
        )}
      </div>
    </div>
  );
};
