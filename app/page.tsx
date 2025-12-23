"use client";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Predictor from "./components/Predictor";
import Stats from "./components/Stats";
import Summary from "./components/Summery";

export default function Home() {
  const [view, setView] = useState("home");
  const [predictionData, setPredictionData] = useState<any>(null);

  const handlePredictionSuccess = (data: any) => {
    setPredictionData(data);
    setView("summary");
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
            {/* Pass the success handler to Predictor */}
            <Predictor onPredictSuccess={handlePredictionSuccess} />
          </section>
        )}

        {view === "summary" && predictionData && (
          <section className="pt-24 min-h-screen bg-slate-50">
            {/* Pass the prediction data and a back button handler to Summary */}
            <Summary result={predictionData} onBack={handleBackToPredictor} />
          </section>
        )}

        {view === "summary" && !predictionData && (
            <div className="pt-24 text-center py-20 text-slate-500">Loading summary...</div>
        )}
      </main>

      <footer className="py-12 border-t border-slate-100 text-center text-slate-500 text-sm bg-white font-medium">
        <p>© 2025 ThalCheck AI Research Lab. For screening purposes only. Consult a doctor for medical advice.</p>
      </footer> 
    </div>
  );
}
