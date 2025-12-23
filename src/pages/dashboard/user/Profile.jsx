import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import  useAuth  from '../../../authentication/context/useAuth';
import { MOCK_CONTESTS } from '../../../utils/mockData';
import  Button  from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Textarea } from '../../../components/ui/Textarea';
import { User, Save } from 'lucide-react';
import useAxiosSecure from '../../../hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
export function Profile() {
  const {
    user,
    updateUserProfile
  } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const {
    register,
    handleSubmit
  } = useForm({
    defaultValues: {
      name: user?.displayName,
      photo: user?.photoURL,
      bio: user?.bio || ''
    }
  });

  const axiosSecure = useAxiosSecure()

  // contest data 
   const { data: contest = [] } = useQuery({
    queryKey: ["contests"],
    queryFn: async () => {
      const result = await axiosSecure.get(
        'http://localhost:5000/contests'
      );
      return result.data;
    },
  });

  // submission data retrive
  const { data: submit = [] } = useQuery({
    queryKey: ["submitted"],
    queryFn: async () => {
      const result = await axiosSecure.get('http://localhost:5000/submissions');
      return result.data;
    },
  });

  if (!user) return null;
  // Calculate stats
  const participated = contest.filter(c => c.participants?.includes(user.email)).length;
  const won = submit.filter(c => c.user_email === user.email)?.length;
  const winRate = participated > 0 ? Math.round(won / participated * 100) : 0;
  const chartData = [{
    name: 'Won',
    value: won
  }, {
    name: 'Participated',
    value: participated - won
  } // Remaining participation
  ];
  const COLORS = ['#f59e0b', '#3b82f6'];
  const onSubmit = (data) => {
    updateUserProfile(data);
    setIsEditing(false);
  };
  // console.log(user)
  return <div className="space-y-8">
    <div>
      <h1 className="text-2xl font-bold text-white">My Profile</h1>
      <p className="text-slate-400">
        Manage your personal information and view stats.
      </p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Profile Form */}
      <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6">
        <div className="flex items-center gap-6 mb-8">
          <img src={user.photoURL} alt={user.displayName} className="w-24 h-24 rounded-full object-cover border-4 border-slate-800 shadow-xl" />
          <div>
            <h2 className="text-xl font-bold text-white">{user.displayName}</h2>
            <p className="text-slate-400 capitalize">{user.role}</p>
            <p className="text-sm text-slate-500 mt-1">
              Member since {new Date(user.joinedAt).getFullYear()}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="Full Name" disabled={!isEditing} {...register('name')} />
            <Input label="Photo URL" disabled={!isEditing} {...register('photo')} />
          </div>

          <Textarea label="Bio" disabled={!isEditing} placeholder="Tell us about yourself..." {...register('bio')} />

          <div className="flex justify-end gap-4">
            {isEditing ? <>
              <Button type="button" variant="ghost" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button type="submit">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </> : <Button type="button" onClick={() => setIsEditing(true)}>
              Edit Profile
            </Button>}
          </div>
        </form>
      </div>

      {/* Stats Chart */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col items-center justify-center">
        <h3 className="text-lg font-bold text-white mb-6">Win Rate</h3>

        <div className="h-64 w-full">
          {participated > 0 ? <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={chartData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                {chartData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={{
                backgroundColor: '#1e293b',
                borderColor: '#334155',
                color: '#fff'
              }} itemStyle={{
                color: '#fff'
              }} />
            </PieChart>
          </ResponsiveContainer> : <div className="h-full flex items-center justify-center text-slate-500 text-sm">
            No data available
          </div>}
        </div>

        <div className="text-center mt-4">
          <div className="text-4xl font-bold text-white mb-1">{winRate}%</div>
          <p className="text-slate-400 text-sm">Success Rate</p>
        </div>

        <div className="grid grid-cols-2 gap-4 w-full mt-8 pt-8 border-t border-slate-800">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-500">
              {participated}
            </div>
            <div className="text-xs text-slate-500 uppercase">
              Participated
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-500">{won}</div>
            <div className="text-xs text-slate-500 uppercase">Won</div>
          </div>
        </div>
      </div>
    </div>
  </div>;
}