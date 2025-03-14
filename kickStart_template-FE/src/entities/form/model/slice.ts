import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  FormSectionKindType,
  FormSectionKind,
  FormSectionType,
  TitleSectionType,
  FormAnswer,
} from './types';
import { isNil } from '@shared/lib/utils';

/** Action Payload Type */
interface BasePayload {
  currentIndex: number;
}

interface UpdateTitlePayload extends BasePayload {
  title: string;
}

interface UpdateDescriptionPayload extends BasePayload {
  description: string;
}

interface AddSectionPayload extends BasePayload {
  currentIndex: number;
}

interface UpdateOptionsPayload extends BasePayload {
  options: Array<{ id: string; text: string; isOther: boolean }>;
}

interface UpdateSectionTypePayload {
  currentIndex: number;
  type: FormSectionKindType;
}

interface ReorderSectionsPayload {
  fromIndex: number;
  toIndex: number;
}

interface UpdateFocusIndexPayload {
  index: number;
}

interface UpdateAnswerPayload {
  sectionId: string;
  value: string | string[];
  otherText?: string;
}

/** state Type */
interface FormState {
  formList: FormSectionType[];
  isPreview: boolean;
  focusedIndex: number;
  hoveredIndex: number;
  answers: FormAnswer[];
}

function getDefaultSection(sectionKind: FormSectionKindType): FormSectionType {
  switch (sectionKind) {
    case FormSectionKind.title:
      return {
        id: crypto.randomUUID(),
        type: FormSectionKind.title,
        title: '초기 편집 제목 입니다',
        description: '초기 편집 내용 입니다',
      };
    case FormSectionKind.shortText:
      return {
        id: crypto.randomUUID(),
        type: FormSectionKind.shortText,
        title: '초기 편집 제목 입니다',
        description: '미리보기 답변 입력란 입니다',
        isRequired: false,
      };
    case FormSectionKind.longText:
      return {
        id: crypto.randomUUID(),
        type: FormSectionKind.longText,
        title: '초기 편집 제목 입니다',
        description: '미리보기 답변 입력란 입니다',
        isRequired: false,
      };
    case FormSectionKind.radiobox:
      return {
        id: crypto.randomUUID(),
        type: FormSectionKind.radiobox,
        title: '초기 편집 제목 입니다',
        isRequired: false,
        options: [{ id: crypto.randomUUID(), text: '옵션 1', isOther: false }],
      };
    case FormSectionKind.checkbox:
      return {
        id: crypto.randomUUID(),
        type: FormSectionKind.checkbox,
        title: '초기 편집 제목 입니다',
        isRequired: false,
        options: [{ id: crypto.randomUUID(), text: '옵션 1', isOther: false }],
      };
    case FormSectionKind.dropdown:
      return {
        id: crypto.randomUUID(),
        type: FormSectionKind.dropdown,
        title: '초기 편집 제목 입니다',
        isRequired: false,
        options: [{ id: crypto.randomUUID(), text: '옵션 1', isOther: false }],
      };
    default:
      return {} as FormSectionType;
  }
}

const initialState: FormState = {
  formList: [
    FormSectionKind.title,
    // FormSectionKind.shortText,
    // FormSectionKind.longText,
    // FormSectionKind.radiobox,
    // FormSectionKind.checkbox,
    // FormSectionKind.dropdown,
  ].map(getDefaultSection),
  focusedIndex: 0,
  hoveredIndex: 0,
  isPreview: false,
  answers: [] as FormAnswer[],
};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateTitle: (state, action: PayloadAction<UpdateTitlePayload>) => {
      const { currentIndex, title } = action.payload;
      state.formList[currentIndex].title = title;
    },
    updateDescription: (
      state,
      action: PayloadAction<UpdateDescriptionPayload>
    ) => {
      const { currentIndex, description } = action.payload;
      const section = state.formList[currentIndex];
      if (
        section.type === FormSectionKind.title ||
        section.type === FormSectionKind.shortText ||
        section.type === FormSectionKind.longText
      ) {
        section.description = description;
      }
    },
    addSection: (state, action: PayloadAction<AddSectionPayload>) => {
      const { currentIndex } = action.payload;
      const newSection: FormSectionType = getDefaultSection(
        FormSectionKind.radiobox
      );
      state.formList.splice(currentIndex + 1, 0, newSection);
      state.focusedIndex = currentIndex + 1;
    },
    removeSection: (state, action: PayloadAction<BasePayload>) => {
      const { currentIndex } = action.payload;
      state.formList.splice(currentIndex, 1);
      state.focusedIndex = Math.max(currentIndex - 1, 0);
    },
    duplicateSection: (state, action: PayloadAction<BasePayload>) => {
      const { currentIndex } = action.payload;
      const section = state.formList[currentIndex];

      const newSection = {
        ...section,
        id: crypto.randomUUID(), // 새로운 고유 ID 생성
      };
      if ('options' in newSection) {
        newSection.options = newSection.options.map((option) => ({
          ...option,
          text: option.text,
          isOther: option.isOther,
        }));
      }

      state.formList.splice(currentIndex + 1, 0, newSection);
      state.focusedIndex = currentIndex + 1;
    },
    toggleRequired: (state, action: PayloadAction<BasePayload>) => {
      const { currentIndex } = action.payload;
      const section = state.formList[currentIndex];
      if (section.type !== FormSectionKind.title) {
        section.isRequired = !section.isRequired;
      }
    },
    updateOptions: (state, action: PayloadAction<UpdateOptionsPayload>) => {
      const { currentIndex, options } = action.payload;
      const section = state.formList[currentIndex];
      if ('options' in section) {
        section.options = options;
      }
    },
    reorderSections: (state, action: PayloadAction<ReorderSectionsPayload>) => {
      const { fromIndex, toIndex } = action.payload;
      const [removed] = state.formList.splice(fromIndex, 1);

      state.formList.splice(toIndex, 0, removed);
      state.formList = state.formList.map((section) => {
        const newSection = {
          ...section,
          id: crypto.randomUUID(), // 새 ID 생성(리스트 내 컴포넌트 모두 파괴 후 재생성)
        };

        if ('options' in newSection) {
          newSection.options = newSection.options.map((option) => ({
            ...option,
            id: crypto.randomUUID(), // 옵션에도 새 ID 생성
          }));
        }

        return newSection;
      });
    },
    updateFocusedIndex: (
      state,
      action: PayloadAction<UpdateFocusIndexPayload>
    ) => {
      state.focusedIndex = action.payload.index;
    },
    updateHoveredIndex: (state, action: PayloadAction<{ index: number }>) => {
      state.hoveredIndex = action.payload.index;
    },
    updateSectionType: (
      state,
      action: PayloadAction<UpdateSectionTypePayload>
    ) => {
      const { currentIndex, type } = action.payload;
      const currentSection = state.formList[currentIndex] as Exclude<
        FormSectionType,
        TitleSectionType
      >;
      const newSection = getDefaultSection(type) as Exclude<
        FormSectionType,
        TitleSectionType
      >;

      state.formList[currentIndex] = {
        ...newSection,
        id: currentSection.id,
        title: currentSection.title,
        isRequired: currentSection.isRequired,
      };

      if (
        'description' in currentSection &&
        'description' in state.formList[currentIndex]
      ) {
        state.formList[currentIndex].description = currentSection.description;
      }

      if (
        'options' in currentSection &&
        'options' in state.formList[currentIndex]
      ) {
        state.formList[currentIndex].options = currentSection.options;
      }
    },
    updateAnswer: (state, action: PayloadAction<UpdateAnswerPayload>) => {
      const { sectionId, value, otherText } = action.payload;
      const existingAnswerIndex = state.answers.findIndex(
        (answer) => answer.sectionId === sectionId
      );

      if (existingAnswerIndex !== -1) {
        state.answers[existingAnswerIndex].value = value;
        if (!isNil(otherText)) {
          state.answers[existingAnswerIndex].otherText = otherText;
        }
      } else {
        state.answers.push({
          sectionId,
          value,
          otherText,
        });
      }
    },
    clearAnswers: (state) => {
      state.answers = [];
    },
  },
});

export const {
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
} = formSlice.actions;

export default formSlice.reducer;
