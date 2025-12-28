import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, Clock, AlertCircle, RefreshCw, Database } from 'lucide-react';
import { MOCK_DOCS } from '../services/mockBackend';
import { DocumentFile } from '../types';

const KnowledgeBase: React.FC = () => {
  const [documents, setDocuments] = useState<DocumentFile[]>(MOCK_DOCS);

  return (
    <div className="p-8 h-full overflow-y-auto bg-slate-950">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-100">Knowledge Base</h2>
          <p className="text-slate-400 mt-1">Manage documents and vector embeddings.</p>
        </div>
        <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg font-medium transition-colors">
          <Upload className="w-4 h-4" />
          Ingest Documents
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="col-span-2">
           <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-slate-800 flex justify-between items-center">
              <h3 className="font-semibold text-slate-200">Indexed Files</h3>
              <span className="text-xs bg-slate-800 text-slate-400 px-2 py-1 rounded">
                Total: {documents.length}
              </span>
            </div>
            
            <table className="w-full text-left text-sm text-slate-400">
              <thead className="bg-slate-950/50 text-slate-200 font-medium uppercase text-xs">
                <tr>
                  <th className="px-6 py-3">File Name</th>
                  <th className="px-6 py-3">Size</th>
                  <th className="px-6 py-3">Chunks</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {documents.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4 flex items-center gap-3 text-slate-200">
                      <FileText className="w-4 h-4 text-slate-500" />
                      {doc.name}
                    </td>
                    <td className="px-6 py-4">{doc.size}</td>
                    <td className="px-6 py-4">{doc.chunks}</td>
                    <td className="px-6 py-4">
                      {doc.status === 'indexed' && (
                        <div className="flex items-center gap-1.5 text-emerald-400">
                          <CheckCircle className="w-3.5 h-3.5" /> Indexed
                        </div>
                      )}
                      {doc.status === 'processing' && (
                        <div className="flex items-center gap-1.5 text-blue-400">
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Processing
                        </div>
                      )}
                      {doc.status === 'error' && (
                        <div className="flex items-center gap-1.5 text-red-400">
                          <AlertCircle className="w-3.5 h-3.5" /> Failed
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-slate-500 hover:text-white transition-colors">Details</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <h3 className="font-semibold text-slate-200 mb-4 flex items-center gap-2">
              <Database className="w-4 h-4 text-emerald-400" />
              Vector Index Stats
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">Storage Backend</span>
                <span className="text-slate-200 font-mono">ChromaDB (Persistent)</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">Embedding Model</span>
                <span className="text-slate-200 font-mono">all-MiniLM-L6-v2</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">Vector Dimensions</span>
                <span className="text-slate-200 font-mono">384</span>
              </div>
              <div className="w-full h-px bg-slate-800 my-2" />
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">Total Chunks</span>
                <span className="text-emerald-400 font-bold">1,403</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <h3 className="font-semibold text-slate-200 mb-4">Ingestion Config</h3>
            <div className="space-y-3">
               <div>
                <label className="text-xs text-slate-500 font-medium uppercase">Chunk Size</label>
                <div className="flex items-center justify-between bg-slate-950 p-2 rounded mt-1 border border-slate-800">
                  <span className="text-sm text-slate-300">512 tokens</span>
                </div>
               </div>
               <div>
                <label className="text-xs text-slate-500 font-medium uppercase">Chunk Overlap</label>
                <div className="flex items-center justify-between bg-slate-950 p-2 rounded mt-1 border border-slate-800">
                  <span className="text-sm text-slate-300">50 tokens</span>
                </div>
               </div>
               <div className="pt-2 text-xs text-slate-500">
                Optimized for RAG context retrieval on limited RAM.
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBase;