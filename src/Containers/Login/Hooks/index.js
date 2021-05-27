import { useCallback, useEffect, useRef, useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import _get from 'lodash/get';

export function useUserLogin(props) {
  const prevLoadingRef = useRef(false);

  const userData = useSelector((state) =>
    _get(state, ['session', 'data'], null)
  );
  const loading = useSelector((state) =>
    _get(state, ['session', 'fetching'], false)
  );
  const error = useSelector((state) =>
    _get(state, ['session', 'error', 'error'], null)
  );

  useEffect(() => {
    prevLoadingRef.current = loading;
  });

  useLayoutEffect(() => {
    if (!loading && prevLoadingRef.current) {
      if (error) {
        const errorMessage = _get(error, 'message') || '';
        console.log('Error!', errorMessage);
        return;
      }
      const { role } = userData;

      if (role === 'student') {
        props.history.push('/');
      }

      if (role === 'teacher') {
        props.history.push('/teacher');
      }
    }
  }, [loading, error]);

  return { loading, error, prevLoading: prevLoadingRef.current };
}
