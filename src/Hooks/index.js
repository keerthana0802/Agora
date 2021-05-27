import { useCallback, useMemo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import qs from 'qs';

export function useRouteQueryParams() {
  const location = useLocation();
  const history = useHistory();

  const queryParams = useMemo(
    () => qs.parse(location.search, { ignoreQueryPrefix: true }),
    [location.search]
  );

  const setQueryParams = useCallback(
    (newParams) => {
      const newQueryParams = { ...queryParams, ...newParams };
      history.push({
        ...location,
        search: qs.stringify(newQueryParams)
      });
    },
    [location]
  );

  return [queryParams, setQueryParams];
}
