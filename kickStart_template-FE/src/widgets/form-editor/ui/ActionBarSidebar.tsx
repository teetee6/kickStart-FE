import { EyeButton, PlusButton } from '@shared/ui/button';
import { RefObject } from 'react';

interface ActionBarSidebarProps {
  sidebarRef: RefObject<HTMLDivElement | null>;
  sidebarTop: number;
  onAddSection: (e: React.MouseEvent) => void;
  onPreviewSection: (e: React.MouseEvent) => void;
  isMobile: boolean;
}

const ActionBarSidebar = ({
  sidebarRef,
  sidebarTop,
  onAddSection,
  onPreviewSection,
  isMobile,
}: ActionBarSidebarProps) => {
  return (
    <div
      ref={sidebarRef}
      className={`transition-all duration-300 ease-in-out ${
        isMobile
          ? 'fixed bottom-4 right-4 z-50'
          : 'w-[50px] absolute -right-[60px]'
      }`}
      style={!isMobile ? { top: `${sidebarTop}px` } : {}}
    >
      <div
        className={`bg-white rounded-lg shadow-lg p-1 flex ${
          isMobile ? 'flex-row' : 'flex-col'
        } gap-1`}
      >
        <PlusButton onClick={onAddSection} />
        <EyeButton onClick={onPreviewSection} />
      </div>
    </div>
  );
};

export { ActionBarSidebar };
