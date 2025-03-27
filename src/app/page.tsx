"use client";

import { AnnotationToolbar } from '@/components/AnnotationToolbar';
import DocumentUpload from '@/components/DocumentUpload';
// import { DocumentViewer } from '@/components/DocumentViewer';
import { useDocumentContext } from '@/contexts/DocumentContext';

export default function DocumentSigner() {
  const { state, dispatch } = useDocumentContext();

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-center"> Document Signer & Annotation Tool </h1>
      </header>

      {!state.pdfUrl ? ( <DocumentUpload />) : (
        <>
          <AnnotationToolbar />
          {/* <DocumentViewer /> */}
          <button 
            onClick={() => dispatch({ type: "CLEAR_DOCUMENT" })}
            className="mt-4 text-sm text-red-500 hover:text-red-700"
          > Load Different Document
          </button>
        </>
      )}
    </div>
  );
}
