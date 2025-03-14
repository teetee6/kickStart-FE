import { useAppDispatch } from '@shared/lib/store';
import {
  updateTitle,
  updateDescription,
  updateSectionType,
} from '@entities/form/model/slice';
import {
  FormSectionKind,
  FormSectionKindType,
  TextSectionType,
} from '@entities/form/model/types';
import { EditableDiv } from '@shared/ui/editable';
import { SectionTypeDropdown } from '@features/dropdown';
import { ActionBarFooter } from '../ActionBarFooter';
import { DragHandleHorizontalButton } from '@shared/ui/button';

const CONTENT_STYLES = {
  focused: 'p-4 bg-gray-100',
  unfocused: '',
} as const;

export interface TextSectionProps {
  formSectionData: TextSectionType;
  currentIndex: number;
  isFocused?: boolean;
  isHovered?: boolean;
  dropdownRef: React.RefObject<HTMLElement | null>;
  dropdownOpen: boolean;
  setDropdownOpen: (open: boolean) => void;
}

export const TextSection = ({
  formSectionData,
  currentIndex,
  isFocused,
  isHovered,
  dropdownRef,
  dropdownOpen,
  setDropdownOpen,
}: TextSectionProps) => {
  const dispatch = useAppDispatch();

  const handleTypeChange = (newType: FormSectionKindType) => {
    dispatch(updateSectionType({ currentIndex, type: newType }));
  };

  return (
    <div className="relative">
      {/* 드래그 핸들러 */}
      {isHovered && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 flex items-center justify-center">
          <DragHandleHorizontalButton />
        </div>
      )}

      <div className={`bg-white rounded-lg shadow-sm border`}>
        <div className="p-6 space-y-6">
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
          <EditableDiv
            key={formSectionData.id}
            textValue={formSectionData.description}
            isEditableMode={false}
            className="w-full text-sm text-gray-600 border-b border-transparent hover:border-gray-300 focus:border-purple-500 focus:outline-none transition-colors [word-break:keep-all]"
            placeholder="설명(선택사항)"
            multiline={formSectionData.type !== FormSectionKind.shortText}
            onInput={{
              afterCallback: (inputText: string) => {
                dispatch(
                  updateDescription({ currentIndex, description: inputText })
                );
              },
            }}
          />
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
