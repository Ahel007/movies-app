import React, { Component } from 'react';
import { List, Layout, Image, Typography, Flex, Rate } from 'antd';
import { format } from 'date-fns';

import MoviesServices from '../../services/movies-services';
import MoviesRate from '../movies-rate';
import MoviesGenre from '../movies-genre';

import './movies-list.css';

export default class MoviesList extends Component {
  moviesService = new MoviesServices();

  cropDescription(text) {
    const crop = text.slice(0, 205);
    if (text.length >= 205 && window.innerWidth >= 700) {
      return crop.slice(0, crop.lastIndexOf(' ')) + ' ...';
    }

    return crop;
  }

  cropTitle(text) {
    if (text.length >= 37 && window.innerWidth >= 600) {
      const crop = text.slice(0, 37);
      return crop.slice(0, crop.lastIndexOf(' ')) + ' ...';
    }
    return text;
  }

  render() {
    const { movies, onChangePage, totalResults, guestSessionId } = this.props;
    return (
      <List
        grid={{ gutter: 32, column: window.innerWidth < 1010 ? 1 : 2 }}
        dataSource={movies}
        className="list"
        pagination={{
          pageSize: 20,
          total: totalResults,
          align: 'center',
          onChange: (a) => {
            onChangePage(a);
          },
        }}
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
                <Flex justify="space-between">
                  <Layout.Header className="list__header">
                    <Typography.Title level={2} className="list__title">
                      {this.cropTitle(movie.title)}
                    </Typography.Title>
                  </Layout.Header>
                  <MoviesRate rate={movie.rate} />
                </Flex>
                <Typography.Text type="secondary">
                  {movie.releaseDate ? format(new Date(movie.releaseDate), 'LLLL d, yyyy') : null}
                </Typography.Text>
                <MoviesGenre movie={movie} />
                <Typography.Text className="list__content">{this.cropDescription(movie.description)}</Typography.Text>
                <Rate
                  className="list__rate"
                  count={10}
                  allowHalf
                  defaultValue={movie.rating}
                  onChange={(rate) => {
                    this.moviesService.addRating(movie.id, rate, guestSessionId);
                  }}
                />
              </Layout>
            </Layout>
          </List.Item>
        )}
      />
    );
  }
}
