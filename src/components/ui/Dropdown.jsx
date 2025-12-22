import React, { Fragment, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router';

const Dropdown = ({
  trigger,
  items
}) => {
    const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
    return <div className="relative" ref={dropdownRef}>
    <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
      {trigger}
    </div>

    <AnimatePresence>
      {isOpen && <motion.div initial={{
        opacity: 0,
        y: 10,
        scale: 0.95
      }} animate={{
        opacity: 1,
        y: 0,
        scale: 1
      }} exit={{
        opacity: 0,
        y: 10,
        scale: 0.95
      }} transition={{
        duration: 0.1
      }} className="absolute right-0 mt-2 w-56 origin-top-right rounded-xl bg-slate-800 border border-slate-700 shadow-xl z-50 overflow-hidden">
        <div className="py-1">
          {items.map((item, index) => <Fragment key={index}>
            {item.href ? <Link to={item.href} className={`flex items-center px-4 py-3 text-sm ${item.danger ? 'text-red-400 hover:bg-red-500/10' : 'text-slate-200 hover:bg-slate-700'} transition-colors`} onClick={() => setIsOpen(false)}>
              {item.icon && <span className="mr-3">{item.icon}</span>}
              {item.label}
            </Link> : <button onClick={() => {
              item.onClick?.();
              setIsOpen(false);
            }} className={`flex w-full items-center px-4 py-3 text-sm ${item.danger ? 'text-red-400 hover:bg-red-500/10' : 'text-slate-200 hover:bg-slate-700'} transition-colors text-left`}>
              {item.icon && <span className="mr-3">{item.icon}</span>}
              {item.label}
            </button>}
          </Fragment>)}
        </div>
      </motion.div>}
    </AnimatePresence>
  </div>;
};

export default Dropdown;