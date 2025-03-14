import { createContext } from 'react';
import { DragOptionContextType } from './types';

export const DragOptionContext = createContext<DragOptionContextType>({
  draggingOptionIndex: null,
  draggingOriginalSection: null, // 옵션 드래그가 발생중인 섹션
  setDraggingOptionIndex: () => {},
  setDraggingOriginalSection: () => {}, // 옵션 드래그가 발생중인 섹션
  draggableOptionRefs: new Map(),
});
