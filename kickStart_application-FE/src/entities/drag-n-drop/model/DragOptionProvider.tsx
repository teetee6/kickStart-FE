import { useEffect, useRef, useState } from 'react';
import { DragOptionContext } from './DragOptionContext';

export const DragOptionProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [draggingOptionIndex, setDraggingOptionIndex] = useState<number | null>(
    null
  );
  const [draggingOriginalSection, setDraggingOriginalSection] = useState<
    number | null
  >(null);

  const draggableOptionRefs = useRef(
    new Map<number, Map<number, HTMLDivElement>>()
  ).current;

  useEffect(() => {
    const handleGlobalDragEnd = () => {
      if (draggingOptionIndex !== null || draggingOriginalSection !== null) {
        setDraggingOptionIndex(null);
        setDraggingOriginalSection(null);
      }
    };

    const handleGlobalDragLeave = (e: DragEvent) => {
      if (
        e.relatedTarget === null &&
        (draggingOptionIndex !== null || draggingOriginalSection !== null)
      ) {
        setDraggingOptionIndex(null);
        setDraggingOriginalSection(null);
      }
    };

    window.addEventListener('dragend', handleGlobalDragEnd);
    document.addEventListener('dragleave', handleGlobalDragLeave);

    return () => {
      window.removeEventListener('dragend', handleGlobalDragEnd);
      document.removeEventListener('dragleave', handleGlobalDragLeave);
    };
  }, [draggingOptionIndex, draggingOriginalSection]);

  return (
    <DragOptionContext.Provider
      value={{
        draggingOptionIndex,
        draggingOriginalSection,
        setDraggingOptionIndex,
        setDraggingOriginalSection,
        draggableOptionRefs,
      }}
    >
      {children}
    </DragOptionContext.Provider>
  );
};
