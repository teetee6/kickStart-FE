import { FormSectionKind, FormSectionKindType } from '@entities/form';
import { MappingIntoKorean } from '@shared/lib/i18n';
import {
  CheckBox,
  DropDownBox,
  RadioBox,
  TextBoxImage,
} from '@shared/ui/image';

export const SectionTypeDropdown = ({
  currentType,
  onTypeChange,
  dropdownRef,
  dropdownOpen,
  setDropdownOpen,
}: {
  currentType: FormSectionKindType;
  onTypeChange: (type: FormSectionKindType) => void;
} & {
  dropdownRef: React.RefObject<HTMLElement | null>;
  dropdownOpen: boolean;
  setDropdownOpen: (open: boolean) => void;
}) => {
  const textTypes = [
    { type: FormSectionKind.shortText, label: '단답형' },
    { type: FormSectionKind.longText, label: '장문형' },
  ];

  const choiceTypes = [
    { type: FormSectionKind.checkbox, label: '체크박스' },
    { type: FormSectionKind.radiobox, label: '객관식 질문' },
    { type: FormSectionKind.dropdown, label: '드롭다운' },
  ];

  const handleTypeSelect = (type: FormSectionKindType) => {
    onTypeChange(type);
    setDropdownOpen(false);
  };

  return (
    <div
      ref={dropdownRef as React.RefObject<HTMLDivElement>}
      className="relative"
    >
      <button
        type="button"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="w-52 flex items-center relative h-12 py-2 px-6 border border-gray-300 rounded whitespace-pre-wrap break-words [word-break:keep-all] hover:bg-gray-50"
      >
        <div className="flex items-center justify-center gap-2">
          {textTypes.map((textType) => textType.type).includes(currentType) && (
            <TextBoxImage />
          )}
          {currentType === FormSectionKind.checkbox && (
            <CheckBox variant="text" />
          )}
          {currentType === FormSectionKind.radiobox && (
            <RadioBox variant="text" />
          )}
          {currentType === FormSectionKind.dropdown && (
            <DropDownBox variant="text" />
          )}
          <span>{MappingIntoKorean[currentType]}</span>
        </div>
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <DropDownBox variant="box" isOpen={dropdownOpen} />
        </div>
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 mt-1 w-52 bg-white border border-gray-200 rounded-md shadow-lg z-50">
          {/* 텍스트 그룹 */}
          <div className="p-2 border-b border-gray-200">
            <div className="px-3 py-1 text-sm text-gray-500">텍스트</div>
            {textTypes.map(({ type, label }) => (
              <button
                key={type}
                onClick={() => handleTypeSelect(type)}
                className={`w-full px-3 py-2 text-left flex items-center gap-2 rounded hover:bg-gray-100 ${
                  currentType === type ? 'bg-gray-50' : ''
                }`}
              >
                <TextBoxImage />
                <span>{label}</span>
              </button>
            ))}
          </div>

          {/* 선택지 그룹 */}
          <div className="p-2">
            <div className="px-3 py-1 text-sm text-gray-500">선택지</div>
            {choiceTypes.map(({ type, label }) => (
              <button
                key={type}
                onClick={() => handleTypeSelect(type)}
                className={`w-full px-3 py-2 text-left flex items-center gap-2 rounded hover:bg-gray-100 ${
                  currentType === type ? 'bg-gray-50' : ''
                }`}
              >
                {type === FormSectionKind.checkbox && (
                  <CheckBox variant="text" />
                )}
                {type === FormSectionKind.radiobox && (
                  <RadioBox variant="text" />
                )}
                {type === FormSectionKind.dropdown && (
                  <DropDownBox variant="text" />
                )}
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
