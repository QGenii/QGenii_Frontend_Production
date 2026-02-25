import { useState, useEffect } from 'react';
import { Card, CardBody } from '../ui/Card';
import { Button } from '../ui/Button';
import { 
  X, 
  Save, 
  TrendingUp,
  Clock,
  Target,
  MessageSquare,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

const ProgressUpdateModal = ({ 
  isOpen, 
  onClose, 
  onUpdateProgress, 
  plan = null, 
  loading = false 
}) => {
  const [updateData, setUpdateData] = useState({
    progress: '',
    hoursWorked: '',
    notes: '',
    status: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (plan && isOpen) {
      setUpdateData({
        progress: plan.progress?.toString() || '',
        hoursWorked: '',
        notes: '',
        status: plan.status || 'PENDING'
      });
    } else {
      setUpdateData({
        progress: '',
        hoursWorked: '',
        notes: '',
        status: ''
      });
    }
    setErrors({});
  }, [plan, isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    const progress = parseFloat(updateData.progress);
    if (isNaN(progress) || progress < 0 || progress > 100) {
      newErrors.progress = 'Progress must be between 0 and 100';
    }

    const hoursWorked = parseFloat(updateData.hoursWorked);
    if (updateData.hoursWorked && (isNaN(hoursWorked) || hoursWorked < 0)) {
      newErrors.hoursWorked = 'Hours worked must be 0 or greater';
    }

    if (!updateData.notes.trim()) {
      newErrors.notes = 'Please add notes about your progress';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const submitData = {
      progress: parseFloat(updateData.progress),
      hoursWorked: updateData.hoursWorked ? parseFloat(updateData.hoursWorked) : 0,
      notes: updateData.notes.trim(),
      status: updateData.status
    };

    onUpdateProgress(plan._id, submitData);
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'text-green-600 bg-green-100';
    if (progress >= 50) return 'text-blue-600 bg-blue-100';
    if (progress >= 25) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
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

  const calculateCompletionTime = () => {
    if (!plan || !updateData.hoursWorked) return null;
    
    const totalWorked = (plan.totalHoursWorked || 0) + parseFloat(updateData.hoursWorked || 0);
    const progress = parseFloat(updateData.progress || 0);
    
    if (progress > 0) {
      const estimatedTotal = (totalWorked / progress) * 100;
      const remaining = Math.max(0, estimatedTotal - totalWorked);
      return {
        totalWorked: totalWorked.toFixed(1),
        estimated: remaining.toFixed(1)
      };
    }
    
    return null;
  };

  if (!isOpen || !plan) return null;

  const completionTime = calculateCompletionTime();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-lg">
        <CardBody className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="text-blue-600" size={24} />
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Update Progress
                </h2>
                <p className="text-sm text-gray-600 truncate">
                  {plan.title}
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={onClose}>
              <X size={16} />
            </Button>
          </div>

          {/* Current Status */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Current Progress</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getProgressColor(plan.progress)}`}>
                {plan.progress}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${plan.progress}%` }}
              />
            </div>
            <div className="flex items-center justify-between mt-2 text-xs text-gray-600">
              <span>Hours Worked: {plan.totalHoursWorked || 0}h</span>
              <span>Target: {plan.targetHours}h</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Progress Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Progress (%) *
              </label>
              <input
                type="number"
                name="progress"
                value={updateData.progress}
                onChange={handleInputChange}
                min="0"
                max="100"
                step="1"
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.progress ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter progress percentage (0-100)"
              />
              {errors.progress && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertTriangle size={14} />
                  {errors.progress}
                </p>
              )}
            </div>

            {/* Hours Worked */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hours Worked (Today)
              </label>
              <input
                type="number"
                name="hoursWorked"
                value={updateData.hoursWorked}
                onChange={handleInputChange}
                min="0"
                step="0.25"
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.hoursWorked ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="e.g., 2.5"
              />
              {errors.hoursWorked && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertTriangle size={14} />
                  {errors.hoursWorked}
                </p>
              )}
            </div>

            {/* Status Update */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                name="status"
                value={updateData.status}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="PENDING">Pending</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>

            {/* Progress Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Progress Notes *
              </label>
              <textarea
                name="notes"
                value={updateData.notes}
                onChange={handleInputChange}
                rows={4}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.notes ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Describe what you accomplished, challenges faced, next steps..."
              />
              {errors.notes && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertTriangle size={14} />
                  {errors.notes}
                </p>
              )}
            </div>

            {/* Completion Time Estimate */}
            {completionTime && (
              <div className="p-3 bg-blue-50 rounded-lg">
                <h4 className="text-sm font-medium text-blue-900 mb-2 flex items-center gap-2">
                  <Clock size={14} />
                  Time Analysis
                </h4>
                <div className="space-y-1 text-sm text-blue-800">
                  <div>Total Hours Worked: {completionTime.totalWorked}h</div>
                  <div>Estimated Hours Remaining: {completionTime.estimated}h</div>
                  <div className="text-xs text-blue-600 mt-2">
                    Based on current progress rate
                  </div>
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setUpdateData(prev => ({
                    ...prev,
                    progress: '100',
                    status: 'COMPLETED'
                  }));
                }}
                className="flex items-center justify-center gap-2 text-green-600 border-green-200 hover:bg-green-50"
              >
                <CheckCircle size={14} />
                Mark Complete
              </Button>
              
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  const currentProgress = parseInt(updateData.progress || plan.progress || 0);
                  const newProgress = Math.min(100, currentProgress + 10);
                  setUpdateData(prev => ({
                    ...prev,
                    progress: newProgress.toString(),
                    status: newProgress === 100 ? 'COMPLETED' : 'IN_PROGRESS'
                  }));
                }}
                className="flex items-center justify-center gap-2"
              >
                <Target size={14} />
                +10% Progress
              </Button>
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-end gap-3 pt-6 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    Update Progress
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default ProgressUpdateModal;