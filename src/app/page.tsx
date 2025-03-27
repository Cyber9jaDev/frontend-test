'use client';

import React, { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Annotation, PDFAnnotatorState } from '@/lib/types/annotation';

export default function PDFAnnotator() {
  const [state, setState] = useState<PDFAnnotatorState>({ file: null, annotations: [], currentTool: null });

  // File upload handler
  const handleFileUpload = (file: File) => {
   setState(prev => ({ ...prev, file, currentTool: 'highlight' }));  // Default to highlight tool
  };

  // Annotation creation handler
  const addAnnotation = useCallback((newAnnotation: Omit<Annotation, 'id' | 'createdAt'>) => {
    const annotation: Annotation = { id: uuidv4(), createdAt: new Date(), ...newAnnotation };
    setState(prev => ({ 
      ...prev, 
      annotations: [...prev.annotations, annotation] 
    }));  
  }, []);

  // Tool selection handler
  const selectTool = (tool: PDFAnnotatorState['currentTool']) => {
    setState(prev => ({ ...prev, currentTool: tool }));
  };

  // PDF export handler
  const exportAnnotatedPDF = async () => {
    if (!state.file) return;

    try {
      // Placeholder for PDF export logic
      console.log('Exporting PDF with annotations', state.annotations);
      // Implement actual PDF export using pdf-lib or similar library
    } catch (error) {
      console.error('PDF Export Failed', error);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Application Header */}
      <header className="bg-gray-500 p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">PDF Annotator</h1>
        {state.file && (
          <div className="flex space-x-2">
            <button  onClick={() => selectTool('highlight')} className={`p-2 ${state.currentTool === 'highlight' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}> Highlight</button>
            <button  onClick={() => selectTool('underline')} className={`p-2 ${state.currentTool === 'underline' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}> Underline</button>
            <button  onClick={() => selectTool('comment')} className={`p-2 ${state.currentTool === 'comment' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`} > Comment </button>
            <button  onClick={exportAnnotatedPDF} className="p-2 bg-green-500 text-white"> Export PDF</button>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-grow flex">

        {!state.file ? (
          <div className="m-auto text-center">
            <input  type="file" accept=".pdf" className="hidden" id="pdf-upload"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileUpload(file);
              }}
            />
            <label  htmlFor="pdf-upload"  className="cursor-pointer bg-blue-500 text-white p-4 rounded"> Upload PDF   </label>
          </div>
          
        ) : (
          <div className="flex-grow relative">
            {/* PDF Viewer Placeholder */}
            <div className="absolute inset-0">
              <h2>PDF Viewer Placeholder</h2>
              <p>Current File: {state.file.name}</p>
              <p>Annotations: {state.annotations.length}</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}