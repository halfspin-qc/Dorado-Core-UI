import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './views/Dashboard';
import KnowledgeBase from './views/KnowledgeBase';
import ChatInterface from './views/ChatInterface';
import AgentLab from './views/AgentLab';
import { ViewState, SystemMetrics } from './types';
import { generateMetrics } from './services/mockBackend';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.DASHBOARD);
  const [metrics, setMetrics] = useState<SystemMetrics>({
    cpuUsage: new Array(20).fill(10),
    ramUsage: 4.2,
    temperature: 45,
    inferenceSpeed: 0,
    activeThreads: 0
  });
  const [isProcessing, setIsProcessing] = useState(false);

  // Simulate System Heartbeat (Mocking Python Backend Websocket)
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => {
        const next = generateMetrics(prev.cpuUsage);
        // Spike CPU if processing
        if (isProcessing) {
          const spike = Math.min(100, (next.cpuUsage[next.cpuUsage.length - 1] || 0) + 40);
          next.cpuUsage[next.cpuUsage.length - 1] = spike;
          next.inferenceSpeed = 8 + Math.random() * 4;
          next.ramUsage = Math.min(15.5, prev.ramUsage + 0.1); // Memory creeping up
        } else {
          next.inferenceSpeed = 0;
          // Memory cooling down slowly
          next.ramUsage = Math.max(4.2, prev.ramUsage - 0.05); 
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isProcessing]);

  const renderContent = () => {
    switch (currentView) {
      case ViewState.DASHBOARD:
        return <Dashboard metrics={metrics} />;
      case ViewState.KNOWLEDGE_BASE:
        return <KnowledgeBase />;
      case ViewState.CHAT:
        return <ChatInterface isProcessing={isProcessing} setIsProcessing={setIsProcessing} />;
      case ViewState.AGENTS:
        return <AgentLab />;
      case ViewState.SETTINGS:
        return (
          <div className="p-8 text-slate-400 flex items-center justify-center h-full font-space-grotesk">
            <div className="text-center">
              <h2 className="text-xl font-bold text-slate-200">Settings</h2>
              <p>Configuration for Python backend (Host, Port, API Keys) goes here.</p>
            </div>
          </div>
        );
      default:
        return <Dashboard metrics={metrics} />;
    }
  };

  return (
    <div className="flex h-screen w-full bg-slate-950 text-slate-200 overflow-hidden font-space-grotesk">
      <Sidebar currentView={currentView} setView={setCurrentView} />
      <main className="flex-1 h-full relative">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;