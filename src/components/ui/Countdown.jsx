import React, { useEffect, useState } from 'react';

const Countdown = ({
  targetDate,
  onEnd
}) => {
 const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  function calculateTimeLeft() {
    const difference = +new Date(targetDate) - +new Date();
    if (difference <= 0) {
      return null;
    }
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor(difference / (1000 * 60 * 60) % 24),
      minutes: Math.floor(difference / 1000 / 60 % 60),
      seconds: Math.floor(difference / 1000 % 60)
    };
  }
  useEffect(() => {
    const timer = setInterval(() => {
      const remaining = calculateTimeLeft();
      setTimeLeft(remaining);
      if (!remaining && onEnd) {
        onEnd();
        clearInterval(timer);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate, onEnd]);
  if (!timeLeft) {
    return <div className="text-red-500 font-bold text-xl">Contest Ended</div>;
  }
  return <div className="flex gap-4">
    <TimeUnit value={timeLeft.days} label="Days" />
    <TimeUnit value={timeLeft.hours} label="Hours" />
    <TimeUnit value={timeLeft.minutes} label="Mins" />
    <TimeUnit value={timeLeft.seconds} label="Secs" />
  </div>;
}
function TimeUnit({
  value,
  label
}) {
  return <div className="flex flex-col items-center">
    <div className="bg-slate-800/80 border border-slate-700 rounded-lg w-16 h-16 flex items-center justify-center mb-2 shadow-lg">
      <span className="text-2xl font-bold text-blue-400 font-mono">
        {value.toString().padStart(2, '0')}
      </span>
    </div>
    <span className="text-xs text-slate-400 uppercase tracking-wider font-medium">
      {label}
    </span>
  </div>;
}

export default Countdown;