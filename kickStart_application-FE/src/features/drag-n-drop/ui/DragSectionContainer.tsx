import { reorderSections, updateFocusedIndex } from '@entities/form';
import { useAppDispatch } from '@shared/lib/store';
import { useContext, useEffect, useRef } from 'react';
import { DragSectionContext } from '@entities/drag-n-drop';

interface Props {
  children: React.ReactNode;
  currentIndex: number;
}

export const DragSectionContainer = ({ children, currentIndex }: Props) => {
  const {
    draggingSectionIndex,
    setDraggingSectionIndex,
    draggableSectionRefs,
  } = useContext(DragSectionContext);
  const elementRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (elementRef.current) {
      draggableSectionRefs.set(currentIndex, elementRef.current);
    }

    return () => {
      draggableSectionRefs.delete(currentIndex);
    };
  }, [currentIndex, draggableSectionRefs]);

  const handleDragStart = (e: React.DragEvent) => {
    setDraggingSectionIndex(currentIndex);
    e.dataTransfer.setData('text/plain', currentIndex.toString());
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();

    if (draggingSectionIndex === null || draggingSectionIndex === currentIndex)
      return;

    // 현재 마우스 Y 위치
    const mouseY = e.clientY;

    // 가장 가까운 다음 섹션
    let targetIndex = -1;

    const thisRect = elementRef.current?.getBoundingClientRect();
    if (thisRect) {
      const middleY = thisRect.top + thisRect.height / 2;

      if (draggingSectionIndex < currentIndex && mouseY < middleY) {
        // 위->아래 드래그 중, 다음 섹션 상단 절반에 위치 (기존 위치 유지)
        targetIndex = currentIndex - 1;
      } else if (draggingSectionIndex > currentIndex && mouseY > middleY) {
        // 아래->위 드래그 중, 이전 섹션 하단 절반에 위치 (기존 위치 유지)
        targetIndex = currentIndex + 1;
      } else {
        // 위->아래 드래그 중, 다음 섹션 하단 절반에 위치 (서로 위치 교환)
        // 아래->위 드래그 중, 이전 섹션 상단 절반에 위치 (서로 위치 교환)
        targetIndex = currentIndex;
      }
    }

    if (targetIndex !== -1 && targetIndex !== draggingSectionIndex) {
      dispatch(
        reorderSections({
          fromIndex: draggingSectionIndex,
          toIndex: targetIndex,
        })
      );

      setDraggingSectionIndex(targetIndex);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (draggingSectionIndex !== null) {
      // 포커스 인덱스 업데이트
      dispatch(updateFocusedIndex({ index: currentIndex }));

      // 드래깅 상태 초기화
      setDraggingSectionIndex(null);
    }
  };

  return (
    <div
      ref={elementRef}
      draggable={true}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className={`
        section-container
        relative 
        transition-transform 
        duration-200 
        ease-in-out
        ${draggingSectionIndex === currentIndex ? 'opacity-40' : ''}
      `}
    >
      {children}
    </div>
  );
};
