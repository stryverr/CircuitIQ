
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const spendData = [
  { name: 'Direct Materials', value: 65, color: '#818cf8' }, // Indigo-400
  { name: 'R&D Equipment', value: 20, color: '#c084fc' }, // Purple-400
  { name: 'Chemicals/Gases', value: 10, color: '#2dd4bf' }, // Teal-400
  { name: 'MRO/Other', value: 5, color: '#fbbf24' }, // Amber-400
];

const performanceData = [
  { supplier: 'ASML', quality: 99, delivery: 88, price: 60 },
  { supplier: 'TSMC', quality: 98, delivery: 95, price: 70 },
  { supplier: 'JSR Corp', quality: 95, delivery: 92, price: 85 },
  { supplier: 'Heraeus', quality: 94, delivery: 90, price: 80 },
];

const Analytics: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Intelligence Reports</h1>
          <p className="text-slate-400 text-sm font-medium">Strategic ecosystem metrics.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-5 py-2.5 bg-slate-800 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-700 transition-colors shadow-lg shadow-slate-200">
            Run AI Compliance Audit
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-8 rounded-2xl border border-indigo-50 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Spend Distribution (Q3)</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={spendData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={8}
                  dataKey="value"
                  stroke="none"
                >
                  {spendData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{fontSize: '12px', fontWeight: 'bold'}} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-indigo-50 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Supplier Scorecard</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f8fafc" />
                <XAxis type="number" hide />
                <YAxis dataKey="supplier" type="category" axisLine={false} tickLine={false} width={80} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 'bold'}} />
                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                <Bar dataKey="quality" fill="#818cf8" radius={[0, 8, 8, 0]} barSize={14} />
                <Bar dataKey="delivery" fill="#2dd4bf" radius={[0, 8, 8, 0]} barSize={14} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex gap-6 text-[10px] font-black uppercase tracking-wider justify-center">
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-indigo-400"></div> Quality</div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-teal-400"></div> Reliability</div>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-indigo-50 shadow-sm">
        <h3 className="text-lg font-bold text-slate-800 mb-6">Strategic Pathing</h3>
        <div className="space-y-4">
          <div className="flex gap-5 p-6 bg-teal-50/50 border border-teal-100 rounded-2xl">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-2xl shadow-sm border border-teal-50">🌱</div>
            <div>
              <h4 className="font-bold text-teal-800">Diversity in Sourcing</h4>
              <p className="text-sm text-teal-900/60 leading-relaxed font-medium">Over-dependence on ASML identified. Secondary lithography maintenance contracts should be established in the EMEA sector.</p>
            </div>
          </div>
          <div className="flex gap-5 p-6 bg-rose-50/50 border border-rose-100 rounded-2xl">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-2xl shadow-sm border border-rose-50">🌸</div>
            <div>
              <h4 className="font-bold text-rose-800">Compliance Refresh</h4>
              <p className="text-sm text-rose-900/60 leading-relaxed font-medium">New EAR guidelines effective next Tuesday. Ensure all 3nm equipment batches are re-validated by the Compliance Agent by EOD Friday.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
