import { Position } from '../types';
import { Canvas, Rect, Point } from 'fabric'; 

export function setupHighlight(
  canvas: Canvas,
  color: string,
  pageIndex: number,
  addAnnotation: (pos: Position) => void
) {
  let startPoint: Point | null = null;
  let rect: Rect | null = null;

  canvas.on('mouse:down', (opt) => {
    startPoint = opt.absolutePointer;
    rect = new Rect({
      left: startPoint.x,
      top: startPoint.y,
      width: 0,
      height: 0,
      fill: `${color}80`,
      stroke: 'transparent',
      selectable: false,
      evented: false
    });
    canvas.add(rect);
  });

  canvas.on('mouse:move', (opt) => {
    if (!rect || !startPoint) return;
    
    const pointer = opt.absolutePointer;
    rect.set({
      width: pointer.x - startPoint.x,
      height: pointer.y - startPoint.y
    });
    canvas.renderAll();
  });

  canvas.on('mouse:up', () => {
    if (!rect || !startPoint) return;

    addAnnotation({
      type: "highlight",
      pageIndex,
      color,
      x: rect.left!,
      y: rect.top!,
      width: rect.width!,
      height: rect.height!,
    });

    startPoint = null;
    rect = null;
  });
}