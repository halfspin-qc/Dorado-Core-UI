import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Zap, Clock, MoreVertical, StopCircle } from 'lucide-react';
import { ChatMessage } from '../types';

interface ChatInterfaceProps {
  isProcessing: boolean;
  setIsProcessing: (val: boolean) => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ isProcessing, setIsProcessing }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '0',
      role: 'system',
      content: 'System initialized. Loaded "Analyst (Mistral-7B)" agent with access to local knowledge base.',
      timestamp: Date.now()
    }
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim() || isProcessing) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsProcessing(true);

    // Simulate RAG + Local Inference Latency
    setTimeout(() => {
      const responseMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "Based on the internal documents, the B4ms instance provides 4 vCPUs and 16GB of RAM. This configuration suggests we should use quantized models (q4_0 or q5_km) to maintain acceptable inference speeds. The 'Project_Titan_Logs.txt' file indicates high CPU contention during the last batch ingest.",
        timestamp: Date.now(),
        metrics: {
          tokensPerSecond: 8.4,
          processingTime: 2.1,
          usedRam: 640
        },
        sources: ['Azure_B4ms_Specs.pdf', 'Project_Titan_Logs.txt']
      };
      setMessages(prev => [...prev, responseMsg]);
      setIsProcessing(false);
    }, 2500);
  };

  return (
    <div className="h-full flex flex-col bg-slate-950">
      {/* Header */}
      <header className="px-6 py-4 border-b border-slate-800 bg-slate-900/50 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          <div>
            <h2 className="font-semibold text-slate-100">Dorado Core Playground</h2>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="bg-slate-800 px-1.5 py-0.5 rounded text-emerald-400 border border-slate-700">Mistral-7B-Quantized</span>
              <span>temp: 0.7</span>
            </div>
          </div>
        </div>
        <button className="text-slate-400 hover:text-white">
          <MoreVertical className="w-5 h-5" />
        </button>
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6" ref={scrollRef}>
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role !== 'user' && (
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0 border border-emerald-500/20">
                <Bot className="w-5 h-5 text-emerald-400" />
              </div>
            )}
            
            <div className={`max-w-2xl ${msg.role === 'user' ? 'order-1' : 'order-2'}`}>
              <div className={`rounded-xl p-4 text-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/20' 
                  : msg.role === 'system'
                  ? 'bg-slate-900/50 text-slate-500 border border-slate-800 text-xs font-mono text-center'
                  : 'bg-slate-800 border border-slate-700 text-slate-200'
              }`}>
                {msg.content}
              </div>
              
              {/* Message Metadata / Sources */}
              {msg.role === 'assistant' && msg.metrics && (
                <div className="mt-2 flex items-center gap-4 text-xs text-slate-500 pl-1">
                  <span className="flex items-center gap-1">
                    <Zap className="w-3 h-3" /> {msg.metrics.tokensPerSecond} t/s
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {msg.metrics.processingTime}s
                  </span>
                  {msg.sources && (
                    <div className="flex gap-2">
                      <span className="text-slate-600">|</span>
                      <span>Sources:</span>
                      {msg.sources.map(src => (
                        <span key={src} className="underline decoration-slate-600 hover:text-emerald-400 cursor-pointer">{src}</span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {msg.role === 'user' && (
              <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center flex-shrink-0 border border-slate-700">
                <User className="w-5 h-5 text-slate-400" />
              </div>
            )}
          </div>
        ))}
        
        {isProcessing && (
          <div className="flex gap-4">
             <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0 border border-emerald-500/20">
                <Bot className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 flex items-center gap-2">
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-slate-800 bg-slate-900">
        <div className="max-w-4xl mx-auto relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask questions about your documents..."
            className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl pl-4 pr-12 py-3 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all placeholder:text-slate-600"
            disabled={isProcessing}
          />
          <button 
            onClick={isProcessing ? () => setIsProcessing(false) : handleSend}
            className={`absolute right-2 top-2 p-1.5 rounded-lg transition-colors ${
              input.trim() 
                ? 'bg-emerald-500 text-white hover:bg-emerald-400' 
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            {isProcessing ? <StopCircle className="w-5 h-5 text-red-400" /> : <Send className="w-5 h-5" />}
          </button>
        </div>
        <div className="max-w-4xl mx-auto mt-2 text-center">
          <p className="text-[10px] text-slate-600 uppercase tracking-widest">
            Local CPU Inference • No Data Leaves This Machine
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;