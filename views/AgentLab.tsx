import React from 'react';
import { Settings, Cpu, Brain, Layers, Play } from 'lucide-react';
import { MOCK_AGENTS } from '../services/mockBackend';

const AgentLab: React.FC = () => {
  return (
    <div className="p-8 h-full overflow-y-auto bg-slate-950">
       <header className="mb-8">
        <h2 className="text-3xl font-bold text-slate-100">Agent Swarm</h2>
        <p className="text-slate-400 mt-1">Configure local LLMs and agent roles.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MOCK_AGENTS.map((agent) => (
          <div key={agent.id} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-slate-700 transition-colors">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                    <Brain className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-100">{agent.name}</h3>
                    <p className="text-xs text-slate-500 font-mono">{agent.model}</p>
                  </div>
                </div>
                <span className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-400 text-xs border border-emerald-500/20 font-medium">
                  Active
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs text-slate-500 uppercase font-semibold">Role</label>
                  <p className="text-sm text-slate-300">{agent.role}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                    <div className="flex items-center gap-2 mb-1">
                      <Layers className="w-3 h-3 text-slate-500" />
                      <span className="text-xs text-slate-400">Quantization</span>
                    </div>
                    <span className="text-sm font-mono text-emerald-400">{agent.quantization}</span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                    <div className="flex items-center gap-2 mb-1">
                      <Settings className="w-3 h-3 text-slate-500" />
                      <span className="text-xs text-slate-400">Context</span>
                    </div>
                    <span className="text-sm font-mono text-slate-200">{agent.contextWindow}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-950/50 border-t border-slate-800 p-3 flex justify-between items-center">
               <div className="flex gap-2">
                 <button className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded transition-colors border border-slate-700">
                    Edit Prompt
                 </button>
                 <button className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded transition-colors border border-slate-700">
                    Parameters
                 </button>
               </div>
               <button className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors">
                  <Play className="w-4 h-4" />
               </button>
            </div>
          </div>
        ))}

        {/* Add New Agent Card */}
        <div className="border border-dashed border-slate-800 rounded-xl flex flex-col items-center justify-center p-8 text-slate-500 hover:border-slate-700 hover:text-slate-400 hover:bg-slate-900/50 transition-all cursor-pointer group">
          <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
             <Cpu className="w-6 h-6" />
          </div>
          <p className="font-medium">Deploy New Agent</p>
          <p className="text-xs mt-2 text-center max-w-xs">
            Download GGUF models from HuggingFace to ./models folder
          </p>
        </div>
      </div>
    </div>
  );
};

export default AgentLab;