import { createContext } from 'react';
import { DragSectionContextType } from './types';

export const DragSectionContext = createContext<DragSectionContextType>({
  draggingSectionIndex: null,
  setDraggingSectionIndex: () => {},
  draggableSectionRefs: new Map(),
});
