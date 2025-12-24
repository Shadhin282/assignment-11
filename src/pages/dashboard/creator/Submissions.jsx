import React from 'react';
import  useAuth  from '../../../authentication/context/useAuth';
import { MOCK_CONTESTS, MOCK_SUBMISSIONS, MOCK_USERS } from '../../../utils/mockData';
import { Table } from '../../../components/ui/Table';
import  Button  from '../../../components/ui/Button';
import { Trophy, ExternalLink } from 'lucide-react';
import useAxiosSecure from '../../../hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export function Submissions() {
  const {
    user
  } = useAuth();
  
  const axiosSecure = useAxiosSecure();
  
  //submit data
  const { data: submission = [] } = useQuery({
    queryKey: ["submitted"],
    queryFn: async () => {
      const result = await axiosSecure.get('http://localhost:5000/submissions');
      return result.data;
    },
  });
  console.log(submission)

  // users data
  const submit = submission.filter(c => c?.creator_mail === user.email);


  // const myContests = contestdata.filter(c => c?.creator_mail === user.email);
  // console.log(myContests)
  // const submissions = submit.filter(s => myContests?.participants?.includes(s.user_email))
  // console.log(submissions)
  // Get submissions for contests created by this user
  // const myContestIds = MOCK_CONTESTS.filter(c => c.creatorId === user.id).map(c => c.id);
  // const submissions = MOCK_SUBMISSIONS.filter(s => myContestIds.includes(s.contestId));
  const handleDeclareWinner = (submissionId, contestId) => {
    // In a real app, API call to set winner
    toast(`Winner declared for submission ${submissionId}!`);
  };
  const columns = [{
    header: 'Contest',
    accessor: (sub) => {
      
      return <span className="text-white font-medium">{sub?.name}</span>;
    }
  },
    
    {
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

    <Table data={submit} columns={columns} actions={sub => {
      // const submitInfo = submit.filter(s => myContests?.participent?.includes(s.user_email));
      // Only show declare winner if no winner yet
      if (submit.status !== 'winner') {
        return <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700 text-white" onClick={() => handleDeclareWinner(sub.user_email, sub.contestId)}>
          <Trophy className="w-4 h-4 mr-2" />
          Declare Winner
        </Button>;
      }
      return null;
    }} />
  </div>;
}