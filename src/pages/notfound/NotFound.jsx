import React from 'react';
import { Trophy, Home } from 'lucide-react';
import { Link } from 'react-router';
import Button from '../../components/ui/Button';

const NotFound = () => {
    return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 text-center">
      <div className="mb-8 relative">
        <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full"></div>
        <Trophy className="w-32 h-32 text-slate-800 relative z-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-9xl font-bold text-slate-800/50 select-none z-0">
          404
        </div>
      </div>

      <h1 className="text-4xl font-bold text-white mb-4 relative z-10">
        Page Not Found
      </h1>
      <p className="text-slate-400 max-w-md mb-8 relative z-10">
        The contest you're looking for might have ended, or the page has been
        moved to another location.
      </p>

      <Link to="/" className="relative z-10">
        <Button className="flex items-center gap-2">
          <Home className="w-4 h-4" />
          Back to Home
        </Button>
      </Link>
    </div>
    );
};

export default NotFound;