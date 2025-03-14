import { FormSectionKind } from '@entities/form';

export const MappingIntoKorean: Record<FormSectionKind, string> = {
  [FormSectionKind.none]: '',
  [FormSectionKind.title]: '',
  [FormSectionKind.shortText]: '단답형',
  [FormSectionKind.longText]: '장문형',
  [FormSectionKind.radiobox]: '객관식 질문',
  [FormSectionKind.checkbox]: '체크박스',
  [FormSectionKind.dropdown]: '드롭다운',
};
