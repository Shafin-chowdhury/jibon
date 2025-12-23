import React from 'react'


  export default function Navbar({ onNav }: { onNav: (page: string) => void }) {
  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNav('home')}>
          <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">T</div>
          <span className="text-xl font-bold text-slate-800 tracking-tight">ThalCheck<span className="text-red-600">AI</span></span>
        </div>
        <div className="hidden md:flex items-center gap-8 font-medium text-slate-600">
          <button onClick={() => onNav('home')} className="hover:text-red-600 transition-colors">Home</button>
          <button onClick={() => onNav('about')} className="hover:text-red-600 transition-colors">How it Works</button>
          <button 
            onClick={() => onNav('predictor')} 
            className="bg-slate-900 text-white px-6 py-2.5 rounded-full hover:bg-red-600 transition-all shadow-md"
          >
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
}


