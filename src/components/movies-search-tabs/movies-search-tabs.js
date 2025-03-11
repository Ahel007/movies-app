import { Alert, Input, Layout } from 'antd';
import { debounce } from 'lodash';
import React, { Component } from 'react';

import MoviesServices from '../../services/movies-services';
import MoviesError from '../movies-error';
import MoviesView from '../movies-view';

import './movies-search-tabs.css';

export default class MoviesSearchTabs extends Component {
  moviesServices = new MoviesServices();

  state = {
    movies: [],
    value: '',
    totalResults: null,
    loading: false,
    error: false,
    page: 1,
  };

  componentDidUpdate(...prev) {
    const { page, value } = this.state;
    if (page !== prev[1].page) {
      this.updateMovie(value, page);
    }
  }

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

  onMoviesLoaded = (movies) => {
    const { results, totalResults } = movies;
    this.setState({ movies: results, loading: false, totalResults });
  };

  onError = (err) => {
    console.log(err);
    this.setState({ error: true, loading: false });
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
      <>
        <Input placeholder="Type to search..." className="layout__input" onChange={this.search} value={value} />{' '}
        <Layout.Content>{totalResults === 0 && !loading ? notMovies : checkInternet}</Layout.Content>
      </>
    );
  }
}
