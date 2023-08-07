import { useState, useEffect } from 'react';

const KEY = '18ece9a9';

function useMovies(query, callback) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  useEffect(
    function () {
      const abortController = new AbortController();
      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError('');
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            {
              signal: abortController.signal,
            }
          );

          if (!res.ok)
            throw new Error('Something went wrong with fetching movies');

          const data = await res.json();

          if (data.Response === 'False') throw new Error(data.Error);

          setMovies(data.Search);
        } catch (error) {
          // console.error(error.message);
          setMovies([]);
          if (error.name !== 'AbortError') setError(error.message);
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        setError('');
        return;
      }

      // handleCloseMovie();
      callback?.();
      fetchMovies();

      return () => abortController.abort();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [query]
  );

  return [movies, isLoading, error];
}

export { useMovies };
