import { Card, CardBody } from '../ui/Card';
import { 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  Target,
  TrendingUp,
  Calendar,
  BookOpen,
  Zap
} from 'lucide-react';

const StudyPlanStats = ({ stats }) => {
  const statCards = [
    {
      title: 'Total Tasks',
      value: stats.total,
      icon: Target,
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-500'
    },
    {
      title: 'Completed',
      value: stats.completed,
      icon: CheckCircle,
      bgColor: 'bg-green-50',
      iconColor: 'text-green-500',
      subtitle: `${stats.completionRate}% completion rate`
    },
    {
      title: 'In Progress',
      value: stats.inProgress,
      icon: Clock,
      color: 'yellow',
      bgColor: 'bg-yellow-50',
      iconColor: 'text-yellow-500'
    },
    {
      title: 'Overdue',
      value: stats.overdue,
      icon: AlertTriangle,
      color: 'red',
      bgColor: 'bg-red-50',
      iconColor: 'text-red-500'
    },
    {
      title: 'Today\'s Tasks',
      value: stats.todayTasks,
      icon: Calendar,
      color: 'purple',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-500'
    },
    {
      title: 'This Week',
      value: stats.weekTasks,
      icon: BookOpen,
      color: 'indigo',
      bgColor: 'bg-indigo-50',
      iconColor: 'text-indigo-500'
    },
    {
      title: 'Avg Progress',
      value: `${Math.round(stats.averageProgress)}%`,
      icon: TrendingUp,
      color: 'teal',
      bgColor: 'bg-teal-50',
      iconColor: 'text-teal-500'
    },
    {
      title: 'Hours Worked',
      value: `${stats.totalActualHours}h`,
      icon: Zap,
      color: 'orange',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-500',
      subtitle: `of ${stats.totalEstimatedHours}h planned`
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardBody className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </p>
                  {stat.subtitle && (
                    <p className="text-xs text-gray-500">
                      {stat.subtitle}
                    </p>
                  )}
                </div>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <Icon size={20} className={stat.iconColor} />
                </div>
              </div>
            </CardBody>
          </Card>
        );
      })}
    </div>
  );
};

export default StudyPlanStats;