import { useState, useEffect } from 'react';
import { Card, CardBody } from '../ui/Card';
import { Button } from '../ui/Button';
import { 
  X, 
  Plus, 
  Trash2, 
  Calendar, 
  Clock,
  Target,
  FileText,
  AlertCircle,
  Save,
  BookOpen,
  Bell
} from 'lucide-react';

const StudyPlanForm = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  editingPlan = null, 
  loading = false,
  quickAddDate = null
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'STUDY',
    priority: 'MEDIUM',
    targetDate: '',
    targetHours: '',
    subtasks: [],
    reminders: [],
    attachments: []
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingPlan) {
      setFormData({
        title: editingPlan.title || '',
        description: editingPlan.description || '',
        category: editingPlan.category || 'STUDY',
        priority: editingPlan.priority || 'MEDIUM',
        targetDate: editingPlan.targetDate ? new Date(editingPlan.targetDate).toISOString().split('T')[0] : '',
        targetHours: editingPlan.targetHours?.toString() || '',
        subtasks: editingPlan.subtasks || [],
        reminders: editingPlan.reminders || [],
        attachments: editingPlan.attachments || []
      });
    } else {
      // Use quickAddDate if available for new plans
      const defaultDate = quickAddDate ? new Date(quickAddDate).toISOString().split('T')[0] : '';
      setFormData({
        title: '',
        description: '',
        category: 'STUDY',
        priority: 'MEDIUM',
        targetDate: defaultDate,
        targetHours: '',
        subtasks: [],
        reminders: [],
        attachments: []
      });
    }
    setErrors({});
  }, [editingPlan, isOpen, quickAddDate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
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

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.targetDate) {
      newErrors.targetDate = 'Target date is required';
    } else {
      const targetDate = new Date(formData.targetDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (targetDate < today) {
        newErrors.targetDate = 'Target date cannot be in the past';
      }
    }

    if (!formData.targetHours || parseFloat(formData.targetHours) <= 0) {
      newErrors.targetHours = 'Target hours must be greater than 0';
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
      ...formData,
      targetHours: parseFloat(formData.targetHours),
      targetDate: new Date(formData.targetDate).toISOString()
    };

    onSubmit(submitData);
  };

  const addSubtask = () => {
    setFormData(prev => ({
      ...prev,
      subtasks: [
        ...prev.subtasks,
        {
          title: '',
          description: '',
          completed: false
        }
      ]
    }));
  };

  const updateSubtask = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      subtasks: prev.subtasks.map((subtask, i) => 
        i === index ? { ...subtask, [field]: value } : subtask
      )
    }));
  };

  const removeSubtask = (index) => {
    setFormData(prev => ({
      ...prev,
      subtasks: prev.subtasks.filter((_, i) => i !== index)
    }));
  };

  const addReminder = () => {
    setFormData(prev => ({
      ...prev,
      reminders: [
        ...prev.reminders,
        {
          date: '',
          message: '',
          active: true
        }
      ]
    }));
  };

  const updateReminder = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      reminders: prev.reminders.map((reminder, i) => 
        i === index ? { ...reminder, [field]: value } : reminder
      )
    }));
  };

  const removeReminder = (index) => {
    setFormData(prev => ({
      ...prev,
      reminders: prev.reminders.filter((_, i) => i !== index)
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardBody className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <BookOpen className="text-blue-600" size={24} />
              <h2 className="text-xl font-semibold text-gray-900">
                {editingPlan ? 'Edit Study Plan' : 'Create New Study Plan'}
              </h2>
            </div>
            <Button variant="outline" size="sm" onClick={onClose}>
              <X size={16} />
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.title ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter study plan title..."
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle size={14} />
                    {errors.title}
                  </p>
                )}
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="STUDY">Study</option>
                  <option value="ASSIGNMENT">Assignment</option>
                  <option value="PROJECT">Project</option>
                  <option value="EXAM">Exam</option>
                  <option value="PRACTICE">Practice</option>
                  <option value="RESEARCH">Research</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>

              {/* Priority */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priority
                </label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                  <option value="URGENT">Urgent</option>
                </select>
              </div>

              {/* Target Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target Date *
                </label>
                <input
                  type="date"
                  name="targetDate"
                  value={formData.targetDate}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.targetDate ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.targetDate && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle size={14} />
                    {errors.targetDate}
                  </p>
                )}
              </div>

              {/* Target Hours */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target Hours *
                </label>
                <input
                  type="number"
                  name="targetHours"
                  value={formData.targetHours}
                  onChange={handleInputChange}
                  min="0.5"
                  step="0.5"
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.targetHours ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="e.g., 10"
                />
                {errors.targetHours && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle size={14} />
                    {errors.targetHours}
                  </p>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Describe your study plan goals and approach..."
              />
            </div>

            {/* Subtasks */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-medium text-gray-700">
                  Subtasks ({formData.subtasks.length})
                </label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addSubtask}
                  className="flex items-center gap-1"
                >
                  <Plus size={14} />
                  Add Subtask
                </Button>
              </div>

              <div className="space-y-3">
                {formData.subtasks.map((subtask, index) => (
                  <div key={index} className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                    <input
                      type="checkbox"
                      checked={subtask.completed}
                      onChange={(e) => updateSubtask(index, 'completed', e.target.checked)}
                      className="mt-1"
                    />
                    <div className="flex-1 space-y-2">
                      <input
                        type="text"
                        value={subtask.title}
                        onChange={(e) => updateSubtask(index, 'title', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Subtask title..."
                      />
                      <textarea
                        value={subtask.description}
                        onChange={(e) => updateSubtask(index, 'description', e.target.value)}
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Subtask description (optional)..."
                      />
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeSubtask(index)}
                      className="self-start text-red-600 hover:bg-red-50"
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Reminders */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-medium text-gray-700">
                  Reminders ({formData.reminders.length})
                </label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addReminder}
                  className="flex items-center gap-1"
                >
                  <Bell size={14} />
                  Add Reminder
                </Button>
              </div>

              <div className="space-y-3">
                {formData.reminders.map((reminder, index) => (
                  <div key={index} className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                    <input
                      type="checkbox"
                      checked={reminder.active}
                      onChange={(e) => updateReminder(index, 'active', e.target.checked)}
                      className="mt-1"
                    />
                    <div className="flex-1 space-y-2">
                      <input
                        type="date"
                        value={reminder.date}
                        onChange={(e) => updateReminder(index, 'date', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        value={reminder.message}
                        onChange={(e) => updateReminder(index, 'message', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Reminder message..."
                      />
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeReminder(index)}
                      className="self-start text-red-600 hover:bg-red-50"
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                ))}
              </div>
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
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    {editingPlan ? 'Update Plan' : 'Create Plan'}
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

export default StudyPlanForm;