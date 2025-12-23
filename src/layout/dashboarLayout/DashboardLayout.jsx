import React, { useState } from 'react';
import { LayoutDashboard, Trophy, User, PlusCircle, List, Users, FileText, LogOut, Menu, X } from 'lucide-react';
import useAuth from '../../authentication/context/useAuth';
import { Link, Outlet, useLocation } from 'react-router';


const DashboardLayout = () => {
  const {
    user,
    logout
  } = useAuth();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (!user) return null;
  const isActive = (path) => location.pathname === path;

  // const userLinks = [{
  //   name: 'Participated Contests',
  //   path: '/dashboard/user/participated',
  //   icon: <List className="w-5 h-5" />
  // }, {
  //   name: 'Winning Contests',
  //   path: '/dashboard/user/winning',
  //   icon: <Trophy className="w-5 h-5" />
  // }, {
  //   name: 'My Profile',
  //   path: '/dashboard/user/profile',
  //   icon: <User className="w-5 h-5" />
  // }];
  // const creatorLinks = [{
  //   name: 'Add Contest',
  //   path: '/dashboard/creator/add',
  //   icon: <PlusCircle className="w-5 h-5" />
  // }, {
  //   name: 'My Contests',
  //   path: '/dashboard/creator/contests',
  //   icon: <List className="w-5 h-5" />
  // }, {
  //   name: 'Submissions',
  //   path: '/dashboard/creator/submissions',
  //   icon: <FileText className="w-5 h-5" />
  // }];
  // const adminLinks = [{
  //   name: 'Manage Users',
  //   path: '/dashboard/admin/users',
  //   icon: <Users className="w-5 h-5" />
  // }, {
  //   name: 'Manage Contests',
  //   path: '/dashboard/admin/contests',
  //   icon: <List className="w-5 h-5" />
  //   }];
  
  const getLinks =[{
    name: 'Participated Contests',
    path: '/dashboard/user/participated',
    icon: <List className="w-5 h-5" />
  }, {
    name: 'Winning Contests',
    path: '/dashboard/user/winning',
    icon: <Trophy className="w-5 h-5" />
  }, {
    name: 'My Profile',
    path: '/dashboard/user/profile',
    icon: <User className="w-5 h-5" />
  },{
    name: 'Add Contest',
    path: '/dashboard/creator/add',
    icon: <PlusCircle className="w-5 h-5" />
  }, {
    name: 'My Contests',
    path: '/dashboard/creator/contests',
    icon: <List className="w-5 h-5" />
  }, {
    name: 'Submissions',
    path: '/dashboard/creator/submissions',
    icon: <FileText className="w-5 h-5" />
  },
    {
    name: 'Manage Users',
    path: '/dashboard/admin/users',
    icon: <Users className="w-5 h-5" />
  }, {
    name: 'Manage Contests',
    path: '/dashboard/admin/contests',
    icon: <List className="w-5 h-5" />
    }

  ]
  // const getLinks = () => {
    
  //   // switch (user) {
  //   //   case 'admin':
  //   //     return adminLinks;
  //   //   case 'creator':
  //   //     return creatorLinks;
  //   //   default:
  //   //     return userLinks;
  //   // }
  // };
  const links = getLinks;
  return <div className="min-h-screen bg-slate-950 flex">
    {/* Mobile Sidebar Overlay */}
    {isSidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)} />}

    {/* Sidebar */}
    <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800 transform transition-transform duration-200 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
      <div className="flex flex-col h-full">
        <div className="h-16 flex items-center px-6 border-b border-slate-800">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-blue-500 to-indigo-600">
              <Trophy className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">
              ContestHub
            </span>
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          <div className="mb-6 px-2">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              {user.role} Dashboard
            </p>
          </div>
          {links.map(link => <Link key={link.path} to={link.path} onClick={() => setIsSidebarOpen(false)} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive(link.path) ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
            {link.icon}
            {link.name}
          </Link>)}
        </div>

        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3 px-3 mb-4">
            <img src={user.photoURL} alt={user.displayName} className="h-9 w-9 rounded-full object-cover border border-slate-700" />
            <div className="overflow-hidden">
              <p className="text-sm font-medium text-white truncate">
                {user.displayName}
              </p>
              <p className="text-xs text-slate-500 truncate">{user.email}</p>
            </div>
          </div>
          <button onClick={logout} className="flex w-full items-center gap-3 px-3 py-2 text-sm font-medium text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>
    </aside>

    {/* Main Content */}
    <div className="flex-1 flex flex-col min-w-0">
      <header className="lg:hidden h-16 bg-slate-900 border-b border-slate-800 flex items-center px-4 justify-between">
        <button onClick={() => setIsSidebarOpen(true)} className="text-slate-400 hover:text-white">
          <Menu className="w-6 h-6" />
        </button>
        <span className="font-semibold text-white">Dashboard</span>
        <div className="w-6" /> {/* Spacer for centering */}
      </header>

      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  </div>;
}

export default DashboardLayout;