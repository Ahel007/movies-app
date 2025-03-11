import React from 'react';
import { Button, Flex } from 'antd';

import { Consumer } from '../movies-service-context';

import './movies-genre.css';

const MoviesGenre = ({ movie }) => {
  return (
    <Consumer>
      {(genre) => {
        return (
          <Flex gap="small" className="list__genre">
            {movie.genreIds.map((id) => {
              return (
                <Button block className="list__button" key={id}>
                  {genre.find((item) => item.id === id).name}
                </Button>
              );
            })}
          </Flex>
        );
      }}
    </Consumer>
  );
};

export default MoviesGenre;
