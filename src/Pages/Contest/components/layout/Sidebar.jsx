import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  FolderOpen,
  BookOpen,
  CheckCircle,
  Briefcase,
  MessageSquare,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export const Sidebar = () => {
  const location = useLocation();
  const { isSuperAdmin, isAdmin, user } = useAuth();
  const isHiringPartner = user?.role === 'HIRING_PARTNER';

  const menuItems = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: LayoutDashboard,
      roles: ['SUPER_ADMIN', 'ADMIN', 'HIRING_PARTNER'],
    },
    {
      name: 'Users',
      path: '/dashboard/users',
      icon: Users,
      roles: ['SUPER_ADMIN', 'ADMIN'],
    },
    {
      name: 'Approvals',
      path: '/dashboard/approvals',
      icon: CheckCircle,
      roles: ['SUPER_ADMIN', 'ADMIN'],
    },
    {
      name: 'Categories',
      path: '/dashboard/categories',
      icon: FolderOpen,
      roles: ['SUPER_ADMIN', 'ADMIN'],
    },
    {
      name: 'Courses',
      path: '/dashboard/courses',
      icon: BookOpen,
      roles: ['SUPER_ADMIN', 'ADMIN'],
    },
    {
      name: 'Job Management',
      path: '/dashboard/jobs',
      icon: Briefcase,
      roles: ['SUPER_ADMIN', 'ADMIN', 'HIRING_PARTNER'],
    },
    {
      name: 'Contact Management',
      path: '/dashboard/contacts',
      icon: MessageSquare,
      roles: ['SUPER_ADMIN', 'ADMIN'],
    },
  ];

  const filteredMenuItems = menuItems.filter(item => 
    !item.roles || item.roles.includes(user?.role)
  );

  const isActive = (path) => location.pathname === path;

  const getPanelTitle = () => {
    if (isSuperAdmin()) return 'Super Admin Panel';
    if (isAdmin()) return 'Admin Panel';
    if (isHiringPartner) return 'Hiring Partner Portal';
    return 'Dashboard';
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900">{getPanelTitle()}</h2>
      </div>

      <nav className="px-4 space-y-1 bg-red-300">
        {filteredMenuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
              isActive(item.path)
                ? 'bg-primary-50 text-primary-700'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
};
