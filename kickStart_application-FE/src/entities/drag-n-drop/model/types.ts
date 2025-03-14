export interface DragSectionContextType {
  draggingSectionIndex: number | null;
  setDraggingSectionIndex: (index: number | null) => void;
  draggableSectionRefs: Map<number, HTMLDivElement>;
}

export interface DragOptionContextType {
  draggingOptionIndex: number | null;
  draggingOriginalSection: number | null; // 옵션 드래그가 발생중인 섹션
  setDraggingOptionIndex: (index: number | null) => void;
  setDraggingOriginalSection: (index: number | null) => void; // 옵션 드래그가 발생중인 섹션
  draggableOptionRefs: Map<
    number,
    DragSectionContextType['draggableSectionRefs']
  >; // 섹션 별 옵션들
}
