import React from 'react';
import { Spin } from 'antd';

import MoviesList from '../movies-list';

const MoviesView = ({ movies, loading, onChangePage, totalResults, guestSessionId }) => {
  return (
    <Spin tip="Loading" size="large" spinning={loading} className="spin">
      <MoviesList
        movies={movies}
        onChangePage={onChangePage}
        totalResults={totalResults}
        guestSessionId={guestSessionId}
      />
    </Spin>
  );
};

export default MoviesView;
