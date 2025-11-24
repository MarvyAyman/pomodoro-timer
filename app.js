// save as app.js (browser-friendly, no imports/exports)
const { useState, useEffect, useRef } = React;

function PomodoroTimer() {
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
      if (mode === 'work') setCompletedIntervals(prev => prev + 1);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, timeLeft, mode]);

  const toggleTimer = () => setIsRunning(r => !r);
  const resetTimer = () => { setIsRunning(false); setTimeLeft(modes[mode]); };
  const switchMode = (newMode) => { setMode(newMode); setTimeLeft(modes[newMode]); setIsRunning(false); };
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2,'0')}:${String(secs).padStart(2,'0')}`;
  };
  const progress = ((modes[mode] - timeLeft) / modes[mode]) * 100;

  return React.createElement('div', { className: "min-h-screen bg-neutral-100 flex items-center justify-center p-8" },
    React.createElement('div', { className: "w-full max-w-4xl" },
      React.createElement('div', { className: "bg-white rounded-3xl shadow-lg p-12 relative overflow-hidden" },
        React.createElement('div', { className: "flex gap-3 mb-12 justify-center" },
          ['work','short','long'].map(m =>
            React.createElement('button',
              {
                key: m,
                onClick: () => switchMode(m),
                className: `px-10 py-4 rounded-full font-medium uppercase tracking-wider transition-all text-xl ${mode===m ? 'bg-neutral-800 text-white shadow-md' : 'bg-neutral-200 text-neutral-600 hover:bg-neutral-300'}`
              },
              m === 'work' ? 'Work' : m === 'short' ? 'Short Break' : 'Long Break'
            )
          )
        ),

        React.createElement('div', { className: "relative mb-12" },
          React.createElement('div', { className: "absolute inset-0 bg-neutral-100 rounded-2xl overflow-hidden" },
            React.createElement('div', { className: "h-full bg-neutral-300 transition-all duration-1000", style: { width: `${progress}%` } })
          ),
          React.createElement('div', { className: "relative z-10 py-20" },
            React.createElement('div', { className: "text-[480px] font-light leading-none text-center tracking-tight text-neutral-800", style: { fontFamily: 'serif', fontSize: '63px' } }, formatTime(timeLeft)),
            React.createElement('div', { className: "text-center mt-4 text-lg font-light uppercase tracking-widest text-neutral-500" }, mode === 'work' ? 'Focus Time' : mode === 'short' ? 'Short Break' : 'Long Break')
          )
        ),

        React.createElement('div', { className: "flex gap-4 justify-center mb-8" },
          React.createElement('button', { onClick: toggleTimer, className: "bg-neutral-800 text-white rounded-full p-6 shadow-lg hover:bg-neutral-700 transition-all hover:shadow-xl" }, isRunning ? '⏸' : '▶'),
          React.createElement('button', { onClick: resetTimer, className: "bg-neutral-200 text-neutral-800 rounded-full p-6 shadow-md hover:bg-neutral-300 transition-all hover:shadow-lg" }, '↺')
        ),

        React.createElement('div', { className: "text-center" },
          React.createElement('div', { className: "text-sm font-medium uppercase tracking-wider text-neutral-500 mb-1" }, 'Intervals Completed'),
          React.createElement('div', { className: "text-4xl font-bold text-neutral-800" }, completedIntervals)
        )
      ),

      React.createElement('div', { className: "text-center mt-8" },
        React.createElement('p', { className: "text-neutral-500 italic font-light", style: { fontFamily: 'serif' } }, `"45 days. One decision. Small steps lead to big change – show yourself what's possible when you stay consistent."`)
      )
    )
  );
}

// render
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(PomodoroTimer));
