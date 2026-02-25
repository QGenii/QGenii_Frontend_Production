import { useState } from 'react';
import { Card, CardBody } from '../ui/Card';
import { Button } from '../ui/Button';
import { 
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Clock,
  Calendar,
  Target,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  MoreHorizontal
} from 'lucide-react';

const StudyPlanList = ({ 
  plans = [], 
  loading = false,
  onPlanEdit,
  onPlanDelete,
  onProgressUpdate,
  onCreateNew,
  filters,
  onFilterChange 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const getPriorityColor = (priority) => {
    const colors = {
      'LOW': 'text-green-600 bg-green-100',
      'MEDIUM': 'text-blue-600 bg-blue-100',
      'HIGH': 'text-yellow-600 bg-yellow-100',
      'URGENT': 'text-red-600 bg-red-100'
    };
    return colors[priority] || colors['MEDIUM'];
  };

  const getStatusColor = (status) => {
    const colors = {
      'PENDING': 'text-gray-600 bg-gray-100',
      'IN_PROGRESS': 'text-blue-600 bg-blue-100',
      'COMPLETED': 'text-green-600 bg-green-100',
      'OVERDUE': 'text-red-600 bg-red-100',
      'CANCELLED': 'text-gray-600 bg-gray-100'
    };
    return colors[status] || colors['PENDING'];
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'COMPLETED':
        return <CheckCircle2 size={16} className="text-green-500" />;
      case 'OVERDUE':
        return <AlertTriangle size={16} className="text-red-500" />;
      case 'IN_PROGRESS':
        return <Clock size={16} className="text-blue-500" />;
      default:
        return <BookOpen size={16} className="text-gray-400" />;
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const filteredPlans = plans.filter(plan => {
    // Search filter
    if (searchTerm && !plan.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !plan.description.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }

    // Status filter
    if (filters?.status && filters.status !== 'ALL' && plan.status !== filters.status) {
      return false;
    }

    // Priority filter
    if (filters?.priority && filters.priority !== 'ALL' && plan.priority !== filters.priority) {
      return false;
    }

    // Category filter
    if (filters?.category && filters.category !== 'ALL' && plan.category !== filters.category) {
      return false;
    }

    return true;
  });

  const ProgressBar = ({ progress, className = '' }) => (
    <div className={`w-full bg-gray-200 rounded-full h-2 ${className}`}>
      <div 
        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  );

  if (loading) {
    return (
      <Card>
        <CardBody className="p-6">
          <div className="animate-pulse space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded-lg" />
            ))}
          </div>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card>
      <CardBody className="p-6">
        {/* Header with Search and Actions */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4 flex-1">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search study plans..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filter Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter size={16} />
              Filters
            </Button>
          </div>

          {/* Create Button */}
          <Button onClick={onCreateNew} className="flex items-center gap-2">
            <Plus size={16} />
            New Plan
          </Button>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <Card className="mb-6 bg-gray-50">
            <CardBody className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Status Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={filters?.status || 'ALL'}
                    onChange={(e) => onFilterChange({ ...filters, status: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="ALL">All Status</option>
                    <option value="PENDING">Pending</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="COMPLETED">Completed</option>
                    <option value="OVERDUE">Overdue</option>
                    <option value="CANCELLED">Cancelled</option>
                  </select>
                </div>

                {/* Priority Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority
                  </label>
                  <select
                    value={filters?.priority || 'ALL'}
                    onChange={(e) => onFilterChange({ ...filters, priority: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="ALL">All Priorities</option>
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                    <option value="URGENT">Urgent</option>
                  </select>
                </div>

                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={filters?.category || 'ALL'}
                    onChange={(e) => onFilterChange({ ...filters, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="ALL">All Categories</option>
                    <option value="STUDY">Study</option>
                    <option value="ASSIGNMENT">Assignment</option>
                    <option value="PROJECT">Project</option>
                    <option value="EXAM">Exam</option>
                    <option value="PRACTICE">Practice</option>
                    <option value="RESEARCH">Research</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>
              </div>
            </CardBody>
          </Card>
        )}

        {/* Plans List */}
        {filteredPlans.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {plans.length === 0 ? 'No study plans yet' : 'No plans match your filters'}
            </h3>
            <p className="text-gray-600 mb-4">
              {plans.length === 0 
                ? 'Create your first study plan to get started with organized learning.'
                : 'Try adjusting your search or filter criteria.'
              }
            </p>
            {plans.length === 0 && (
              <Button onClick={onCreateNew} className="flex items-center gap-2">
                <Plus size={16} />
                Create Study Plan
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPlans.map((plan) => (
              <Card key={plan._id} className="hover:shadow-md transition-shadow">
                <CardBody className="p-6">
                  <div className="flex items-start justify-between">
                    {/* Plan Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        {getStatusIcon(plan.status)}
                        <h3 className="text-lg font-semibold text-gray-900 truncate">
                          {plan.title}
                        </h3>
                        
                        {/* Status Badge */}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(plan.status)}`}>
                          {plan.status.replace('_', ' ')}
                        </span>

                        {/* Priority Badge */}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(plan.priority)}`}>
                          {plan.priority}
                        </span>
                      </div>

                      {plan.description && (
                        <p className="text-gray-600 mb-3 line-clamp-2">
                          {plan.description}
                        </p>
                      )}

                      {/* Progress */}
                      <div className="mb-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700">
                            Progress: {plan.progress}%
                          </span>
                          <span className="text-sm text-gray-500">
                            Target: {plan.targetHours}h
                          </span>
                        </div>
                        <ProgressBar progress={plan.progress} />
                      </div>

                      {/* Meta Info */}
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          <span>Due: {formatDate(plan.targetDate)}</span>
                        </div>
                        
                        {plan.category && (
                          <div className="flex items-center gap-1">
                            <Target size={14} />
                            <span>{plan.category}</span>
                          </div>
                        )}

                        {plan.subtasks?.length > 0 && (
                          <span>
                            {plan.subtasks.filter(st => st.completed).length}/{plan.subtasks.length} subtasks
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onPlanEdit(plan)}
                        className="flex items-center gap-1"
                      >
                        <Edit size={14} />
                        Edit
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onProgressUpdate(plan)}
                        className="flex items-center gap-1 text-blue-600 hover:bg-blue-50"
                      >
                        <Target size={14} />
                        Update
                      </Button>

                      <div className="relative">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-1"
                        >
                          <MoreHorizontal size={14} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        )}

        {/* Results Summary */}
        {filteredPlans.length > 0 && (
          <div className="mt-6 text-center text-sm text-gray-500">
            Showing {filteredPlans.length} of {plans.length} study plans
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default StudyPlanList;