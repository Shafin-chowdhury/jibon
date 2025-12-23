import React from 'react'

export default function About() {
  const steps = [
    {
      title: "Data Input",
      desc: "Users provide standard CBC (Complete Blood Count) indices like HB, MCV, and RBC.",
      icon: "📊"
    },
    {
      title: "Index Calculation",
      desc: "Our system automatically calculates the Mentzer Index and Green King Index.",
      icon: "🧮"
    },
    {
      title: "AI Analysis",
      desc: "A Random Forest Machine Learning model processes 11 different clinical features.",
      icon: "🧠"
    }
  ];

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-black text-slate-900 mb-4">How ThalCheck AI Works</h2>
        <p className="text-slate-600 max-w-2xl mx-auto text-lg">
          We combine traditional hematological formulas with modern artificial intelligence 
          to provide a screening accuracy that exceeds standard manual calculations.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-20">
        {steps.map((step, index) => (
          <div key={index} className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-4xl mb-4">{step.icon}</div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
            <p className="text-slate-600 leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 rounded-[3rem] p-10 md:p-16 text-white flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/2">
          <h3 className="text-3xl font-bold mb-6">The Mentzer Index Logic</h3>
          <p className="text-slate-400 mb-6 leading-relaxed">
            One of the primary screening tools used is the Mentzer Index ($MCV / RBC$). 
            If the quotient is less than 13, Thalassemia is suggested. If it is greater than 13, 
            Iron deficiency anemia is more likely. Our AI goes further by analyzing 10 other 
            parameters simultaneously.
          </p>
          <ul className="space-y-3">
            <li className="flex items-center gap-3 font-medium text-red-400">
              <span>✓</span> High Sensitivity (95%+)
            </li>
            <li className="flex items-center gap-3 font-medium text-red-400">
              <span>✓</span> Instant Clinical Feedback
            </li>
          </ul>
        </div>
        <div className="md:w-1/2 bg-white/5 p-8 rounded-3xl border border-white/10">
           <pre className="text-xs text-red-300 font-mono">
             {`// AI Decision Logic Snippet
if (mentzer_index < 13 && hb < 11) {
   probability = model.predict(features);
   return "Thalassemia Minor Detected";
}`}
           </pre>
        </div>
      </div>
    </section>
  );
}

