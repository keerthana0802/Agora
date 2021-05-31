import React, { useEffect, useState } from 'react';
// import _get from 'lodash/get';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core';
import './Styles/LoginStyles.css';
import { useDispatch } from 'react-redux';
import { CreateCreators as LoginCreator } from '../../Redux/LoginRedux';
import { useRouteQueryParams } from '../../Hooks';
import { useUserLogin } from './Hooks';
import Loading from '../../Components/Loading';
import Header from '../../Components/Header';

export default function LoginScreen(props) {
  const { loading, error, prevLoading } = useUserLogin(props);
  const dispatch = useDispatch();
  const [queryParams] = useRouteQueryParams();
  const [code, setCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    if (!loading && prevLoading) {
      if (error) {
        setErrorMessage(error);
      }
      setFetching(loading);
    }
  }, [loading, error]);

  const handleCodeEnter = (e) => {
    if (e.key === 'Enter') {
      const { token } = queryParams;
      setFetching(true);
      dispatch(
        LoginCreator.request({
          aid: token,
          code //y4M5qQ
        })
      );
    }
  };

  const handleChangeCode = (event) => {
    if (errorMessage) {
      setErrorMessage('');
    }
    setCode(event.target.value);
  };

  return (
    <div>
      <div>
        <Header />
      </div>
      <Box display="flex" width="100%" height="100%">
        {fetching && <Loading center />}
        <input
          disabled={fetching}
          type="text"
          disable
          value={code}
          onChange={handleChangeCode}
          onKeyDown={handleCodeEnter}
        />
        {errorMessage && <div>{errorMessage}</div>}
      </Box>
    </div>
  );
}
