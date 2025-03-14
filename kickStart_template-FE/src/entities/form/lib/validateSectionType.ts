import { FormSectionKind, FormSectionType } from '../model/types';

const isSectionType = (
  sectionType: FormSectionKind,
  targetTypes: FormSectionKind[]
): boolean => {
  return targetTypes.includes(sectionType);
};

export const isTitleSection = (formSection: FormSectionType): boolean => {
  return isSectionType(formSection.type, [FormSectionKind.title]);
};

export const isTextInputSection = (formSection: FormSectionType): boolean => {
  return isSectionType(formSection.type, [
    FormSectionKind.shortText,
    FormSectionKind.longText,
  ]);
};

export const isOptionsSection = (formSection: FormSectionType): boolean => {
  return isSectionType(formSection.type, [
    FormSectionKind.radiobox,
    FormSectionKind.checkbox,
    FormSectionKind.dropdown,
  ]);
};
