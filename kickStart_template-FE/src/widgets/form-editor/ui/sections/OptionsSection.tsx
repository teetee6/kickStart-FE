import { useAppDispatch } from '@shared/lib/store';
import {
  updateTitle,
  updateOptions,
  updateSectionType,
} from '@entities/form/model/slice';
import {
  FormSectionKindType,
  OptionsSectionType,
} from '@entities/form/model/types';
import { EditableDiv } from '@shared/ui/editable';
import { SectionTypeDropdown } from '@features/dropdown';
import { OptionRow } from './OptionRow';
import { ActionBarFooter } from '../ActionBarFooter';
import { DragHandleHorizontalButton } from '@shared/ui/button';
import { PlusImage } from '@shared/ui/image';

const SECTION_BORDER_STYLES = {
  focused: 'border-l-4 border-l-blue-500',
  unfocused: '',
} as const;

const CONTENT_STYLES = {
  focused: 'p-4 bg-gray-100',
  unfocused: '',
} as const;

export interface OptionsSectionProps {
  formSectionData: OptionsSectionType;
  currentIndex: number;
  isFocused?: boolean;
  isHovered?: boolean;
  dropdownRef: React.RefObject<HTMLElement | null>;
  dropdownOpen: boolean;
  setDropdownOpen: (open: boolean) => void;
}

export const OptionsSection = ({
  formSectionData,
  currentIndex,
  isFocused,
  isHovered,
  dropdownRef,
  dropdownOpen,
  setDropdownOpen,
}: OptionsSectionProps) => {
  const dispatch = useAppDispatch();

  const handleOptionsUpdate = (
    newOptions: Array<{ id: string; text: string; isOther: boolean }>
  ) => {
    dispatch(updateOptions({ currentIndex, options: newOptions }));
  };

  const handleTypeChange = (newType: FormSectionKindType) => {
    dispatch(updateSectionType({ currentIndex, type: newType }));
  };

  const handleAddOption = () => {
    const hasOtherOption = formSectionData.options.some((opt) => opt.isOther);
    if (hasOtherOption) {
      // 기타 옵션이 있는 경우, 기타 옵션 바로 앞에 새 옵션 추가
      const otherIndex = formSectionData.options.findIndex(
        (opt) => opt.isOther
      );
      const newOptions = [...formSectionData.options];
      newOptions.splice(otherIndex, 0, {
        id: crypto.randomUUID(),
        text: `새로운 옵션`,
        isOther: false,
      });
      handleOptionsUpdate(newOptions);
    } else {
      // 기타 옵션이 없는 경우, 마지막에 추가
      handleOptionsUpdate([
        ...formSectionData.options,
        {
          id: crypto.randomUUID(),
          text: `새로운 옵션`,
          isOther: false,
        },
      ]);
    }
  };

  const handleAddOther = () => {
    // 이미 기타 옵션이 있는지 확인
    const hasOtherOption = formSectionData.options.some((opt) => opt.isOther);
    if (!hasOtherOption) {
      handleOptionsUpdate([
        ...formSectionData.options,
        { id: crypto.randomUUID(), text: '기타...', isOther: true },
      ]);
    }
  };

  return (
    <div className="relative">
      {/* 드래그 핸들러 */}
      {isHovered && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 flex items-center justify-center">
          <DragHandleHorizontalButton />
        </div>
      )}

      <div
        className={`bg-white rounded-lg shadow-sm border ${
          isFocused
            ? SECTION_BORDER_STYLES.focused
            : SECTION_BORDER_STYLES.unfocused
        }`}
      >
        <div className="p-6 space-y-4">
          <div className="flex flex-row justify-between flex-wrap gap-4">
            <EditableDiv
              key={formSectionData.id}
              textValue={formSectionData.title}
              isEditableMode={true}
              className={`${isFocused ? 'w-[60%]' : 'w-[100%]'} text-lg font-normal border-b border-transparent hover:border-gray-300 focus:border-purple-500 focus:outline-none transition-colors [word-break:keep-all]`}
              placeholder="질문"
              multiline={true}
              onInput={{
                afterCallback: (inputText: string) => {
                  dispatch(updateTitle({ currentIndex, title: inputText }));
                },
              }}
              options={{
                style: {
                  focused: CONTENT_STYLES.focused,
                  unfocused: CONTENT_STYLES.unfocused,
                },
              }}
            />
            {isFocused ? (
              <SectionTypeDropdown
                currentType={formSectionData.type}
                onTypeChange={handleTypeChange}
                dropdownRef={dropdownRef}
                dropdownOpen={dropdownOpen}
                setDropdownOpen={setDropdownOpen}
              />
            ) : null}
          </div>
          {/* 옵션 리스트 렌더링 */}
          <div className="space-y-2">
            {formSectionData.options.map((option, idx) => (
              <OptionRow
                key={option.id}
                formSectionData={formSectionData}
                currentIndex={currentIndex}
                currentOptionIndex={idx}
                isFocused={isFocused!}
              />
            ))}

            {/* 포커스된 상태에서만 추가 옵션 버튼들 표시 */}
            {isFocused && (
              <div className="w-full flex items-center gap-2 text-left px-10 py-1 text-sm text-gray-600 hover:bg-gray-50 rounded">
                <PlusImage />
                <button
                  type="button"
                  onClick={handleAddOption}
                  className="hover:text-gray-900"
                >
                  옵션 추가
                </button>
                {!formSectionData.options.some((opt) => opt.isOther) && (
                  <>
                    <span className="text-gray-400">또는</span>
                    <button
                      type="button"
                      onClick={handleAddOther}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      '기타' 추가
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          {isFocused && (
            <ActionBarFooter
              onCopy={() => {}}
              onDelete={() => {}}
              onToggleRequired={() => {}}
              isRequired={formSectionData.isRequired}
              currentIndex={currentIndex}
            />
          )}
        </div>
      </div>
    </div>
  );
};
