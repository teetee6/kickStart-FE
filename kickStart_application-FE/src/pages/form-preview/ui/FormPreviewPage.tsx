import { useAppDispatch, useAppSelector } from '@shared/lib/store';
import { clearAnswers, FormSectionKind, FormSectionType } from '@entities/form';
import { updateAnswer } from '@entities/form';
import { PreviewTextAnswerInput } from '@features/form-preview';
import { PreviewDropdown } from '@features/dropdown';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useRemoveQueryParam } from '@shared/lib/hooks';
import { CheckBox, RadioBox } from '@shared/ui/image';
import { isNil } from '@shared/lib/utils';

export const FormPreviewPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const formSections = useAppSelector((state) => state.form.formList);
  const answers = useAppSelector((state) => state.form.answers);
  const [isSubmittable, setIsSubmittable] = useState(false);

  useRemoveQueryParam(['edit']);

  const handleAnswerChange = (
    sectionId: string,
    value: string | string[],
    otherText?: string
  ) => {
    dispatch(updateAnswer({ sectionId, value, otherText }));
  };

  const renderSection = (section: FormSectionType) => {
    const answer = answers.find((a) => a.sectionId === section.id);

    switch (section.type) {
      case FormSectionKind.title:
        return (
          <div
            key={section.id}
            className="p-6 bg-white rounded-lg shadow-sm space-y-2"
          >
            <div className="w-full text-[24pt] font-[docs-Roboto] font-normal leading-[1.25] tracking-[0] break-words overflow-hidden">
              {section.title}
            </div>
            {section.description && (
              <div className="text-gray-600 break-words overflow-hidden">
                {section.description}
              </div>
            )}
          </div>
        );

      case FormSectionKind.shortText:
      case FormSectionKind.longText: {
        return (
          <div
            key={section.id}
            className="p-6 bg-white rounded-lg shadow-sm space-y-4"
          >
            <div className="space-y-1">
              <h3 className="text-base font-medium break-words overflow-hidden">
                {section.title}
                {section.isRequired && (
                  <span className="text-red-500 ml-1">*</span>
                )}
              </h3>
            </div>
            <PreviewTextAnswerInput
              section={section}
              answer={answer}
              handleAnswerChange={handleAnswerChange}
            />
          </div>
        );
      }
      case FormSectionKind.radiobox: {
        const selectedId = answer?.value as string;
        const otherText = answer?.otherText || '';

        return (
          <div
            key={section.id}
            className="p-6 bg-white rounded-lg shadow-sm space-y-4"
          >
            <div className="space-y-1">
              <h3 className="text-base font-medium break-words overflow-hidden">
                {section.title}
                {section.isRequired && (
                  <span className="text-red-500 ml-1">*</span>
                )}
              </h3>
            </div>
            <div className="space-y-2">
              {section.options.map((option) => (
                <label key={option.id} className="flex items-center gap-2">
                  <RadioBox
                    size={'sm'}
                    value={option.id}
                    checked={selectedId === option.id}
                    required={section.isRequired && isNil(selectedId)}
                    onChange={(e) => {
                      const checkedId = e.target.value;
                      // 현재 항목 선택 + 기타 란 텍스트 삭제
                      handleAnswerChange(section.id, checkedId, '');
                    }}
                  />
                  {option.isOther ? (
                    <div className="flex items-center gap-2">
                      <span>기타:</span>
                      <input
                        type="text"
                        placeholder="기타..."
                        value={otherText}
                        onChange={(e) => {
                          const newOtherText = e.target.value;
                          const checkedId = option.id;

                          handleAnswerChange(
                            section.id,
                            checkedId,
                            newOtherText
                          );
                        }}
                        className="px-2 py-1 border rounded"
                      />
                    </div>
                  ) : (
                    <span>{option.text}</span>
                  )}
                </label>
              ))}
            </div>
            {/* 선택 해제 버튼 */}
            {selectedId && (
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-sm text-gray-500 hover:text-gray-700"
                  onClick={() => handleAnswerChange(section.id, '', '')}
                >
                  선택 해제
                </button>
              </div>
            )}
          </div>
        );
      }

      case FormSectionKind.checkbox: {
        const selectedIds = (answer?.value as string[]) || [];
        const otherText = answer?.otherText || '';

        return (
          <div
            key={section.id}
            className="p-6 bg-white rounded-lg shadow-sm space-y-4"
          >
            <div className="space-y-1">
              <h3 className="text-base font-medium break-words overflow-hidden">
                {section.title}
                {section.isRequired && (
                  <span className="text-red-500 ml-1">*</span>
                )}
              </h3>
            </div>
            <div className="space-y-2">
              {section.options.map((option) => (
                <label key={option.id} className="flex items-center gap-2">
                  <CheckBox
                    size={'sm'}
                    value={option.id}
                    checked={selectedIds.includes(option.id)}
                    required={section.isRequired && selectedIds.length === 0}
                    onChange={(e) => {
                      const checkedId = e.target.value;
                      const isChecked = e.target.checked;

                      const checkedIds = isChecked
                        ? [...selectedIds, checkedId]
                        : selectedIds.filter((id) => id !== checkedId);

                      let newOtherText = otherText;
                      if (!isChecked && option.isOther) {
                        newOtherText = '';
                      }
                      handleAnswerChange(section.id, checkedIds, newOtherText);
                    }}
                  />
                  {option.isOther ? (
                    <div className="flex items-center gap-2">
                      <span>기타:</span>
                      <input
                        type="text"
                        placeholder="기타..."
                        value={otherText}
                        onChange={(e) => {
                          const checkedId = option.id;
                          const newOtherText = e.target.value;

                          const checkedIds = newOtherText
                            ? [...selectedIds, checkedId]
                            : selectedIds.filter((id) => id !== checkedId);

                          handleAnswerChange(
                            section.id,
                            checkedIds,
                            newOtherText
                          );
                        }}
                        className="px-2 py-1 border rounded"
                      />
                    </div>
                  ) : (
                    <span>{option.text}</span>
                  )}
                </label>
              ))}
            </div>
          </div>
        );
      }
      case FormSectionKind.dropdown: {
        const otherText = answer?.otherText || '';

        return (
          <div
            key={section.id}
            className="p-6 bg-white rounded-lg shadow-sm space-y-4"
          >
            <div className="space-y-1">
              <h3 className="text-base font-medium break-words overflow-hidden">
                {section.title}
                {section.isRequired && (
                  <span className="text-red-500 ml-1">*</span>
                )}
              </h3>
            </div>
            <PreviewDropdown
              value={(answer?.value as string) || ''}
              options={section.options}
              onChange={(value) => handleAnswerChange(section.id, value)}
              required={section.isRequired}
            />
            {section.options.some(
              (opt) => opt.isOther && opt.id === answer?.value
            ) && (
              <input
                type="text"
                placeholder="기타..."
                value={otherText}
                onChange={(e) => {
                  const newOtherText = e.target.value;

                  handleAnswerChange(
                    section.id,
                    answer?.value as string,
                    newOtherText
                  );
                }}
                className="w-full px-3 py-2 border rounded-md mt-2"
              />
            )}
          </div>
        );
      }

      default:
        return null;
    }
  };

  // 모든 필수 항목이 답변되었는지 확인
  useEffect(() => {
    const isAllRequiredAnswered = formSections.every((section) => {
      // title section은 제외
      if (section.type === FormSectionKind.title) return true;

      // required가 아닌 항목은 제외
      if (!section.isRequired) return true;

      const answer = answers.find((a) => a.sectionId === section.id);
      if (!answer) return false;

      // 답변 유효성 검사
      switch (section.type) {
        case FormSectionKind.shortText:
        case FormSectionKind.longText: {
          const value = answer.value as string;
          return value?.trim() !== '';
        }

        case FormSectionKind.dropdown:
        case FormSectionKind.radiobox: {
          const value = answer.value as string;
          return !!value; // 이미 선택된 id 값
        }

        case FormSectionKind.checkbox: {
          const values = answer.value as string[];
          return values.length > 0; // 이미 선택된 id 배열
        }

        default:
          return false;
      }
    });

    setIsSubmittable(isAllRequiredAnswered);
  }, [formSections, answers]);

  return (
    <div className="py-6 space-y-4 max-w-3xl mx-auto">
      {formSections.map((section) => renderSection(section))}
      <div className="flex justify-between mt-8">
        <button
          type="button"
          className={`px-4 py-2 rounded-md transition-colors ${
            isSubmittable
              ? 'bg-purple-600 text-white hover:bg-purple-700'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
          onClick={() => {
            if (isSubmittable) {
              navigate('/result');
            }
          }}
          disabled={!isSubmittable}
        >
          제출
        </button>
        <button
          type="button"
          className="px-4 py-2 text-purple-600 hover:text-purple-700"
          onClick={() => {
            if (window.confirm('모든 답변이 지워집니다. 계속하시겠습니까?')) {
              dispatch(clearAnswers());
            }
          }}
        >
          양식 지우기
        </button>
      </div>
    </div>
  );
};
