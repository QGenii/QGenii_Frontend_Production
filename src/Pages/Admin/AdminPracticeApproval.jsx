import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardBody } from '../../Components/ui/Card';
import { Button } from '../../Components/ui/Button';
import { Spinner } from '../../Components/ui/Spinner';
import { practiceApi } from '../../lib/practiceApi';
import { 
  CheckCircle2,
  XCircle,
  Eye,
  User,
  Calendar,
  Filter
} from 'lucide-react';

export const AdminPracticeApproval = () => {
  const navigate = useNavigate();
  const [allQuestions, setAllQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(false);
  
  // Filters
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('pending');
  const [stats, setStats] = useState({
    pending: 0,
    approved: 0,
    rejected: 0,
    total: 0
  });

  useEffect(() => {
    fetchCategories();
    fetchAllQuestions();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [allQuestions, selectedCategory, selectedStatus]);

  const fetchCategories = async () => {
    try {
      const response = await practiceApi.listCategories();
      setCategories(response.data.data.categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchAllQuestions = async () => {
    try {
      setLoading(true);
      
      // Use the new admin endpoint that fetches all questions
      const response = await practiceApi.getAllQuestions();
      const allQuestionsData = response.data.data.questions || [];
      
      setAllQuestions(allQuestionsData);
      
      // Calculate stats
      const pending = allQuestionsData.filter(q => q.status === 'pending').length;
      const approved = allQuestionsData.filter(q => q.status === 'approved').length;
      const rejected = allQuestionsData.filter(q => q.status === 'rejected').length;
      
      setStats({
        pending,
        approved,
        rejected,
        total: allQuestionsData.length
      });
    } catch (error) {
      console.error('Error fetching questions:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...allQuestions];
    
    // Filter by status
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(q => q.status === selectedStatus);
    }
    
    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(q => q.category._id === selectedCategory);
    }
    
    setFilteredQuestions(filtered);
  };

  const handleApprove = async (questionId) => {
    if (!confirm('Are you sure you want to approve this question?')) {
      return;
    }

    try {
      await practiceApi.approveQuestion(questionId);
      alert('Question approved successfully!');
      await fetchAllQuestions();
    } catch (error) {
      console.error('Error approving question:', error);
      alert('Failed to approve question');
    }
  };

  const handleRevoke = async (questionId) => {
    if (!confirm('Are you sure you want to revoke approval? This will hide the question from users.')) {
      return;
    }

    try {
      await practiceApi.revokeApproval(questionId);
      alert('Approval revoked successfully!');
      await fetchAllQuestions();
    } catch (error) {
      console.error('Error revoking approval:', error);
      alert('Failed to revoke approval');
    }
  };

  const handleReject = (question) => {
    setSelectedQuestion(question);
    setShowRejectModal(true);
  };

  const submitRejection = async () => {
    if (!rejectionReason.trim()) {
      alert('Please provide a rejection reason');
      return;
    }

    try {
      await practiceApi.rejectQuestion(selectedQuestion._id, rejectionReason);
      alert('Question rejected');
      setShowRejectModal(false);
      setRejectionReason('');
      setSelectedQuestion(null);
      await fetchAllQuestions();
    } catch (error) {
      console.error('Error rejecting question:', error);
      alert('Failed to reject question');
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'hard': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs font-medium">Pending</span>;
      case 'approved':
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">Approved</span>;
      case 'rejected':
        return <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs font-medium">Rejected</span>;
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs font-medium">{status}</span>;
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
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Question Management
          </h1>
          <p className="text-gray-600">
            Review, approve, and manage practice questions by category and status
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardBody className="p-4 text-center">
              <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
              <p className="text-sm text-gray-600">Pending Review</p>
            </CardBody>
          </Card>
          <Card>
            <CardBody className="p-4 text-center">
              <p className="text-3xl font-bold text-green-600">{stats.approved}</p>
              <p className="text-sm text-gray-600">Approved</p>
            </CardBody>
          </Card>
          <Card>
            <CardBody className="p-4 text-center">
              <p className="text-3xl font-bold text-red-600">{stats.rejected}</p>
              <p className="text-sm text-gray-600">Rejected</p>
            </CardBody>
          </Card>
          <Card>
            <CardBody className="p-4 text-center">
              <p className="text-3xl font-bold text-blue-600">{stats.total}</p>
              <p className="text-sm text-gray-600">Total Questions</p>
            </CardBody>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardBody className="p-4">
            <div className="flex items-center gap-4">
              <Filter className="w-5 h-5 text-gray-600" />
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Status Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>

                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Categories</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Questions List */}
        {filteredQuestions.length === 0 ? (
          <Card>
            <CardBody className="p-12 text-center">
              <CheckCircle2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No questions found
              </h3>
              <p className="text-gray-600">
                {selectedStatus === 'pending' 
                  ? 'All questions have been reviewed!' 
                  : 'Try adjusting your filters'}
              </p>
            </CardBody>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredQuestions.map((question) => (
              <Card key={question._id} className="hover:shadow-lg transition-shadow">
                <CardBody className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {question.title}
                      </h3>
                      <div className="flex items-center gap-3 text-sm text-gray-600 mb-3">
                        {getStatusBadge(question.status)}
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(question.difficulty)}`}>
                          {question.difficulty}
                        </span>
                        <span className="px-2 py-1 bg-gray-100 rounded text-xs">
                          {question.category?.name || 'N/A'}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {question.contributedBy?.name || 'Unknown'}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(question.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg mb-3">
                        <p className="text-gray-700 line-clamp-3 whitespace-pre-wrap">
                          {question.description}
                        </p>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>{question.testCases?.length || 0} test cases</span>
                        <span>{question.examples?.length || 0} examples</span>
                        <span>{question.hints?.length || 0} hints</span>
                        <span>{question.points} points</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4 border-t">
                    {question.status === 'pending' && (
                      <>
                        <Button
                          size="sm"
                          onClick={() => handleApprove(question._id)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle2 className="w-4 h-4 mr-2" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleReject(question)}
                          className="text-red-600 border-red-600 hover:bg-red-50"
                        >
                          <XCircle className="w-4 h-4 mr-2" />
                          Reject
                        </Button>
                      </>
                    )}
                    {question.status === 'approved' && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleRevoke(question._id)}
                        className="text-orange-600 border-orange-600 hover:bg-orange-50"
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Revoke Approval
                      </Button>
                    )}
                    {question.status === 'rejected' && question.rejectionReason && (
                      <div className="flex-1 bg-red-50 border border-red-200 rounded p-3 text-sm text-red-700">
                        <strong>Rejection Reason:</strong> {question.rejectionReason}
                      </div>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        // Open in new tab to view full details
                        window.open(`/practice/problem/${question.slug}`, '_blank');
                      }}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Rejection Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardBody className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Reject Question
              </h3>
              <p className="text-gray-600 mb-4">
                Please provide a reason for rejecting "{selectedQuestion?.title}"
              </p>
              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
                placeholder="Explain why this question is being rejected..."
              />
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowRejectModal(false);
                    setRejectionReason('');
                    setSelectedQuestion(null);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={submitRejection}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Reject Question
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  );
};
