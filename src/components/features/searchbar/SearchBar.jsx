import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Search } from 'lucide-react';


const SearchBar = () => {
    const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/all-contests?search=${encodeURIComponent(query)}`);
    }
  };
    return <form onSubmit={handleSearch} className="relative w-full max-w-2xl mx-auto">
    <div className="relative group">
      <div className="absolute -inset-1 bg-linear-to-r from-blue-600 to-indigo-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
      <div className="relative flex items-center bg-slate-900 rounded-xl border border-slate-700 shadow-2xl overflow-hidden">
        <div className="pl-6 text-slate-400">
          <Search className="w-6 h-6" />
        </div>
        <input type="text" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search contests by name, type, or tag..." className="w-full bg-transparent border-none px-6 py-5 text-lg text-white placeholder-slate-500 focus:outline-none focus:ring-0" />
        <div className="pr-2">
          <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
            Search
          </button>
        </div>
      </div>
    </div>
  </form>;
};

export default SearchBar;