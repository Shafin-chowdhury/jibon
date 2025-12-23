// "use client";
// import { useState } from "react";

// export default function Predictor() {
//   const [formData, setFormData] = useState({
//     patient_name: "", age: 0, gender: "Male",
//     hb: 0, mcv: 0, mch: 0, rdw: 0, rbc: 0,
//     fatigue: "None", family_history: "No", relation: "None",
//     jaundice: false, spleen: false
//   });

//   const [loading, setLoading] = useState(false);
//   const [result, setResult] = useState<any>(null);
//   const [hoveredField, setHoveredField] = useState<string | null>(null);

//   // --- Enhanced Guidance with Icons and Color Context ---
//   const guidance: Record<string, { title: string; text: string; icon: string; color: string }> = {
//     patient_name: { title: "Patient Identity", text: "Used for personalizing the final diagnostic report.", icon: "👤", color: "text-blue-500" },
//     age: { title: "Clinical Age", text: "Hb thresholds change significantly after age 15.", icon: "📅", color: "text-purple-500" },
//     gender: { title: "Biological Sex", text: "Male/Female reference ranges differ for Hemoglobin.", icon: "⚥", color: "text-pink-500" },
//     hb: { title: "Hemoglobin (Hb)", text: "Measures oxygen-carrying capacity. Low = Anemia.", icon: "🩸", color: "text-red-500" },
//     mcv: { title: "MCV", text: "Size of red cells. Very low in Thalassemia (<70 fl).", icon: "📏", color: "text-orange-500" },
//     mch: { title: "MCH", text: "Amount of Hb per cell. Low suggests microcytosis.", icon: "🔬", color: "text-yellow-600" },
//     rdw: { title: "RDW", text: "Variation in cell size. High in Iron Deficiency.", icon: "📊", color: "text-cyan-500" },
//     rbc: { title: "RBC Count", text: "High RBC + Low Hb often points to Thalassemia Minor.", icon: "🔴", color: "text-red-600" },
//     fatigue: { title: "Fatigue Level", text: "Frequent tiredness is a hallmark of low oxygen levels.", icon: "😫", color: "text-gray-500" },
//     relation: { title: "Genetic Link", text: "Thalassemia is hereditary; risk increases with close relatives.", icon: "👪", color: "text-indigo-500" },
//     jaundice: { title: "Bilirubin Sign", text: "Yellowing suggests high red cell breakdown (Hemolysis).", icon: "👁️", color: "text-yellow-400" },
//     spleen: { title: "Organ Size", text: "Enlarged spleen occurs as it works harder to filter cells.", icon: "🩺", color: "text-green-500" }
//   };

//   const handlePredict = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setResult(null);
//     try {
//       const response = await fetch("http://127.0.0.1:8000/predict", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });
//       const data = await response.json();
//       if (response.ok) setResult(data);
//       else alert("Server Error: " + (data.detail || "Something went wrong"));
//     } catch (err) {
//       alert("Backend Connection Failed.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-6 flex flex-col lg:flex-row gap-8 font-sans">
//       {/* Left Column: Form Section */}
//       <div className="flex-1 bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
//         <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-6 text-white flex justify-between items-center">
//             <span className="font-black italic text-xl tracking-tighter">THALCHECK AI <span className="text-red-500">v2.0</span></span>
//             <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
//         </div>
        
//         <form onSubmit={handlePredict} className="p-8 space-y-6">
//           <input 
//             type="text" 
//             placeholder="Patient Full Name" 
//             className="w-full p-4 bg-slate-50 rounded-xl outline-none border-2 focus:border-red-500 transition-all"
//             onMouseEnter={() => setHoveredField('patient_name')}
//             onMouseLeave={() => setHoveredField(null)}
//             onChange={(e) => setFormData({...formData, patient_name: e.target.value})} 
//           />
          
//           <div className="grid grid-cols-2 gap-4">
//             <div onMouseEnter={() => setHoveredField('age')} onMouseLeave={() => setHoveredField(null)}>
//               <input type="number" placeholder="Age" className="w-full p-4 bg-slate-50 rounded-xl outline-none border-2 border-transparent focus:border-blue-400" 
//                 onChange={(e) => setFormData({...formData, age: parseInt(e.target.value) || 0})} />
//             </div>
//             <div onMouseEnter={() => setHoveredField('gender')} onMouseLeave={() => setHoveredField(null)}>
//               <select className="w-full p-4 bg-slate-50 rounded-xl outline-none border-2 border-transparent focus:border-pink-400" onChange={(e) => setFormData({...formData, gender: e.target.value})}>
//                 <option value="Male">Male</option>
//                 <option value="Female">Female</option>
//               </select>
//             </div>
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div onMouseEnter={() => setHoveredField('fatigue')} onMouseLeave={() => setHoveredField(null)}>
//               <select className="w-full p-4 bg-slate-50 rounded-xl outline-none" onChange={(e) => setFormData({...formData, fatigue: e.target.value})}>
//                 <option value="None">No Fatigue</option>
//                 <option value="Everyday">Everyday Fatigue</option>
//                 <option value="Every 3 days">Frequent (3 Days)</option>
//                 <option value="Once a week">Weekly</option>
//                 <option value="Once in 15 days">Bi-Weekly</option>
//               </select>
//             </div>
//             <div>
//               <select className="w-full p-4 bg-slate-50 rounded-xl outline-none" onChange={(e) => setFormData({...formData, family_history: e.target.value})}>
//                 <option value="No">No Family History</option>
//                 <option value="Yes">Has Family History</option>
//               </select>
//             </div>
//           </div>

//           {formData.family_history === "Yes" && (
//             <div className="animate-in fade-in slide-in-from-top-2 duration-300" onMouseEnter={() => setHoveredField('relation')} onMouseLeave={() => setHoveredField(null)}>
//               <select className="w-full p-4 bg-red-50 text-red-900 rounded-xl outline-none border-2 border-red-200" onChange={(e) => setFormData({...formData, relation: e.target.value})}>
//                 <option value="None">Select Relative...</option>
//                 <option value="Parent">Parent</option>
//                 <option value="Son/Daughter">Son/Daughter</option>
//                 <option value="1 Sibling">1 Sibling</option>
//                 <option value="2 Siblings">2+ Siblings</option>
//                 <option value="Grandparents">Grandparents</option>
//                 <option value="Cousin">Cousin</option>
//                 <option value="Aunt/Uncle">Aunt/Uncle</option>
//               </select>
//             </div>
//           )}

//           <div className="p-5 bg-red-50 rounded-3xl border border-red-100 shadow-inner">
//             <label className="text-xs font-black text-red-400 mb-4 block tracking-widest uppercase text-center">Laboratory Serum Values</label>
//             <div className="grid grid-cols-5 gap-4">
//                 {['hb', 'mcv', 'mch', 'rdw', 'rbc'].map((key) => (
//                 <div key={key} className="text-center" onMouseEnter={() => setHoveredField(key)} onMouseLeave={() => setHoveredField(null)}>
//                     <label className="block text-[10px] uppercase font-black text-red-500 mb-1">{key}</label>
//                     <input type="number" step="0.01" required className="w-full bg-white p-2 rounded-lg text-center outline-none border-2 border-transparent focus:border-red-500 font-bold text-slate-800"
//                     onChange={(e) => setFormData({...formData, [key]: parseFloat(e.target.value) || 0})} />
//                 </div>
//                 ))}
//             </div>
//           </div>

//           <div className="flex justify-around bg-slate-50 p-4 rounded-xl">
//             <label className="flex items-center gap-3 cursor-pointer group" onMouseEnter={() => setHoveredField('jaundice')} onMouseLeave={() => setHoveredField(null)}>
//                <input type="checkbox" className="w-5 h-5 accent-red-600" onChange={(e)=>setFormData({...formData, jaundice: e.target.checked})}/> 
//                <span className="text-sm font-bold text-slate-600 group-hover:text-red-500 transition-colors">Jaundice</span>
//             </label>
//             <label className="flex items-center gap-3 cursor-pointer group" onMouseEnter={() => setHoveredField('spleen')} onMouseLeave={() => setHoveredField(null)}>
//                <input type="checkbox" className="w-5 h-5 accent-red-600" onChange={(e)=>setFormData({...formData, spleen: e.target.checked})}/> 
//                <span className="text-sm font-bold text-slate-600 group-hover:text-red-500 transition-colors">Enlarged Spleen</span>
//             </label>
//           </div>

//           <button type="submit" disabled={loading} className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg hover:bg-red-600 transform active:scale-95 transition-all shadow-lg shadow-slate-200 disabled:bg-slate-300">
//             {loading ? "INITIALIZING NEURAL ANALYSIS..." : "EXECUTE DIAGNOSTIC PREDICTION"}
//           </button>
//         </form>

//         {/* Prediction Display */}
//         {result && (
//           <div className="p-8 bg-white border-t-4 border-slate-900 grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in zoom-in duration-500">
//             <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 relative overflow-hidden">
//                 <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl">🧬</div>
//                 <p className="text-xs text-slate-400 font-black uppercase tracking-widest mb-1">Thalassemia Screening</p>
//                 <h2 className={`text-3xl font-black mb-3 ${result.probability > 0.5 ? "text-red-600" : "text-emerald-600"}`}>
//                     {result.thalassemia_result}
//                 </h2>
//                 <div className="bg-slate-200 h-3 rounded-full overflow-hidden mb-2">
//                     <div className={`h-full transition-all duration-1000 ${result.probability > 0.5 ? 'bg-red-500' : 'bg-emerald-500'}`} style={{ width: result.percentage }}></div>
//                 </div>
//                 <p className="text-sm font-bold text-slate-500">ML Confidence: <span className="text-slate-900">{result.percentage}</span></p>
//             </div>
            
//             <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 relative overflow-hidden">
//                 <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl">🧪</div>
//                 <p className="text-xs text-slate-400 font-black uppercase tracking-widest mb-1">Iron Metabolism</p>
//                 <h2 className={`text-2xl font-black mb-3 ${result.iron_result.includes("Positive") ? "text-amber-500" : "text-slate-700"}`}>
//                     {result.iron_result}
//                 </h2>
//                 <div className="flex gap-2">
//                     <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-[10px] font-bold text-slate-400 uppercase">Mentzer: {result.mentzer_index}</span>
//                     <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-[10px] font-bold text-slate-400 uppercase">G-King: {result.green_king_index}</span>
//                 </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Right Column: Medical Guidance Panel */}
//       <div className="w-full lg:w-96">
//         <div className="sticky top-6">
//             <div className="bg-white rounded-3xl p-8 border-2 border-slate-100 shadow-xl min-h-[400px] flex flex-col items-center justify-center text-center transition-all">
//                 {hoveredField ? (
//                 <div className="animate-in fade-in zoom-in duration-300">
//                     <div className={`text-7xl mb-6 p-6 rounded-full bg-slate-50 inline-block`}>
//                         {guidance[hoveredField].icon}
//                     </div>
//                     <h3 className={`font-black text-2xl mb-4 tracking-tight ${guidance[hoveredField].color}`}>
//                         {guidance[hoveredField].title}
//                     </h3>
//                     <p className="text-slate-500 text-lg leading-relaxed font-medium">
//                         {guidance[hoveredField].text}
//                     </p>
//                     <div className="mt-8 pt-8 border-t border-slate-50">
//                         <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Clinical Parameter Guide</span>
//                     </div>
//                 </div>
//                 ) : (
//                 <div className="opacity-30 flex flex-col items-center">
//                     <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center text-4xl mb-6">ℹ️</div>
//                     <p className="text-slate-500 font-bold italic">Hover over any field to view<br/>medical reference data</p>
//                 </div>
//                 )}
//             </div>
            
//             {/* Quick Summary Card */}
//             <div className="mt-6 bg-red-600 rounded-3xl p-6 text-white shadow-lg shadow-red-200">
//                 <h4 className="font-black text-sm uppercase tracking-widest mb-2">Notice</h4>
//                 <p className="text-xs text-red-100 font-medium leading-relaxed">
//                     This tool uses Random Forest AI to screen for hematological traits. It is for screening purposes and does not replace a CBC/Electrophoresis lab confirmation.
//                 </p>
//             </div>
//         </div>
//       </div>
//     </div>
//   );
// }






"use client";
import { useState } from "react";

export default function Predictor() {
  const [formData, setFormData] = useState({
    patient_name: "", age: 0, gender: "Male",
    hb: 0, mcv: 0, mch: 0, rdw: 0, rbc: 0,
    fatigue: "None", family_history: "No", relation: "None",
    jaundice: false, spleen: false
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [hoveredField, setHoveredField] = useState<string | null>(null);

  // --- Enhanced Guidance with Icons and Color Context ---
  const guidance: Record<string, { title: string; text: string; icon: string; color: string }> = {
    patient_name: { title: "Patient Identity", text: "Used for personalizing the final diagnostic report.", icon: "👤", color: "text-blue-500" },
    age: { title: "Clinical Age", text: "Hb thresholds change significantly after age 15.", icon: "📅", color: "text-purple-500" },
    gender: { title: "Biological Sex", text: "Male/Female reference ranges differ for Hemoglobin.", icon: "⚥", color: "text-pink-500" },
    hb: { title: "Hemoglobin (Hb)", text: "Measures oxygen-carrying capacity. Low = Anemia.", icon: "🩸", color: "text-red-500" },
    mcv: { title: "MCV", text: "Size of red cells. Very low in Thalassemia (<70 fl).", icon: "📏", color: "text-orange-500" },
    mch: { title: "MCH", text: "Amount of Hb per cell. Low suggests microcytosis.", icon: "🔬", color: "text-yellow-600" },
    rdw: { title: "RDW", text: "Variation in cell size. High in Iron Deficiency.", icon: "📊", color: "text-cyan-500" },
    rbc: { title: "RBC Count", text: "High RBC + Low Hb often points to Thalassemia Minor.", icon: "🔴", color: "text-red-600" },
    fatigue: { title: "Fatigue Level", text: "Frequent tiredness is a hallmark of low oxygen levels.", icon: "😫", color: "text-gray-500" },
    relation: { title: "Genetic Link", text: "Thalassemia is hereditary; risk increases with close relatives.", icon: "👪", color: "text-indigo-500" },
    jaundice: { title: "Bilirubin Sign", text: "Yellowing suggests high red cell breakdown (Hemolysis).", icon: "👁️", color: "text-yellow-400" },
    spleen: { title: "Organ Size", text: "Enlarged spleen occurs as it works harder to filter cells.", icon: "🩺", color: "text-green-500" }
  };

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const response = await fetch("/predict", { // Use /predict for Vercel
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();

      if (response.ok) {
        setResult(data);
      } else {
        // FIX: Extract the actual error message string
        const errorMsg = typeof data.detail === 'string' ? data.detail : JSON.stringify(data.detail);
        alert("Server Error: " + errorMsg);
      }
    } catch (err) {
      alert("Failed to connect to backend. Make sure the API is running.");
    } finally {
      setLoading(false);
    }
};

  return (
    <div className="max-w-6xl mx-auto p-6 flex flex-col lg:flex-row gap-8 font-sans">
      {/* Left Column: Form Section */}
      <div className="flex-1 bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-6 text-white flex justify-between items-center">
            <span className="font-black italic text-xl tracking-tighter">THALCHECK AI <span className="text-red-500">v2.0</span></span>
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
        </div>
        
        <form onSubmit={handlePredict} className="p-8 space-y-6">
          <input 
            type="text" 
            placeholder="Patient Full Name" 
            className="w-full p-4 bg-slate-50 rounded-xl outline-none border-2 focus:border-red-500 transition-all"
            onMouseEnter={() => setHoveredField('patient_name')}
            onMouseLeave={() => setHoveredField(null)}
            onChange={(e) => setFormData({...formData, patient_name: e.target.value})} 
          />
          
          <div className="grid grid-cols-2 gap-4">
            <div onMouseEnter={() => setHoveredField('age')} onMouseLeave={() => setHoveredField(null)}>
              <input type="number" placeholder="Age" className="w-full p-4 bg-slate-50 rounded-xl outline-none border-2 border-transparent focus:border-blue-400" 
                onChange={(e) => setFormData({...formData, age: parseInt(e.target.value) || 0})} />
            </div>
            <div onMouseEnter={() => setHoveredField('gender')} onMouseLeave={() => setHoveredField(null)}>
              <select className="w-full p-4 bg-slate-50 rounded-xl outline-none border-2 border-transparent focus:border-pink-400" onChange={(e) => setFormData({...formData, gender: e.target.value})}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div onMouseEnter={() => setHoveredField('fatigue')} onMouseLeave={() => setHoveredField(null)}>
              <select className="w-full p-4 bg-slate-50 rounded-xl outline-none" onChange={(e) => setFormData({...formData, fatigue: e.target.value})}>
                <option value="None">No Fatigue</option>
                <option value="Everyday">Everyday Fatigue</option>
                <option value="Every 3 days">Frequent (3 Days)</option>
                <option value="Once a week">Weekly</option>
                <option value="Once in 15 days">Bi-Weekly</option>
              </select>
            </div>
            <div>
              <select className="w-full p-4 bg-slate-50 rounded-xl outline-none" onChange={(e) => setFormData({...formData, family_history: e.target.value})}>
                <option value="No">No Family History</option>
                <option value="Yes">Has Family History</option>
              </select>
            </div>
          </div>

          {formData.family_history === "Yes" && (
            <div className="animate-in fade-in slide-in-from-top-2 duration-300" onMouseEnter={() => setHoveredField('relation')} onMouseLeave={() => setHoveredField(null)}>
              <select className="w-full p-4 bg-red-50 text-red-900 rounded-xl outline-none border-2 border-red-200" onChange={(e) => setFormData({...formData, relation: e.target.value})}>
                <option value="None">Select Relative...</option>
                <option value="Parent">Parent</option>
                <option value="Son/Daughter">Son/Daughter</option>
                <option value="1 Sibling">1 Sibling</option>
                <option value="2 Siblings">2+ Siblings</option>
                <option value="Grandparents">Grandparents</option>
                <option value="Cousin">Cousin</option>
                <option value="Aunt/Uncle">Aunt/Uncle</option>
              </select>
            </div>
          )}

          <div className="p-5 bg-red-50 rounded-3xl border border-red-100 shadow-inner">
            <label className="text-xs font-black text-red-400 mb-4 block tracking-widest uppercase text-center">Laboratory Serum Values</label>
            <div className="grid grid-cols-5 gap-4">
                {['hb', 'mcv', 'mch', 'rdw', 'rbc'].map((key) => (
                <div key={key} className="text-center" onMouseEnter={() => setHoveredField(key)} onMouseLeave={() => setHoveredField(null)}>
                    <label className="block text-[10px] uppercase font-black text-red-500 mb-1">{key}</label>
                    <input type="number" step="0.01" required className="w-full bg-white p-2 rounded-lg text-center outline-none border-2 border-transparent focus:border-red-500 font-bold text-slate-800"
                    onChange={(e) => setFormData({...formData, [key]: parseFloat(e.target.value) || 0})} />
                </div>
                ))}
            </div>
          </div>

          <div className="flex justify-around bg-slate-50 p-4 rounded-xl">
            <label className="flex items-center gap-3 cursor-pointer group" onMouseEnter={() => setHoveredField('jaundice')} onMouseLeave={() => setHoveredField(null)}>
               <input type="checkbox" className="w-5 h-5 accent-red-600" onChange={(e)=>setFormData({...formData, jaundice: e.target.checked})}/> 
               <span className="text-sm font-bold text-slate-600 group-hover:text-red-500 transition-colors">Jaundice</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group" onMouseEnter={() => setHoveredField('spleen')} onMouseLeave={() => setHoveredField(null)}>
               <input type="checkbox" className="w-5 h-5 accent-red-600" onChange={(e)=>setFormData({...formData, spleen: e.target.checked})}/> 
               <span className="text-sm font-bold text-slate-600 group-hover:text-red-500 transition-colors">Enlarged Spleen</span>
            </label>
          </div>

          <button type="submit" disabled={loading} className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg hover:bg-red-600 transform active:scale-95 transition-all shadow-lg shadow-slate-200 disabled:bg-slate-300">
            {loading ? "INITIALIZING NEURAL ANALYSIS..." : "EXECUTE DIAGNOSTIC PREDICTION"}
          </button>
        </form>

        {/* Prediction Display */}
        {result && (
          <div className="p-8 bg-white border-t-4 border-slate-900 grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in zoom-in duration-500">
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl">🧬</div>
                <p className="text-xs text-slate-400 font-black uppercase tracking-widest mb-1">Thalassemia Screening</p>
                <h2 className={`text-3xl font-black mb-3 ${result.probability > 0.5 ? "text-red-600" : "text-emerald-600"}`}>
                    {result.thalassemia_result}
                </h2>
                <div className="bg-slate-200 h-3 rounded-full overflow-hidden mb-2">
                    <div className={`h-full transition-all duration-1000 ${result.probability > 0.5 ? 'bg-red-500' : 'bg-emerald-500'}`} style={{ width: result.percentage }}></div>
                </div>
                <p className="text-sm font-bold text-slate-500">ML Confidence: <span className="text-slate-900">{result.percentage}</span></p>
            </div>
            
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl">🧪</div>
                <p className="text-xs text-slate-400 font-black uppercase tracking-widest mb-1">Iron Metabolism</p>
                <h2 className={`text-2xl font-black mb-3 ${result.iron_result.includes("Positive") ? "text-amber-500" : "text-slate-700"}`}>
                    {result.iron_result}
                </h2>
                <div className="flex gap-2">
                    <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-[10px] font-bold text-slate-400 uppercase">Mentzer: {result.mentzer_index}</span>
                    <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-[10px] font-bold text-slate-400 uppercase">G-King: {result.green_king_index}</span>
                </div>
            </div>
          </div>
        )}
      </div>

      {/* Right Column: Medical Guidance Panel */}
      <div className="w-full lg:w-96">
        <div className="sticky top-6">
            <div className="bg-white rounded-3xl p-8 border-2 border-slate-100 shadow-xl min-h-[400px] flex flex-col items-center justify-center text-center transition-all">
                {hoveredField ? (
                <div className="animate-in fade-in zoom-in duration-300">
                    <div className={`text-7xl mb-6 p-6 rounded-full bg-slate-50 inline-block`}>
                        {guidance[hoveredField].icon}
                    </div>
                    <h3 className={`font-black text-2xl mb-4 tracking-tight ${guidance[hoveredField].color}`}>
                        {guidance[hoveredField].title}
                    </h3>
                    <p className="text-slate-500 text-lg leading-relaxed font-medium">
                        {guidance[hoveredField].text}
                    </p>
                    <div className="mt-8 pt-8 border-t border-slate-50">
                        <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Clinical Parameter Guide</span>
                    </div>
                </div>
                ) : (
                <div className="opacity-30 flex flex-col items-center">
                    <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center text-4xl mb-6">ℹ️</div>
                    <p className="text-slate-500 font-bold italic">Hover over any field to view<br/>medical reference data</p>
                </div>
                )}
            </div>
            
            {/* Quick Summary Card */}
            <div className="mt-6 bg-red-600 rounded-3xl p-6 text-white shadow-lg shadow-red-200">
                <h4 className="font-black text-sm uppercase tracking-widest mb-2">Notice</h4>
                <p className="text-xs text-red-100 font-medium leading-relaxed">
                    This tool uses Random Forest AI to screen for hematological traits. It is for screening purposes and does not replace a CBC/Electrophoresis lab confirmation.
                </p>
            </div>
        </div>
      </div>
    </div>
  );
}