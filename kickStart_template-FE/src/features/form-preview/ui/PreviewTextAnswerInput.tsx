import { HEADER_HEIGHT } from '@app/layout /layout';
import { TextSectionType } from '@entities/form';
import { FormAnswer, FormSectionKind } from '@entities/form/model/types';
import { useEffect, useRef } from 'react';

export const PreviewTextAnswerInput = ({
  section,
  answer,
  handleAnswerChange,
}: {
  section: TextSectionType;
  answer?: FormAnswer;
  handleAnswerChange: (sectionId: string, value: string) => void;
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = () => {
    const textareaPrevValue = (answer?.value as string) || '';

    if (textareaRef.current) {
      const textarea = textareaRef.current;
      const textareaNextValue = textarea.value;

      const prevLineCount = textareaPrevValue.split('\n').length;
      const nextLineCount = textareaNextValue.split('\n').length;

      if (prevLineCount > nextLineCount) {
        textarea.style.height = 'auto'; // 이전 높이값 초기화(실제 height에 딱 맞게 축소)
      }
      textarea.style.height = `${textarea.scrollHeight}px`;

      // 커서 위치 계산
      const cursorPosition = textarea.selectionStart;
      const textBeforeCursor = textareaNextValue.substring(0, cursorPosition);
      const currentLineCount = textBeforeCursor.split('\n').length;
      const lineHeight = parseInt(window.getComputedStyle(textarea).lineHeight);
      const cursorY = currentLineCount * lineHeight;

      // 헤더 높이를 고려해서, 커서가 헤더에 가려지는지 확인
      const textareaRect = textarea.getBoundingClientRect();
      if (textareaRect.top + cursorY < HEADER_HEIGHT) {
        window.scrollBy({
          top: textareaRect.top - (HEADER_HEIGHT + 20), // 여유 공간 20px
          behavior: 'instant',
        });
      }
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, []);

  if (section.type === FormSectionKind.shortText) {
    return (
      <input
        title="answer For Short Text Question"
        type="text"
        value={(answer?.value as string) || ''}
        onInput={(e) => handleAnswerChange(section.id, e.currentTarget.value)}
        className="w-full p-0 border-0 border-b border-gray-300 focus:border-purple-500 focus:outline-none focus:ring-0"
        required={section.isRequired}
        placeholder="내 답변"
      />
    );
  }

  return (
    <textarea
      ref={textareaRef}
      title="answer For Long Text Question"
      value={(answer?.value as string) || ''}
      onInput={(e) => {
        handleAnswerChange(section.id, e.currentTarget.value);
        adjustHeight();
      }}
      className="w-full p-0 m-0 border-0 border-b border-gray-300 focus:border-purple-500 focus:outline-none focus:ring-0 resize-none bg-transparent leading-normal overflow-hidden"
      required={section.isRequired}
      placeholder="내 답변"
      rows={1}
    />
  );
};
