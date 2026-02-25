import { useState, useEffect } from 'react';
import { Card, CardBody } from '../../Components/ui/Card';
import { Button } from '../../Components/ui/Button';
import { Spinner } from '../../Components/ui/Spinner';
import StudyPlanCalendar from '../../Components/studyplan/StudyPlanCalendar';
import StudyPlanList from '../../Components/studyplan/StudyPlanList';
import StudyPlanForm from '../../Components/studyplan/StudyPlanForm';
import StudyPlanStats from '../../Components/studyplan/StudyPlanStats';
import TodaysTasks from '../../Components/studyplan/TodaysTasks';
import ProgressReportModal from '../../Components/studyplan/ProgressReportModal';
import ProgressUpdateModal from '../../Components/studyplan/ProgressUpdateModal';
import { studyPlanApi } from '../../lib/studyPlanApi';
import { 
  Calendar, 
  List, 
  Plus, 
  BarChart3, 
  Download,
  Filter,
  Search,
  Clock
} from 'lucide-react';

const StudyPlanPage = () => {
  const [activeView, setActiveView] = useState('today');
  const [studyPlans, setStudyPlans] = useState([]);
  const [calendarData, setCalendarData] = useState({});
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    category: '',
    search: '',
  });
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [editingPlan, setEditingPlan] = useState(null);
  const [updatingPlan, setUpdatingPlan] = useState(null);
  const [quickAddDate, setQuickAddDate] = useState(null);
  const [todaysTasks, setTodaysTasks] = useState([]);
  const [showTodaysTasks, setShowTodaysTasks] = useState(false);

  useEffect(() => {
    fetchInitialData();
  }, []);

  useEffect(() => {
    if (activeView === 'list') {
      fetchStudyPlans();
    } else if (activeView === 'calendar') {
      fetchCalendarData();
    } else if (activeView === 'today') {
      fetchTodaysTasks();
    }
  }, [activeView, filters]);

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      const [statsRes] = await Promise.all([
        studyPlanApi.getDashboardStats()
      ]);
      setStats(statsRes.data.data);
      
      if (activeView === 'calendar') {
        await fetchCalendarData();
      } else {
        await fetchStudyPlans();
      }
    } catch (error) {
      console.error('Failed to fetch initial data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStudyPlans = async () => {
    try {
      const params = {
        ...filters,
        page: 1,
        limit: 50,
        sortBy: 'targetDate',
        sortOrder: 'asc'
      };
      
      // Remove empty filters
      Object.keys(params).forEach(key => {
        if (params[key] === '') delete params[key];
      });

      const response = await studyPlanApi.getStudyPlans(params);
      setStudyPlans(response.data.data.studyPlans);
    } catch (error) {
      console.error('Failed to fetch study plans:', error);
    }
  };

  const fetchCalendarData = async () => {
    try {
      const startOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
      const endOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);
      
      const response = await studyPlanApi.getCalendarView(
        startOfMonth.toISOString().split('T')[0],
        endOfMonth.toISOString().split('T')[0]
      );
      setCalendarData(response.data.data.calendarData);
    } catch (error) {
      console.error('Failed to fetch calendar data:', error);
    }
  };

  const fetchTodaysTasks = async () => {
    try {
      const response = await studyPlanApi.getTodaysTasks();
      setTodaysTasks(response.data.data.tasks);
    } catch (error) {
      console.error('Failed to fetch today\'s tasks:', error);
    }
  };

  const handleCreatePlan = async (planData) => {
    try {
      // If quick add date is set, use it as the target date
      if (quickAddDate && !planData.targetDate) {
        planData.targetDate = quickAddDate.toISOString();
      }
      
      await studyPlanApi.createStudyPlan(planData);
      setShowCreateForm(false);
      setQuickAddDate(null);
      await fetchInitialData();
    } catch (error) {
      console.error('Failed to create study plan:', error);
    }
  };

  const handleUpdatePlan = async (id, planData) => {
    try {
      await studyPlanApi.updateStudyPlan(id, planData);
      setEditingPlan(null);
      await fetchInitialData();
    } catch (error) {
      console.error('Failed to update study plan:', error);
    }
  };

  const handleDeletePlan = async (id) => {
    if (confirm('Are you sure you want to delete this study plan?')) {
      try {
        await studyPlanApi.deleteStudyPlan(id);
        await fetchInitialData();
      } catch (error) {
        console.error('Failed to delete study plan:', error);
      }
    }
  };

  const handleProgressUpdate = (plan) => {
    setUpdatingPlan(plan);
    setShowProgressModal(true);
  };

  const handleProgressSubmit = async (id, progressData) => {
    try {
      await studyPlanApi.updateProgress(id, progressData);
      setShowProgressModal(false);
      setUpdatingPlan(null);
      await fetchInitialData();
    } catch (error) {
      console.error('Failed to update progress:', error);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (activeView === 'calendar') {
      fetchCalendarData();
    }
  };

  const handleQuickAdd = (date) => {
    setQuickAddDate(date);
    setShowCreateForm(true);
  };

  // Set up global quick add handler
  useEffect(() => {
    window.handleQuickAdd = handleQuickAdd;
    return () => {
      delete window.handleQuickAdd;
    };
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Study Plan</h1>
          <p className="text-gray-600 mt-1">
            Organize your learning journey with advanced planning and progress tracking
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowReportModal(true)}
            className="flex items-center gap-2"
          >
            <Download size={16} />
            Export Report
          </Button>
          
          <Button
            size="sm"
            onClick={() => setShowCreateForm(true)}
            className="flex items-center gap-2"
          >
            <Plus size={16} />
            New Plan
          </Button>
        </div>
      </div>

      {/* Statistics Dashboard */}
      {stats && <StudyPlanStats stats={stats} />}

      {/* View Toggle */}
      <Card>
        <CardBody className="p-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setActiveView('today')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeView === 'today'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Clock size={16} className="inline mr-2" />
                Today's Tasks
              </button>
              
              <button
                onClick={() => setActiveView('calendar')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeView === 'calendar'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Calendar size={16} className="inline mr-2" />
                Calendar View
              </button>
              
              <button
                onClick={() => setActiveView('list')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeView === 'list'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <List size={16} className="inline mr-2" />
                List View
              </button>
            </div>

            {/* Quick Filters */}
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
                <Search size={16} className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Search plans..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange({ search: e.target.value })}
                  className="bg-transparent border-none outline-none text-sm w-40"
                />
              </div>

              <select
                value={filters.status}
                onChange={(e) => handleFilterChange({ status: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Status</option>
                <option value="PENDING">Pending</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
                <option value="OVERDUE">Overdue</option>
              </select>

              <select
                value={filters.priority}
                onChange={(e) => handleFilterChange({ priority: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Priority</option>
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
                <option value="URGENT">Urgent</option>
              </select>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Main Content */}
      {activeView === 'today' ? (
        <TodaysTasks
          todaysTasks={todaysTasks}
          loading={loading}
          onUpdateProgress={handleProgressSubmit}
          onStartTask={(task) => console.log('Start task:', task)}
          onPauseTask={(task) => console.log('Pause task:', task)}
          onCompleteTask={(task) => {
            handleProgressSubmit(task._id, {
              progress: 100,
              status: 'COMPLETED',
              hoursWorked: 0,
              notes: 'Task completed'
            });
          }}
          onEditTask={setEditingPlan}
        />
      ) : activeView === 'calendar' ? (
        <StudyPlanCalendar
          calendarData={calendarData}
          selectedDate={selectedDate}
          onDateChange={handleDateChange}
          onPlanEdit={setEditingPlan}
          onPlanDelete={handleDeletePlan}
          onProgressUpdate={handleProgressUpdate}
        />
      ) : (
        <StudyPlanList
          plans={studyPlans}
          loading={loading}
          onPlanEdit={setEditingPlan}
          onPlanDelete={handleDeletePlan}
          onProgressUpdate={handleProgressUpdate}
          onCreateNew={() => setShowCreateForm(true)}
          filters={filters}
          onFilterChange={handleFilterChange}
        />
      )}

      {/* Create/Edit Form Modal */}
      {(showCreateForm || editingPlan) && (
        <StudyPlanForm
          isOpen={showCreateForm || !!editingPlan}
          editingPlan={editingPlan}
          onSubmit={editingPlan ? 
            (data) => handleUpdatePlan(editingPlan._id, data) : 
            handleCreatePlan
          }
          onClose={() => {
            setShowCreateForm(false);
            setEditingPlan(null);
            setQuickAddDate(null);
          }}
          quickAddDate={quickAddDate}
        />
      )}

      {/* Progress Update Modal */}
      {showProgressModal && (
        <ProgressUpdateModal
          isOpen={showProgressModal}
          onClose={() => {
            setShowProgressModal(false);
            setUpdatingPlan(null);
          }}
          onUpdateProgress={handleProgressSubmit}
          plan={updatingPlan}
          loading={loading}
        />
      )}

      {/* Progress Report Modal */}
      {showReportModal && (
        <ProgressReportModal
          isOpen={showReportModal}
          onClose={() => setShowReportModal(false)}
          onDownloadReport={async (config) => {
            try {
              await studyPlanApi.generateProgressReport(config);
              setShowReportModal(false);
            } catch (error) {
              console.error('Failed to download report:', error);
            }
          }}
        />
      )}

      {/* Progress Update Modal */}
      {showProgressModal && updatingPlan && (
        <ProgressUpdateModal
          isOpen={showProgressModal}
          plan={updatingPlan}
          onClose={() => {
            setShowProgressModal(false);
            setUpdatingPlan(null);
          }}
          onUpdateProgress={handleProgressSubmit}
          loading={loading}
        />
      )}

    </div>
  );
};

export default StudyPlanPage;