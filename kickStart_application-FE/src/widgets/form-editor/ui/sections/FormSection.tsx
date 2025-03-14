import { useAppDispatch, useAppSelector } from '@shared/lib/store';
import {
  updateFocusedIndex,
  updateHoveredIndex,
} from '@entities/form/model/slice';
import {
  FormSectionType,
  OptionsSectionType,
  TextSectionType,
  TitleSectionType,
} from '@entities/form/model/types';
import { DragSectionContainer } from '@features/drag-n-drop';
import { useState } from 'react';
import { useClickOutside } from '@shared/lib/hooks';
import {
  isOptionsSection,
  isTextInputSection,
  isTitleSection,
} from '@entities/form';
import { TitleSection } from './TitleSection';
import { TextSection } from './TextSection';
import { OptionsSection } from './OptionsSection';

type SectionProps<T extends FormSectionType> = {
  formSectionData: T;
  currentIndex: number;
};

export const FormSection = <T extends FormSectionType>({
  formSectionData,
  currentIndex,
}: SectionProps<T>) => {
  const dispatch = useAppDispatch();
  const { focusedIndex, hoveredIndex } = useAppSelector((state) => state.form);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useClickOutside(() => setDropdownOpen(false));

  const isFocused = focusedIndex === currentIndex;
  const isHovered = hoveredIndex === currentIndex;

  const handleSectionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(updateFocusedIndex({ index: currentIndex }));
  };

  const handleMouseEnter = () => {
    dispatch(updateHoveredIndex({ index: currentIndex }));
  };

  const handleMouseLeave = () => {
    dispatch(updateHoveredIndex({ index: -1 }));
  };

  if (isTitleSection(formSectionData)) {
    return (
      <div onClick={handleSectionClick}>
        <TitleSection
          formSectionData={formSectionData as TitleSectionType}
          currentIndex={currentIndex}
          isFocused={isFocused}
        />
      </div>
    );
  }

  if (
    isTextInputSection(formSectionData) ||
    isOptionsSection(formSectionData)
  ) {
    return (
      <div>
        <DragSectionContainer
          key={formSectionData.id}
          currentIndex={currentIndex}
        >
          <div
            onClick={handleSectionClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {isTextInputSection(formSectionData) && (
              <TextSection
                key={formSectionData.id}
                formSectionData={formSectionData as TextSectionType}
                currentIndex={currentIndex}
                isFocused={isFocused}
                isHovered={isHovered}
                dropdownRef={dropdownRef}
                dropdownOpen={dropdownOpen}
                setDropdownOpen={setDropdownOpen}
              />
            )}
            {isOptionsSection(formSectionData) && (
              <OptionsSection
                key={formSectionData.id}
                formSectionData={formSectionData as OptionsSectionType}
                currentIndex={currentIndex}
                isFocused={isFocused}
                isHovered={isHovered}
                dropdownRef={dropdownRef}
                dropdownOpen={dropdownOpen}
                setDropdownOpen={setDropdownOpen}
              />
            )}
          </div>
        </DragSectionContainer>
      </div>
    );
  }

  return null;
};
