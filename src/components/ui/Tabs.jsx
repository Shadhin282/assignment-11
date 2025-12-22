import React from 'react';
import { motion } from 'framer-motion';

const Tabs = ({
  tabs,
  activeTab,
  onChange
}) => {
    return  <div className="flex space-x-1 rounded-xl bg-slate-800/50 p-1 backdrop-blur-sm border border-slate-700/50">
    {tabs.map(tab => <button key={tab.id} onClick={() => onChange(tab.id)} className={`
            relative rounded-lg px-4 py-2.5 text-sm font-medium transition-colors focus:outline-none
            ${activeTab === tab.id ? 'text-white' : 'text-slate-400 hover:text-slate-200'}
          `}>
      {activeTab === tab.id && <motion.div layoutId="activeTab" className="absolute inset-0 rounded-lg bg-blue-600 shadow-lg shadow-blue-500/20" transition={{
        type: 'spring',
        bounce: 0.2,
        duration: 0.6
      }} />}
      <span className="relative z-10">{tab.label}</span>
    </button>)}
  </div>;
};

export default Tabs;