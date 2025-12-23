import React from 'react';

export default function Stats() {
  const statItems = [
    { value: "95%", label: "Model Accuracy", delay: "0s" },
    { value: "<2s", label: "Processing Time", delay: "0.2s" },
    { value: "Free", label: "Open Access", delay: "0.4s" },
  ];

  return (
    <section className="bg-slate-300 py-32 px-6 text-center text-white relative overflow-hidden">
      {/* Background Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-600/10 blur-[120px] rounded-full"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        <h2 className="text-4xl md:text-5xl text-slate-900 font-black mb-16 tracking-tight animate-in fade-in slide-in-from-bottom duration-700">
          Global Health <span className="text-red-500">Impact</span>
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {statItems.map((item, index) => (
            <div 
              key={index} 
              className="group p-10 rounded-[2.5rem] bg-white/5 border border-white/10 hover:bg-white/10 hover:border-red-500/50 transition-all duration-500 hover:-translate-y-2 shadow-2xl"
              style={{ 
                animation: `fadeUp 0.8s ease-out forwards`,
                animationDelay: item.delay,
                opacity: 0 
              }}
            >
              <p className="text-6xl font-black text-red-500 mb-4 group-hover:scale-110 transition-transform duration-500">
                {item.value}
              </p>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}