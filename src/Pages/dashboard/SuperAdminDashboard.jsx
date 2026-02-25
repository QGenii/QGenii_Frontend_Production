import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sidebar } from '../../Components/layout/Sidebar';
import { Card, CardBody } from '../../Components/ui/Card';
import { Spinner } from '../../Components/ui/Spinner';
import { Button } from '../../Components/ui/Button';
import { Badge } from '../../Components/ui/Badge';
import { Input } from '../../Components/ui/Input';
import api from '../../lib/api';
import { 
  Users, 
  BookOpen, 
  FolderOpen, 
  UserCheck, 
  Activity,
  AlertCircle,
  Shield,
  Trash2,
  Eye,
  Plus,
  Search,
  UserX
} from 'lucide-react';

export const SuperAdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCourses: 0,
    totalCategories: 0,
    pendingApprovals: 0,
    activeUsers: 0,
    blockedUsers: 0,
    totalAdmins: 0,
    totalSuperAdmins: 0,
    totalMentors: 0,
  });
  const [admins, setAdmins] = useState([]);
  const [filteredAdmins, setFilteredAdmins] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  useEffect(() => {
    // Filter admins based on search
    if (searchTerm) {
      const filtered = admins.filter(admin => 
        admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        admin.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredAdmins(filtered);
    } else {
      setFilteredAdmins(admins);
    }
  }, [searchTerm, admins]);

  const fetchDashboardData = async () => {
    try {
      const [usersRes, coursesRes, categoriesRes] = await Promise.all([
        api.get('/admin/users?limit=200'),
        api.get('/courses?limit=1'),
        api.get('/categories?limit=1'),
      ]);

      const allUsers = usersRes.data.data || [];

      // Filter admins and super admins
      const adminUsers = allUsers.filter(u => 
        u.role === 'ADMIN' || u.role === 'SUPER_ADMIN'
      );

      // Calculate active users (last 5 minutes)
      const activeUsers = allUsers.filter(u => {
        if (!u.lastActiveAt) return false;
        const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
        return new Date(u.lastActiveAt) > fiveMinutesAgo;
      }).length;

      setStats({
        totalUsers: allUsers.length,
        totalCourses: coursesRes.data.pagination?.total || 0,
        totalCategories: categoriesRes.data.pagination?.total || 0,
        pendingApprovals: allUsers.filter(u => !u.isApproved).length,
        activeUsers: activeUsers,
        blockedUsers: allUsers.filter(u => u.isBlocked).length,
        totalAdmins: adminUsers.filter(u => u.role === 'ADMIN').length,
        totalSuperAdmins: adminUsers.filter(u => u.role === 'SUPER_ADMIN').length,
        totalMentors: allUsers.filter(u => u.role === 'MENTOR').length,
      });

      setAdmins(adminUsers);
      setFilteredAdmins(adminUsers);

      // Mock recent activity
      setRecentActivity([
        { id: 1, action: 'Admin Created', user: 'Super Admin', time: '5 min ago', type: 'success' },
        { id: 2, action: 'User Blocked', user: 'Admin', time: '10 min ago', type: 'warning' },
        { id: 3, action: 'Course Approved', user: 'Admin', time: '15 min ago', type: 'info' },
        { id: 4, action: 'Mentor Approved', user: 'Super Admin', time: '20 min ago', type: 'success' },
        { id: 5, action: 'Category Created', user: 'Admin', time: '25 min ago', type: 'info' },
      ]);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAdmin = async (userId, userName, userRole) => {
    if (userRole === 'SUPER_ADMIN') {
      alert('Cannot delete Super Admin accounts');
      return;
    }

    if (!confirm(`Are you sure you want to remove admin privileges from ${userName}?`)) return;

    try {
      await api.delete(`/admin/users/${userId}`);
      alert('Admin removed successfully');
      fetchDashboardData();
    } catch (error) {
      console.error('Failed to remove admin:', error);
      alert(error.response?.data?.message || 'Failed to remove admin');
    }
  };

  const handleViewActivity = async (userId) => {
    try {
      const response = await api.get(`/admin/users/${userId}/activity`);
      alert(`Last Active: ${response.data.lastActiveAt || 'Never'}\nTotal Logins: ${response.data.loginCount || 0}`);
    } catch (error) {
      console.error('Failed to fetch activity:', error);
      alert('Failed to fetch user activity');
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 ml-64 flex justify-center items-center">
          <Spinner size="lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 ml-64">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                <Shield className="w-8 h-8 text-red-600" />
                Super Admin Dashboard
              </h1>
              <p className="text-gray-600 mt-2">Complete platform control and admin management</p>
            </div>
            <Link to="/dashboard/admins/create">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create Admin
              </Button>
            </Link>
          </div>

          {/* Primary Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardBody>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Total Users</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalUsers}</p>
                  </div>
                  <div className="bg-blue-500 p-3 rounded-lg">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Total Courses</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalCourses}</p>
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
                    <p className="text-3xl font-bold text-gray-900">{stats.totalCategories}</p>
                  </div>
                  <div className="bg-purple-500 p-3 rounded-lg">
                    <FolderOpen className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Pending Approvals</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.pendingApprovals}</p>
                  </div>
                  <div className="bg-yellow-500 p-3 rounded-lg">
                    <UserCheck className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Secondary Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardBody>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Active Now</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.activeUsers}</p>
                  </div>
                  <div className="bg-green-500 p-3 rounded-lg">
                    <Activity className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Super Admins</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalSuperAdmins}</p>
                  </div>
                  <div className="bg-red-500 p-3 rounded-lg">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Admins</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalAdmins}</p>
                  </div>
                  <div className="bg-indigo-500 p-3 rounded-lg">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Blocked Users</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.blockedUsers}</p>
                  </div>
                  <div className="bg-red-500 p-3 rounded-lg">
                    <UserX className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Admin Management Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Admin List */}
            <div className="lg:col-span-2">
              <Card>
                <CardBody>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Admin Management</h2>
                    <div className="flex gap-2">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          type="text"
                          placeholder="Search admins..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                        />
                      </div>
                      <Link to="/dashboard/admins/create">
                        <Button className="text-sm">
                          <Plus className="w-4 h-4 mr-1" />
                          Add
                        </Button>
                      </Link>
                    </div>
                  </div>

                  {filteredAdmins.length === 0 ? (
                    <p className="text-gray-500 text-center py-12">
                      {searchTerm ? 'No admins found matching your search' : 'No admins found'}
                    </p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50 border-b">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Admin
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Role
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Status
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Last Active
                            </th>
                            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {filteredAdmins.map((admin) => (
                            <tr key={admin._id} className="hover:bg-gray-50">
                              <td className="px-4 py-3">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                                    <Shield className={`w-5 h-5 ${admin.role === 'SUPER_ADMIN' ? 'text-red-600' : 'text-primary-600'}`} />
                                  </div>
                                  <div>
                                    <p className="font-medium text-gray-900">{admin.name}</p>
                                    <p className="text-sm text-gray-600">{admin.email}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-3">
                                <Badge variant={admin.role === 'SUPER_ADMIN' ? 'danger' : 'info'}>
                                  {admin.role === 'SUPER_ADMIN' ? 'Super Admin' : 'Admin'}
                                </Badge>
                              </td>
                              <td className="px-4 py-3">
                                {admin.isBlocked ? (
                                  <Badge variant="danger">Blocked</Badge>
                                ) : (
                                  <Badge variant="success">Active</Badge>
                                )}
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-600">
                                {admin.lastActiveAt 
                                  ? new Date(admin.lastActiveAt).toLocaleDateString()
                                  : 'Never'}
                              </td>
                              <td className="px-4 py-3">
                                <div className="flex justify-end gap-2">
                                  <Button
                                    variant="secondary"
                                    className="text-xs p-2"
                                    onClick={() => handleViewActivity(admin._id)}
                                  >
                                    <Eye className="w-3 h-3" />
                                  </Button>
                                  {admin.role !== 'SUPER_ADMIN' && (
                                    <Button
                                      variant="danger"
                                      className="text-xs p-2"
                                      onClick={() => handleDeleteAdmin(admin._id, admin.name, admin.role)}
                                    >
                                      <Trash2 className="w-3 h-3" />
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

                  <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
                    <span>Total: {filteredAdmins.length} admins</span>
                    <Link
                      to="/dashboard/users"
                      className="text-primary-600 hover:text-primary-700 font-medium"
                    >
                      View All Users →
                    </Link>
                  </div>
                </CardBody>
              </Card>
            </div>

            {/* Recent Activity */}
            <div>
              <Card>
                <CardBody>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Recent Activity</h2>
                    <Activity className="w-5 h-5 text-gray-400" />
                  </div>
                  <div className="space-y-3">
                    {recentActivity.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                      >
                        <div
                          className={`w-2 h-2 rounded-full mt-2 ${
                            activity.type === 'success'
                              ? 'bg-green-500'
                              : activity.type === 'warning'
                              ? 'bg-yellow-500'
                              : 'bg-blue-500'
                          }`}
                        />
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 text-sm">{activity.action}</p>
                          <p className="text-xs text-gray-600">by {activity.user}</p>
                        </div>
                        <span className="text-xs text-gray-500">{activity.time}</span>
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardBody>
              <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Link
                  to="/dashboard/approvals"
                  className="p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition text-center"
                >
                  <UserCheck className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                  <p className="font-medium text-gray-900">Review Approvals</p>
                  <p className="text-sm text-gray-600">{stats.pendingApprovals} pending</p>
                </Link>
                <Link
                  to="/dashboard/users"
                  className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition text-center"
                >
                  <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="font-medium text-gray-900">Manage Users</p>
                  <p className="text-sm text-gray-600">{stats.totalUsers} total</p>
                </Link>
                <Link
                  to="/dashboard/categories"
                  className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition text-center"
                >
                  <FolderOpen className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <p className="font-medium text-gray-900">Categories</p>
                  <p className="text-sm text-gray-600">{stats.totalCategories} total</p>
                </Link>
                <Link
                  to="/dashboard/courses"
                  className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition text-center"
                >
                  <BookOpen className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="font-medium text-gray-900">Courses</p>
                  <p className="text-sm text-gray-600">{stats.totalCourses} total</p>
                </Link>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};
