import { useState, useEffect } from 'react';
import { Card, CardBody } from '../ui/Card';
import { Button } from '../ui/Button';
import { 
  Clock, 
  Target, 
  CheckCircle,
  AlertTriangle,
  Play,
  Pause,
  RotateCcw,
  Plus,
  Calendar,
  BookOpen,
  Timer,
  TrendingUp,
  Flag,
  Bell,
  Edit
} from 'lucide-react';

const TodaysTasks = ({ 
  todaysTasks = [],
  onUpdateProgress,
  onStartTask,
  onPauseTask,
  onCompleteTask,
  onEditTask,
  loading = false 
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeTask, setActiveTask] = useState(null);
  const [taskTimers, setTaskTimers] = useState({});

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    }).format(date);
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  const getPriorityColor = (priority) => {
    const colors = {
      'LOW': 'text-green-600 bg-green-100 border-green-200',
      'MEDIUM': 'text-blue-600 bg-blue-100 border-blue-200',
      'HIGH': 'text-yellow-600 bg-yellow-100 border-yellow-200',
      'URGENT': 'text-red-600 bg-red-100 border-red-200'
    };
    return colors[priority] || colors['MEDIUM'];
  };

  const getStatusColor = (status) => {
    const colors = {
      'PENDING': 'text-gray-600 bg-gray-100',
      'IN_PROGRESS': 'text-blue-600 bg-blue-100',
      'COMPLETED': 'text-green-600 bg-green-100',
      'OVERDUE': 'text-red-600 bg-red-100'
    };
    return colors[status] || colors['PENDING'];
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'COMPLETED':
        return <CheckCircle size={16} className="text-green-500" />;
      case 'OVERDUE':
        return <AlertTriangle size={16} className="text-red-500" />;
      case 'IN_PROGRESS':
        return <Clock size={16} className="text-blue-500" />;
      default:
        return <Target size={16} className="text-gray-400" />;
    }
  };

  const calculateProgress = (task) => {
    if (!task.subtasks || task.subtasks.length === 0) {
      return task.progress || 0;
    }

    const completedSubtasks = task.subtasks.filter(subtask => subtask.completed).length;
    return Math.round((completedSubtasks / task.subtasks.length) * 100);
  };

  const getTimeRemaining = (targetDate) => {
    const now = new Date();
    const target = new Date(targetDate);
    const diff = target - now;

    if (diff <= 0) return { text: 'Overdue', color: 'text-red-600' };

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return { text: `${days} day${days > 1 ? 's' : ''} left`, color: 'text-gray-600' };
    } else if (hours > 0) {
      return { text: `${hours} hour${hours > 1 ? 's' : ''} left`, color: 'text-yellow-600' };
    } else {
      const minutes = Math.floor(diff / (1000 * 60));
      return { text: `${minutes} min left`, color: 'text-red-600' };
    }
  };

  const handleTaskAction = (task, action) => {
    switch (action) {
      case 'start':
        setActiveTask(task._id);
        onStartTask && onStartTask(task);
        break;
      case 'pause':
        setActiveTask(null);
        onPauseTask && onPauseTask(task);
        break;
      case 'complete':
        onCompleteTask && onCompleteTask(task);
        break;
      default:
        break;
    }
  };

  const ProgressBar = ({ progress, className = '' }) => (
    <div className={`w-full bg-gray-200 rounded-full h-2.5 ${className}`}>
      <div 
        className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  );

  const today = new Date();
  const todaysDate = today.toDateString();

  if (loading) {
    return (
      <Card>
        <CardBody className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-gray-200 rounded w-1/3" />
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-20 bg-gray-200 rounded-lg" />
              ))}
            </div>
          </div>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card>
      <CardBody className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <Calendar className="text-blue-600" size={28} />
              Today's Tasks
            </h2>
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
              <span>{formatDate(currentTime)}</span>
              <span className="font-mono text-blue-600">{formatTime(currentTime)}</span>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-sm text-gray-500">Total Tasks</div>
            <div className="text-2xl font-bold text-blue-600">{todaysTasks.length}</div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            {
              label: 'Completed',
              value: todaysTasks.filter(task => task.status === 'COMPLETED').length,
              color: 'text-green-600',
              bgColor: 'bg-green-100',
              icon: CheckCircle
            },
            {
              label: 'In Progress',
              value: todaysTasks.filter(task => task.status === 'IN_PROGRESS').length,
              color: 'text-blue-600',
              bgColor: 'bg-blue-100',
              icon: Clock
            },
            {
              label: 'Pending',
              value: todaysTasks.filter(task => task.status === 'PENDING').length,
              color: 'text-gray-600',
              bgColor: 'bg-gray-100',
              icon: Target
            },
            {
              label: 'Overdue',
              value: todaysTasks.filter(task => task.status === 'OVERDUE').length,
              color: 'text-red-600',
              bgColor: 'bg-red-100',
              icon: AlertTriangle
            }
          ].map((stat, index) => (
            <div key={index} className={`p-4 rounded-lg ${stat.bgColor}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                </div>
                <stat.icon size={24} className={stat.color} />
              </div>
            </div>
          ))}
        </div>

        {/* Tasks List */}
        {todaysTasks.length === 0 ? (
          <div className="text-center py-12">
            <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No tasks scheduled for today
            </h3>
            <p className="text-gray-600 mb-4">
              You're all caught up! Enjoy your free time or create a new study plan.
            </p>
            <Button className="flex items-center gap-2">
              <Plus size={16} />
              Create Study Plan
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {todaysTasks
              .sort((a, b) => {
                // Sort by priority first, then by status
                const priorityOrder = { 'URGENT': 4, 'HIGH': 3, 'MEDIUM': 2, 'LOW': 1 };
                const statusOrder = { 'IN_PROGRESS': 4, 'PENDING': 3, 'OVERDUE': 2, 'COMPLETED': 1 };
                
                const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
                if (priorityDiff !== 0) return priorityDiff;
                
                return statusOrder[b.status] - statusOrder[a.status];
              })
              .map((task) => {
                const progress = calculateProgress(task);
                const timeRemaining = getTimeRemaining(task.targetDate);
                const isActive = activeTask === task._id;

                return (
                  <Card key={task._id} className={`transition-all duration-200 ${
                    isActive ? 'ring-2 ring-blue-500 shadow-lg' : 'hover:shadow-md'
                  }`}>
                    <CardBody className="p-5">
                      <div className="flex items-start justify-between">
                        {/* Task Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2">
                            {getStatusIcon(task.status)}
                            <h3 className="text-lg font-semibold text-gray-900 truncate">
                              {task.title}
                            </h3>
                            
                            {/* Priority Badge */}
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                              <Flag size={12} className="inline mr-1" />
                              {task.priority}
                            </span>

                            {/* Status Badge */}
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                              {task.status.replace('_', ' ')}
                            </span>
                          </div>

                          {task.description && (
                            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                              {task.description}
                            </p>
                          )}

                          {/* Progress Bar */}
                          <div className="mb-3">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium text-gray-700">
                                Progress: {progress}%
                              </span>
                              <span className={`text-xs font-medium ${timeRemaining.color}`}>
                                <Timer size={12} className="inline mr-1" />
                                {timeRemaining.text}
                              </span>
                            </div>
                            <ProgressBar progress={progress} />
                          </div>

                          {/* Subtasks */}
                          {task.subtasks && task.subtasks.length > 0 && (
                            <div className="mb-3">
                              <div className="text-xs text-gray-500 mb-2">
                                Subtasks ({task.subtasks.filter(st => st.completed).length}/{task.subtasks.length})
                              </div>
                              <div className="space-y-1 max-h-20 overflow-y-auto">
                                {task.subtasks.slice(0, 3).map((subtask, index) => (
                                  <div key={index} className="flex items-center gap-2 text-sm">
                                    <input
                                      type="checkbox"
                                      checked={subtask.completed}
                                      onChange={(e) => {
                                        // Handle subtask completion
                                        const updatedSubtasks = [...task.subtasks];
                                        updatedSubtasks[index].completed = e.target.checked;
                                        onUpdateProgress && onUpdateProgress(task._id, {
                                          subtasks: updatedSubtasks
                                        });
                                      }}
                                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                                    />
                                    <span className={subtask.completed ? 'line-through text-gray-500' : 'text-gray-700'}>
                                      {subtask.title}
                                    </span>
                                  </div>
                                ))}
                                {task.subtasks.length > 3 && (
                                  <div className="text-xs text-gray-500">
                                    +{task.subtasks.length - 3} more subtasks
                                  </div>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Meta Info */}
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                              <BookOpen size={12} />
                              <span>{task.category}</span>
                            </div>
                            
                            <div className="flex items-center gap-1">
                              <Target size={12} />
                              <span>{task.estimatedHours || 0}h estimated</span>
                            </div>

                            <div className="flex items-center gap-1">
                              <TrendingUp size={12} />
                              <span>{task.actualHours || 0}h worked</span>
                            </div>

                            {task.reminders && task.reminders.length > 0 && (
                              <div className="flex items-center gap-1">
                                <Bell size={12} />
                                <span>{task.reminders.length} reminder{task.reminders.length > 1 ? 's' : ''}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-2 ml-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onEditTask(task)}
                            className="flex items-center gap-1"
                          >
                            <Edit size={14} />
                            Edit
                          </Button>

                          {task.status === 'COMPLETED' ? (
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex items-center gap-1 text-green-600 border-green-200"
                              disabled
                            >
                              <CheckCircle size={14} />
                              Completed
                            </Button>
                          ) : isActive ? (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleTaskAction(task, 'pause')}
                              className="flex items-center gap-1 text-yellow-600 border-yellow-200"
                            >
                              <Pause size={14} />
                              Pause
                            </Button>
                          ) : task.status === 'IN_PROGRESS' ? (
                            <Button
                              size="sm"
                              onClick={() => handleTaskAction(task, 'complete')}
                              className="flex items-center gap-1 bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle size={14} />
                              Complete
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              onClick={() => handleTaskAction(task, 'start')}
                              className="flex items-center gap-1"
                            >
                              <Play size={14} />
                              Start
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                );
              })}
          </div>
        )}

        {/* Summary Footer */}
        {todaysTasks.length > 0 && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-6">
                <span>
                  <span className="font-medium">
                    {todaysTasks.filter(task => task.status === 'COMPLETED').length}
                  </span>
                  <span className="text-gray-600"> completed</span>
                </span>
                <span>
                  <span className="font-medium">
                    {todaysTasks.reduce((sum, task) => sum + (task.actualHours || 0), 0).toFixed(1)}h
                  </span>
                  <span className="text-gray-600"> worked today</span>
                </span>
                <span>
                  <span className="font-medium">
                    {Math.round(todaysTasks.reduce((sum, task) => sum + calculateProgress(task), 0) / todaysTasks.length)}%
                  </span>
                  <span className="text-gray-600"> avg progress</span>
                </span>
              </div>
              
              <div className="text-right">
                <div className="text-xs text-gray-500">Overall Progress</div>
                <div className="w-32 mt-1">
                  <ProgressBar 
                    progress={Math.round(todaysTasks.reduce((sum, task) => sum + calculateProgress(task), 0) / todaysTasks.length)} 
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default TodaysTasks;