export const MediaBreakpoint = {
  MOBILE: {
    width: 930,
    query: '(max-width: 930px)',
  },
  TABLET: {
    width: 1200,
    query: '(min-width: 931px) and (max-width: 1200px)',
  },
  DESKTOP: {
    width: 1201,
    query: '(min-width: 1201px)',
  },
} as const;
