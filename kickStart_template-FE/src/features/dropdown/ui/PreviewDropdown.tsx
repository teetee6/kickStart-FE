import { useClickOutside } from '@shared/lib/hooks';
import { DropDownBox } from '@shared/ui/image';
import { useState } from 'react';

export const PreviewDropdown = ({
  value,
  options,
  onChange,
}: {
  value: string;
  options: Array<{ id: string; text: string }>;
  onChange: (value: string) => void;
  required: boolean;
}) => {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useClickOutside(() => setDropdownOpen(false));

  const selectedOption = options.find((opt) => opt.id === value);

  return (
    <div
      ref={dropdownRef as React.RefObject<HTMLDivElement>}
      className="relative"
    >
      <button
        type="button"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="w-full text-left px-3 py-2 bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        <div className="flex items-center justify-between">
          <span className={`${!value ? 'text-gray-500' : ''}`}>
            {selectedOption?.text || '선택'}
          </span>
          <DropDownBox variant="box" isOpen={dropdownOpen} />
        </div>
      </button>

      {dropdownOpen && (
        <div className="absolute w-full mt-1 bg-white border border-gray-200 rounded shadow-lg z-50">
          <div className="py-1">
            <button
              onClick={() => {
                onChange('');
                setDropdownOpen(false);
              }}
              className={`w-full px-3 py-2 text-left hover:bg-gray-100 ${
                !value ? 'bg-gray-50' : ''
              }`}
            >
              선택
            </button>
            {options.map((option) => (
              <button
                key={option.id}
                onClick={() => {
                  onChange(option.id);
                  setDropdownOpen(false);
                }}
                className={`w-full px-3 py-2 text-left hover:bg-gray-100 ${
                  value === option.id ? 'bg-gray-50' : ''
                }`}
              >
                {option.text}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
