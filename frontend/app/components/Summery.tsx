// // "use client";
// // import React from 'react';
// // import { Pie } from 'react-chartjs-2';
// // import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// // // Register Chart.js components
// // ChartJS.register(ArcElement, Tooltip, Legend);

// // // Define a type for your result data
// // interface PredictionResult {
// //   thalassemia_result: string;
// //   probability: number;
// //   status: 'Positive' | 'Negative';
// //   mentzer_index?: number; // Assuming you might calculate this
// //   green_king_index?: number; // Assuming you might calculate this
// //   // Add other relevant input fields if you want to display them
// //   formData: {
// //     hb: number; mcv: number; mch: number; rdw: number; rbc: number; age: number;
// //     gender: string; fatigue: string; family_history: string;
// //     relation: string; jaundice: boolean; spleen: boolean;
// //   }
// // }

// // export default function Summary({ result, onBack }: { result: PredictionResult; onBack: () => void }) {
// //   if (!result) {
// //     return <div className="text-center py-20 text-slate-500">No result data available.</div>;
// //   }

// //   // Data for the Pie Chart
// //   const chartData = {
// //     labels: [result.thalassemia_result, 'Other'],
// //     datasets: [
// //       {
// //         data: [result.probability * 100, 100 - (result.probability * 100)],
// //         backgroundColor: [
// //           result.status === 'Positive' ? '#ef4444' : '#22c55e', // Red for positive, Green for negative
// //           '#e2e8f0', // Slate-200 for 'Other'
// //         ],
// //         borderColor: [
// //           result.status === 'Positive' ? '#dc2626' : '#16a34a',
// //           '#cbd5e1',
// //         ],
// //         borderWidth: 1,
// //       },
// //     ],
// //   };

// //   const chartOptions = {
// //     responsive: true,
// //     plugins: {
// //       legend: {
// //         position: 'bottom' as const,
// //         labels: {
// //           color: '#475569', // text-slate-600
// //           font: {
// //             size: 14,
// //             family: 'Inter, sans-serif',
// //           }
// //         }
// //       },
// //       tooltip: {
// //         callbacks: {
// //           label: function(context: any) {
// //             let label = context.label || '';
// //             if (label) {
// //               label += ': ';
// //             }
// //             if (context.parsed !== null) {
// //               label += context.parsed.toFixed(1) + '%';
// //             }
// //             return label;
// //           }
// //         }
// //       }
// //     }
// //   };

// //   const statusColor = result.status === 'Positive' ? 'text-red-600' : 'text-green-600';
// //   const statusBg = result.status === 'Positive' ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200';

// //   return (
// //     <div className="max-w-6xl mx-auto py-12 px-6 animate-in fade-in slide-in-from-bottom duration-500">
// //       <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden">
        
// //         {/* Header Section */}
// //         <div className="bg-slate-900 p-10 text-white flex justify-between items-center">
// //           <div>
// //             <h2 className="text-3xl font-black tracking-tight">AI Diagnostic Summary</h2>
// //             <p className="text-slate-400 mt-2">Detailed breakdown of the Thalassemia screening.</p>
// //           </div>
// //           <button 
// //             onClick={onBack} 
// //             className="bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-xl transition-all"
// //           >
// //             &larr; Re-run Analysis
// //           </button>
// //         </div>

// //         {/* Main Content Grid */}
// //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-10">
          
// //           {/* Left Column: Result & Chart */}
// //           <div className="lg:col-span-2 space-y-8">
// //             <div className={`p-8 rounded-3xl border-2 ${statusBg} flex items-center gap-6`}>
// //               <div className="text-6xl">{result.status === 'Positive' ? '⚠️' : '✅'}</div>
// //               <div>
// //                 <h3 className="text-slate-500 font-bold uppercase text-sm tracking-[0.2em]">Diagnostic Outcome</h3>
// //                 <p className={`text-5xl font-black mt-2 ${statusColor}`}>
// //                   {result.thalassemia_result}
// //                 </p>
// //                 <p className="text-slate-600 mt-2 text-lg">
// //                   AI Confidence: <span className="font-bold">{ (result.probability * 100).toFixed(1) }%</span>
// //                 </p>
// //               </div>
// //             </div>

// //             <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 h-[400px] flex items-center justify-center">
// //               <div className="w-full max-w-sm">
// //                 <Pie data={chartData} options={chartOptions} />
// //               </div>
// //             </div>
// //           </div>

// //           {/* Right Column: Input Details & Interpretation */}
// //           <div className="lg:col-span-1 space-y-6">
// //             <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
// //               <h3 className="text-xl font-bold text-slate-900 mb-4">Patient Data</h3>
// //               <ul className="space-y-3 text-slate-700">
// //                 {Object.entries(result.formData).map(([key, value]) => (
// //                   <li key={key} className="flex justify-between items-center">
// //                     <span className="font-medium capitalize">{key.replace(/_/g, ' ')}:</span>
// //                     <span className="font-bold">{typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value}</span>
// //                   </li>
// //                 ))}
// //               </ul>
// //             </div>

// //             <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
// //               <h3 className="text-xl font-bold text-slate-900 mb-4">Clinical Interpretation</h3>
// //               <p className="text-slate-600 leading-relaxed text-sm">
// //                 The AI model processed the provided CBC indices. {result.status === 'Positive' ? 'The results suggest a higher likelihood of Thalassemia Minor. Further clinical evaluation is strongly recommended.' : 'Based on the provided data, the likelihood of Thalassemia Minor is low.'}
// //                 {result.mentzer_index && <p className="mt-2 text-xs text-slate-500">Mentzer Index: {result.mentzer_index.toFixed(2)}</p>}
// //               </p>
// //             </div>

// //             <div className="p-6 bg-red-600 rounded-[2rem] text-white">
// //               <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-2">Important Disclaimer</p>
// //               <p className="text-sm font-medium">This AI tool is for screening purposes only and should not be used as a sole basis for diagnosis. Always consult a qualified medical professional.</p>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }






// "use client";

// interface SummaryProps {
//   result: any;
//   onReset: () => void;
// }

// export default function Summary({ result, onReset }: SummaryProps) {
//   // Fix for NaN%: Ensure we have a valid number before multiplying
//   const confidenceScore = result.probability ? (result.probability * 100).toFixed(1) : "0.0";
//   const isPositive = result.status === "Positive";

//   return (
//     <div className="max-w-6xl mx-auto py-10 px-6 animate-in fade-in duration-500">
//       <div className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden">
//         <div className="relative z-10 flex justify-between items-center">
//           <div>
//             <h1 className="text-4xl font-black italic tracking-tight">Diagnostic Summary</h1>
//             <p className="text-slate-400 mt-2">Patient: <span className="text-white font-bold">{result.formData.patient_name}</span></p>
//           </div>
//           <button onClick={onReset} className="bg-red-600 hover:bg-white hover:text-red-600 text-white px-8 py-3 rounded-full font-bold transition-all transform hover:scale-105">
//             ← New Analysis
//           </button>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
//         <div className="lg:col-span-2 space-y-8">
//           {/* Main Status */}
//           <div className={`p-10 rounded-[2.5rem] border-2 shadow-inner ${isPositive ? 'bg-red-50 border-red-100' : 'bg-green-50 border-green-100'}`}>
//              <div className="flex items-center gap-6">
//                 <div className={`text-7xl ${isPositive ? 'text-red-600' : 'text-green-600'}`}>
//                     {isPositive ? "🚨" : "🛡️"}
//                 </div>
//                 <div>
//                     <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-1">AI Classification</h3>
//                     <p className={`text-4xl font-black ${isPositive ? 'text-red-700' : 'text-green-700'}`}>
//                         {result.thalassemia_result}
//                     </p>
//                     <div className="mt-3 inline-block bg-white px-4 py-1 rounded-full shadow-sm">
//                         <p className="text-slate-600 font-bold text-sm">Analysis Confidence: <span className="text-slate-900">{confidenceScore}%</span></p>
//                     </div>
//                 </div>
//              </div>
//           </div>

//           {/* Indices Section */}
//           <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-slate-100">
//             <h3 className="text-xl font-black mb-8 flex items-center gap-2">
//                 <span className="w-2 h-8 bg-red-600 rounded-full"></span>
//                 Calculated Blood Indices
//             </h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                 <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100">
//                     <p className="text-xs font-black text-slate-400 uppercase tracking-tighter mb-1">Mentzer Index</p>
//                     <p className="text-5xl font-black text-slate-900">{result.mentzer_index.toFixed(2)}</p>
//                     <p className="text-[11px] text-slate-500 mt-4 leading-relaxed italic">Formula: MCV / RBC. A score &lt; 13 is highly characteristic of Thalassemia Minor.</p>
//                 </div>
//                 <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100">
//                     <p className="text-xs font-black text-slate-400 uppercase tracking-tighter mb-1">Green-King Index</p>
//                     <p className="text-5xl font-black text-slate-900">{result.green_king_index.toFixed(2)}</p>
//                     <p className="text-[11px] text-slate-500 mt-4 leading-relaxed italic">Uses MCV, RDW, and Hb. Helps differentiate Thalassemia from Iron Deficiency Anemia.</p>
//                 </div>
//             </div>
//           </div>
//         </div>

//         {/* Sidebar Data */}
//         <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100 h-fit">
//           <h3 className="text-lg font-black mb-6 border-b border-slate-100 pb-4 text-slate-800">Clinical Input Profile</h3>
//           <div className="space-y-4">
//             {Object.entries(result.formData).map(([key, value]: [string, any]) => (
//               <div key={key} className="flex justify-between items-center text-sm group">
//                 <span className="text-slate-400 font-bold uppercase text-[9px] group-hover:text-red-500 transition-colors">{key.replace('_', ' ')}</span>
//                 <span className="text-slate-800 font-extrabold text-right ml-4">
//                     {typeof value === 'boolean' ? (value ? "Present" : "Absent") : value}
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }