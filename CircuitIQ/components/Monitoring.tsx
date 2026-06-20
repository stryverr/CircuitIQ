
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { SYSTEM_NODES } from '../constants';

const latencyData = [
  { time: '10:00', api: 120, model: 800 },
  { time: '10:05', api: 145, model: 850 },
  { time: '10:10', api: 130, model: 1200 },
  { time: '10:15', api: 190, model: 950 },
  { time: '10:20', api: 160, model: 890 },
  { time: '10:25', api: 140, model: 1100 },
];

const Monitoring: React.FC = () => {
  const [nodes, setNodes] = useState(SYSTEM_NODES);

  useEffect(() => {
    const interval = setInterval(() => {
      setNodes(prev => prev.map(n => ({
        ...n,
        cpu: Math.max(5, Math.min(100, n.cpu + (Math.random() - 0.5) * 10))
      })));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800">System Observability</h1>
          <p className="text-slate-400 text-sm font-medium">Prometheus-style Distributed Intelligence Monitoring.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-xl text-xs font-bold border border-emerald-100">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
            CLUSTER STABLE
          </div>
          <button className="px-4 py-2 bg-slate-800 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-700 transition-colors shadow-lg shadow-slate-200">
            Log Analyzer
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard title="API requests (24h)" value="124.8k" trend="+8.4%" icon="📊" color="text-indigo-500" />
        <MetricCard title="System error rate" value="0.002%" trend="-0.1%" icon="🛡️" color="text-emerald-500" />
        <MetricCard title="active worker pods" value="72" trend="+12" icon="🚀" color="text-purple-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* K8s/Distributed Cluster Map */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-indigo-50 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
              <span className="p-1.5 bg-sky-100 text-sky-500 rounded-lg text-sm">🕸️</span> 
              Kubernetes Node Cluster
            </h3>
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Distributed Worker Topology</span>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {nodes.map(node => (
              <div key={node.id} className="p-4 bg-slate-50 border border-indigo-50 rounded-2xl hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                   <div className="text-xs font-black text-slate-700">{node.id}</div>
                   <div className={`w-2 h-2 rounded-full ${node.status === 'Healthy' ? 'bg-emerald-400' : 'bg-orange-400 animate-pulse'}`}></div>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-[9px] font-black text-slate-400 uppercase mb-1">
                       <span>CPU Load</span>
                       <span>{Math.round(node.cpu)}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-white rounded-full overflow-hidden border border-slate-100">
                      <div className={`h-full rounded-full ${node.cpu > 80 ? 'bg-rose-400' : 'bg-indigo-400'}`} style={{ width: `${node.cpu}%` }}></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                     <span className="text-[9px] font-bold text-slate-400 uppercase">Active Pods</span>
                     <span className="text-xs font-black text-slate-700">{node.podCount}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Security & RBAC Logs */}
        <div className="bg-white p-6 rounded-3xl border border-indigo-50 shadow-sm flex flex-col">
          <div className="mb-6">
            <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
              <span className="p-1.5 bg-rose-100 text-rose-500 rounded-lg text-sm">🔒</span> 
              RBAC & Tool Security
            </h3>
            <p className="text-xs text-slate-400 font-medium mt-1">Permission and Policy Validation Logs.</p>
          </div>
          
          <div className="flex-1 overflow-y-auto space-y-3 font-mono text-[10px]">
            <LogRow level="pass" msg="RBAC check: User 'Ops-02' -> SAP Material Master: ACCESS GRANTED" time="10:44:12" />
            <LogRow level="audit" msg="Tool Policy check: 'executeTradeSimulation' -> BLOCKED (Missing Signature)" time="10:42:05" />
            <LogRow level="pass" msg="Multi-tenant bridge isolation check: SUCCEEDED" time="10:40:55" />
            <LogRow level="audit" msg="New API Key Provisioned for Tenant 'NanoFoundry'" time="10:38:22" />
            <LogRow level="warn" msg="Rate limit warning: IP 192.168.1.4 approaching threshold" time="10:35:10" />
            <LogRow level="pass" msg="Vector DB pgvector sync: PERMISSION VERIFIED" time="10:30:12" />
          </div>
          
          <div className="mt-6 p-3 bg-rose-50/50 rounded-xl border border-rose-100 text-[9px] text-rose-800 leading-relaxed">
            <span className="font-bold uppercase block mb-1">Security Note:</span> 
            All tool calls are validated against the tenant's IAM policy before model execution to prevent unauthorized data exfiltration.
          </div>
        </div>

        {/* Latency History */}
        <div className="lg:col-span-3 bg-white p-8 rounded-3xl border border-indigo-50 shadow-sm">
          <h3 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-2">
            <span className="p-1.5 bg-indigo-100 text-indigo-500 rounded-lg text-sm">📉</span> 
            Historical System Latency
          </h3>
          <div className="h-[300px]">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={latencyData}>
                 <defs>
                   <linearGradient id="colorApi" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#818cf8" stopOpacity={0.2}/>
                     <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
                   </linearGradient>
                 </defs>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f8fafc" />
                 <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                 <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                 <Tooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                 <Area type="monotone" dataKey="api" stroke="#818cf8" strokeWidth={3} fillOpacity={1} fill="url(#colorApi)" />
                 <Area type="monotone" dataKey="model" stroke="#c084fc" strokeWidth={3} fill="transparent" strokeDasharray="5 5" />
               </AreaChart>
             </ResponsiveContainer>
          </div>
          <div className="mt-4 flex gap-8 text-[10px] font-black uppercase tracking-widest justify-center">
             <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-indigo-400"></div> API Latency</div>
             <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-purple-400"></div> Model Inference</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MetricCard: React.FC<{title: string, value: string, trend: string, icon: string, color: string}> = ({title, value, trend, icon, color}) => (
  <div className="bg-white p-6 rounded-3xl border border-indigo-50 shadow-sm hover:scale-[1.02] transition-transform cursor-default">
    <div className="flex justify-between items-start mb-4">
      <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-2xl shadow-inner">{icon}</div>
      <span className={`text-[10px] font-black px-2.5 py-1 rounded-lg ${trend.includes('+') ? 'bg-indigo-50 text-indigo-500' : 'bg-emerald-50 text-emerald-500'}`}>
        {trend.toUpperCase()}
      </span>
    </div>
    <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.1em] mb-1">{title}</div>
    <div className={`text-3xl font-black ${color}`}>{value}</div>
  </div>
);

const LogRow: React.FC<{level: 'pass' | 'warn' | 'audit', msg: string, time: string}> = ({level, msg, time}) => (
  <div className="flex gap-4 border-b border-indigo-50/50 pb-3 last:border-0 hover:bg-slate-50/50 transition-colors p-1 rounded-lg">
    <span className="text-slate-300 font-bold whitespace-nowrap">{time}</span>
    <span className={`font-black uppercase tracking-tighter w-14 text-center py-0.5 rounded-lg text-[8px] ${level === 'pass' ? 'bg-emerald-50 text-emerald-500' : level === 'warn' ? 'bg-orange-50 text-orange-400' : 'bg-rose-50 text-rose-400'}`}>
      {level}
    </span>
    <span className="text-slate-600 line-clamp-1 font-medium">{msg}</span>
  </div>
);

export default Monitoring;
