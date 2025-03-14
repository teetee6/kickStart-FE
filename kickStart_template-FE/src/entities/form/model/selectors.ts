import { createSelector } from '@reduxjs/toolkit';

import { FormSectionType } from './types';
import { RootState } from '@app/store';

const selectBase = createSelector(
  (state: RootState) => state,
  (state) => state.form
);

export const selectCurrentForm = createSelector(
  selectBase,
  (state: { formList: FormSectionType[] }) => state.formList
);
