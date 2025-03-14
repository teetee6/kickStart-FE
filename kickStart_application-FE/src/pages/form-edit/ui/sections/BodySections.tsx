// (0번째 외 섹션들)
import { FormSection } from '@widgets/form-editor';
import { FormSectionType } from '@entities/form/model/types';

interface BodySectionsProps {
  sections: FormSectionType[];
  onRefUpdate: (index: number, el: HTMLDivElement | null) => void;
}

export const BodySections = ({ sections, onRefUpdate }: BodySectionsProps) => {
  return (
    <div className="flex flex-col gap-4">
      {sections.map((sectionData, index) => {
        if (index === 0) return null;
        return (
          <div key={sectionData.id} ref={(el) => onRefUpdate(index, el)}>
            <FormSection
              key={`section-${sectionData.id}`}
              formSectionData={sectionData}
              currentIndex={index}
            />
          </div>
        );
      })}
    </div>
  );
};
