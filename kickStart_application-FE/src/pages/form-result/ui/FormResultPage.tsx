import { useAppSelector } from '@shared/lib/store';
import { FormSectionKind, FormSectionType } from '@entities/form';
import { useNavigate } from 'react-router';
import { OptionItem } from '@entities/form/model/types';

export const FormResultPage = () => {
  const navigate = useNavigate();
  const formSections = useAppSelector((state) => state.form.formList);
  const answers = useAppSelector((state) => state.form.answers);

  const renderAnswer = (sectionId: string, section: FormSectionType) => {
    const answer = answers.find((a) => a.sectionId === sectionId);
    if (!answer) return <div className="text-gray-500">응답 없음</div>;

    switch (section.type) {
      case FormSectionKind.shortText:
        return <div>{answer.value as string}</div>;
      case FormSectionKind.longText: {
        const lines = (answer.value as string).split('\n');

        return (
          <div className="whitespace-pre-wrap">
            {lines.map((line, index) => (
              <div key={index} className={'mb-1.5'}>
                {line}
              </div>
            ))}
          </div>
        );
      }

      case FormSectionKind.radiobox: {
        const selectedOption = section.options.find(
          (opt: OptionItem) => opt.id === answer.value
        );
        if (selectedOption?.isOther) {
          return (
            <div className="flex items-center gap-2">
              <span>기타:</span>
              <span>{answer.otherText || ''}</span>
            </div>
          );
        }
        return <div>{selectedOption?.text}</div>;
      }

      case FormSectionKind.checkbox: {
        const selectedIds = answer.value as string[];
        return (
          <div className="space-y-1">
            {section.options
              .filter((opt: OptionItem) => selectedIds.includes(opt.id))
              .map((opt: OptionItem) => (
                <div key={opt.id}>
                  {opt.isOther ? (
                    <div className="flex items-center gap-2">
                      <span>기타:</span>
                      <span>{answer.otherText || ''}</span>
                    </div>
                  ) : (
                    opt.text
                  )}
                </div>
              ))}
          </div>
        );
      }

      case FormSectionKind.dropdown: {
        const selectedOption = section.options.find(
          (opt: OptionItem) => opt.id === answer.value
        );
        if (selectedOption?.isOther) {
          return (
            <div className="flex items-center gap-2">
              <span>기타:</span>
              <span>{answer.otherText || ''}</span>
            </div>
          );
        }
        return <div>{selectedOption?.text}</div>;
      }

      default:
        return null;
    }
  };

  return (
    <div className="py-6 space-y-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">설문 응답 결과</h1>

      {formSections.map((section) => {
        if (section.type === FormSectionKind.title) {
          return (
            <div key={section.id} className="p-6 bg-white rounded-lg shadow-sm">
              <h2 className="text-xl font-medium break-words overflow-hidden">
                {section.title}
              </h2>
              {section.description && (
                <p className="text-gray-600 mt-2 break-words overflow-hidden">
                  {section.description}
                </p>
              )}
            </div>
          );
        }

        return (
          <div key={section.id} className="p-6 bg-white rounded-lg shadow-sm">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="w-full">
                  <h3 className="text-base font-medium break-words overflow-hidden">
                    {section.title}
                  </h3>
                </div>
                {section.isRequired && (
                  <div className="inline-flex items-center shrink-0">
                    <span className="text-red-500">* 필수</span>
                  </div>
                )}
              </div>

              <div className="mt-2 pl-4 border-l-4 border-purple-200 break-words overflow-hidden">
                {renderAnswer(section.id, section)}
              </div>
            </div>
          </div>
        );
      })}

      <div className="flex justify-end space-x-4 mt-8">
        <button
          onClick={() => navigate('/preview')}
          className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
        >
          뒤로 가기
        </button>
      </div>
    </div>
  );
};
