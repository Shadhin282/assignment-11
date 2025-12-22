import React from 'react';
import { Link } from 'react-router';
import  useAuth  from '../../../authentication/context/useAuth';
import { MOCK_CONTESTS } from '../../../utils/mockData';
import  {Table}  from '../../../components/ui/Table';
import  Button  from '../../../components/ui/Button';
import { Eye, CheckCircle, Clock } from 'lucide-react';
export function ParticipatedContests() {
  const {
    user
  } = useAuth();
  if (!user) return null;
  const participatedContests = MOCK_CONTESTS.filter(contest => contest.participants.includes(user.id)).sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
  const columns = [{
    header: 'Contest Name',
    accessor: (contest) => <div className="flex items-center gap-3">
      <img src={contest.image} alt="" className="w-10 h-10 rounded-lg object-cover" />
      <span className="font-medium text-white">{contest.name}</span>
    </div>
  }, {
    header: 'Type',
    accessor: 'type'
  }, {
    header: 'Deadline',
    accessor: (contest) => {
      const isEnded = new Date(contest.deadline) < new Date();
      return <div className={`flex items-center ${isEnded ? 'text-red-400' : 'text-slate-300'}`}>
        <Clock className="w-4 h-4 mr-2" />
        {new Date(contest.deadline).toLocaleDateString()}
      </div>;
    }
  }, {
    header: 'Status',
    accessor: (contest) => {
      const isEnded = new Date(contest.deadline) < new Date();
      return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${isEnded ? 'bg-slate-800 text-slate-400' : 'bg-green-500/10 text-green-400'}`}>
        {isEnded ? 'Ended' : 'Active'}
      </span>;
    }
  }, {
    header: 'Payment',
    accessor: () => <span className="inline-flex items-center text-green-400 text-sm">
      <CheckCircle className="w-4 h-4 mr-1" /> Paid
    </span>
  }];
  return <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold text-white">
        My Participated Contests
      </h1>
      <p className="text-slate-400">Track all the contests you've joined.</p>
    </div>

    <Table data={participatedContests} columns={columns} actions={contest => <Link to={`/contest/${contest.id}`}>
      <Button size="sm" variant="outline">
        <Eye className="w-4 h-4 mr-2" />
        View
      </Button>
    </Link>} />
  </div>;
}