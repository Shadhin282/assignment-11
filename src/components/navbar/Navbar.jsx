import React, { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { Trophy, User, LayoutDashboard, LogOut, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useAuth from '../../authentication/context/useAuth';
import Button from '../ui/Button';
import Dropdown from '../ui/Dropdown';
import DarkLight from '../darklight/DarkLight';

const Navbar = () => {
    const {user, logout}    = useAuth()
    const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isActive = (path) => location.pathname === path;
  const navLinks = [{
    name: 'Home',
    path: '/'
  }, {
    name: 'All Contests',
    path: '/all-contests'
  }, {
    name: 'Winners',
    path: '/#winners'
  }];
  const getDashboardLink = () => {
    if (!user) return '/dashboard';
    switch (user.role) {
      case 'admin':
        return '/dashboard/admin/contests';
      case 'creator':
        return '/dashboard/creator/contests';
      default:
        return '/dashboard/user/participated';
    }
  };
    return <nav className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-900/80 backdrop-blur-md">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/20">
            <Trophy className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white tracking-tight">
            ContestHub
          </span>
        </Link>
          <div className="block md:hidden"><DarkLight></DarkLight></div>
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => <Link key={link.path} to={link.path} className={`text-sm font-medium transition-colors hover:text-blue-400 ${isActive(link.path) ? 'text-blue-500' : 'text-slate-300'}`}>
            {link.name}
          </Link>)}
        </div>

        {/* Auth Buttons / Profile */}
        <div className="hidden md:flex items-center gap-4">
          { user ? <Dropdown trigger={<div className="flex items-center gap-3 hover:bg-slate-800/50 p-1.5 rounded-full pr-4 transition-colors border border-transparent hover:border-slate-700">
            <img src={user.photoURL} alt={user.displayName} className="h-8 w-8 rounded-full object-cover border border-slate-600" />
            <span className="text-sm font-medium text-slate-200">
              {user.displayName}
            </span>
          </div>} items={[{
            label: 'Dashboard',
            href: getDashboardLink(),
            icon: <LayoutDashboard className="h-4 w-4" />
          }, {
            label: 'Profile',
            href: '/dashboard/user/profile',
            icon: <User className="h-4 w-4" />
          }, {
            label: 'Logout',
            onClick: logout,
            icon: <LogOut className="h-4 w-4" />,
            danger: true
          }]} /> : <>
            <Link to="/login">
              <Button variant="ghost" size="sm">
                Log in
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="primary" size="sm">
                Sign up
              </Button>
            </Link>
            </>}
            <div className=""><DarkLight></DarkLight></div>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-300 hover:text-white p-2">
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
    </div>

    {/* Mobile Menu */}
    <AnimatePresence>
      {isMobileMenuOpen && <motion.div initial={{
        opacity: 0,
        height: 0
      }} animate={{
        opacity: 1,
        height: 'auto'
      }} exit={{
        opacity: 0,
        height: 0
      }} className="md:hidden border-t border-slate-800 bg-slate-900">
        <div className="space-y-1 px-4 py-4">
          {navLinks.map(link => <Link key={link.path} to={link.path} onClick={() => setIsMobileMenuOpen(false)} className={`block rounded-lg px-3 py-2 text-base font-medium ${isActive(link.path) ? 'bg-blue-500/10 text-blue-500' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}>
            {link.name}
          </Link>)}
            <div className="mt-4 border-t border-slate-800 pt-4">
              
            { user ? <>
              <div className="flex items-center gap-3 px-3 mb-4">
                <img src={user.photoURL} alt={user.displayName} className="h-10 w-10 rounded-full object-cover border border-slate-600" />
                <div>
                  <div className="font-medium text-white">
                    {user.displayName}
                  </div>
                  <div className="text-sm text-slate-400">
                    {user.email}
                  </div>
                </div>
              </div>
              <Link to={getDashboardLink()} onClick={() => setIsMobileMenuOpen(false)} className="block rounded-lg px-3 py-2 text-base font-medium text-slate-300 hover:bg-slate-800 hover:text-white">
                Dashboard
              </Link>
              <button onClick={() => {
                logout();
                setIsMobileMenuOpen(false);
              }} className="block w-full text-left rounded-lg px-3 py-2 text-base font-medium text-red-400 hover:bg-red-500/10">
                Logout
              </button>
            </> : <div className="grid grid-cols-2 gap-4 px-3">
              <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="secondary" className="w-full">
                  Log in
                </Button>
              </Link>
              <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="primary" className="w-full">
                  Sign up
                </Button>
              </Link>
              </div>}
              
          </div>
        </div>
      </motion.div>}
    </AnimatePresence>
  </nav>;
    ;
};

export default Navbar;