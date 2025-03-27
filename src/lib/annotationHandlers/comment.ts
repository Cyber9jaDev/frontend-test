import fabric from "fabric/fabric-impl";
import { Position } from "../types";

export function setupComment(
  canvas: fabric.Canvas,
  color: string,
  pageIndex: number,
  addAnnotation: (pos: Position) => void
) {
  canvas.on('mouse:down', (opt) => {
    if (!opt.absolutePointer) return;

    const pointer = opt.absolutePointer;
    const text = new fabric.IText('Add comment...', {
      left: pointer.x,
      top: pointer.y,
      fill: color,
      fontSize: 16,
      hasControls: false,
      editable: true,
      selectable: true
    });

    canvas.add(text);
    canvas.setActiveObject(text);
    text.enterEditing();
    text.selectAll();

    const handleTextExit = () => {
      if (!text.text || text.text === 'Add comment...') {
        canvas.remove(text);
        return;
      }

      addAnnotation({
        type: 'comment',
        pageIndex,
        color,
        x: text.left ?? 0,
        y: text.top ?? 0,
        text: text.text ?? '',
        width: text.width ?? 0,
        height: text.height ?? 0
      });

      // Clean up event listener
      text.off('editing:exited', handleTextExit);
    };

    text.on('editing:exited', handleTextExit);
  });
}