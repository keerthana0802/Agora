import React from 'react';
import Loading from '../Components/Loading';

const LoadableLoading = (props) => {
  if (props.error) {
    return (
      <div>
        Error! Sorry, there was a problem loading the page. Try refreshing?
      </div>
    );
  }
  if (props.pastDelay) {
    return <Loading center />;
  }
  return null;
};

export default LoadableLoading;
