import React, { useState } from 'react';
import useAxiosSecure from '../../hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router';
import { Search } from 'lucide-react';
import ContestCard from '../../components/features/contestCard/ContestCard';
import Tabs from '../../components/ui/Tabs';


const AllContests = () => {
     const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('search') || '';
  const [activeTab, setActiveTab] = useState('all');
    const [searchQuery, setSearchQuery] = useState(initialQuery);
    const axiosSecure = useAxiosSecure();
  const  {data: contests = []}  = useQuery({
    queryKey: ['contests',searchQuery],
    queryFn: async () => {
      const result = await axiosSecure.get(`http://localhost:5000/search?search=${searchQuery}`);
      return result.data 
    }
  })


    const tabs = [{
    id: 'all',
    label: 'All Contests'
  }, {
    id:  'Design',
    label: 'Design'
  }, {
    id: 'Writing',
    label: 'Writing'
  }, {
    id: 'Business',
    label: 'Business'
  }, {
    id: 'Gaming',
    label: 'Gaming'
    }];

    const filteredContests = contests.filter(contest => {
    const matchesTab = activeTab === 'all' || contest.type === activeTab;
    const matchesSearch = contest.name.toLowerCase().includes(searchQuery.toLowerCase()) || contest.description.toLowerCase().includes(searchQuery.toLowerCase());
    // const isApproved = contest.status === 'approved';
    // return matchesTab && matchesSearch && isApproved;
        return matchesTab && matchesSearch
        });
    return <div>
            <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Explore Contests
            </h1>
            <p className="text-slate-400">
              Find the perfect challenge for your skills.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input type="text" placeholder="Search contests..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full sm:w-64 bg-slate-900 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
          </div>
        </div>

        {filteredContests.length > 0 ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredContests.map(contest => <ContestCard key={contest._id} contest={contest} />)}
        </div> : <div className="text-center py-20 bg-slate-900/30 rounded-2xl border border-slate-800 border-dashed">
          <p className="text-slate-400 text-lg">
            No contests found matching your criteria.
          </p>
          <button onClick={() => {
            setActiveTab('all');
            setSearchQuery('');
          }} className="mt-4 text-blue-400 hover:text-blue-300 font-medium">
            Clear filters
          </button>
        </div>}
      </div>
    </main>
        </div>
    
};

export default AllContests;