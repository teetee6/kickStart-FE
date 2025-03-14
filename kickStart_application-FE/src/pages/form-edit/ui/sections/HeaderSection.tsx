// (0번째 섹션)
import { FormSection } from '@widgets/form-editor';
import { FormSectionType } from '@entities/form/model/types';
import { useContext } from 'react';
import { DragSectionContext } from '@entities/drag-n-drop';

interface HeaderSectionProps {
  sectionData: FormSectionType;
  // onRef: (el: HTMLDivElement | null) => void;
  onRefUpdate: (index: number, el: HTMLDivElement | null) => void;
  dragPreventionHandlers: any;
}

export const HeaderSection = ({
  sectionData,
  onRefUpdate,
  dragPreventionHandlers,
}: HeaderSectionProps) => {
  const { setDraggingSectionIndex } = useContext(DragSectionContext);

  const originalOnDrop = dragPreventionHandlers.onDrop;

  const enhancedHandlers = {
    ...dragPreventionHandlers,
    onDrop: (e: React.DragEvent) => {
      if (originalOnDrop) {
        originalOnDrop(e);
      }
      setDraggingSectionIndex(null);
    },
  };

  return (
    <div ref={(el) => onRefUpdate(0, el)} {...enhancedHandlers}>
      <FormSection
        key={`section-${sectionData?.id}`}
        formSectionData={sectionData}
        currentIndex={0}
      />
    </div>
  );
};
