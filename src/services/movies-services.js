export default class MoviesServices {
  _apiKey = '1cd2ac68c8f39b3fc7ce60895a5e4e22';

  _apiToken =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxY2QyYWM2OGM4ZjM5YjNmYzdjZTYwODk1YTVlNGUyMiIsIm5iZiI6MTc0MDQ3NzUyMC41NjQsInN1YiI6IjY3YmQ5NDUwZWM2YTkzOTJhNzJkYjdmMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ij0Hj7LTLqEYAJ_GWSmGHYs1Oz82O7qzdeC14Vh3H0I';

  _optionsGET = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${this._apiToken}`,
    },
  };
  _optionsPOST = (rate) => {
    return {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${this._apiToken}`,
      },
      body: JSON.stringify({ value: rate }),
    };
  };

  async getResourse(keyWord, page = 1) {
    const url = `https://api.themoviedb.org/3/search/movie?query=${keyWord}&include_adult=false&language=en-US&page=${page}`;
    const result = await fetch(url, this._optionsGET);
    if (!result.ok) {
      throw new Error(`Could not fetch ${url}, received ${result.status}`);
    }
    return result.json();
  }

  async getMovies(keyWord, page) {
    const movies = await this.getResourse(keyWord, page);
    const result = movies.results.map((movie) => {
      return {
        title: movie.title,
        description: movie.overview,
        releaseDate: movie.release_date,
        poster: movie.poster_path,
        genreIds: movie.genre_ids,
        rate: movie.vote_average,
        id: movie.id,
      };
    });
    return {
      results: result,
      totalResults: movies.total_results,
    };
  }

  async getGenre() {
    const url = 'https://api.themoviedb.org/3/genre/movie/list?language=en';

    const result = await fetch(url, this._optionsGET)
      .then((res) => res.json())
      .then((json) => json)
      .catch((err) => console.error(err));

    return result.genres;
  }

  async addRating(movieId, rate, guestSessionId) {
    const url = `https://api.themoviedb.org/3/movie/${movieId}/rating?guest_session_id=${guestSessionId}`;

    fetch(url, this._optionsPOST(rate))
      .then((res) => res.json())
      .then((json) => {
        if (!json.success) {
          throw new Error('Couldnt rate the movie');
        }
        return json;
      })
      .catch((err) => console.error(err));
  }

  async createGuestSession() {
    const url = 'https://api.themoviedb.org/3/authentication/guest_session/new';

    const result = await fetch(url, this._optionsGET)
      .then((res) => res.json())
      .then((json) => {
        if (!json.success) {
          throw new Error('Failed to create guest session');
        }
        return json;
      })
      .catch((err) => console.error(err));
    return result.guest_session_id;
  }

  async getRatedMovies(page = 1, guestSessionId) {
    const url = `https://api.themoviedb.org/3/guest_session/${guestSessionId}/rated/movies?language=en-US&page=${page}&sort_by=created_at.asc`;

    const movies = await fetch(url, this._optionsGET)
      .then((res) => res.json())
      .then((json) => {
        return json;
      })
      .catch((err) => console.error(err));
    const result = movies.results.map((movie) => {
      return {
        title: movie.title,
        description: movie.overview,
        releaseDate: movie.release_date,
        poster: movie.poster_path,
        genreIds: movie.genre_ids,
        rate: movie.vote_average,
        id: movie.id,
        rating: movie.rating,
      };
    });
    return {
      results: result,
      totalResults: movies.total_results,
    };
  }
}
