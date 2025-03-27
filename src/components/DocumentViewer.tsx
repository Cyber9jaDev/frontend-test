// import { useEffect, useRef } from 'react';
// import { BaseAnnotation } from '@/lib/types';
// import { useDocumentContext } from '@/contexts/DocumentContext';
// import { Canvas } from 'fabric';

// export function DocumentViewer() {
//   const { state, dispatch } = useDocumentContext();
//   const { pdfUrl, activeTool, color } = state;
//   const canvasRef = useRef<HTMLCanvasElement>(null);


//   useEffect(() => {
//     if (!canvasRef.current || !pdfUrl) return;

//     const canvas = new Canvas(canvasRef.current, {
//       selection: false,
//       interactive: true,
//     });

//     const addAnnotation = (annotation: BaseAnnotation) => {
//       dispatch({ type: 'ADD_ANNOTATION', payload: annotation });
//     };

//     setupAnnotationHandlers(canvas, activeTool, color, addAnnotation);

//     return () => canvas.dispose();

//   }, [pdfUrl, activeTool, color, dispatch]);

//   return (
//     <div className="relative border rounded-lg overflow-hidden">
//       {state?.pdfUrl && <iframe
//         src={state.pdfUrl}
//         className="w-full h-[70vh]"
//         title="PDF Document"
//       />}
//       <canvas
//         ref={canvasRef}
//         className="absolute top-0 left-0 w-full h-full pointer-events-none"
//       />
//     </div>
//   );
// }