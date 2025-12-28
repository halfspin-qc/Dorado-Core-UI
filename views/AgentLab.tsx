import React, { useState } from 'react';
import { Settings, Cpu, Brain, Layers, Play, X, Save, Sliders, MessageSquare } from 'lucide-react';
import { MOCK_AGENTS } from '../services/mockBackend';
import { AgentConfig } from '../types';

type ModalType = 'PROMPT' | 'PARAMS' | null;

const AgentLab: React.FC = () => {
  const [agents, setAgents] = useState<AgentConfig[]>(MOCK_AGENTS);
  const [activeModal, setActiveModal] = useState<{ type: ModalType; agentId: string | null }>({
    type: null,
    agentId: null
  });
  
  // Temporary state for the modal form
  const [tempConfig, setTempConfig] = useState<Partial<AgentConfig>>({});

  const openModal = (type: ModalType, agent: AgentConfig) => {
    setTempConfig({ ...agent });
    setActiveModal({ type, agentId: agent.id });
  };

  const closeModal = () => {
    setActiveModal({ type: null, agentId: null });
    setTempConfig({});
  };

  const handleSave = () => {
    if (!activeModal.agentId) return;
    
    setAgents(prev => prev.map(a => {
      if (a.id === activeModal.agentId) {
        return { ...a, ...tempConfig } as AgentConfig;
      }
      return a;
    }));
    closeModal();
  };

  const renderModalContent = () => {
    const agent = agents.find(a => a.id === activeModal.agentId);
    if (!agent) return null;

    if (activeModal.type === 'PROMPT') {
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">System Prompt</label>
            <p className="text-xs text-slate-500 mb-2">
              Define the persona and behavioral constraints for the model. This is injected as the system message.
            </p>
            <textarea
              value={tempConfig.systemPrompt || ''}
              onChange={(e) => setTempConfig(prev => ({ ...prev, systemPrompt: e.target.value }))}
              className="w-full h-48 bg-slate-950 border border-slate-700 rounded-lg p-3 text-sm text-slate-200 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 font-mono leading-relaxed resize-none"
              placeholder="You are a helpful assistant..."
            />
          </div>
        </div>
      );
    }

    if (activeModal.type === 'PARAMS') {
      return (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-slate-300">Temperature</label>
                <span className="text-xs font-mono text-emerald-400">{tempConfig.parameters?.temperature}</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="2" 
                step="0.1"
                value={tempConfig.parameters?.temperature || 0.7}
                onChange={(e) => setTempConfig(prev => ({
                  ...prev,
                  parameters: { ...prev.parameters!, temperature: parseFloat(e.target.value) }
                }))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <p className="text-xs text-slate-500 mt-1">Controls randomness. Lower values are more deterministic.</p>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-slate-300">Top P (Nucleus)</label>
                <span className="text-xs font-mono text-emerald-400">{tempConfig.parameters?.topP}</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.05"
                value={tempConfig.parameters?.topP || 0.9}
                onChange={(e) => setTempConfig(prev => ({
                  ...prev,
                  parameters: { ...prev.parameters!, topP: parseFloat(e.target.value) }
                }))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <p className="text-xs text-slate-500 mt-1">Limits the cumulative probability of token selection.</p>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-slate-300">Top K</label>
                <span className="text-xs font-mono text-emerald-400">{tempConfig.parameters?.topK}</span>
              </div>
              <input 
                type="number" 
                value={tempConfig.parameters?.topK || 40}
                onChange={(e) => setTempConfig(prev => ({
                  ...prev,
                  parameters: { ...prev.parameters!, topK: parseInt(e.target.value) }
                }))}
                className="bg-slate-950 border border-slate-700 rounded px-2 py-1 text-sm text-slate-200 w-20 focus:outline-none focus:border-emerald-500"
              />
              <p className="text-xs text-slate-500 mt-1">Limits the pool of next tokens to the top K probability tokens.</p>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="p-8 h-full overflow-y-auto bg-slate-950 relative">
       <header className="mb-8">
        <h2 className="text-3xl font-bold text-slate-100">Agent Swarm</h2>
        <p className="text-slate-400 mt-1">Configure local LLMs and agent roles.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {agents.map((agent) => (
          <div key={agent.id} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-slate-700 transition-colors flex flex-col">
            <div className="p-6 flex-1">
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
                 <button 
                  onClick={() => openModal('PROMPT', agent)}
                  className="flex items-center gap-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded transition-colors border border-slate-700"
                 >
                    <MessageSquare className="w-3 h-3" />
                    Edit Prompt
                 </button>
                 <button 
                  onClick={() => openModal('PARAMS', agent)}
                  className="flex items-center gap-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded transition-colors border border-slate-700"
                 >
                    <Sliders className="w-3 h-3" />
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
        <div className="border border-dashed border-slate-800 rounded-xl flex flex-col items-center justify-center p-8 text-slate-500 hover:border-slate-700 hover:text-slate-400 hover:bg-slate-900/50 transition-all cursor-pointer group min-h-[280px]">
          <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
             <Cpu className="w-6 h-6" />
          </div>
          <p className="font-medium">Deploy New Agent</p>
          <p className="text-xs mt-2 text-center max-w-xs">
            Download GGUF models from HuggingFace to ./models folder
          </p>
        </div>
      </div>

      {/* Edit Modal Overlay */}
      {activeModal.type && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center p-4 border-b border-slate-800 bg-slate-950/50">
              <h3 className="font-semibold text-slate-100 flex items-center gap-2">
                {activeModal.type === 'PROMPT' ? <MessageSquare className="w-4 h-4 text-emerald-400" /> : <Sliders className="w-4 h-4 text-emerald-400" />}
                {activeModal.type === 'PROMPT' ? 'Edit System Prompt' : 'Model Parameters'}
              </h3>
              <button onClick={closeModal} className="text-slate-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6">
              {renderModalContent()}
            </div>

            <div className="p-4 border-t border-slate-800 bg-slate-950/50 flex justify-end gap-3">
              <button 
                onClick={closeModal}
                className="px-4 py-2 rounded-lg text-sm font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-emerald-600 hover:bg-emerald-500 text-white transition-colors shadow-lg shadow-emerald-500/20"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentLab;