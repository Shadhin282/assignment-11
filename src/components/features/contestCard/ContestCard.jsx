import React from 'react';
import { Users, Trophy } from "lucide-react";
import { Link } from 'react-router';
import Card from '../../ui/Card';
import Button from '../../ui/Button';


const ContestCard = ({ contest }) => {
    
    return  <Card hoverEffect className="flex flex-col h-full group">
      <div className="relative h-48 overflow-hidden">
        <img
          src={contest.bannerImage}
          alt={contest.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60" />
        <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-sm px-3 py-1 rounded-full border border-slate-700">
          <span className="text-xs font-medium text-blue-400 uppercase tracking-wider">
            {contest.type}
          </span>
        </div>
      </div>

      <div className="flex-1 p-6 flex flex-col">
        <h3 className="text-xl font-bold text-white mb-2 line-clamp-1 group-hover:text-blue-400 transition-colors">
          {contest.name}
        </h3>
        <p className="text-slate-400 text-sm mb-4 line-clamp-2 flex-1">
          {contest.description}
        </p>

        <div className="flex items-center justify-between mb-6 text-sm">
          <div className="flex items-center text-slate-300">
            <Users className="w-4 h-4 mr-2 text-blue-500" />
            <span>{contest.participants.length} Participants</span>
          </div>
          <div className="flex items-center text-slate-300">
            <Trophy className="w-4 h-4 mr-2 text-yellow-500" />
            <span>${contest.prizeMoney}</span>
          </div>
        </div>

        <Link to={`/contest/${contest._id}`}>
          <Button className="w-full" variant="outline">
            View Details
          </Button>
        </Link>
      </div>
    </Card>
};

export default ContestCard;