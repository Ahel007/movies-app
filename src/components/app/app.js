import React, { Component } from 'react';
import { Layout, Spin, Alert, Input } from 'antd';
import { debounce } from 'lodash';

import MoviesList from '../movies-list';
import MoviesServices from '../../services/movies-services';
import MoviesError from '../movies-error';

import './app.css';

export default class App extends Component {
  moviesServices = new MoviesServices();

  state = {
    movies: [],
    page: 1,
    totalResults: null,
    value: '',
    loading: false,
    error: false,
  };

  componentDidUpdate(...prev) {
    const { page, value } = this.state;
    if (page !== prev[1].page) {
      this.updateMovie(value, page);
    }
  }

  onMoviesLoaded = (movies) => {
    const { results, totalResults } = movies;
    this.setState({ movies: results, loading: false, totalResults });
  };

  onError = (err) => {
    console.log(err);
    this.setState({ error: true, loading: false });
  };

  updateMovie(text, page) {
    this.moviesServices.getMovies(text, page).then(this.onMoviesLoaded).catch(this.onError);
  }

  debounceUpdateMovie = debounce(() => {
    this.updateMovie(this.state.value);
  }, 2000);

  search = (e) => {
    this.setState({ value: e.target.value, loading: true, movies: [] });
    if (e.target.value) {
      this.debounceUpdateMovie();
    } else {
      this.setState({ loading: false, totalResults: null });
    }
  };

  onChangePage = (page) => {
    this.setState({ page });
  };

  render() {
    const { movies, loading, error, value, totalResults } = this.state;
    const content = !error ? (
      <MoviesView movies={movies} loading={loading} onChangePage={this.onChangePage} totalResults={totalResults} />
    ) : (
      <MoviesError />
    );
    const checkInternet = !navigator.onLine ? (
      <Alert message="Error" description="Something has gone.Couldn't display movies" type="error" showIcon closable />
    ) : (
      content
    );
    const notMovies = (
      <Alert message="Warning" description="Couldn't find a movie with that name" type="warning" showIcon closable />
    );
    return (
      <div className="app">
        <Layout className="layout">
          <Input placeholder="Type to search..." className="layout__input" onChange={this.search} value={value} />
          <Layout.Content>{totalResults === 0 && !loading ? notMovies : checkInternet}</Layout.Content>
        </Layout>
      </div>
    );
  }
}

const MoviesView = ({ movies, loading, onChangePage, totalResults }) => {
  return (
    <Spin tip="Loading" size="large" spinning={loading} className="spin">
      <MoviesList movies={movies} onChangePage={onChangePage} totalResults={totalResults} />
    </Spin>
  );
};
