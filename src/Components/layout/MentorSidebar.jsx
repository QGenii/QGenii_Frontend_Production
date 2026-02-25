import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Calendar, Plus, Users, Settings, FileText } from 'lucide-react';

export default function MentorSidebar() {
  const { pathname } = useLocation();

  const items = [
    { to: '/mentor', label: 'Overview', icon: BookOpen },
    { to: '/mentor/courses/create', label: 'Create Course', icon: Plus },
    { to: '/contests', label: 'Contests', icon: Calendar },
    // { to: '/mentor/courses', label: 'My Courses', icon: FileText },
    // { to: '/mentor/students', label: 'Students', icon: Users },
    // { to: '/mentor/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-white border-r p-4 block">
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Mentor</h3>
        <p className="text-sm text-gray-500">Dashboard</p>
      </div>
      <nav className="space-y-1">
        {items.map((it) => {
          const Icon = it.icon;
          const active = pathname === it.to || pathname.startsWith(it.to + '/');
          return (
            <Link
              key={it.to}
              to={it.to}
              className={`flex items-center gap-3 px-3 py-2 rounded text-sm ${active ? 'bg-gray-100 font-medium' : 'text-gray-700 hover:bg-gray-50'}`}>
              <Icon className="w-4 h-4" />
              <span>{it.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
