import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody } from '../../Components/ui/Card';
import { Spinner } from '../../Components/ui/Spinner';
import api from '../../lib/api';
import { BookOpen, FolderOpen, User, Briefcase, Clock, CheckCircle, XCircle } from 'lucide-react';

export const UserDashboard = () => {
  const [stats, setStats] = useState({
    enrolledCourses: 0,
    completedCourses: 0,
    categories: 0,
    totalApplications: 0,
    pendingApplications: 0,
    acceptedApplications: 0,
  });
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [recentCourses, setRecentCourses] = useState([]);
  const [myApplications, setMyApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      // Fetch user's enrolled courses
      const enrollmentsRes = await api.get('/enrollments');
      const enrollments = enrollmentsRes.data.data;
      setEnrolledCourses(enrollments);

      // Calculate stats
      const completedCount = enrollments.filter(e => e.completed).length;
      
      // Fetch courses for browsing
      const coursesRes = await api.get('/courses?limit=6');
      setRecentCourses(coursesRes.data.data);

      // Fetch categories count
      const categoriesRes = await api.get('/categories?limit=1');
      
      // Fetch user's job applications
      let applications = [];
      let totalApplications = 0;
      let pendingApplications = 0;
      let acceptedApplications = 0;
      
      try {
        const applicationsRes = await api.get('/job-applications/my-applications?limit=5');
        applications = applicationsRes.data.data?.applications || [];
        setMyApplications(applications);
        
        // Calculate job application stats
        totalApplications = applicationsRes.data.data?.pagination?.total || 0;
        pendingApplications = applications.filter(app => app.status === 'PENDING' || app.status === 'REVIEWING').length;
        acceptedApplications = applications.filter(app => app.status === 'ACCEPTED').length;
      } catch (appError) {
        console.log('Job applications not available:', appError.message);
      }
      
      setStats({
        enrolledCourses: enrollments.length,
        completedCourses: completedCount,
        categories: categoriesRes.data.pagination?.total || 0,
        totalApplications,
        pendingApplications,
        acceptedApplications,
      });
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Learning Dashboard</h1>
          <p className="text-gray-600 mt-2">Track your progress and explore new courses</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardBody>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Enrolled Courses</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.enrolledCourses}</p>
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
                  <p className="text-sm text-gray-600 mb-1">Completed</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.completedCourses}</p>
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
                  <p className="text-sm text-gray-600 mb-1">Categories</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.categories}</p>
                </div>
                <div className="bg-purple-500 p-3 rounded-lg">
                  <FolderOpen className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mb-8">
          <CardBody>
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Link
                to="/categories"
                className="p-4 bg-primary-50 rounded-lg hover:bg-primary-100 transition text-center"
              >
                <FolderOpen className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                <p className="font-medium text-gray-900">Browse Categories</p>
              </Link>
              <Link
                to="/categories"
                className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition text-center"
              >
                <BookOpen className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="font-medium text-gray-900">Explore Courses</p>
              </Link>
              <Link
                to="/jobs"
                className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition text-center"
              >
                <Briefcase className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="font-medium text-gray-900">Find Jobs</p>
              </Link>
              <Link
                to="/jobs/my-applications"
                className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition text-center"
              >
                <CheckCircle className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <p className="font-medium text-gray-900">My Applications</p>
              </Link>
            </div>
          </CardBody>
        </Card>

        {/* Job Applications Section */}
        {myApplications.length > 0 && (
          <Card className="mb-8">
            <CardBody>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">My Job Applications</h2>
                <Link
                  to="/jobs/my-applications"
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  View All →
                </Link>
              </div>
              
              {/* Application Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-blue-600 mb-1">Total Applications</p>
                      <p className="text-2xl font-bold text-blue-900">{stats.totalApplications}</p>
                    </div>
                    <Briefcase className="w-8 h-8 text-blue-600" />
                  </div>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-yellow-600 mb-1">In Progress</p>
                      <p className="text-2xl font-bold text-yellow-900">{stats.pendingApplications}</p>
                    </div>
                    <Clock className="w-8 h-8 text-yellow-600" />
                  </div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-green-600 mb-1">Accepted</p>
                      <p className="text-2xl font-bold text-green-900">{stats.acceptedApplications}</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                </div>
              </div>

              {/* Recent Applications */}
              <div className="space-y-3">
                {myApplications.map((application) => (
                  <Link
                    key={application._id}
                    to={`/jobs/${application.job._id}`}
                    className="block border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {application.job.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {application.job.company} • {application.job.location}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            application.status === 'ACCEPTED' ? 'bg-green-100 text-green-800' :
                            application.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                            application.status === 'SHORTLISTED' ? 'bg-blue-100 text-blue-800' :
                            application.status === 'REVIEWING' ? 'bg-yellow-100 text-yellow-800' :
                            application.status === 'WAITING' ? 'bg-purple-100 text-purple-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {application.status}
                          </span>
                          <span className="text-xs text-gray-500">
                            Applied {new Date(application.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        {application.status === 'ACCEPTED' && <CheckCircle className="w-6 h-6 text-green-600" />}
                        {application.status === 'REJECTED' && <XCircle className="w-6 h-6 text-red-600" />}
                        {application.status === 'PENDING' && <Clock className="w-6 h-6 text-gray-400" />}
                        {application.status === 'REVIEWING' && <Clock className="w-6 h-6 text-yellow-600" />}
                        {application.status === 'SHORTLISTED' && <CheckCircle className="w-6 h-6 text-blue-600" />}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </CardBody>
          </Card>
        )}

        {/* Recent Courses */}
        {enrolledCourses.length > 0 && (
          <Card className="mb-8">
            <CardBody>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">My Enrolled Courses</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {enrolledCourses.map((enrollment) => (
                  <Link
                    key={enrollment._id}
                    to={`/courses/${enrollment.course._id}`}
                    className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition"
                  >
                    {enrollment.course.thumbnail && (
                      <img
                        src={enrollment.course.thumbnail}
                        alt={enrollment.course.title}
                        className="w-full h-32 object-cover"
                      />
                    )}
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                        {enrollment.course.title}
                      </h3>
                      <div className="mb-2">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-primary-600 h-2 rounded-full transition-all"
                            style={{ width: `${enrollment.progress}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-600 mt-1">
                          {enrollment.progress}% Complete
                        </p>
                      </div>
                      {enrollment.completed && (
                        <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                          Completed
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </CardBody>
          </Card>
        )}

        {/* Recommended Courses */}
        <Card>
          <CardBody>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {enrolledCourses.length > 0 ? 'More Courses' : 'Recommended Courses'}
              </h2>
              <Link to="/categories" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentCourses.map((course) => (
                <Link
                  key={course._id}
                  to={`/courses/${course._id}`}
                  className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition"
                >
                  {course.thumbnail && (
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-32 object-cover"
                    />
                  )}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                      {course.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {course.shortDescription || course.description}
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-xs text-gray-500">{course.mentor?.name}</span>
                      {course.isPaid && (
                        <span className="text-sm font-bold text-primary-600">
                          ${course.price}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
