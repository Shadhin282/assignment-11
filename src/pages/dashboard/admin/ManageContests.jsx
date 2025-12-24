import React from 'react';
import { MOCK_CONTESTS } from '../../../utils/mockData';
import { Table } from '../../../components/ui/Table';
import  Button  from '../../../components/ui/Button';
import { Check, X, Trash2 } from 'lucide-react';
import useAxiosSecure from '../../../hook/useAxiosSecure';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import useAuth from '../../../authentication/context/useAuth';
export function ManageContests() {
  const {user} = useAuth()
    const axiosSecure = useAxiosSecure();
    const { data: contests = [], } = useQuery({
    queryKey: ["contestData"],
    queryFn: async () => {
      const result = await axiosSecure.get(
        `http://localhost:5000/create-contest`
      );
      return result.data;
    },
    });
  
    const {
    data,
    reset: mutationReset,
    mutateAsync,
  } = useMutation({
    mutationFn: async (payload) =>
      await axios.post(`http://localhost:5000/contests`, payload),
    onSuccess: (data) => {
      console.log(data);
      mutationReset();
    },
    onError: (error) => {
      console.log(error);
    },
    onMutate: (payload) => {
      console.log("i will post it", payload);
    },
    retry: 3,
  });

  // const [contests, setContests] = useState(MOCK_CONTESTS);
  const handleStatusChange = async(id, status) => {
    // setContests(contests.map(c => c.id === id ? {
    //   ...c,
    //   status
    // } : c));
    const contest = contests.map(c => c.id = id)
    const contestInfo = {
      
name : contest?.name,
bannerImage : contest?.bannerImage,
participants : [],
description : contest?.description,
      prizeMoney: contest?.prizeMoney,
      taskInstruction: contest?.taskInstruction,
price : contest?.price,
type : contest?.type,
      deadline: contest?.deadline,
      creator_mail: user?.email,
 status : 'approved'
    }
     
    if (status === 'approved') {
      await mutateAsync(contestInfo);
      
    }
    if (status === 'approved' || status === 'rejected') {
      const newData = {
        id,
        status : status
      }
      fetch(
                    `http://localhost:5000/create-contest-status/${id}`,
                    {
                      method: "PATCH",
                      headers: {
                        'Content-Type': 'application/json',
                        
                      },
                      body: JSON.stringify(newData),
                    }
                  )
                    .then((res) => res.json())
                    .then((data) => {
                      console.log(data);
                      toast.success("data update.")
                     
                    })
                    .catch((err) => {
                      toast.error(err.message);
                    });
    }
    }
  
const handleDelete = (id) => {
  // if (confirm('Delete this contest?')) {
  //   setContests(contests.filter(c => c.id !== id));
  // }
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
        })
    
    }
  })
}
  const columns = [{
    header: 'Contest',
    accessor: (contest) => <div className="flex items-center gap-3">
      <img src={contest.bannerImage} alt="" className="w-10 h-10 rounded-lg object-cover" />
      <span className="font-medium text-white">{contest.name}</span>
    </div>
  }, {
    header: 'Type',
    accessor: 'type'
  }, {
    header: 'Status',
    accessor: (contest) => <span className={`capitalize px-2 py-1 rounded text-xs font-medium ${contest.status === 'approved' ? 'bg-green-500/10 text-green-400' : contest.status === 'rejected' ? 'bg-red-500/10 text-red-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
      {contest.status}
    </span>
    }];
  
  return <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold text-white">Manage Contests</h1>
      <p className="text-slate-400">Approve, reject, or delete contests.</p>
    </div>

    <Table data={contests} columns={columns} actions={contest => <div className="flex gap-2">
      {contest.status === 'pending' && <>
        <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white" onClick={() => handleStatusChange(contest._id, 'approved')}>
          <Check className="w-4 h-4" />
        </Button>
        <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white" onClick={() => handleStatusChange(contest._id, 'rejected')}>
          <X className="w-4 h-4" />
        </Button>
      </>}
      <Button size="sm" variant="danger" onClick={() => handleDelete(contest._id)}>
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>} />
  </div>;
}