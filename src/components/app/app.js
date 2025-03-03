import React, { Component } from 'react';
import { Layout, Spin, Alert } from 'antd';

import MoviesList from '../movies-list';
import MoviesServices from '../../services/movies-services';
import MoviesError from '../movies-error';

import './app.css';

export default class App extends Component {
  moviesServices = new MoviesServices();

  state = {
    movies: [],
    loading: true,
    error: false,
  };

  constructor() {
    super();
    this.updateMovie();
  }

  onMoviesLoaded = (movies) => {
    this.setState({ movies, loading: false });
  };

  onError = (err) => {
    console.log(err);
    this.setState({ error: true, loading: false });
  };

  updateMovie() {
    this.moviesServices.getMovies('return').then(this.onMoviesLoaded).catch(this.onError);
  }

  render() {
    const { movies, loading, error } = this.state;

    const content = !error ? <MoviesView movies={movies} loading={loading} /> : <MoviesError />;
    const checkInternet = !navigator.onLine ? (
      <Alert message="Error" description="Something has gone.Couldn't display movies" type="error" showIcon closable />
    ) : (
      content
    );
    return (
      <div className="app">
        <Layout className="layout">
          <Layout.Content>{checkInternet}</Layout.Content>
        </Layout>
      </div>
    );
  }
}

const MoviesView = ({ movies, loading }) => {
  return (
    <Spin tip="Loading" size="large" spinning={loading} className="spin">
      <MoviesList movies={movies} />
    </Spin>
  );
};
