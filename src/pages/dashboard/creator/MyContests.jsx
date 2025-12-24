import React from 'react';
import { Link } from 'react-router';
import  useAuth  from '../../../authentication/context/useAuth';
import { MOCK_CONTESTS } from '../../../utils/mockData';
import { Table } from '../../../components/ui/Table';
import  Button  from '../../../components/ui/Button';
import { Edit, Trash2, Eye, Clock, CheckCircle, XCircle } from 'lucide-react';
import useAxiosSecure from '../../../hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import axios from 'axios';

export function MyContests() {
  const {
    user
  } = useAuth();

  const axiosSecure = useAxiosSecure()

     const { data: contests = [] } = useQuery({
      queryKey: ["contests"],
      queryFn: async () => {
        const result = await axiosSecure.get(
          'http://localhost:5000/create-contest'
        );
        return result.data;
      },
     });
  
  
  const handleDelete = async(id) => {
    console.log(id)
     Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `http://localhost:5000/create-contest/${id}`,
          {
            method: "DELETE",
          }
        )
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
           
          })
          .catch((err) => {
            toast.success(err.message);
          });
      }
    });
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