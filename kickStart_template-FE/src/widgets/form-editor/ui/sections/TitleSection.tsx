import { useAppDispatch } from '@shared/lib/store';
import { updateTitle, updateDescription } from '@entities/form/model/slice';
import { TitleSectionType } from '@entities/form/model/types';
import { EditableDiv } from '@shared/ui/editable';

export interface TitleSectionProps {
  formSectionData: TitleSectionType;
  currentIndex: number;
  isFocused?: boolean;
}

export const TitleSection = ({
  formSectionData,
  currentIndex,
  isFocused,
}: TitleSectionProps) => {
  const dispatch = useAppDispatch();

  return (
    <div className="relative">
      <div className="absolute top-0 left-0 right-0 h-2.5 bg-purple-600 rounded-t-lg" />

      <div
        className={`bg-white rounded-lg shadow-sm border-x border-b ${
          isFocused
            ? 'border-purple-200 border-l-4 border-l-blue-500'
            : 'border-purple-200'
        }`}
      >
        <div className="p-6 space-y-6">
          <EditableDiv
            textValue={formSectionData.title}
            isEditableMode={true}
            className="w-full text-[24pt] font-[docs-Roboto] font-normal leading-[1.25] tracking-[0] border-b border-transparent hover:border-gray-300 focus:border-purple-500 focus:outline-none transition-colors"
            placeholder="제목을 입력하세요"
            multiline={false}
            onInput={{
              afterCallback: (inputText: string) => {
                dispatch(updateTitle({ currentIndex, title: inputText }));
              },
            }}
          />
          <EditableDiv
            textValue={formSectionData.description}
            isEditableMode={true}
            className="w-full text-base text-gray-600 border-b border-transparent hover:border-gray-300 focus:border-purple-500 focus:outline-none transition-colors whitespace-pre-wrap break-words"
            placeholder="설명을 입력하세요."
            multiline={true}
            onInput={{
              afterCallback: (inputText: string) => {
                dispatch(
                  updateDescription({ currentIndex, description: inputText })
                );
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};
