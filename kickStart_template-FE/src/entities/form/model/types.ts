export enum FormSectionKind {
  none,
  title, // 제목 섹션
  shortText, // 단답형
  longText, // 장문형
  radiobox, // 객관식 질문
  checkbox, // 체크박스
  dropdown, // 드롭다운
}
export type FormSectionKindType = FormSectionKind;

interface BaseSection {
  id: string;
  type: FormSectionKind;
  title: string;
  isRequired: boolean;
}

export interface TitleSectionType extends Omit<BaseSection, 'isRequired'> {
  type: FormSectionKind.title;
  description?: string;
}

export interface TextSectionType extends BaseSection {
  type: FormSectionKind.shortText | FormSectionKind.longText;
  description?: string;
}

export type OptionItem = {
  id: string;
  text: string;
  isOther: boolean;
};

export interface OptionsSectionType extends BaseSection {
  type:
    | FormSectionKind.radiobox
    | FormSectionKind.checkbox
    | FormSectionKind.dropdown;
  options: Array<OptionItem>;
}

export type FormSectionType =
  | TitleSectionType
  | TextSectionType
  | OptionsSectionType;

export interface FormAnswer {
  sectionId: string;
  value: string | string[]; // 단답형/장문형/라디오박스/드롭다운= string, 체크박스= string[] - 선택된 option id 들
  otherText?: string;
}
