import { DragOptionProvider, DragSectionProvider } from '@entities/drag-n-drop';
import { addSection } from '@entities/form';
import { useDragPrevention } from '@shared/lib/hooks';
import { useAppDispatch, useAppSelector } from '@shared/lib/store';
import { ActionBarSidebar } from '@widgets/form-editor';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BodySections, HeaderSection } from './sections';
import { MediaBreakpoint } from '@shared/consts';

export const FormEditPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { focusedIndex, formList } = useAppSelector((state) => state.form);
  const dragPreventionHandlers = useDragPrevention();
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const [sidebarTop, setSidebarTop] = useState(0);
  const [isMobile, setIsMobile] = useState(
    window.innerWidth <= MediaBreakpoint.MOBILE.width
  );

  const handleRefUpdate = (index: number, el: HTMLDivElement | null) => {
    sectionRefs.current[index] = el;
  };

  const handleAddButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch(addSection({ currentIndex: focusedIndex }));
  };

  const handlePreviewButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    navigate('/preview?from=edit');
  };

  const adjustSidebarPosition = useCallback(() => {
    if (isMobile) return;

    if (focusedIndex >= 0 && sectionRefs.current[focusedIndex]) {
      const sectionOffset = sectionRefs.current[focusedIndex]?.offsetTop || 0;

      const viewportHeight = window.innerHeight;
      const scrollY = window.scrollY;
      const sidebarHeight = sidebarRef.current?.offsetHeight || 0;

      /**
       * "화면 아래에 있다" 조건문 설명:
       * - sectionOffset = positioned 부모 요소로부터 해당 자식 요소가 얼마나 떨어져 있는지
       * - scrollY + viewportHeight = 뷰포트의 맨 아래 지점
       * - 100 = 맨 아래에서 부터 100px 띄우겠음(사이드바 안전영역)
       *  --> 즉, 현재 섹션이 뷰포트 아래 100px보다 더 아래쪽에 있는지?
       *
       */
      /**
       * "안전 영역" 설명:
       * - 섹션이 viewport 아래에 있을 때:
       *   섹션이 화면에 100px 정도 보이기 시작하면 사이드바 미리 준비
       *   if (sectionOffset > scrollY + viewportHeight - 100)
       *
       * - 섹션이 viewport 위로 벗어날 때:
       *   섹션이 화면을 완전히 벗어나야 사이드바 이동
       *   else if (sectionOffset < scrollY)
       */
      if (sectionOffset > scrollY + viewportHeight - 100) {
        // Section is below viewport
        setSidebarTop(scrollY + viewportHeight - 100 - sidebarHeight);
      } else if (sectionOffset < scrollY) {
        // Section is above viewport
        setSidebarTop(scrollY + 100);
      } else {
        // Section is within viewport
        setSidebarTop(sectionOffset);
      }
    }
  }, [focusedIndex, sectionRefs, sidebarRef, isMobile]);

  const scrollToFocusedSection = useCallback(() => {
    if (focusedIndex >= 0 && sectionRefs.current[focusedIndex]) {
      const focusedSectionElement = sectionRefs.current[focusedIndex];
      const focusedSectionRect = focusedSectionElement?.getBoundingClientRect();

      if (focusedSectionRect) {
        const isInViewport =
          focusedSectionRect.top >= 0 &&
          focusedSectionRect.left >= 0 &&
          focusedSectionRect.bottom <=
            (window.innerHeight || document.documentElement.clientHeight) &&
          focusedSectionRect.right <=
            (window.innerWidth || document.documentElement.clientWidth);

        if (!isInViewport) {
          focusedSectionElement?.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });
        }
      }
    }
  }, [focusedIndex, sectionRefs]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= MediaBreakpoint.MOBILE.width);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (!isMobile) {
      adjustSidebarPosition();
    }

    scrollToFocusedSection();

    if (!isMobile) {
      window.addEventListener('scroll', adjustSidebarPosition);
      return () => {
        window.removeEventListener('scroll', adjustSidebarPosition);
      };
    }
  }, [focusedIndex, adjustSidebarPosition, isMobile, scrollToFocusedSection]);

  return (
    <div className="py-6 space-y-4 max-w-3xl mx-auto">
      <div className={`${isMobile ? 'block' : 'flex gap-8'} relative`}>
        <div className="w-full py-6 flex flex-col gap-4">
          <DragSectionProvider>
            <DragOptionProvider>
              <HeaderSection
                sectionData={formList[0]}
                onRefUpdate={handleRefUpdate}
                dragPreventionHandlers={dragPreventionHandlers}
              />

              <BodySections sections={formList} onRefUpdate={handleRefUpdate} />
            </DragOptionProvider>
          </DragSectionProvider>
        </div>

        <ActionBarSidebar
          sidebarRef={sidebarRef}
          sidebarTop={sidebarTop}
          onAddSection={handleAddButtonClick}
          onPreviewSection={handlePreviewButtonClick}
          isMobile={isMobile}
        />
      </div>
    </div>
  );
};
