/* eslint-disable @next/next/no-img-element */
import React from 'react'

export default function Hero({ onStart }: { onStart: () => void }) {
  // Clinical terms for the background
  const tags = ["Hemoglobin", "MCV", "RBC", "Iron", "Anemia", "Beta", "Alpha", "HCT", "MCH", "Ferritin"];

  return (
    <section className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 min-h-[700px]">
      
      {/* 1. BACKGROUND FLOATING LAYER (Covers the whole section) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {tags.map((tag, i) => {
          // Spreading tags across the entire horizontal and vertical space
          const positions = [
            { top: '15%', left: '5%' },
            { top: '10%', left: '40%' },
            { top: '20%', left: '80%' },
            { top: '50%', left: '45%' },
            { top: '80%', left: '10%' },
            { top: '85%', left: '50%' },
            { top: '70%', left: '85%' },
            { top: '40%', left: '5%' },
            { top: '60%', left: '75%' },
            { top: '30%', left: '25%' },
          ];

          return (
            <span 
              key={i}
              className="floating-tag absolute text-red-600/20 font-black uppercase text-2xl md:text-4xl whitespace-nowrap"
              style={{
                top: positions[i % positions.length].top,
                left: positions[i % positions.length].left,
                animationDelay: `${i * 0.6}s`,
              }}
            >
              {tag}
            </span>
          );
        })}
      </div>

      {/* 2. LEFT SIDE: CONTENT */}
      <div className="md:w-1/2 space-y-8 animate-in fade-in slide-in-from-left duration-700 z-10">
        <div className="inline-block px-4 py-1.5 bg-red-50 text-red-600 rounded-full text-sm font-bold tracking-wide uppercase">
          Powered by Advanced Machine Learning
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1]">
          Detect Thalassemia <br /> <span className="text-red-600">Instantly.</span>
        </h1>
        <p className="text-xl text-slate-600 leading-relaxed max-w-lg">
          Upload your CBC report indices and let our AI provide a clinical-grade screening assessment for Thalassemia Minor in seconds.
        </p>
        <div className="flex gap-4">
          <button 
            onClick={onStart} 
            className="bg-red-600 text-white px-10 py-5 rounded-2xl text-lg font-bold shadow-xl shadow-red-200 hover:scale-105 transition-transform active:scale-95"
          >
            Start Free Analysis
          </button>
        </div>
      </div>

      {/* 3. RIGHT SIDE: THE PICTURE */}
      <div className="md:w-1/2 relative flex justify-center items-center z-10">
        <div className="relative animate-in fade-in zoom-in duration-1000">
          {/* Background Decorative Element */}
          <div className="absolute -inset-4 bg-red-100 rounded-[3rem] rotate-3 -z-10"></div>
          
          {/* Image with Original Large Size */}
          <div className="relative overflow-hidden rounded-[2.5rem] shadow-2xl border-8 border-white">
            <img 
              src="/Blood.jpg" 
              alt="Medical Analysis" 
              className="object-cover h-[500px] w-full min-w-[320px] md:min-w-[450px]"
            />
            
            {/* Pulsing "Scan" Line on the picture */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-70 animate-scan pointer-events-none"></div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx global>{`
        .floating-tag {
          animation-name: float;
          animation-duration: 8s;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0) rotate(0deg); }
          33% { transform: translateY(-40px) translateX(20px) rotate(2deg); }
          66% { transform: translateY(20px) translateX(-10px) rotate(-1deg); }
        }

        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }

        .animate-scan {
          animation: scan 4s linear infinite;
        }
      `}</style>
    </section>
  );
}
