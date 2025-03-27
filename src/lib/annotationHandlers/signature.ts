// import fabric from "fabric/fabric-impl";
// import { Position } from "../types";

// export function setupSignature(
//   canvas: fabric.Canvas,
//   pageIndex: number,
//   addAnnotation: (pos: Position) => void
// ) {
//   let isDrawing = false;
//   let path: fabric.Path | null = null;

//   canvas.on('mouse:down', (opt) => {
//     if (!opt.absolutePointer) return;
    
//     isDrawing = true;
//     const pointer = opt.absolutePointer;
    
//     path = new fabric.Path(`M ${pointer.x} ${pointer.y}`, {
//       stroke: '#000000',
//       strokeWidth: 2,
//       fill: 'transparent',
//       selectable: false,
//       evented: false
//     });

//     if (path.path) {
//       canvas.add(path);
//     }
//   });
//   canvas.on('mouse:move', (opt) => {
//     if (!isDrawing || !path || !path.path || !opt.absolutePointer) return;
    
//     const pointer = opt.absolutePointer;
//     const newPoint = new fabric.Point(pointer.x, pointer.y);
    
//     // Safely add to path
//     path.path.push(['L', newPoint.x, newPoint.y]);
//     canvas.requestRenderAll();
//   });

//   canvas.on('mouse:up', () => {
//     if (!path) return;
    
//     isDrawing = false;
//     const bounds = path.getBoundingRect();
    
//     if (bounds && bounds.width > 5 && bounds.height > 5) { // Minimum size threshold
//       addAnnotation({
//         type: 'signature',
//         pageIndex,
//         x: bounds.left,
//         y: bounds.top,
//         width: bounds.width,
//         height: bounds.height,
//         imageData: canvas.toDataURL({
//           format: 'png',
//           left: bounds.left,
//           top: bounds.top,
//           width: bounds.width,
//           height: bounds.height
//         })
//       });
//     } else {
//       canvas.remove(path); // Remove if signature is too small
//     }
    
//     path = null;
//   });

//   // Cleanup when changing tools
//   return () => {
//     canvas.off('mouse:down');
//     canvas.off('mouse:move');
//     canvas.off('mouse:up');
//   };
// }