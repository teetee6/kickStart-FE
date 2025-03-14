import { useEffect } from 'react';

export const useRemoveQueryParam = (fromValues: string[]) => {
  useEffect(() => {
    const excludeHashUrl = new URL(
      window.location.hash.slice(1),
      window.location.origin
    );
    const from = excludeHashUrl.searchParams.get('from');

    if (from && fromValues.includes(from)) {
      const currentPath = window.location.hash.split('?')[0];
      window.history.replaceState(null, '', currentPath);
    }
  }, [fromValues]);
};
