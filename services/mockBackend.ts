import { AgentConfig, DocumentFile, SystemMetrics } from '../types';

// Simulates a connection to a local Python backend (FastAPI/Flask)
// This mocks the data that would come from `psutil` and the LLM inference engine.

export const MOCK_AGENTS: AgentConfig[] = [
  {
    id: '1',
    name: 'Orchestrator (Phi-3)',
    model: 'phi-3-mini-4k-instruct',
    quantization: 'q4_0',
    role: 'Router & Planner',
    status: 'idle',
    contextWindow: 4096,
    systemPrompt: "You are the orchestration node for a local RAG system. Analyze the user's request, determine which retrieval tools are necessary, and delegate tasks to the Analyst agent. Keep responses concise and structured.",
    parameters: {
      temperature: 0.1,
      topP: 0.9,
      topK: 40
    }
  },
  {
    id: '2',
    name: 'Analyst (Mistral-7B)',
    model: 'mistral-7b-instruct-v0.2',
    quantization: 'q4_0', // Optimized for 16GB RAM
    role: 'Data Synthesis',
    status: 'idle',
    contextWindow: 8192,
    systemPrompt: "You are an expert data analyst. You will be provided with context chunks retrieved from a local vector store. Synthesize this information to answer the user's question accurately. Do not hallucinate information not present in the context.",
    parameters: {
      temperature: 0.7,
      topP: 0.95,
      topK: 60
    }
  }
];

export const MOCK_DOCS: DocumentFile[] = [
  { id: '1', name: 'Azure_B4ms_Specs.pdf', size: '1.2 MB', chunks: 142, status: 'indexed', uploadDate: '2023-10-24', progress: 100 },
  { id: '2', name: 'Q3_Financial_Report.docx', size: '450 KB', chunks: 56, status: 'indexed', uploadDate: '2023-10-25', progress: 100 },
  { id: '3', name: 'Project_Titan_Logs.txt', size: '8.4 MB', chunks: 1205, status: 'processing', uploadDate: '2023-10-26', progress: 45 },
];

export const generateMetrics = (prevCpu: number[]): SystemMetrics => {
  const newLoad = Math.max(5, Math.min(100, (prevCpu[prevCpu.length - 1] || 10) + (Math.random() * 10 - 5)));
  const newCpu = [...prevCpu.slice(1), newLoad];
  
  return {
    cpuUsage: newCpu,
    ramUsage: 11.2 + (Math.random() * 0.5), // Simulating usage around 11-12GB out of 16GB
    temperature: 45 + (Math.random() * 5),
    inferenceSpeed: 0,
    activeThreads: 4
  };
};