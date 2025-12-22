import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Target, Award } from 'lucide-react';
import SearchBar from '../../components/features/searchbar/SearchBar';
import ContestCard from '../../components/features/contestCard/ContestCard';
import WinnerShowCase from '../../components/features/winnershowcase/WinnerShowCase';
import { Link } from 'react-router';
import Button from '../../components/ui/Button';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hook/useAxiosSecure';


const Home = () => {
    const axiosSecure = useAxiosSecure();

     const {data: contestData = []} = useQuery({
        queryKey: ['contests',],
        queryFn: async () => {
            const result = await axiosSecure.get('http://localhost:5000/contests');
            return result.data
        }
     })
  console.log(contestData)
      const contesthubWorks = [{
    title: 'Discover',
    desc: 'Browse through hundreds of active contests across various categories.',
    icon: <Target className="w-8 h-8 text-blue-500" />
  }, {
    title: 'Compete',
    desc: 'Submit your best work and compete with talented individuals worldwide.',
    icon: <Zap className="w-8 h-8 text-yellow-500" />
  }, {
    title: 'Win',
    desc: 'Get recognized for your skills and earn cash prizes instantly.',
    icon: <Award className="w-8 h-8 text-purple-500" />
  }];

    
    console.log(contestData)

    const popularContests = contestData.sort((a, b) => b.participants.length - a.participants.length).slice(0, 6);
 
 
    return (
        <div className="min-h-screen bg-slate-950 flex flex-col">
             <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-br from-indigo-900 via-slate-900 to-slate-950 animate-gradient-xy"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8
          }}>
              <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 mb-6 tracking-tight">
                Unleash Your <br /> Creative Potential
              </h1>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
                Join the world's most exciting contest platform. Compete in
                design, writing, and innovation challenges to win real prizes
                and recognition.
              </p>

              <div className="mb-12">
                <SearchBar />
              </div>

              <div className="flex flex-wrap justify-center gap-8 text-slate-400 text-sm font-medium uppercase tracking-wider">
                <div className="flex items-center">
                  <Zap className="w-5 h-5 text-yellow-500 mr-2" />
                  <span>Fast Payouts</span>
                </div>
                <div className="flex items-center">
                  <Target className="w-5 h-5 text-blue-500 mr-2" />
                  <span>Diverse Categories</span>
                </div>
                <div className="flex items-center">
                  <Award className="w-5 h-5 text-purple-500 mr-2" />
                  <span>Global Recognition</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Popular Contests */}
        <section className="py-24 bg-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  Trending Contests
                </h2>
                <p className="text-slate-400">
                  Join the most popular challenges happening right now.
                </p>
              </div>
              <Link to="/all-contests">
                <Button variant="ghost" className="group">
                  View All
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {popularContests.map((contest, index) => <motion.div key={contest._id} initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              delay: index * 0.1
            }}>
                  <ContestCard contest={contest} />
                </motion.div>)}
            </div>
          </div>
        </section>

        {/* Winner Showcase */}
        <WinnerShowCase />

        {/* Extra Section: How it Works */}
        <section className="py-24 bg-slate-900 border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-4">
                How ContestHub Works
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Whether you're a creator looking to host or a talent looking to
                win, we make it simple.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {contesthubWorks.map((item, i) => <div key={i} className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 hover:border-blue-500/30 transition-colors text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-900 mb-6 border border-slate-700">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed">{item.desc}</p>
                </div>)}
            </div>
          </div>
        </section>
      </main>
        </div>
    );
};

export default Home;