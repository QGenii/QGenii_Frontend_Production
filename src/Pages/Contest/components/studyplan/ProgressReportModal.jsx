import { useState } from 'react';
import { Card, CardBody } from '../ui/Card';
import { Button } from '../ui/Button';
import { 
  X, 
  Download, 
  Calendar, 
  FileText,
  BarChart3,
  Clock,
  Target,
  CheckCircle,
  TrendingUp,
  Filter
} from 'lucide-react';

const ProgressReportModal = ({ 
  isOpen, 
  onClose, 
  onDownloadReport, 
  loading = false 
}) => {
  const [reportConfig, setReportConfig] = useState({
    startDate: '',
    endDate: '',
    format: 'CSV',
    includeCompleted: true,
    includeInProgress: true,
    includePending: true,
    includeOverdue: true,
    includeCancelled: false,
    groupBy: 'category',
    sortBy: 'targetDate',
    includeSubtasks: true,
    includeProgressHistory: true,
    includeStatistics: true
  });

  const [preview, setPreview] = useState(null);

  const handleConfigChange = (field, value) => {
    setReportConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDownload = async () => {
    try {
      // Create a clean config without empty dates
      const cleanConfig = { ...reportConfig };
      
      // Remove empty dates
      if (!cleanConfig.startDate || !cleanConfig.startDate.trim()) {
        delete cleanConfig.startDate;
      }
      if (!cleanConfig.endDate || !cleanConfig.endDate.trim()) {
        delete cleanConfig.endDate;
      }
      
      await onDownloadReport(cleanConfig);
    } catch (error) {
      console.error('Error downloading report:', error);
    }
  };

  const getSelectedFiltersCount = () => {
    const statusFilters = [
      reportConfig.includeCompleted,
      reportConfig.includeInProgress,
      reportConfig.includePending,
      reportConfig.includeOverdue,
      reportConfig.includeCancelled
    ];
    return statusFilters.filter(Boolean).length;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardBody className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <BarChart3 className="text-blue-600" size={24} />
              <h2 className="text-xl font-semibold text-gray-900">
                Generate Progress Report
              </h2>
            </div>
            <Button variant="outline" size="sm" onClick={onClose}>
              <X size={16} />
            </Button>
          </div>

          <div className="space-y-6">
            {/* Date Range */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center gap-2">
                <Calendar size={18} />
                Date Range
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={reportConfig.startDate}
                    onChange={(e) => handleConfigChange('startDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={reportConfig.endDate}
                    onChange={(e) => handleConfigChange('endDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Leave empty to include all plans regardless of date
              </p>
            </div>

            {/* Format Selection */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center gap-2">
                <FileText size={18} />
                Report Format
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleConfigChange('format', 'CSV')}
                  className={`p-3 border-2 rounded-lg text-left transition-colors ${
                    reportConfig.format === 'CSV' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="font-medium">CSV Format</div>
                  <div className="text-sm text-gray-600">
                    Excel-compatible spreadsheet format
                  </div>
                </button>
                
                <button
                  onClick={() => handleConfigChange('format', 'JSON')}
                  className={`p-3 border-2 rounded-lg text-left transition-colors ${
                    reportConfig.format === 'JSON' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="font-medium">JSON Format</div>
                  <div className="text-sm text-gray-600">
                    Structured data format for analysis
                  </div>
                </button>
              </div>
            </div>

            {/* Status Filters */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center gap-2">
                <Filter size={18} />
                Include Status ({getSelectedFiltersCount()}/5)
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { key: 'includeCompleted', label: 'Completed', icon: CheckCircle, color: 'text-green-600' },
                  { key: 'includeInProgress', label: 'In Progress', icon: Clock, color: 'text-blue-600' },
                  { key: 'includePending', label: 'Pending', icon: Target, color: 'text-gray-600' },
                  { key: 'includeOverdue', label: 'Overdue', icon: TrendingUp, color: 'text-red-600' },
                  { key: 'includeCancelled', label: 'Cancelled', icon: X, color: 'text-gray-400' }
                ].map(({ key, label, icon: Icon, color }) => (
                  <label key={key} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={reportConfig[key]}
                      onChange={(e) => handleConfigChange(key, e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <Icon size={16} className={color} />
                    <span className="text-sm">{label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Organization Options */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Group By
                </label>
                <select
                  value={reportConfig.groupBy}
                  onChange={(e) => handleConfigChange('groupBy', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="category">Category</option>
                  <option value="priority">Priority</option>
                  <option value="status">Status</option>
                  <option value="month">Month</option>
                  <option value="none">No Grouping</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sort By
                </label>
                <select
                  value={reportConfig.sortBy}
                  onChange={(e) => handleConfigChange('sortBy', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="targetDate">Target Date</option>
                  <option value="createdAt">Created Date</option>
                  <option value="priority">Priority</option>
                  <option value="progress">Progress</option>
                  <option value="title">Title</option>
                </select>
              </div>
            </div>

            {/* Content Options */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Content Options
              </h3>
              <div className="space-y-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={reportConfig.includeSubtasks}
                    onChange={(e) => handleConfigChange('includeSubtasks', e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm">Include subtasks details</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={reportConfig.includeProgressHistory}
                    onChange={(e) => handleConfigChange('includeProgressHistory', e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm">Include progress history</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={reportConfig.includeStatistics}
                    onChange={(e) => handleConfigChange('includeStatistics', e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm">Include summary statistics</span>
                </label>
              </div>
            </div>

            {/* Preview Section */}
            {preview && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Report Preview</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <div>Date Range: {preview.dateRange}</div>
                  <div>Total Plans: {preview.totalPlans}</div>
                  <div>Format: {reportConfig.format}</div>
                  <div>Estimated Size: {preview.estimatedSize}</div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-6 border-t">
              <Button
                variant="outline"
                onClick={onClose}
                disabled={loading}
              >
                Cancel
              </Button>
              
              <Button
                onClick={handleDownload}
                disabled={loading || getSelectedFiltersCount() === 0}
                className="flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Download size={16} />
                    Download Report
                  </>
                )}
              </Button>
            </div>

            {/* Help Text */}
            <div className="text-xs text-gray-500 pt-2 border-t">
              <p>
                • Reports include all selected study plans within the specified date range
              </p>
              <p>
                • CSV format can be opened in Excel, Google Sheets, or similar applications
              </p>
              <p>
                • JSON format provides raw data for custom analysis or integrations
              </p>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default ProgressReportModal;