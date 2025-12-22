import React from 'react';
import { MOCK_CONTESTS, MOCK_USERS } from '../../../utils/mockData';
import { motion } from 'framer-motion';
import { Trophy, Award } from 'lucide-react';


const WinnerShowCase = () => {
    const winners = [{
    user: MOCK_USERS[0],
    contest: MOCK_CONTESTS[2],
    prize: 1000
  }, {
    user: MOCK_USERS[3],
    contest: MOCK_CONTESTS[0],
    prize: 500
  }, {
    user: MOCK_USERS[4],
    contest: MOCK_CONTESTS[3],
    prize: 150
  }];
    return <section className="relative py-20 overflow-hidden" id="winners">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-indigo-950/30"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} className="inline-flex items-center justify-center p-2 bg-yellow-500/10 rounded-full mb-4 border border-yellow-500/20">
            <Trophy className="w-5 h-5 text-yellow-500 mr-2" />
            <span className="text-yellow-500 font-medium text-sm uppercase tracking-wide">
              Hall of Fame
            </span>
          </motion.div>

          <motion.h2 initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          delay: 0.1
        }} className="text-3xl md:text-5xl font-bold text-white mb-6">
            Celebrating Excellence
          </motion.h2>

          <motion.p initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          delay: 0.2
        }} className="text-lg text-slate-400 max-w-2xl mx-auto">
            Meet the talented creators who have risen to the top and claimed
            their prizes.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {winners.map((winner, index) => <motion.div key={index} initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          delay: index * 0.1 + 0.3
        }} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/10 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 text-center hover:border-yellow-500/30 transition-colors">
                <div className="relative inline-block mb-6">
                  <div className="absolute -inset-1 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full blur opacity-50"></div>
                  <img src={winner.user.photo} alt={winner.user.name} className="relative w-24 h-24 rounded-full object-cover border-2 border-slate-800" />
                  <div className="absolute -bottom-2 -right-2 bg-yellow-500 text-slate-900 rounded-full p-1.5 border-4 border-slate-800">
                    <Award className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-1">
                  {winner.user.name}
                </h3>
                <p className="text-slate-400 text-sm mb-4">
                  Winner of {winner.contest.name}
                </p>

                <div className="inline-flex items-center justify-center px-4 py-2 bg-slate-900/50 rounded-lg border border-slate-700">
                  <span className="text-yellow-500 font-bold text-lg">
                    ${winner.prize}
                  </span>
                  <span className="text-slate-500 text-xs ml-2 uppercase tracking-wide">
                    Prize Won
                  </span>
                </div>
              </div>
            </motion.div>)}
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-slate-800 pt-12">
          {[{
          label: 'Total Winners',
          value: '1,200+'
        }, {
          label: 'Prize Money Paid',
          value: '$250k+'
        }, {
          label: 'Active Contests',
          value: '85'
        }, {
          label: 'Countries',
          value: '42'
        }].map((stat, i) => <div key={i} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-slate-500 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>)}
        </div>
      </div>
    </section>;
};

export default WinnerShowCase;