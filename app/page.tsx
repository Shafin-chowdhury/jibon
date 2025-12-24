// "use client";
// import { useState } from "react";
// import Navbar from "./components/Navbar";
// import Hero from "./components/Hero";
// import About from "./components/About";
// import Predictor from "./components/Predictor";
// import Stats from "./components/Stats";

// // Define type for prediction result
// interface PredictionResult {
//   thalassemia_result: string;
//   probability: number;
//   percentage: string;
//   iron_result: string;
//   mentzer_index: number;
//   green_king_index: number;
// }

// export default function Home() {
//   const [view, setView] = useState<"home" | "predictor" | "summary">("home");
//   const [predictionData, setPredictionData] = useState<PredictionResult | null>(null);

//   const handlePredictionSuccess = (data: PredictionResult) => {
//     setPredictionData(data);
//     setView("summary");
//     // Scroll smoothly to top
//     setTimeout(() => {
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     }, 50);
//   };

//   return (
//     <div className="min-h-screen bg-white">
//       <Navbar onNav={setView} />

//       <main className="flex-grow">
//         {view === "home" && (
//           <>
//             <Hero onStart={() => setView("predictor")} />
//             <Stats />
//             <div id="about-section" className="bg-white">
//               <About />
//             </div>
//           </>
//         )}

//         {view === "predictor" && (
//           <section className="pt-24 min-h-screen bg-slate-50 animate-in fade-in duration-500">
//             <Predictor onPredictSuccess={handlePredictionSuccess} />
//           </section>
//         )}

//         {view === "summary" && predictionData && (
//           <section className="pt-24 min-h-screen bg-slate-50 animate-in fade-in duration-500">
//   <div className="max-w-4xl mx-auto p-8 bg-white rounded-3xl shadow-2xl border border-slate-100">
//     <h2 className="text-3xl font-black mb-6 text-center text-slate-900">🧬 Prediction Summary</h2>
    
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      
//       {/* Thalassemia Result */}
//       <div className="flex items-center gap-4 p-4 bg-red-50 rounded-2xl border border-red-100 shadow-inner">
//         <div className="text-4xl">🩸</div>
//         <div>
//           <p className="text-sm text-red-400 font-bold uppercase tracking-wide">Thalassemia Result</p>
//           <p className={`text-xl font-black ${predictionData.thalassemia_result.includes("Normal") ? "text-emerald-600" : "text-red-600"}`}>
//             {predictionData.thalassemia_result}
//           </p>
//         </div>
//       </div>

//       {/* Probability */}
//       <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200 shadow-inner">
//         <div className="text-4xl">📊</div>
//         <div>
//           <p className="text-sm text-slate-400 font-bold uppercase tracking-wide">Prediction Confidence</p>
//           <p className="text-xl font-black text-slate-900">{predictionData.percentage}</p>
//         </div>
//       </div>

//       {/* Iron Metabolism */}
//       <div className="flex items-center gap-4 p-4 bg-amber-50 rounded-2xl border border-amber-100 shadow-inner">
//         <div className="text-4xl">🧪</div>
//         <div>
//           <p className="text-sm text-amber-500 font-bold uppercase tracking-wide">Iron Metabolism</p>
//           <p className="text-xl font-black text-amber-700">{predictionData.iron_result}</p>
//         </div>
//       </div>

//       {/* Mentzer Index */}
//       <div className="flex items-center gap-4 p-4 bg-cyan-50 rounded-2xl border border-cyan-100 shadow-inner">
//         <div className="text-4xl">📏</div>
//         <div>
//           <p className="text-sm text-cyan-500 font-bold uppercase tracking-wide">Mentzer Index</p>
//           <p className="text-xl font-black text-cyan-700">{predictionData.mentzer_index}</p>
//         </div>
//       </div>

//       {/* Green-King Index */}
//       <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-2xl border border-purple-100 shadow-inner md:col-span-2">
//         <div className="text-4xl">🧮</div>
//         <div>
//           <p className="text-sm text-purple-500 font-bold uppercase tracking-wide">Green-King Index</p>
//           <p className="text-xl font-black text-purple-700">{predictionData.green_king_index}</p>
//         </div>
//       </div>
//     </div>

//     <div className="mt-8 text-center">
//       <button
//         className="px-6 py-3 bg-slate-900 text-white rounded-2xl font-bold hover:bg-red-600 transition-all shadow-lg"
//         onClick={() => setView("predictor")}
//       >
//         🔄 Back to Predictor
//       </button>
//     </div>
//   </div>
// </section>

//         )}
//       </main>

//       <footer className="py-12 border-t border-slate-100 text-center text-slate-500 text-sm bg-white font-medium">
//         <p>© 2025 ThalCheck AI Research Lab. For screening purposes only. Consult a doctor for medical advice.</p>
//       </footer>
//     </div>
//   );
// }










"use client";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Predictor from "./components/Predictor";
import Stats from "./components/Stats";

// Define type for prediction result
interface PredictionResult {
  thalassemia_result: string;
  probability: number;
  percentage: string;
  iron_result: string;
  mentzer_index: number;
  green_king_index: number;
}

// Allowed view types
type ViewState = "home" | "predictor" | "summary";

export default function Home() {
  const [view, setView] = useState<ViewState>("home");
  const [predictionData, setPredictionData] = useState<PredictionResult | null>(null);

  const handlePredictionSuccess = (data: PredictionResult) => {
    setPredictionData(data);
    setView("summary");
    // Scroll smoothly to top
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 50);
  };

  // Fixed Navigation Handler
  const handleNavigation = (target: ViewState) => {
    setView(target);
    if (target === "home") {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* USE handleNavigation HERE to ensure types and logic match */}
      <Navbar onNav={handleNavigation} />

      <main className="flex-grow">
        {view === "home" && (
          <>
            <Hero onStart={() => setView("predictor")} />
            <Stats />
            <div id="about-section" className="bg-white">
              <About />
            </div>
          </>
        )}

        {view === "predictor" && (
          <section className="pt-24 min-h-screen bg-slate-50 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Predictor onPredictSuccess={handlePredictionSuccess} />
          </section>
        )}

        {view === "summary" && predictionData && (
          <section className="pt-24 pb-12 min-h-screen bg-slate-50 animate-in fade-in zoom-in-95 duration-500">
            <div className="max-w-4xl mx-auto px-6">
              <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
                <div className="p-8 border-b border-slate-50 text-center bg-slate-900">
                   <h2 className="text-3xl font-black text-white">🧬 Prediction Summary</h2>
                   <p className="text-slate-400 text-sm mt-2 font-medium">AI-Generated Screening Report</p>
                </div>
                
                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Result Card */}
                  <div className={`flex items-center gap-4 p-5 rounded-2xl border shadow-sm ${
                    predictionData.thalassemia_result.toLowerCase().includes("normal") 
                    ? "bg-emerald-50 border-emerald-100" 
                    : "bg-red-50 border-red-100"
                  }`}>
                    <div className="text-4xl">🩸</div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">Status</p>
                      <p className={`text-xl font-black ${
                        predictionData.thalassemia_result.toLowerCase().includes("normal") ? "text-emerald-600" : "text-red-600"
                      }`}>
                        {predictionData.thalassemia_result}
                      </p>
                    </div>
                  </div>

                  {/* Confidence Card */}
                  <div className="flex items-center gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="text-4xl">📊</div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">Confidence</p>
                      <p className="text-xl font-black text-slate-900">{predictionData.percentage}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-5 bg-amber-50 rounded-2xl border border-amber-100 shadow-sm">
                    <div className="text-4xl">🧪</div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">Iron Status</p>
                      <p className="text-xl font-black text-amber-700">{predictionData.iron_result}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-5 bg-cyan-50 rounded-2xl border border-cyan-100 shadow-sm">
                    <div className="text-4xl">📏</div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">Mentzer Index</p>
                      <p className="text-xl font-black text-cyan-700">{predictionData.mentzer_index}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-5 bg-purple-50 rounded-2xl border border-purple-100 shadow-sm md:col-span-2">
                    <div className="text-4xl">🧮</div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">Green-King Index</p>
                      <p className="text-xl font-black text-purple-700">{predictionData.green_king_index}</p>
                    </div>
                  </div>
                </div>

                <div className="p-8 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-red-600 transition-all shadow-lg flex items-center justify-center gap-2"
                    onClick={() => setView("predictor")}
                  >
                    🔄 New Prediction
                  </button>
                  <button
                    className="px-8 py-3 bg-white text-slate-700 border border-slate-200 rounded-xl font-bold hover:bg-slate-100 transition-all shadow-sm"
                    onClick={() => window.print()}
                  >
                    🖨️ Print Report
                  </button>
                </div>
              </div>
              <p className="mt-6 text-center text-xs text-slate-400 italic px-4">
                The Mentzer Index and Green-King Index are tools to differentiate between Iron Deficiency Anemia and Thalassemia Trait.
              </p>
            </div>
          </section>
        )}
      </main>

      <footer className="py-12 border-t border-slate-100 text-center text-slate-500 text-sm bg-white font-medium">
        <p>© 2025 ThalCheck AI Research Lab. For screening purposes only. Consult a doctor for medical advice.</p>
      </footer>
    </div>
  );
}

// Separated Navbar Component for clarity and type safety
function InternalNavbar({ 
  onNav 
}: { 
  onNav: (page: ViewState) => void 
}) {
  const scrollToAbout = () => {
    onNav('home');
    setTimeout(() => {
      const element = document.getElementById('about-section');
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNav('home')}>
          <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">T</div>
          <span className="text-xl font-bold text-slate-800 tracking-tight">JIBO<span className="text-red-600">N</span></span>
        </div>
        <div className="hidden md:flex items-center gap-8 font-medium text-slate-600">
          <button onClick={() => onNav('home')} className="hover:text-red-600 transition-colors">Home</button>
          <button onClick={scrollToAbout} className="hover:text-red-600 transition-colors">How it Works</button>
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