import { useRef } from 'react';

export function useDragPrevention() {
  const isDragOverActiveRef = useRef(false);
  const lastDragEnterTargetRef = useRef<EventTarget | null>(null);

  const isTargetInsideCurrentTarget = (e: React.DragEvent) => {
    return e.currentTarget.contains(e.target as Node);
  };

  const isMouseOutsideElement = (e: React.DragEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;
    return x < rect.left || x > rect.right || y < rect.top || y > rect.bottom;
  };

  const preventDefaultAndStopPropagation = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const preventDragHandlers = {
    onDragStart: (e: React.DragEvent) => {
      if (isTargetInsideCurrentTarget(e)) {
        preventDefaultAndStopPropagation(e);
      }
    },

    onDragEnter: (e: React.DragEvent) => {
      preventDefaultAndStopPropagation(e);

      // 자손 element에서의 이벤트 발생 무시!
      if (lastDragEnterTargetRef.current !== e.currentTarget) {
        e.dataTransfer.dropEffect = 'move';
        e.currentTarget.classList.add('no-drop-zone');
        lastDragEnterTargetRef.current = e.currentTarget;
      }
    },

    onDragOver: (e: React.DragEvent) => {
      preventDefaultAndStopPropagation(e);

      e.dataTransfer.dropEffect = 'move';
      if (!isDragOverActiveRef.current) {
        e.currentTarget.classList.add('no-drop-zone');
        isDragOverActiveRef.current = true;
      }
    },

    onDragLeave: (e: React.DragEvent) => {
      preventDefaultAndStopPropagation(e);

      if (isMouseOutsideElement(e)) {
        e.currentTarget.classList.remove('no-drop-zone');
        isDragOverActiveRef.current = false;
        lastDragEnterTargetRef.current = null;
      }
    },

    onDrop: (e: React.DragEvent) => {
      preventDefaultAndStopPropagation(e);

      e.currentTarget.classList.remove('no-drop-zone');

      isDragOverActiveRef.current = false;
      lastDragEnterTargetRef.current = null;
    },
  };

  return preventDragHandlers;
}
