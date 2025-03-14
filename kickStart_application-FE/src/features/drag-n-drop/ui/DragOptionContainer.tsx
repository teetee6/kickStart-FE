import { useAppDispatch } from '@shared/lib/store';
import { useContext, useEffect, useRef } from 'react';
import { DragOptionContext } from '@entities/drag-n-drop';
import { OptionsSectionType } from '@entities/form/model/types';
import { updateOptions } from '@entities/form/model/slice';

interface Props {
  children: React.ReactNode;
  currentOptionIndex: number;
  sectionIndex: number;
  formSectionData: OptionsSectionType;
  isOtherOption: boolean;
}

export const DragOptionContainer = ({
  children,
  currentOptionIndex,
  sectionIndex,
  formSectionData,
  isOtherOption,
}: Props) => {
  const {
    draggingOptionIndex,
    setDraggingOptionIndex,
    draggableOptionRefs,
    draggingOriginalSection,
    setDraggingOriginalSection,
  } = useContext(DragOptionContext);

  const elementRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (elementRef.current) {
      // 섹션별로 Map 생성 및 관리
      if (!draggableOptionRefs.has(sectionIndex)) {
        draggableOptionRefs.set(sectionIndex, new Map());
      }
      const sectionOptionRefs = draggableOptionRefs.get(sectionIndex)!;
      sectionOptionRefs.set(currentOptionIndex, elementRef.current);

      return () => {
        const sectionOptionRefs = draggableOptionRefs.get(sectionIndex);
        if (sectionOptionRefs) {
          sectionOptionRefs.delete(currentOptionIndex);
          if (sectionOptionRefs.size === 0) {
            draggableOptionRefs.delete(sectionIndex);
          }
        }
      };
    }
  }, [currentOptionIndex, sectionIndex, draggableOptionRefs]);

  const handleDragStart = (e: React.DragEvent) => {
    if (isOtherOption) {
      e.preventDefault();
      return;
    }
    setDraggingOptionIndex(currentOptionIndex);
    setDraggingOriginalSection(sectionIndex); // 섹션 인덱스 저장
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();

    if (
      isOtherOption ||
      draggingOptionIndex === null ||
      draggingOptionIndex === currentOptionIndex
    ) {
      return;
    }

    // 다른 섹션으로 드래그된 경우, dragEnd 이벤트 강제 발생시켜서 drag 강제 종료
    if (draggingOriginalSection !== sectionIndex) {
      const dragEndEvent = new DragEvent('dragend', {
        bubbles: true,
        cancelable: true,
      });
      elementRef.current?.dispatchEvent(dragEndEvent);
      return;
    }

    // 현재 마우스 Y 위치
    const mouseY = e.clientY;

    // 가장 가까운 다음 옵션
    let targetIndex = -1;

    // 현재 섹션의 옵션 refs
    const sectionOptionRefs = draggableOptionRefs.get(sectionIndex);
    if (!sectionOptionRefs) return;

    const thisRect = elementRef.current?.getBoundingClientRect();
    if (thisRect) {
      const middleY = thisRect.top + thisRect.height / 2;

      if (draggingOptionIndex < currentOptionIndex && mouseY < middleY) {
        // 위->아래 드래그 중, 다음 옵션 상단 절반에 위치 (기존 위치 유지)
        targetIndex = currentOptionIndex - 1;
      } else if (draggingOptionIndex > currentOptionIndex && mouseY > middleY) {
        // 아래->위 드래그 중, 이전 옵션 하단 절반에 위치 (기존 위치 유지)
        targetIndex = currentOptionIndex + 1;
      } else {
        // 위->아래 드래그 중, 다음 옵션 하단 절반에 위치 (서로 위치 교환)
        // 아래->위 드래그 중, 이전 옵션 상단 절반에 위치 (서로 위치 교환)
        targetIndex = currentOptionIndex;
      }
    }

    if (targetIndex !== -1 && targetIndex !== draggingOptionIndex) {
      const newOptions = [...formSectionData.options];
      const [draggedOption] = newOptions.splice(draggingOptionIndex, 1);
      newOptions.splice(targetIndex, 0, draggedOption);

      dispatch(
        updateOptions({ currentIndex: sectionIndex, options: newOptions })
      );
      setDraggingOptionIndex(targetIndex);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDraggingOptionIndex(null);
    setDraggingOriginalSection(null);
  };

  return (
    <div
      ref={elementRef}
      draggable={!isOtherOption}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className={`
        option-container
        relative 
        transition-transform 
        duration-200 
        ease-in-out
        ${draggingOriginalSection === sectionIndex && draggingOptionIndex === currentOptionIndex ? 'opacity-40' : ''}
        ${isOtherOption ? 'cursor-default' : 'cursor-move'}
      `}
    >
      {children}
    </div>
  );
};
