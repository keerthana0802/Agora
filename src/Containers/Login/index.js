import React, {useEffect}  from 'react';
// import _get from 'lodash/get';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core';
import './Styles/LoginStyles.css'
import { useDispatch } from 'react-redux';
import {CreateCreators as LoginCreator} from '../../Redux/LoginRedux'

// const useStyles = makeStyles((theme) => ({}));

export default function LoginScreen() {
	const dispatch = useDispatch();

	// useEffect(() => {
 //    	dispatch(LoginCreator.request({
	// 	  "aid": "wfeye-ttk3m--9w",
	// 	  "code": "y4M5qQ"
	// 	}));
 //  	});

  return (
    <Box display="flex" width="100%" height="100%">
      Enter passcode
    </Box>
  );
}
