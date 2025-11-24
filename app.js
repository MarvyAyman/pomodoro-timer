import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

export default function PomodoroTimer() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState('work'); // 'work', 'short', 'long'
  const [completedIntervals, setCompletedIntervals] = useState(0);
  const intervalRef = useRef(null);

  const modes = {
    work: 25 * 60,
    short: 5 * 60,
    long: 15 * 60
  };

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      if (mode === 'work') {
        setCompletedIntervals(prev => prev + 1);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft, mode]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(modes[mode]);
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setTimeLeft(modes[newMode]);
    setIsRunning(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((modes[mode] - timeLeft) / modes[mode]) * 100;

  return (
    <div className="min-h-screen bg-neutral-100 flex items-center justify-center p-8">
      <div className="w-full max-w-4xl">
  

        {/* Main Timer Card */}
        <div className="bg-white rounded-3xl shadow-lg p-12 relative overflow-hidden">
          
          {/* Mode Selector */}
          <div className="flex gap-3 mb-12 justify-center">
            <button
              onClick={() => switchMode('work')}
              className={`px-10 py-4 rounded-full font-medium uppercase tracking-wider transition-all text-xl ${
                mode === 'work'
                  ? 'bg-neutral-800 text-white shadow-md'
                  : 'bg-neutral-200 text-neutral-600 hover:bg-neutral-300'
              }`}
            >
              Work
            </button>
            <button
              onClick={() => switchMode('short')}
              className={`px-10 py-4 rounded-full font-medium uppercase tracking-wider transition-all text-xl ${
                mode === 'short'
                  ? 'bg-neutral-800 text-white shadow-md'
                  : 'bg-neutral-200 text-neutral-600 hover:bg-neutral-300'
              }`}
            >
              Short Break
            </button>
            <button
              onClick={() => switchMode('long')}
              className={`px-10 py-4 rounded-full font-medium uppercase tracking-wider transition-all text-xl ${
                mode === 'long'
                  ? 'bg-neutral-800 text-white shadow-md'
                  : 'bg-neutral-200 text-neutral-600 hover:bg-neutral-300'
              }`}
            >
              Long Break
            </button>
          </div>

          {/* Timer Display */}
          <div className="relative mb-12">
            {/* Progress Bar Background */}
            <div className="absolute inset-0 bg-neutral-100 rounded-2xl overflow-hidden">
              <div 
                className="h-full bg-neutral-300 transition-all duration-1000"
                style={{ width: `${progress}%` }}
              />
            </div>
            
            <div className="relative z-10 py-20">
              <div className="text-[480px] font-light leading-none text-center tracking-tight text-neutral-800" style={{ fontFamily: 'serif' ,fontSize: "63px"}}>
                {formatTime(timeLeft)}
              </div>
              <div className="text-center mt-4 text-lg font-light uppercase tracking-widest text-neutral-500">
                {mode === 'work' ? 'Focus Time' : mode === 'short' ? 'Short Break' : 'Long Break'}
              </div>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex gap-4 justify-center mb-8">
            <button
              onClick={toggleTimer}
              className="bg-neutral-800 text-white rounded-full p-6 shadow-lg hover:bg-neutral-700 transition-all hover:shadow-xl"
            >
              {isRunning ? (
                <Pause size={36} strokeWidth={2} />
              ) : (
                <Play size={36} strokeWidth={2} fill="currentColor" />
              )}
            </button>
            <button
              onClick={resetTimer}
              className="bg-neutral-200 text-neutral-800 rounded-full p-6 shadow-md hover:bg-neutral-300 transition-all hover:shadow-lg"
            >
              <RotateCcw size={36} strokeWidth={2} />
            </button>
          </div>

          {/* Intervals Counter - Below Buttons */}
          <div className="text-center">
            <div className="text-sm font-medium uppercase tracking-wider text-neutral-500 mb-1">Intervals Completed</div>
            <div className="text-4xl font-bold text-neutral-800">{completedIntervals}</div>
          </div>

        </div>

        {/* Footer Quote */}
        <div className="text-center mt-8">
          <p className="text-neutral-500 italic font-light" style={{ fontFamily: 'serif' }}>
            "45 days. One decision. Small steps lead to big change – show yourself what's possible when you stay consistent."
          </p>
        </div>
      </div>
    </div>
  );

}
