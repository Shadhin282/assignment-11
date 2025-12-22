import React from 'react';
export const Table = ({
  data,
  columns,
  actions
}) => {
  return <div className="w-full overflow-x-auto rounded-xl border border-slate-700 shadow-lg">
    <table className="w-full text-left text-sm text-slate-400">
      <thead className="bg-slate-800 text-xs uppercase text-slate-300">
        <tr>
          {columns.map((col, index) => <th key={index} className={`px-6 py-4 font-semibold ${col.className || ''}`}>
            {col.header}
          </th>)}
          {actions && <th className="px-6 py-4 text-right">Actions</th>}
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-700 bg-slate-900/50">
        {data.length === 0 ? <tr>
          <td colSpan={columns.length + (actions ? 1 : 0)} className="px-6 py-8 text-center text-slate-500">
            No data available
          </td>
        </tr> : data.map(item => <tr key={item.id} className="hover:bg-slate-800/50 transition-colors">
          {columns.map((col, index) => <td key={index} className={`px-6 py-4 ${col.className || ''}`}>
            {typeof col.accessor === 'function' ? col.accessor(item) : item[col.accessor]}
          </td>)}
          {actions && <td className="px-6 py-4 text-right">
            <div className="flex justify-end gap-2">
              {actions(item)}
            </div>
          </td>}
        </tr>)}
      </tbody>
    </table>
  </div>;
}