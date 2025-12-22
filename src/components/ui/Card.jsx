import React from 'react';
import { motion } from 'framer-motion';

const Card = ({
  children,
  className = '',
  hoverEffect = false
}) => {
    return <motion.div whileHover={hoverEffect ? {
    y: -5,
    transition: {
      duration: 0.2
    }
  } : undefined} className={`bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden shadow-lg backdrop-blur-sm ${className}`}>
    {children}
  </motion.div>;
};

export default Card;