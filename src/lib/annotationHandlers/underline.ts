import { Canvas, Line, Point, Rect } from 'fabric';
import { Position } from '../types';

export function setupUnderline(
  canvas: Canvas,
  color: string,
  pageIndex: number,
  addAnnotation: (pos: Position) => void
) {
  let line: Line | null = null;
  let startPoint: Point | null = null;
  let rect: Rect | null = null;

  canvas.on('mouse:down', (opt) => {
    startPoint = opt.absolutePointer;
    line = new Line([startPoint.x, startPoint.y, startPoint.x, startPoint.y], {
      stroke: color,
      strokeWidth: 2,
      selectable: false,
      evented: false
    });
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
    canvas.add(line);
  });

  canvas.on('mouse:move', (opt) => {
    if (!line || !startPoint) return;
    
    const pointer = opt.absolutePointer;
    line.set({
      x2: pointer.x,
      y2: startPoint.y + 2 // Keep it horizontal with slight offset
    });
    
    canvas.renderAll();
  });

  canvas.on('mouse:up', () => {
    if (!line || !startPoint || !rect) return;

    addAnnotation({
      type: "underline",
      pageIndex,
      color,
      x: rect.left!,
      y: rect.top!,
      x1: line.x1!,
      y1: line.y1!,
      x2: line.x2!,
      y2: line.y2!,
    });

    startPoint = null;
    line = null;
  });
}