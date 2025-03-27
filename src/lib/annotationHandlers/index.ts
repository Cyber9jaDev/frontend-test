// import { setupHighlight } from './highlight';
// import { setupUnderline } from './underline';
// // import { setupSignature } from './signature';
// import { setupComment } from './comment';
// import { Annotation, Tool } from '../types';
// import { Canvas } from 'fabric/fabric-impl';

// export function setupAnnotationHandlers(
//   canvas: Canvas,
//   activeTool: Tool,
//   color: string,
//   pageIndex: number,
//   addAnnotation: (annotation: Omit<Annotation, 'id' | 'createdAt'>) => void
// ) {
//   // Clear previous handlers
//   canvas.off('mouse:down');
//   canvas.off('mouse:move');
//   canvas.off('mouse:up');
//   canvas.off('object:added');

//   // Set cursor based on active tool
//   canvas.defaultCursor = getCursorForTool(activeTool);
//   canvas.selection = activeTool === 'select';

//   switch (activeTool) {
//     case 'highlight':
//       setupHighlight(canvas, color, pageIndex, addAnnotation);
//       break;
//     case 'underline':
//       setupUnderline(canvas, color, pageIndex, addAnnotation);
//       break;
//     case 'signature':
//       setupSignature(canvas, pageIndex, addAnnotation);
//       break;
//     case 'comment':
//       setupComment(canvas, color, pageIndex, addAnnotation);
//       break;
//   }
// }

// function getCursorForTool(tool: Tool): string {
//   const cursors = {
//     select: 'default',
//     highlight: 'crosshair',
//     underline: 'crosshair',
//     comment: 'text',
//     signature: 'crosshair'
//   };
//   return cursors[tool] || 'default';
// }