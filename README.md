# Dorado-Core-UI

Dorado-Core-UI is an agentic RAG (Retrieval-Augmented Generation) platform designed to run fully on local hardware. It utilizes CPU-only inference pipelines, making it suitable for resource-constrained environments or privacy-focused deployments where data sovereignty is paramount.

## Key Features

- **Local Inference Engine**: Optimized for running quantized open-source models (e.g., Mistral, Phi-3) on CPUs (AVX2 supported).
- **Agentic Workflow**: Orchestrate multiple LLM agents for planning, analysis, and data synthesis.
- **RAG Knowledge Base**: Local document ingestion and vector embedding management using persistent stores like ChromaDB.
- **Resource Monitoring**: Real-time dashboard for tracking CPU usage, RAM consumption, and inference tokens/second.
- **Python Backend Compatible**: Designed to interface with local Python APIs (FastAPI/Flask) wrapping `llama.cpp` or similar libraries.

## Technology Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Visualization**: Recharts for real-time metrics
- **Icons**: Lucide React
- **Architecture**: Component-based UI interfacing with a local REST/WebSocket API.

## Setup

This UI expects a local Python backend running on `localhost:8000`. Ensure your local inference server is active before connecting.
