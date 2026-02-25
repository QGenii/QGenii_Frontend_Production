import { useState } from 'react';
import { Card, CardBody } from '../ui/Card';
import { Button } from '../ui/Button';
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus,
  Clock,
  AlertTriangle,
  CheckCircle,
  Calendar as CalendarIcon
} from 'lucide-react';

const StudyPlanCalendar = ({ 
  calendarData = {}, 
  selectedDate, 
  onDateChange, 
  onPlanEdit, 
  onPlanDelete,
  onProgressUpdate 
}) => {
  const [currentMonth, setCurrentMonth] = useState(selectedDate || new Date());

  const getPriorityColor = (priority) => {
    const colors = {
      'LOW': 'bg-green-100 text-green-800 border-green-200',
      'MEDIUM': 'bg-blue-100 text-blue-800 border-blue-200',
      'HIGH': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'URGENT': 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[priority] || colors['MEDIUM'];
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'COMPLETED':
        return <CheckCircle size={12} className="text-green-500" />;
      case 'OVERDUE':
        return <AlertTriangle size={12} className="text-red-500" />;
      case 'IN_PROGRESS':
        return <Clock size={12} className="text-blue-500" />;
      default:
        return <CalendarIcon size={12} className="text-gray-400" />;
    }
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const navigateMonth = (direction) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + direction);
    setCurrentMonth(newMonth);
    onDateChange(newMonth);
  };

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const isToday = (date) => {
    if (!date) return false;
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const days = getDaysInMonth(currentMonth);

  return (
    <Card>
      <CardBody className="p-6">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold text-gray-900">
              {currentMonth.toLocaleDateString('en-US', { 
                month: 'long', 
                year: 'numeric' 
              })}
            </h2>
            
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateMonth(-1)}
                className="p-2"
              >
                <ChevronLeft size={16} />
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateMonth(1)}
                className="p-2"
              >
                <ChevronRight size={16} />
              </Button>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const today = new Date();
              setCurrentMonth(today);
              onDateChange(today);
            }}
          >
            Today
          </Button>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {/* Day Headers */}
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div
              key={day}
              className="p-3 text-center text-sm font-medium text-gray-600 border-b"
            >
              {day}
            </div>
          ))}

          {/* Calendar Days */}
          {days.map((date, index) => {
            if (!date) {
              return <div key={index} className="p-2 h-24" />;
            }

            const dateKey = formatDate(date);
            const dayPlans = calendarData[dateKey] || [];
            const isCurrentDay = isToday(date);

            return (
              <div
                key={index}
                className={`relative p-2 h-24 border border-gray-200 hover:bg-gray-50 transition-colors ${
                  isCurrentDay ? 'bg-blue-50 border-blue-200' : ''
                }`}
              >
                <div className={`text-sm font-medium mb-1 ${
                  isCurrentDay ? 'text-blue-600' : 'text-gray-900'
                }`}>
                  {date.getDate()}
                </div>

                <div className="space-y-1 overflow-y-auto max-h-16">
                  {dayPlans.slice(0, 3).map((plan) => (
                    <div
                      key={plan._id}
                      className={`text-xs px-1 py-0.5 rounded border cursor-pointer truncate flex items-center gap-1 ${getPriorityColor(plan.priority)}`}
                      onClick={() => onPlanEdit(plan)}
                      title={`${plan.title} - ${plan.progress}% complete`}
                    >
                      {getStatusIcon(plan.status)}
                      <span className="truncate">{plan.title}</span>
                    </div>
                  ))}
                  
                  {dayPlans.length > 3 && (
                    <div className="text-xs text-gray-500 text-center">
                      +{dayPlans.length - 3} more
                    </div>
                  )}
                </div>

                {dayPlans.length === 0 && (
                  <button
                    onClick={() => {
                      onDateChange(date);
                      // Trigger quick add functionality
                      if (window.handleQuickAdd) {
                        window.handleQuickAdd(date);
                      }
                    }}
                    className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
                    title={`Add study plan for ${date.toLocaleDateString()}`}
                  >
                    <Plus size={16} className="text-gray-400" />
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-600">Priority:</span>
            <div className="flex items-center gap-1">
              <span className="px-2 py-1 rounded bg-green-100 text-green-800">Low</span>
              <span className="px-2 py-1 rounded bg-blue-100 text-blue-800">Medium</span>
              <span className="px-2 py-1 rounded bg-yellow-100 text-yellow-800">High</span>
              <span className="px-2 py-1 rounded bg-red-100 text-red-800">Urgent</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-600">Status:</span>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <CheckCircle size={12} className="text-green-500" />
                <span>Completed</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock size={12} className="text-blue-500" />
                <span>In Progress</span>
              </div>
              <div className="flex items-center gap-1">
                <AlertTriangle size={12} className="text-red-500" />
                <span>Overdue</span>
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default StudyPlanCalendar;