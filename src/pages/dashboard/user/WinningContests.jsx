import React from 'react';
import { Link } from 'react-router';
import  useAuth  from '../../../authentication/context/useAuth';
import { MOCK_CONTESTS } from '../../../utils/mockData';
import  Button  from '../../../components/ui/Button';
import { Trophy, Award, ArrowRight } from 'lucide-react';
import useAxiosSecure from '../../../hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
export function WinningContests() {
  const {
    user
  } = useAuth();

  const axiosSecure = useAxiosSecure();

  

  // submission data retrive
  const { data: submit = [] } = useQuery({
    queryKey: ["submitted"],
    queryFn: async () => {
      const result = await axiosSecure.get('http://localhost:5000/submissions');
      return result.data;
    },
  });
    
  if (!user) return null;
  const winningContests = submit.filter(contest => contest.user_email === user.email && contest.status === 'winner');
  const totalWinnings = winningContests.reduce((sum, contest) => sum + Number(contest.prizeMoney), 0);
  return <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">My Winnings</h1>
        <p className="text-slate-400">
          Celebrate your victories and achievements.
        </p>
      </div>

      {/* Stats Card */}
      <div className="bg-linear-to-r from-yellow-600/20 to-orange-600/20 border border-yellow-500/30 rounded-2xl p-8 flex items-center justify-between">
        <div>
          <p className="text-yellow-500 font-medium mb-1 uppercase tracking-wider text-sm">
            Total Earnings
          </p>
          <h2 className="text-4xl font-bold text-white">
            ${totalWinnings.toLocaleString()}
          </h2>
        </div>
        <div className="bg-yellow-500/20 p-4 rounded-full border border-yellow-500/30">
          <Trophy className="w-12 h-12 text-yellow-500" />
        </div>
      </div>

      {winningContests?.length > 0 ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {winningContests?.map(contest => <div key={contest._id} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden group hover:border-yellow-500/50 transition-colors">
              <div className="relative h-40">
                <img src={contest.image} alt={contest.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-linear-to-t from-slate-900 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <div className="bg-yellow-500 text-slate-900 text-xs font-bold px-2 py-1 rounded mb-2 inline-block">
                    WINNER
                  </div>
                  <h3 className="text-lg font-bold text-white line-clamp-1">
                    {contest.name}
                  </h3>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <div className="text-slate-400 text-sm">Prize Won</div>
                  <div className="text-xl font-bold text-yellow-500">
                    ${contest.prizeMoney}
                  </div>
                </div>
                <Link to={`/contest/${contest.contestId}`}>
                  <Button variant="outline" className="w-full group-hover:bg-yellow-500/10 group-hover:text-yellow-500 group-hover:border-yellow-500/50">
                    View Details
                  </Button>
                </Link>
              </div>
            </div>)}
        </div> : <div className="text-center py-20 bg-slate-900/30 rounded-2xl border border-slate-800 border-dashed">
          <Award className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-white mb-2">No wins yet</h3>
          <p className="text-slate-400 mb-6">
            Keep participating to win amazing prizes!
          </p>
          <Link to="/all-contests">
            <Button>
              Browse Contests <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>}
    </div>;
}