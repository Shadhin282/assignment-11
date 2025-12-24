import React, { useState } from 'react';
import { Link } from 'react-router';
import  useAuth  from '../../../authentication/context/useAuth';
import { MOCK_CONTESTS } from '../../../utils/mockData';
import { Table } from '../../../components/ui/Table';
import  Button  from '../../../components/ui/Button';
import { Edit, Trash2, Eye, Clock, CheckCircle, XCircle } from 'lucide-react';
import useAxiosSecure from '../../../hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

export function MyContests() {
  const {
    user
  } = useAuth();

  const axiosSecure = useAxiosSecure()

//   const { data: contests = [] } = useQuery({
//     queryKey: ["myContest", user?.email],
//     queryFn: async () => {
//       const result = await axiosSecure.get(`http://localhost:5000/mycontests/email=${user?.email}`);
//       return result.data;
//     },
//   });
// console.log(contests)

  // contest data 
     const { data: contestdata = [] } = useQuery({
      queryKey: ["contests"],
      queryFn: async () => {
        const result = await axiosSecure.get(
          'http://localhost:5000/contests'
        );
        return result.data;
      },
     });
  const contests = contestdata.filter(c => c?.creator_mail === user.email);
  
  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this contest?')) {
      // dfj
    }
  };




  const getStatusBadge = (status) => {
    switch (status) {
      case 'approved':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-400">
          <CheckCircle className="w-3 h-3 mr-1" /> Approved
        </span>;
      case 'rejected':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-500/10 text-red-400">
          <XCircle className="w-3 h-3 mr-1" /> Rejected
        </span>;
      default:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-400">
          <Clock className="w-3 h-3 mr-1" /> Pending
        </span>;
    }
  };


  const columns = [{
    header: 'Contest Name',
    accessor: (contest) => <div className="flex items-center gap-3">
      <img src={contest.bannerImage} alt="" className="w-10 h-10 rounded-lg object-cover" />
      <span className="font-medium text-white">{contest.name}</span>
    </div>
  }, {
    header: 'Price',
    accessor: (contest) => `$${contest.prizeMoney}`
  }, {
    header: 'Prize',
    accessor: (contest) => <span className="text-yellow-500 font-medium">
      ${contest.prizeMoney}
    </span>
  }, {
    header: 'Status',
    accessor: (contest) => getStatusBadge(contest?.status)
    }];
  
  
  return <div className="space-y-6">
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold text-white">My Contests</h1>
        <p className="text-slate-400">Manage your created contests.</p>
      </div>
      <Link to="/dashboard/creator/add">
        <Button>Create New</Button>
      </Link>
    </div>

    <Table data={contests} columns={columns} actions={contest => <div className="flex gap-2">
      {contest?.status === 'pending' && <>
        <Link to={`/dashboard/creator/edit/${contest._id}`}>
          <Button size="sm" variant="secondary">
            <Edit className="w-4 h-4" />
          </Button>
        </Link>
        <Button size="sm" variant="danger" onClick={() => handleDelete(contest._id)}>
          <Trash2 className="w-4 h-4" />
        </Button>
      </>}
      <Link to="/dashboard/creator/submissions">
        <Button size="sm" variant="outline">
          See Submissions
        </Button>
      </Link>
    </div>} />
  </div>;
}