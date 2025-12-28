import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Cpu, HardDrive, Zap, Server, AlertTriangle } from 'lucide-react';
import { SystemMetrics } from '../types';

interface DashboardProps {
  metrics: SystemMetrics;
}

const Dashboard: React.FC<DashboardProps> = ({ metrics }) => {
  const chartData = metrics.cpuUsage.map((val, idx) => ({ time: idx, usage: val }));
  const ramPercent = (metrics.ramUsage / 16) * 100; // Assuming 16GB limit

  return (
    <div className="p-8 h-full overflow-y-auto bg-slate-950 font-space-grotesk">
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-slate-100 tracking-tight">System Overview</h2>
        <p className="text-slate-400 mt-1">Real-time resource monitoring for Local RAG pipeline.</p>
      </header>

      {/* Warning for Memory */}
      {ramPercent > 85 && (
        <div className="mb-6 bg-amber-500/10 border border-amber-500/20 text-amber-200 p-4 rounded-lg flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-500" />
          <span>High Memory Usage Detected. Quantization (q4_0) is recommended for current models on this hardware.</span>
        </div>
      )}

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-slate-400 text-sm font-medium">CPU Load</p>
              <h3 className="text-2xl font-bold text-slate-100 mt-1 tabular-nums">
                {metrics.cpuUsage[metrics.cpuUsage.length - 1]?.toFixed(1)}%
              </h3>
            </div>
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Cpu className="w-5 h-5 text-blue-400" />
            </div>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-blue-500 h-full transition-all duration-500" 
              style={{ width: `${metrics.cpuUsage[metrics.cpuUsage.length - 1]}%` }}
            />
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-slate-400 text-sm font-medium">RAM Usage</p>
              <h3 className="text-2xl font-bold text-slate-100 mt-1 tabular-nums">
                {metrics.ramUsage.toFixed(1)} <span className="text-base font-normal text-slate-500">/ 16 GB</span>
              </h3>
            </div>
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <HardDrive className="w-5 h-5 text-purple-400" />
            </div>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 ${ramPercent > 85 ? 'bg-amber-500' : 'bg-purple-500'}`}
              style={{ width: `${ramPercent}%` }}
            />
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-slate-400 text-sm font-medium">Inference Speed</p>
              <h3 className="text-2xl font-bold text-slate-100 mt-1 tabular-nums">
                {metrics.inferenceSpeed > 0 ? metrics.inferenceSpeed.toFixed(1) : '--'} <span className="text-base font-normal text-slate-500">t/s</span>
              </h3>
            </div>
            <div className="p-2 bg-emerald-500/10 rounded-lg">
              <Zap className="w-5 h-5 text-emerald-400" />
            </div>
          </div>
          <p className="text-xs text-emerald-400 mt-1">Running on CPU (AVX2)</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-slate-400 text-sm font-medium">Vector Store</p>
              <h3 className="text-2xl font-bold text-slate-100 mt-1 tabular-nums">
                14,205 <span className="text-base font-normal text-slate-500">chunks</span>
              </h3>
            </div>
            <div className="p-2 bg-orange-500/10 rounded-lg">
              <Server className="w-5 h-5 text-orange-400" />
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-1">ChromaDB (Local Persistence)</p>
        </div>
      </div>

      {/* Main Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-slate-100 mb-6">Real-time CPU Load (4 Cores)</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="time" hide />
                <YAxis domain={[0, 100]} stroke="#64748b" tickFormatter={(v) => `${v}%`} className="text-xs" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#e2e8f0', borderRadius: '8px', fontFamily: 'Space Grotesk' }}
                  itemStyle={{ color: '#60a5fa' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="usage" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorCpu)" 
                  isAnimationActive={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-slate-100 mb-4">Active Nodes</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-slate-950/50 rounded-lg border border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <div>
                  <div className="text-sm font-medium text-slate-200">Ingestion Pipeline</div>
                  <div className="text-xs text-slate-500">Monitoring ./data</div>
                </div>
              </div>
              <span className="text-xs font-mono text-emerald-400">IDLE</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-950/50 rounded-lg border border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <div>
                  <div className="text-sm font-medium text-slate-200">Mistral-7B</div>
                  <div className="text-xs text-slate-500">Loaded in RAM (6.4GB)</div>
                </div>
              </div>
              <span className="text-xs font-mono text-emerald-400">READY</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-950/50 rounded-lg border border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-slate-600" />
                <div>
                  <div className="text-sm font-medium text-slate-400">Embedding Worker</div>
                  <div className="text-xs text-slate-600">all-MiniLM-L6-v2</div>
                </div>
              </div>
              <span className="text-xs font-mono text-slate-500">SLEEP</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;