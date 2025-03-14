import { useAppDispatch } from '@shared/lib/store';
import { updateOptions } from '@entities/form/model/slice';
import {
  FormSectionKind,
  OptionsSectionType,
} from '@entities/form/model/types';
import { DeleteButton, DragHandleVerticalButton } from '@shared/ui/button';
import { useState } from 'react';
import { CheckBox, RadioBox } from '@shared/ui/image';
import { DragOptionContainer } from '@features/drag-n-drop/ui/DragOptionContainer';

export interface OptionRowProps {
  formSectionData: OptionsSectionType;
  currentIndex: number;
  currentOptionIndex: number;
  isFocused: boolean;
}

export const OptionRow = ({
  formSectionData,
  currentIndex,
  currentOptionIndex,
  isFocused,
}: OptionRowProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useAppDispatch();
  const option = formSectionData.options[currentOptionIndex];
  const isOtherOption = option.isOther ?? false;

  const handleDelete = () => {
    if (formSectionData.options.length > 1) {
      const newOptions = formSectionData.options.filter(
        (_, idx) => idx !== currentOptionIndex
      );
      dispatch(updateOptions({ currentIndex, options: newOptions }));
    }
  };

  const handleUpdate = (newText: string) => {
    if (isOtherOption) return;
    const newOptions = formSectionData.options.map((opt, idx) =>
      idx === currentOptionIndex
        ? { ...opt, text: newText, isOther: opt.isOther ?? false }
        : opt
    );
    dispatch(updateOptions({ currentIndex, options: newOptions }));
  };

  return (
    <DragOptionContainer
      currentOptionIndex={currentOptionIndex}
      sectionIndex={currentIndex}
      formSectionData={formSectionData}
      isOtherOption={isOtherOption}
    >
      <div
        className="group relative flex items-center w-full gap-2 py-1"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {!isOtherOption && (
          <div
            className={`absolute -left-6 -top-0 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            } transition-opacity duration-200 cursor-move`}
          >
            <DragHandleVerticalButton />
          </div>
        )}

        {formSectionData.type === FormSectionKind.radiobox && <RadioBox />}
        {formSectionData.type === FormSectionKind.checkbox && <CheckBox />}
        {formSectionData.type === FormSectionKind.dropdown && (
          <div className="w-6 h-6 flex items-center justify-center text-sm text-gray-600">
            {currentOptionIndex + 1}
          </div>
        )}

        <input
          type="text"
          value={option.text || ''}
          onChange={(e) => handleUpdate(e.target.value)}
          placeholder={option.isOther ? '기타...' : '옵션'}
          readOnly={isOtherOption}
          className="flex-1 px-2 py-1 text-sm text-gray-700 hover:bg-gray-50 focus:bg-white focus:outline-none rounded"
        />

        {isFocused && formSectionData.options.length > 1 && (
          <DeleteButton onClick={handleDelete} />
        )}
      </div>
    </DragOptionContainer>
  );
};
