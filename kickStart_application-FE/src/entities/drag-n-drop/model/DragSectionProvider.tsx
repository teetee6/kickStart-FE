import { useEffect, useRef, useState } from 'react';
import { DragSectionContext } from './DragSectionContext';

export const DragSectionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [draggingSectionIndex, setDraggingSectionIndex] = useState<
    number | null
  >(null);
  const draggableSectionRefs = useRef(
    new Map<number, HTMLDivElement>()
  ).current;

  useEffect(() => {
    const handleGlobalDragEnd = () => {
      if (draggingSectionIndex !== null) {
        setDraggingSectionIndex(null);
      }
    };

    // 드래그가 요소를 떠날 때도 처리
    const handleGlobalDragLeave = (e: DragEvent) => {
      // 떠나는 대상이 document인 경우(화면 밖으로 나간 경우)
      if (e.relatedTarget === null && draggingSectionIndex !== null) {
        setDraggingSectionIndex(null);
      }
    };

    window.addEventListener('dragend', handleGlobalDragEnd);
    document.addEventListener('dragleave', handleGlobalDragLeave);

    return () => {
      window.removeEventListener('dragend', handleGlobalDragEnd);
      document.removeEventListener('dragleave', handleGlobalDragLeave);
    };
  }, [draggingSectionIndex, setDraggingSectionIndex]);

  return (
    <DragSectionContext.Provider
      value={{
        draggingSectionIndex,
        setDraggingSectionIndex,
        draggableSectionRefs,
      }}
    >
      {children}
    </DragSectionContext.Provider>
  );
};
