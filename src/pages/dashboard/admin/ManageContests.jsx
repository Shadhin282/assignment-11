import React, { useState } from 'react';
import { MOCK_CONTESTS } from '../../../utils/mockData';
import { Table } from '../../../components/ui/Table';
import  Button  from '../../../components/ui/Button';
import { Check, X, Trash2 } from 'lucide-react';
export function ManageContests() {
  const [contests, setContests] = useState(MOCK_CONTESTS);
  const handleStatusChange = (id, status) => {
    setContests(contests.map(c => c.id === id ? {
      ...c,
      status
    } : c));
  };
  const handleDelete = (id) => {
    if (confirm('Delete this contest?')) {
      setContests(contests.filter(c => c.id !== id));
    }
  };
  const columns = [{
    header: 'Contest',
    accessor: (contest) => <div className="flex items-center gap-3">
      <img src={contest.image} alt="" className="w-10 h-10 rounded-lg object-cover" />
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
        <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white" onClick={() => handleStatusChange(contest.id, 'approved')}>
          <Check className="w-4 h-4" />
        </Button>
        <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white" onClick={() => handleStatusChange(contest.id, 'rejected')}>
          <X className="w-4 h-4" />
        </Button>
      </>}
      <Button size="sm" variant="danger" onClick={() => handleDelete(contest.id)}>
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>} />
  </div>;
}