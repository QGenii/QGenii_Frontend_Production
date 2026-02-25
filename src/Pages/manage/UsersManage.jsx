import { useState, useEffect } from 'react';
import { Sidebar } from '../../Components/layout/Sidebar';
import { Card, CardBody } from '../../Components/ui/Card';
import { Badge } from '../../Components/ui/Badge';
import { Button } from '../../Components/ui/Button';
import { Input } from '../../Components/ui/Input';
import { Select } from '../../Components/ui/Select';
import { Spinner } from '../../Components/ui/Spinner';
import { Pagination } from '../../Components/ui/Pagination';
import { UserActivityModal } from './UserActivityModal';
import api from '../../lib/api';
import { Shield, Ban, Unlock } from 'lucide-react';

export const UsersManage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    search: '',
    role: '',
    isApproved: '',
    isBlocked: '',
  });
  const [selectedUser, setSelectedUser] = useState(null);
  const [showActivityModal, setShowActivityModal] = useState(false);

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage, filters]);

  const fetchUsers = async (page) => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page,
        limit: 10,
        ...Object.fromEntries(
          Object.entries(filters).filter(([_, v]) => v !== '')
        ),
      });

      const response = await api.get(`/admin/users?${params}`);
      setUsers(response.data.data);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBlock = async (userId) => {
    const reason = prompt('Enter reason for blocking:');
    if (!reason) return;

    try {
      await api.patch(`/admin/users/${userId}/block`, { reason });
      fetchUsers(currentPage);
    } catch (error) {
      console.error('Failed to block user:', error);
      alert('Failed to block user');
    }
  };

  const handleUnblock = async (userId) => {
    if (!confirm('Are you sure you want to unblock this user?')) return;

    try {
      await api.patch(`/admin/users/${userId}/unblock`);
      fetchUsers(currentPage);
    } catch (error) {
      console.error('Failed to unblock user:', error);
      alert('Failed to unblock user');
    }
  };

  const viewActivity = (user) => {
    setSelectedUser(user);
    setShowActivityModal(true);
  };

  const roleOptions = [
    { value: '', label: 'All Roles' },
    { value: 'USER', label: 'User' },
    { value: 'MENTOR', label: 'Mentor' },
    { value: 'ADMIN', label: 'Admin' },
    { value: 'HIRING_PARTNER', label: 'Hiring Partner' },
  ];

  const approvalOptions = [
    { value: '', label: 'All' },
    { value: 'true', label: 'Approved' },
    { value: 'false', label: 'Pending' },
  ];

  const blockedOptions = [
    { value: '', label: 'All' },
    { value: 'false', label: 'Active' },
    { value: 'true', label: 'Blocked' },
  ];

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8 bg-gray-50">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600 mt-2">Manage all platform users</p>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Input
                placeholder="Search by name or email"
                value={filters.search}
                onChange={(e) =>
                  setFilters({ ...filters, search: e.target.value })
                }
              />
              <Select
                options={roleOptions}
                value={filters.role}
                onChange={(e) => setFilters({ ...filters, role: e.target.value })}
              />
              <Select
                options={approvalOptions}
                value={filters.isApproved}
                onChange={(e) =>
                  setFilters({ ...filters, isApproved: e.target.value })
                }
              />
              <Select
                options={blockedOptions}
                value={filters.isBlocked}
                onChange={(e) =>
                  setFilters({ ...filters, isBlocked: e.target.value })
                }
              />
            </div>
          </CardBody>
        </Card>

        {loading ? (
          <div className="flex justify-center py-12">
            <Spinner size="lg" />
          </div>
        ) : (
          <>
            <Card>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Role
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Last Active
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div>
                            <div className="font-medium text-gray-900">
                              {user.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {user.email}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant="default">{user.role}</Badge>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-1">
                            {user.isBlocked && (
                              <Badge variant="danger">Blocked</Badge>
                            )}
                            {!user.isApproved && (
                              <Badge variant="warning">Pending</Badge>
                            )}
                            {!user.isBlocked && user.isApproved && (
                              <Badge variant="success">Active</Badge>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {user.lastActiveAt
                            ? new Date(user.lastActiveAt).toLocaleString()
                            : 'Never'}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="secondary"
                              className="text-xs"
                              onClick={() => viewActivity(user)}
                            >
                              Activity
                            </Button>
                            {user.isBlocked ? (
                              <Button
                                variant="success"
                                className="text-xs"
                                onClick={() => handleUnblock(user._id)}
                              >
                                <Unlock className="w-3 h-3 mr-1" />
                                Unblock
                              </Button>
                            ) : (
                              user.role !== 'SUPER_ADMIN' && (
                                <Button
                                  variant="danger"
                                  className="text-xs"
                                  onClick={() => handleBlock(user._id)}
                                >
                                  <Ban className="w-3 h-3 mr-1" />
                                  Block
                                </Button>
                              )
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            {pagination.totalPages > 1 && (
              <div className="mt-6">
                <Pagination
                  currentPage={currentPage}
                  totalPages={pagination.totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </>
        )}

        {showActivityModal && selectedUser && (
          <UserActivityModal
            user={selectedUser}
            onClose={() => {
              setShowActivityModal(false);
              setSelectedUser(null);
            }}
          />
        )}
      </div>
    </div>
  );
};
