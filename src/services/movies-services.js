export default class MoviesServices {
  _options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxY2QyYWM2OGM4ZjM5YjNmYzdjZTYwODk1YTVlNGUyMiIsIm5iZiI6MTc0MDQ3NzUyMC41NjQsInN1YiI6IjY3YmQ5NDUwZWM2YTkzOTJhNzJkYjdmMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ij0Hj7LTLqEYAJ_GWSmGHYs1Oz82O7qzdeC14Vh3H0I',
    },
  };

  async getResourse(keyWord, page = 1) {
    const url = `https://api.themoviedb.org/3/search/movie?query=${keyWord}&include_adult=false&language=en-US&page=${page}`;
    const result = await fetch(url, this._options);
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
      };
    });
    return {
      results: result,
      totalResults: movies.total_results,
    };
  }
}
