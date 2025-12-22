import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hook/useAxiosSecure";
import { Calendar, Clock, Trophy, Users } from "lucide-react";
import Countdown from '../../components/ui/Countdown'
import useAuth from "../../authentication/context/useAuth";
import { useState } from "react";
import PaymentModal from '../../components/features/payment/PaymentModal'
import TaskSubmissionModal from '../../components/features/tasksubmission/TaskSubmissionModal'
import Button from "../../components/ui/Button";


const ContestDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
 const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  // const [contest,setContest] = useState(null)
  const axiosSecure = useAxiosSecure();

  const { data: contest = [] } = useQuery({
    queryKey: ["contests", id],
    queryFn: async () => {
      const result = await axiosSecure.get(
        `http://localhost:5000/contests/${id}`
      );
      return result.data;
    },
  });

  // console.log(contest);
  const isEnded = new Date(contest.deadline) < new Date();
   

  return (
    <div>
      <main>
        <div className="relative h-100 w-full overflow-hidden">
          <img
            src={contest.bannerImage}
            alt={contest.name}
            className="w-full h-full object-cover"
          />
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
                  <span> Participants</span>
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

         {/* Main content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
              <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                About the Contest
              </h2>
              <p className="text-slate-400 leading-relaxed text-lg">
                {contest.description}
              </p>
              </section>
              {/* Task instruction section */}
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
        </div>
            {/* side bar  */}
            <div className="space-y-8">
            {/* Action Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl sticky top-24">
              {!isEnded  && <div className="mb-8 text-center">
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
                  
                  
                  
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-slate-400">Entry Fee</span>
                    <span className="text-2xl font-bold text-white">
                      ${contest.prizeMoney}
                    </span>
                  </div>
                  <Button className="w-full" size="lg" onClick={() => setIsPaymentModalOpen(true)}>
                    Register Now
                  </Button>
                  <p className="text-xs text-center text-slate-500 mt-2">
                    Secure payment processing
                  </p>
                
              </div>}
              </div>
              </div>
            </div>

        </div>
        
      </main>

      {/* Modals */}
      <PaymentModal isOpen={isPaymentModalOpen} contest={contest} onClose={() => setIsPaymentModalOpen(false)}/>

    {/* <TaskSubmissionModal  /> */}
    </div>
  );
};

export default ContestDetails;
