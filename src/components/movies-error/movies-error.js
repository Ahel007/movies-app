import React from 'react';
import { Alert } from 'antd';

const MoviesError = () => {
  return (
    <Alert message="Error" description="Something has gone.Couldn't display movies" type="error" showIcon closable />
  );
};

export default MoviesError;
