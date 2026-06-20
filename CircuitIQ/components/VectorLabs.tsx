
import React, { useState, useEffect } from 'react';
import { VectorDB, ParallelTask } from '../types';

const DB_DETAILS = [
  { name: 'FAISS', type: 'Local (On-Prem)', index: 'HNSW', dims: 1536, count: '1.2M', status: 'active', latency: 8, speedPercent: 95 },
  { name: 'ChromaDB', type: 'File Store', index: 'Flat', dims: 768, count: '450k', status: 'active', latency: 22, speedPercent: 82 },
  { name: 'pgvector', type: 'SQL (Relational)', index: 'IVFFlat', dims: 1536, count: '2.8M', status: 'active', latency: 38, speedPercent: 70 },
  { name: 'Qdrant', type: 'Cloud Distributed', index: 'HNSW', dims: 1536, count: '12M', status: 'syncing', latency: 95, speedPercent: 45 }
];

const VectorLabs: React.FC = () => {
  const [computeLoad, setComputeLoad] = useState([45, 62, 33, 89, 12, 44, 76, 51]);
  const [mcpTokens, setMcpTokens] = useState(4205);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setComputeLoad(prev => prev.map(v => Math.max(10, Math.min(100, v + (Math.random() - 0.5) * 20))));
      setMcpTokens(prev => prev + Math.floor(Math.random() * 10));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">AI Engineering Lab</h1>
          <p className="text-slate-400 text-sm font-medium">Distributed Vector Architecture & Parallel Computing.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {['FAISS', 'Chroma', 'Postgres', 'Qdrant'].map((db, i) => (
              <div key={i} className="w-8 h-8 rounded-full bg-white border-2 border-indigo-100 flex items-center justify-center text-[8px] font-black text-indigo-400 shadow-sm">
                {db[0]}
              </div>
            ))}
          </div>
          <button 
            onClick={() => setIsSyncing(true)}
            className="px-4 py-2 bg-indigo-400 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-500 shadow-lg shadow-indigo-100 transition-all"
          >
            Re-Index Cluster
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 1. ALL 4 VECTOR DBs Section */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-indigo-50 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
              <span className="p-1.5 bg-indigo-100 text-indigo-500 rounded-lg text-sm">🗄️</span> 
              Multi-Vector Database Mesh
            </h3>
            <span className="text-[10px] font-black text-indigo-300 uppercase tracking-widest">Ensemble Retrieval Active</span>
          </div>

          {/* Hybrid RAG Banner */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-2xl border border-indigo-100 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-2xl shadow-sm">
                🔀
              </div>
              <div>
                <h4 className="text-sm font-black text-indigo-900">Hybrid RAG Active</h4>
                <p className="text-xs text-indigo-700/70">Querying all 4 vector stores in parallel with ensemble reranking</p>
              </div>
              <div className="ml-auto flex gap-1">
                <span className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></span>
                <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-150"></span>
                <span className="w-2 h-2 bg-teal-400 rounded-full animate-pulse delay-300"></span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {DB_DETAILS.map(db => (
              <div key={db.name} className="p-4 bg-slate-50/50 rounded-2xl border border-indigo-50 hover:border-indigo-200 transition-colors group">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className="text-sm font-black text-slate-800">{db.name}</span>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">{db.type}</p>
                  </div>
                  <div className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase ${db.status === 'active' ? 'bg-emerald-100 text-emerald-600' : 'bg-orange-100 text-orange-600 animate-pulse'}`}>
                    {db.status}
                  </div>
                </div>
                
                {/* Visual Speed Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-[9px] font-black text-slate-400 uppercase mb-1">
                    <span>Retrieval Speed</span>
                    <span className="text-indigo-500">{db.speedPercent}%</span>
                  </div>
                  <div className="w-full h-1 bg-white rounded-full overflow-hidden border border-indigo-50">
                    <div className="h-full bg-indigo-400 rounded-full" style={{ width: `${db.speedPercent}%` }}></div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 mt-2">
                  <div className="text-center">
                    <div className="text-[9px] font-black text-slate-400 uppercase">Dims</div>
                    <div className="text-xs font-bold text-slate-700">{db.dims}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[9px] font-black text-slate-400 uppercase">Index</div>
                    <div className="text-xs font-bold text-slate-700">{db.index}</div>
                  </div>
                  <div className="text-center border-l border-indigo-100">
                    <div className="text-[9px] font-black text-indigo-400 uppercase">Latency</div>
                    <div className="text-xs font-bold text-indigo-500">{db.latency}ms</div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-indigo-50 flex justify-between items-center">
                  <span className="text-[10px] font-bold text-slate-400">{db.count} Vectors Embedded</span>
                  <button className="text-[10px] font-black text-indigo-400 hover:text-indigo-600 uppercase tracking-tighter">Sync Now →</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. MCP Context Window Metrics */}
        <div className="bg-white p-6 rounded-3xl border border-indigo-50 shadow-sm flex flex-col">
          <div className="mb-6">
            <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
              <span className="p-1.5 bg-purple-100 text-purple-500 rounded-lg text-sm">🧠</span> 
              MCP Context Window
            </h3>
            <p className="text-xs text-slate-400 font-medium mt-1">Model Context Protocol Management.</p>
          </div>

          <div className="flex-1 space-y-6">
            <div className="text-center p-6 bg-purple-50/50 rounded-2xl border border-purple-100">
              <div className="text-[10px] font-black text-purple-400 uppercase tracking-widest mb-1">Active Memory Load</div>
              <div className="text-4xl font-black text-purple-600">{mcpTokens.toLocaleString()}</div>
              <div className="text-[10px] font-bold text-purple-300 mt-1">/ 128k Tokens (LTM)</div>
            </div>

            <div className="space-y-4">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">In-Context Sources</h4>
              {[
                { name: 'SAP Material Master', tokens: 1200, type: 'Relational' },
                { name: 'Supplier Risk Reports', tokens: 2450, type: 'Vector' },
                { name: 'Live Market News', tokens: 555, type: 'Real-time' },
              ].map(source => (
                <div key={source.name} className="flex justify-between items-center p-2 hover:bg-slate-50 rounded-lg transition-colors">
                  <div>
                    <div className="text-xs font-bold text-slate-700">{source.name}</div>
                    <div className="text-[8px] font-bold text-purple-400 uppercase">{source.type}</div>
                  </div>
                  <div className="text-xs font-mono font-bold text-slate-400">{source.tokens} tk</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-slate-50 flex justify-center">
             <div className="flex gap-1">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className={`w-1.5 h-1.5 rounded-full ${i < 8 ? 'bg-purple-400' : 'bg-slate-100'}`}></div>
                ))}
             </div>
          </div>
        </div>

        {/* 3. Parallel Computing (CPU/GPU Simulation) */}
        <div className="lg:col-span-3 bg-white p-8 rounded-3xl border border-indigo-50 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                <span className="p-1.5 bg-emerald-100 text-emerald-500 rounded-lg text-sm">⚡</span> 
                Parallel Computing Grid
              </h3>
              <p className="text-xs text-slate-400 font-medium">Multi-core distributed task execution.</p>
            </div>
            <div className="flex gap-4">
               <div className="text-right">
                  <div className="text-[10px] font-black text-slate-400 uppercase">GPU Utilization</div>
                  <div className="text-sm font-black text-emerald-500">84.2%</div>
               </div>
               <div className="text-right">
                  <div className="text-[10px] font-black text-slate-400 uppercase">Throughput</div>
                  <div className="text-sm font-black text-indigo-500">2.4k req/s</div>
               </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {computeLoad.map((load, i) => (
              <div key={i} className="space-y-3">
                <div className="h-32 bg-slate-50 rounded-xl relative overflow-hidden border border-indigo-50">
                  <div 
                    className={`absolute bottom-0 left-0 right-0 transition-all duration-1000 ${load > 80 ? 'bg-rose-300' : load > 50 ? 'bg-indigo-300' : 'bg-emerald-300'}`}
                    style={{ height: `${load}%` }}
                  >
                    <div className="absolute top-0 left-0 right-0 h-1 bg-white/20"></div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">Core {i+1}</div>
                  <div className="text-[10px] font-bold text-slate-700">{Math.round(load)}%</div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100">
                <div className="text-xs font-black text-indigo-500 uppercase mb-2">Scheduling Strategy</div>
                <p className="text-[10px] text-indigo-900/60 leading-relaxed font-medium">Round-robin distribution with dynamic spillover to AWS L3 overflow clusters during peak lithography simulation cycles.</p>
             </div>
             <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100">
                <div className="text-xs font-black text-emerald-500 uppercase mb-2">Isolation Engine</div>
                <p className="text-[10px] text-emerald-900/60 leading-relaxed font-medium">Zero-copy shared memory protocol ensures sub-millisecond latency for parallel forecast models across isolated containers.</p>
             </div>
             <div className="p-4 bg-rose-50/50 rounded-2xl border border-rose-100">
                <div className="text-xs font-black text-rose-500 uppercase mb-2">Fault Tolerance</div>
                <p className="text-[10px] text-rose-900/60 leading-relaxed font-medium">Automated checkpointing triggers every 500ms. If a worker node fails, context is hot-swapped to standby standby nodes.</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VectorLabs;
