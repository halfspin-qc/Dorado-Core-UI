export enum ViewState {
  DASHBOARD = 'DASHBOARD',
  KNOWLEDGE_BASE = 'KNOWLEDGE_BASE',
  AGENTS = 'AGENTS',
  CHAT = 'CHAT',
  SETTINGS = 'SETTINGS'
}

export interface SystemMetrics {
  cpuUsage: number[];
  ramUsage: number;
  temperature: number;
  inferenceSpeed: number; // tokens/sec
  activeThreads: number;
}

export interface AgentConfig {
  id: string;
  name: string;
  model: string;
  quantization: 'q4_0' | 'q5_km' | 'q8_0' | 'fp16';
  role: string;
  status: 'idle' | 'loading' | 'inference';
  contextWindow: number;
  systemPrompt?: string;
  parameters?: {
    temperature: number;
    topP: number;
    topK: number;
  };
}

export interface DocumentFile {
  id: string;
  name: string;
  size: string;
  chunks: number;
  status: 'indexed' | 'processing' | 'error';
  uploadDate: string;
  progress?: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
  metrics?: {
    tokensPerSecond: number;
    processingTime: number;
    usedRam: number;
  };
  sources?: string[];
}