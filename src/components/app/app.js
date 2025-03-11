import React, { Component } from 'react';
import { Layout } from 'antd';

import MoviesServices from '../../services/movies-services';
import MoviesTabs from '../movies-tabs';
import { Provider } from '../movies-service-context';
import MoviesSearchTabs from '../movies-search-tabs';
import MoviesRatedTabs from '../movies-rated-tabs';

import './app.css';

export default class App extends Component {
  moviesServices = new MoviesServices();

  state = {
    genre: [],
  };

  async componentDidMount() {
    const result = await this.moviesServices.getGenre();
    this.setState({ genre: result });
  }

  render() {
    const items = [
      {
        key: '1',
        label: 'Search',
        children: <MoviesSearchTabs onError={this.onError} onMoviesLoaded={this.onMoviesLoaded} />,
      },
      {
        key: '2',
        label: 'Rated',
        children: <MoviesRatedTabs />,
      },
    ];

    return (
      <div className="app">
        <Provider value={this.state.genre}>
          <Layout className="layout">
            <MoviesTabs items={items} />
          </Layout>
        </Provider>
      </div>
    );
  }
}
