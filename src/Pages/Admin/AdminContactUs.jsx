import React, { useState, useEffect } from 'react';
import { Card, CardBody } from '../../Components/ui/Card';
import { Button } from '../../Components/ui/Button';
import { Spinner } from '../../Components/ui/Spinner';
import { contactApi } from '../../lib/contactApi';
import { 
  Mail, 
  Phone, 
  Calendar, 
  Clock, 
  Filter, 
  Search, 
  Eye, 
  CheckCircle, 
  AlertCircle, 
  MessageSquare,
  User,
  Flag,
  FileText
} from 'lucide-react';

const AdminContactManagement = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);
  const [showContactDetail, setShowContactDetail] = useState(false);
  const [stats, setStats] = useState(null);
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    search: '',
    page: 1,
    limit: 10
  });
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchContacts();
    fetchStats();
  }, [filters]);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await contactApi.getAllContacts(filters);
      
      // Handle different response structures
      let contactsData = [];
      if (response.data) {
        if (response.data.data && response.data.data.contacts) {
          contactsData = response.data.data.contacts;
        } else if (response.data.contacts) {
          contactsData = response.data.contacts;
        } else if (Array.isArray(response.data)) {
          contactsData = response.data;
        }
      }
      
      setContacts(Array.isArray(contactsData) ? contactsData : []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch contacts');
      setContacts([]); // Ensure contacts is always an array
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await contactApi.getContactStats();
      setStats(response.data);
    } catch (err) {
      console.error('Failed to fetch contact stats:', err);
    }
  };

  const handleViewContact = async (contactId) => {
    try {
      const response = await contactApi.getContact(contactId);
      setSelectedContact(response.data);
      setShowContactDetail(true);
    } catch (err) {
      setError('Failed to fetch contact details');
    }
  };

  const handleStatusUpdate = async (contactId, status, adminNotes = '') => {
    try {
      setUpdating(true);
      await contactApi.updateContactStatus(contactId, { status, adminNotes });
      
      // Update local state
      setContacts((prevContacts) => 
        (prevContacts || []).map(contact => 
          contact._id === contactId 
            ? { ...contact, status, adminNotes, responseTime: new Date() }
            : contact
        )
      );

      // Update selected contact if it's the one being updated
      if (selectedContact && selectedContact._id === contactId) {
        setSelectedContact({
          ...selectedContact,
          status,
          adminNotes,
          responseTime: new Date()
        });
      }

      // Refresh stats
      fetchStats();
    } catch (err) {
      setError('Failed to update contact status');
    } finally {
      setUpdating(false);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'text-red-600 bg-red-50 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'resolved': return 'text-green-600 bg-green-50';
      case 'in-progress': return 'text-blue-600 bg-blue-50';
      case 'pending': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const ContactDetailModal = () => {
    const [adminNotes, setAdminNotes] = useState(selectedContact?.adminNotes || '');
    const [newStatus, setNewStatus] = useState(selectedContact?.status || 'pending');

    const handleUpdate = () => {
      handleStatusUpdate(selectedContact._id, newStatus, adminNotes);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
          <div className="flex justify-between items-center p-6 border-b border-gray-200">
            <h3 className="text-xl font-bold text-gray-900">Contact Details</h3>
            <button
              onClick={() => setShowContactDetail(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>

          <div className="p-6 max-h-[70vh] overflow-y-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Contact Information */}
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Contact Information</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-gray-500" />
                      <span className="font-medium">{selectedContact.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <span>{selectedContact.email}</span>
                    </div>
                    {selectedContact.phone && (
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-gray-500" />
                        <span>{selectedContact.phone}</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-2">
                      <Flag className="w-4 h-4 text-gray-500" />
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(selectedContact.priority)}`}>
                        {selectedContact.priority.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Timeline</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>Submitted: {formatDate(selectedContact.createdAt)}</span>
                    </div>
                    {selectedContact.responseTime && (
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>Last Updated: {formatDate(selectedContact.responseTime)}</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-2">
                      <FileText className="w-4 h-4" />
                      <span>Reference: {selectedContact.referenceId}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Message Content */}
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Subject</h4>
                  <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">
                    {selectedContact.subject}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Message</h4>
                  <div className="bg-gray-50 p-4 rounded-lg max-h-40 overflow-y-auto">
                    <p className="text-gray-700 whitespace-pre-wrap">
                      {selectedContact.message}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Admin Response Section */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-4">Admin Response</h4>
              
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Current Status
                  </label>
                  <span className={`inline-block px-3 py-2 rounded text-sm font-medium ${getStatusColor(selectedContact.status)}`}>
                    {selectedContact.status.charAt(0).toUpperCase() + selectedContact.status.slice(1)}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Admin Notes
                </label>
                <textarea
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Add internal notes about this contact..."
                />
              </div>

              <div className="flex justify-end space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setShowContactDetail(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleUpdate}
                  disabled={updating}
                  className="flex items-center space-x-2"
                >
                  {updating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Updating...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      <span>Update</span>
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading && contacts.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Contact Management</h1>
        <p className="text-gray-600">Manage and respond to customer inquiries</p>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardBody>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Contacts</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalContacts}</p>
                </div>
                <MessageSquare className="w-8 h-8 text-blue-600" />
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats.pendingContacts}</p>
                </div>
                <Clock className="w-8 h-8 text-yellow-600" />
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">In Progress</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.inProgressContacts}</p>
                </div>
                <AlertCircle className="w-8 h-8 text-blue-600" />
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Resolved</p>
                  <p className="text-2xl font-bold text-green-600">{stats.resolvedContacts}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardBody>
          </Card>
        </div>
      )}

      {/* Filters */}
      <Card className="mb-6">
        <CardBody>
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center space-x-2">
              <Search className="w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search contacts..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value, page: 1 })}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value, page: 1 })}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>

            <div>
              <select
                value={filters.priority}
                onChange={(e) => setFilters({ ...filters, priority: e.target.value, page: 1 })}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Priorities</option>
                <option value="urgent">Urgent</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Error Message */}
      {error && (
        <Card className="mb-6">
          <CardBody>
            <div className="flex items-center space-x-2 text-red-600">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          </CardBody>
        </Card>
      )}

      {/* Contacts Table */}
      <Card>
        <CardBody>
          {contacts.length === 0 ? (
            <div className="text-center py-12">
              <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No contacts found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Contact</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Subject</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Priority</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Date</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {(contacts || []).map((contact) => (
                    <tr key={contact._id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-medium text-gray-900">{contact.name}</div>
                          <div className="text-sm text-gray-600">{contact.email}</div>
                          {contact.phone && (
                            <div className="text-sm text-gray-600">{contact.phone}</div>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="max-w-xs truncate font-medium text-gray-900">
                          {contact.subject}
                        </div>
                        <div className="text-sm text-gray-600">
                          Ref: {contact.referenceId}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(contact.priority)}`}>
                          {contact.priority.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(contact.status)}`}>
                          {contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {formatDate(contact.createdAt)}
                      </td>
                      <td className="py-3 px-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewContact(contact._id)}
                          className="flex items-center space-x-1"
                        >
                          <Eye className="w-4 h-4" />
                          <span>View</span>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardBody>
      </Card>

      {/* Contact Detail Modal */}
      {showContactDetail && selectedContact && <ContactDetailModal />}
    </div>
  );
};

export default AdminContactManagement;