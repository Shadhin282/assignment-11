import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import useAuth from '../../authentication/context/useAuth';
import { MOCK_CONTESTS, MOCK_USERS } from '../../utils/mockData';
import Button from '../../components/ui/Button';
import { Users, Trophy, Calendar, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import Countdown from '../../components/ui/CountDown';
import PaymentModal from '../../components/features/payment/PaymentModal';
import TaskSubmissionModal from '../../components/features/tasksubmission/TaskSubmissionModal';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hook/useAxiosSecure';


const ContestDetails = () => {
  const {
    id
  } = useParams();
//   const navigate = useNavigate();
  const {
    user
  } = useAuth();
  const [contest, setContest] = useState({});
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isSubmissionModalOpen, setIsSubmissionModalOpen] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  
  const axiosSecure = useAxiosSecure();
 
    const  {data: contestData = {}}  = useQuery({
    queryKey: ['contests',id],
    queryFn: async () => {
      const result = await axiosSecure.get(`http://localhost:5000/contests/${id}`);
      setContest(result.data)
      return result.data 
    }
    })
    
  console.log(contest)
    
  
  
 
   
    
    
      
    
  
  if (!contest) {
    return <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-4">
          Contest not found
        </h2>
        <Link to="/all-contests">
          <Button>Browse Contests</Button>
        </Link>
      </div>
    </div>;
  }
  const isRegistered = !user && contest;
  const isEnded = new Date(contest.deadline) < new Date();
  const winner = contest.winnerId ? MOCK_USERS.find(u => u.id === contest.winnerId) : null;
  const handlePaymentSuccess = () => {
    // Update local state to reflect registration
    const updatedContest = {
      ...contest,
      participants: [...contest.participants, user.id]
    };
    setContest(updatedContest);
    setIsPaymentModalOpen(false);
  };
  const handleSubmissionSuccess = () => {
    setHasSubmitted(true);
    setIsSubmissionModalOpen(false);
  };
  return <div>
    

    <main className="flex-1">
      {/* Hero Banner */}
      <div className="relative h-100 w-full overflow-hidden">
        <img src={contest.bannerImage} alt={contest.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/60 to-transparent"></div>

        <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
          <div className="max-w-7xl mx-auto">
            <div className="inline-block px-3 py-1 bg-blue-600/20 border border-blue-500/30 rounded-full text-blue-400 text-sm font-medium mb-4">
              {contest.type}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {contest.name}
            </h1>
            <div className="flex flex-wrap gap-6 text-slate-300">
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-2 text-blue-500" />
                <span>{contest} Participants</span>
              </div>
              <div className="flex items-center">
                <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
                <span>${contest.prizeMoney} Prize Pool</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-purple-500" />
                <span>
                  Deadline: {new Date(contest.deadline).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                About the Contest
              </h2>
              <p className="text-slate-400 leading-relaxed text-lg">
                {contest.description}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                Task Instructions
              </h2>
              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">
                  {contest.taskInstruction}
                </p>
              </div>
            </section>

            {winner && <section className="bg-linear-to-r from-yellow-900/20 to-orange-900/20 border border-yellow-500/30 rounded-xl p-8 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Trophy className="w-32 h-32 text-yellow-500" />
              </div>
              <h2 className="text-2xl font-bold text-yellow-500 mb-6">
                Winner Declared!
              </h2>
              <div className="inline-block relative">
                <img src={winner.photo} alt={winner.name} className="w-24 h-24 rounded-full border-4 border-yellow-500 shadow-xl mb-4" />
                <div className="absolute -bottom-2 -right-2 bg-yellow-500 text-slate-900 rounded-full p-1.5">
                  <Trophy className="w-4 h-4" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white">
                {winner.name}
              </h3>
              <p className="text-slate-400">
                Congratulations on winning ${contest.prizeMoney}!
              </p>
            </section>}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Action Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl sticky top-24">
              {!isEnded && !winner && <div className="mb-8 text-center">
                <p className="text-sm text-slate-400 mb-2 uppercase tracking-wider">
                  Time Remaining
                </p>
                <div className="flex justify-center">
                  <Countdown targetDate={contest.deadline} />
                </div>
              </div>}

              {isEnded ? <div className="text-center p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                <Clock className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                <h3 className="text-lg font-bold text-white">
                  Contest Ended
                </h3>
                <p className="text-slate-400 text-sm">
                  Submissions are closed.
                </p>
              </div> : <div className="space-y-4">
                {!user ? <Link to="/login">
                  <Button className="w-full" size="lg">
                    Login to Join
                  </Button>
                </Link> : isRegistered ? <>
                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 flex items-center text-green-400 text-sm">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    You are registered!
                  </div>
                  {hasSubmitted ? <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 flex items-center text-blue-400 text-sm">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Task submitted successfully.
                  </div> : <Button className="w-full" size="lg" variant="primary" onClick={() => setIsSubmissionModalOpen(true)}>
                    Submit Task
                  </Button>}
                </> : <>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-slate-400">Entry Fee</span>
                    <span className="text-2xl font-bold text-white">
                      ${contest.price}
                    </span>
                  </div>
                  <Button className="w-full" size="lg" onClick={() => setIsPaymentModalOpen(true)}>
                    Register Now
                  </Button>
                  <p className="text-xs text-center text-slate-500 mt-2">
                    Secure payment processing
                  </p>
                </>}
              </div>}
            </div>

            {/* Info Card */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
              <h3 className="font-bold text-white mb-4 flex items-center">
                <AlertCircle className="w-4 h-4 mr-2 text-blue-500" />
                Rules & Information
              </h3>
              <ul className="space-y-3 text-sm text-slate-400">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  All submissions must be original work.
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  Winner is declared by the contest creator within 7 days of
                  deadline.
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  Entry fee is non-refundable once registered.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>

    

    {/* Modals */}
    <PaymentModal isOpen={isPaymentModalOpen} onClose={() => setIsPaymentModalOpen(false)} contest={contest} onSuccess={handlePaymentSuccess} />

    <TaskSubmissionModal isOpen={isSubmissionModalOpen} onClose={() => setIsSubmissionModalOpen(false)} contest={contest} onSuccess={handleSubmissionSuccess} />
  </div>;
}

export default ContestDetails;