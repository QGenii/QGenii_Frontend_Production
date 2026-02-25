import { useState, useEffect } from 'react';
import { Sidebar } from '../../Components/layout/Sidebar';
import { Card, CardBody } from '../../Components/ui/Card';
import { Badge } from '../../Components/ui/Badge';
import { Button } from '../../Components/ui/Button';
import { Spinner } from '../../Components/ui/Spinner';
import api from '../../lib/api';

export const Approvals = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPendingUsers();
  }, []);

  const fetchPendingUsers = async () => {
    try {
      const response = await api.get('/admin/users?isApproved=false');
      // Filter to only show MENTOR and HIRING_PARTNER roles that need approval
      const pendingUsers = response.data.data.filter(
        (user) => user.role === 'MENTOR' || user.role === 'HIRING_PARTNER'
      );
      setUsers(pendingUsers);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (userId) => {
    try {
      await api.patch(`/admin/users/${userId}/approve`);
      setUsers(users.filter((u) => u._id !== userId));
      alert('User approved successfully!');
    } catch (error) {
      console.error('Failed to approve user:', error);
      const errorMessage = error.response?.data?.message || 'Failed to approve user';
      alert(errorMessage);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8 bg-gray-50">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Pending Approvals</h1>
          <p className="text-gray-600 mt-2">Review and approve mentor and hiring partner accounts</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Spinner size="lg" />
          </div>
        ) : users.length === 0 ? (
          <Card>
            <CardBody>
              <p className="text-center text-gray-600 py-8">
                No pending approvals at this time
              </p>
            </CardBody>
          </Card>
        ) : (
          <div className="space-y-4">
            {users.map((user) => (
              <Card key={user._id}>
                <CardBody>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">{user.name}</h3>
                        <Badge variant={user.role === 'MENTOR' ? 'primary' : 'warning'}>
                          {user.role}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-1">{user.email}</p>
                      <p className="text-sm text-gray-500">
                        Registered: {new Date(user.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="success"
                        onClick={() => handleApprove(user._id)}
                      >
                        Approve
                      </Button>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
