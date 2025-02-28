import React, { Component } from 'react';
import { List, Layout, Image, Typography, Button, Flex } from 'antd';
import { format } from 'date-fns';

import MoviesServices from '../../services/movies-services';

import './app.css';

export default class App extends Component {
  moviesServices = new MoviesServices();

  state = {
    movies: [],
  };

  constructor() {
    super();
    this.updateMovie();
  }

  updateMovie() {
    this.moviesServices.getMovies('return').then((movies) => {
      this.setState({ movies });
    });
  }

  cropDescription(text) {
    if (text.length >= 250) {
      const crop = text.slice(0, 250);
      return crop.slice(0, crop.lastIndexOf(' ')) + ' ...';
    }
    return text;
  }

  render() {
    return (
      <div className="app">
        <Layout className="layout">
          <Layout.Content>
            <List
              grid={{ column: 2 }}
              dataSource={this.state.movies}
              className="list"
              renderItem={(movie) => (
                <List.Item className="list__item">
                  <Layout>
                    <Layout.Sider className="list__sider" width={183}>
                      <Image
                        src={
                          movie.poster
                            ? `https://image.tmdb.org/t/p/w500${movie.poster}`
                            : 'https://avatars.mds.yandex.net/i?id=ad23d8603b33eb7b8fa2315dd97c79278d1e04073eb1e3d4-12447078-images-thumbs&n=13'
                        }
                        width={183}
                        height={281}
                        alt="The film's logo"
                      />
                    </Layout.Sider>
                    <Layout className="list__body">
                      <Layout.Header className="list__header">
                        <Typography.Title level={2} className="list__title">
                          {movie.title}
                        </Typography.Title>
                      </Layout.Header>
                      <Typography.Text type="secondary">
                        {movie.releaseDate ? format(new Date(movie.releaseDate), 'LLLL d, yyyy') : null}
                      </Typography.Text>
                      <Flex gap="small">
                        <Button block className="list__button">
                          Default
                        </Button>
                        <Button block className="list__button">
                          Default
                        </Button>
                      </Flex>
                      <Typography.Text className="list__content">
                        {this.cropDescription(movie.description)}
                      </Typography.Text>
                    </Layout>
                  </Layout>
                </List.Item>
              )}
            />
          </Layout.Content>
        </Layout>
      </div>
    );
  }
}
