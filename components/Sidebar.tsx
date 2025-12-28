import React from 'react';
import { 
  LayoutDashboard, 
  Database, 
  Bot, 
  MessageSquareCode, 
  Settings, 
  Cpu,
  Activity
} from 'lucide-react';
import { ViewState } from '../types';

interface SidebarProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView }) => {
  const menuItems = [
    { id: ViewState.DASHBOARD, label: 'Overview', icon: LayoutDashboard },
    { id: ViewState.AGENTS, label: 'Agent Swarm', icon: Bot },
    { id: ViewState.KNOWLEDGE_BASE, label: 'Knowledge Base', icon: Database },
    { id: ViewState.CHAT, label: 'Core Playground', icon: MessageSquareCode },
    { id: ViewState.SETTINGS, label: 'Configuration', icon: Settings },
  ];

  return (
    <div className="w-64 h-screen bg-slate-900 border-r border-slate-800 flex flex-col flex-shrink-0 font-space-grotesk">
      <div className="p-6 flex items-center gap-3 border-b border-slate-800">
        <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/20">
          <Cpu className="text-slate-900 w-5 h-5" />
        </div>
        <div>
          <h1 className="font-bold text-slate-100 tracking-tight">Dorado Core</h1>
          <p className="text-xs text-slate-500">v0.9.4 (CPU-Only)</p>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                isActive 
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
              <span className="font-medium text-sm">{item.label}</span>
              {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
          <div className="flex items-center gap-2 mb-2 text-xs text-slate-400 font-medium uppercase tracking-wider">
            <Activity className="w-3 h-3" />
            <span>Local Backend</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="text-sm text-slate-200">Connected (localhost:8000)</span>
          </div>
          <div className="mt-2 text-xs text-slate-500">
            B4ms (4 vCPU / 16GB)
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;