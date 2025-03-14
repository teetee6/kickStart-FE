export {
  default as formReducer,
  updateTitle,
  updateDescription,
  addSection,
  removeSection,
  duplicateSection,
  toggleRequired,
  updateOptions,
  reorderSections,
  updateFocusedIndex,
  updateHoveredIndex,
  updateSectionType,
  updateAnswer,
  clearAnswers,
} from './model/slice';
export { selectCurrentForm } from './model/selectors';
export {
  type FormSectionType,
  type TitleSectionType,
  type TextSectionType,
  type OptionsSectionType,
  FormSectionKind,
  type FormSectionKindType,
} from './model/types';

export {
  isTitleSection,
  isTextInputSection,
  isOptionsSection,
} from './lib/validateSectionType';
