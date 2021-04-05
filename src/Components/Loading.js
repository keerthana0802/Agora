// @flow weak

import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';
import classNames from 'classnames';

const styleSheet = (theme) => ({
  btnContainer: {
    display: 'flex',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'absolute'
  },
  blocked: {
    position: 'fixed',
    width: '100%',
    height: '100%',
    left: 1,
    top: 0,
    backgroundColor: 'rgba(255,255,255,0.5)',
    transform: 'none',
    zIndex: 2
  }
});

function Loading(props) {
  const { classes, center, blocked } = props;

  return (
    <div
      className={classNames(
        classes.btnContainer,
        { [classes.pageCenter]: center },
        { [classes.blocked]: blocked }
      )}
    >
      <CircularProgress
        size={40}
        color="primary"
      />
    </div>
  );
}

export default withStyles(styleSheet)(Loading);
