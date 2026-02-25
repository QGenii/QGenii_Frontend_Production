import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '../../Components/ui/Button';
import { Spinner } from '../../Components/ui/Spinner';
import api from '../../lib/api';

export const UserActivityModal = ({ user, onClose }) => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchActivities();
  }, [user]);

  const fetchActivities = async () => {
    try {
      const response = await api.get(`/admin/users/${user._id}/activity?limit=20`);
      setActivities(response.data.data);
    } catch (error) {
      console.error('Failed to fetch activities:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">User Activity</h2>
            <p className="text-gray-600">{user.name} ({user.email})</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="flex justify-center py-12">
              <Spinner size="lg" />
            </div>
          ) : activities.length === 0 ? (
            <p className="text-center text-gray-600 py-12">
              No activity recorded yet
            </p>
          ) : (
            <div className="space-y-4">
              {activities.map((activity) => (
                <div
                  key={activity._id}
                  className="border-l-4 border-primary-500 bg-gray-50 p-4 rounded"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">
                        {activity.action.replace(/_/g, ' ')}
                      </div>
                      {activity.resource && (
                        <div className="text-sm text-gray-600 mt-1">
                          Resource: {activity.resource}
                        </div>
                      )}
                      {activity.ipAddress && (
                        <div className="text-sm text-gray-500 mt-1">
                          IP: {activity.ipAddress}
                        </div>
                      )}
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(activity.createdAt).toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end p-6 border-t">
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};
