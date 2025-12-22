import React from 'react';
import  useAuth  from '../../../authentication/context/useAuth';
import { MOCK_CONTESTS, MOCK_SUBMISSIONS, MOCK_USERS } from '../../../utils/mockData';
import { Table } from '../../../components/ui/Table';
import  Button  from '../../../components/ui/Button';
import { Trophy, ExternalLink } from 'lucide-react';

export function Submissions() {
  const {
    user
  } = useAuth();
  if (!user) return null;
  // Get submissions for contests created by this user
  const myContestIds = MOCK_CONTESTS.filter(c => c.creatorId === user.id).map(c => c.id);
  const submissions = MOCK_SUBMISSIONS.filter(s => myContestIds.includes(s.contestId));
  const handleDeclareWinner = (submissionId, contestId) => {
    // In a real app, API call to set winner
    alert(`Winner declared for submission ${submissionId}!`);
  };
  const columns = [{
    header: 'Contest',
    accessor: (sub) => {
      const contest = MOCK_CONTESTS.find(c => c.id === sub.contestId);
      return <span className="text-white font-medium">{contest?.name}</span>;
    }
  }, {
    header: 'Participant',
    accessor: (sub) => {
      const participant = MOCK_USERS.find(u => u.id === sub.userId);
      return <div className="flex items-center gap-2">
        <img src={participant?.photo} alt="" className="w-6 h-6 rounded-full" />
        <span>{participant?.name}</span>
        <span className="text-xs text-slate-500">
          ({participant?.email})
        </span>
      </div>;
    }
  }, {
    header: 'Submission',
    accessor: (sub) => <a href={sub.taskLink} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 flex items-center gap-1">
      View Work <ExternalLink className="w-3 h-3" />
    </a>
  }, {
    header: 'Status',
    accessor: (sub) => sub.status === 'winner' ? <span className="text-yellow-500 font-bold flex items-center">
      <Trophy className="w-4 h-4 mr-1" /> Winner
    </span> : <span className="text-slate-400">Pending</span>
  }];
  return <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold text-white">Submissions</h1>
      <p className="text-slate-400">
        Review work submitted to your contests.
      </p>
    </div>

    <Table data={submissions} columns={columns} actions={sub => {
      const contest = MOCK_CONTESTS.find(c => c.id === sub.contestId);
      // Only show declare winner if no winner yet
      if (!contest?.winnerId) {
        return <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700 text-white" onClick={() => handleDeclareWinner(sub.id, sub.contestId)}>
          <Trophy className="w-4 h-4 mr-2" />
          Declare Winner
        </Button>;
      }
      return null;
    }} />
  </div>;
}