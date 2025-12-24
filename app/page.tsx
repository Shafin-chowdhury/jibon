// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// "use client";
// import { useState } from "react";
// import Navbar from "./components/Navbar";
// import Hero from "./components/Hero";
// import About from "./components/About";
// import Predictor from "./components/Predictor";
// import Stats from "./components/Stats";


// export default function Home() {
//   const [view, setView] = useState("home");
//   const [predictionData, setPredictionData] = useState<any>(null);

//   const handlePredictionSuccess = (data: any) => {
//     setPredictionData(data);
//     setView("summary");
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   return (
//     <div className="min-h-screen bg-white">
//       <Navbar onNav={setView} />
      
//        <main className="flex-grow">
//           {view === "home" && (
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
//             {/* Pass the success handler to Predictor */}
//             <Predictor onPredictSuccess={handlePredictionSuccess} />
//           </section>
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

export default function Home() {
  const [view, setView] = useState<"home" | "predictor" | "summary">("home");
  const [predictionData, setPredictionData] = useState<PredictionResult | null>(null);

  const handlePredictionSuccess = (data: PredictionResult) => {
    setPredictionData(data);
    setView("summary");
    // Scroll smoothly to top
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 50);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar onNav={setView} />

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
          <section className="pt-24 min-h-screen bg-slate-50 animate-in fade-in duration-500">
            <Predictor onPredictSuccess={handlePredictionSuccess} />
          </section>
        )}

        {view === "summary" && predictionData && (
          // <section className="pt-24 min-h-screen bg-slate-50 animate-in fade-in duration-500">
          //   {/* Display summary data */}
          //   <div className="max-w-4xl mx-auto p-8 bg-white rounded-3xl shadow-lg">
          //     <h2 className="text-2xl font-black mb-4">Prediction Summary</h2>
          //     <p><strong>Thalassemia Result:</strong> {predictionData.thalassemia_result}</p>
          //     <p><strong>Probability:</strong> {predictionData.percentage}</p>
          //     <p><strong>Iron Metabolism:</strong> {predictionData.iron_result}</p>
          //     <p><strong>Mentzer Index:</strong> {predictionData.mentzer_index}</p>
          //     <p><strong>Green-King Index:</strong> {predictionData.green_king_index}</p>
          //     <button
          //       className="mt-6 px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-red-600 transition-all"
          //       onClick={() => setView("predictor")}
          //     >
          //       Back to Predictor
          //     </button>
          //   </div>
          // </section>



          <section className="pt-24 min-h-screen bg-slate-50 animate-in fade-in duration-500">
  <div className="max-w-4xl mx-auto p-8 bg-white rounded-3xl shadow-2xl border border-slate-100">
    <h2 className="text-3xl font-black mb-6 text-center text-slate-900">🧬 Prediction Summary</h2>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      
      {/* Thalassemia Result */}
      <div className="flex items-center gap-4 p-4 bg-red-50 rounded-2xl border border-red-100 shadow-inner">
        <div className="text-4xl">🩸</div>
        <div>
          <p className="text-sm text-red-400 font-bold uppercase tracking-wide">Thalassemia Result</p>
          <p className={`text-xl font-black ${predictionData.thalassemia_result.includes("Normal") ? "text-emerald-600" : "text-red-600"}`}>
            {predictionData.thalassemia_result}
          </p>
        </div>
      </div>

      {/* Probability */}
      <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200 shadow-inner">
        <div className="text-4xl">📊</div>
        <div>
          <p className="text-sm text-slate-400 font-bold uppercase tracking-wide">Prediction Confidence</p>
          <p className="text-xl font-black text-slate-900">{predictionData.percentage}</p>
        </div>
      </div>

      {/* Iron Metabolism */}
      <div className="flex items-center gap-4 p-4 bg-amber-50 rounded-2xl border border-amber-100 shadow-inner">
        <div className="text-4xl">🧪</div>
        <div>
          <p className="text-sm text-amber-500 font-bold uppercase tracking-wide">Iron Metabolism</p>
          <p className="text-xl font-black text-amber-700">{predictionData.iron_result}</p>
        </div>
      </div>

      {/* Mentzer Index */}
      <div className="flex items-center gap-4 p-4 bg-cyan-50 rounded-2xl border border-cyan-100 shadow-inner">
        <div className="text-4xl">📏</div>
        <div>
          <p className="text-sm text-cyan-500 font-bold uppercase tracking-wide">Mentzer Index</p>
          <p className="text-xl font-black text-cyan-700">{predictionData.mentzer_index}</p>
        </div>
      </div>

      {/* Green-King Index */}
      <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-2xl border border-purple-100 shadow-inner md:col-span-2">
        <div className="text-4xl">🧮</div>
        <div>
          <p className="text-sm text-purple-500 font-bold uppercase tracking-wide">Green-King Index</p>
          <p className="text-xl font-black text-purple-700">{predictionData.green_king_index}</p>
        </div>
      </div>
    </div>

    <div className="mt-8 text-center">
      <button
        className="px-6 py-3 bg-slate-900 text-white rounded-2xl font-bold hover:bg-red-600 transition-all shadow-lg"
        onClick={() => setView("predictor")}
      >
        🔄 Back to Predictor
      </button>
    </div>
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
