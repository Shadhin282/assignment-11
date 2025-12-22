import React, { useState } from 'react';
import { MOCK_USERS } from '../../../utils/mockData';
import { Table } from '../../../components/ui/Table';
import { Select } from '../../../components/ui/Select';
export function ManageUsers() {
  const [users, setUsers] = useState(MOCK_USERS);
  const handleRoleChange = (userId, newRole) => {
    setUsers(users.map(u => u.id === userId ? {
      ...u,
      role: newRole
    } : u));
  };
  const columns = [{
    header: 'User',
    accessor: (user) => <div className="flex items-center gap-3">
      <img src={user.photo} alt="" className="w-8 h-8 rounded-full" />
      <div>
        <div className="font-medium text-white">{user.name}</div>
        <div className="text-xs text-slate-500">{user.email}</div>
      </div>
    </div>
  }, {
    header: 'Current Role',
    accessor: (user) => <span className={`capitalize px-2 py-1 rounded text-xs font-medium ${user.role === 'admin' ? 'bg-purple-500/10 text-purple-400' : user.role === 'creator' ? 'bg-blue-500/10 text-blue-400' : 'bg-slate-700 text-slate-300'}`}>
      {user.role}
    </span>
  }, {
    header: 'Change Role',
    accessor: (user) => <select value={user.role} onChange={e => handleRoleChange(user.id, e.target.value)} className="bg-slate-800 border border-slate-700 rounded px-2 py-1 text-sm text-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500">
      <option value="user">User</option>
      <option value="creator">Creator</option>
      <option value="admin">Admin</option>
    </select>
  }];
  return <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold text-white">Manage Users</h1>
      <p className="text-slate-400">View and manage user roles.</p>
    </div>

    <Table data={users} columns={columns} />
  </div>;
}