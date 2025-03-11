import { Alert, Layout } from 'antd';
import React, { Component } from 'react';

import MoviesServices from '../../services/movies-services';
import MoviesError from '../movies-error';
import MoviesView from '../movies-view';

import './movies-rated-tabs.css';

export default class MoviesRatedTabs extends Component {
  moviesServices = new MoviesServices();

  state = {
    movies: [],
    totalResults: null,
    loading: true,
    error: false,
    page: 1,
  };

  async componentDidMount() {
    try {
      const guestSessionId = await this.moviesServices.createGuestSession();
      const result = await this.moviesServices.getRatedMovies(this.state.page, guestSessionId);
      this.setState({ movies: result, loading: false });
    } catch (error) {
      this.setState({ error: true });
      console.error(error);
    }
  }

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
    const { movies, loading, error, totalResults } = this.state;

    const content = !error ? (
      <MoviesView movies={movies} loading={loading} onChangePage={this.onChangePage} totalResults={totalResults} />
    ) : (
      <MoviesError />
    );

    const checkInternet = !navigator.onLine ? (
      <Alert message="Error" description="Something has gone. Couldn't display movies" type="error" showIcon closable />
    ) : (
      content
    );

    const notRatedMovies = (
      <Alert message="Warning" description="Couldn't find rated movies" type="warning" showIcon closable />
    );

    return <Layout.Content>{totalResults === 0 && !loading ? notRatedMovies : checkInternet}</Layout.Content>;
  }
}
