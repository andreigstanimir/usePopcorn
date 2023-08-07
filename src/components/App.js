import { useState } from 'react';
import { useMovies } from '../custom_hooks/useMovies';
import { useLocalStorageState } from '../custom_hooks/useLocalStorageState';
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';
import NavBar from './NavBar';
import Logo from './Logo';
import Search from './Search';
import NumResults from './NumResults';
import Main from './Main';
import Box from './Box';
import MovieList from './MovieList';
import MovieDetails from './MovieDetails';
import Summary from './Summary';
import WatchedMoviesList from './WatchedMoviesList';

export const average = arr =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export const KEY = '18ece9a9';

export default function App() {
  const [query, setQuery] = useState('');

  const [movies, isLoading, error] = useMovies(query, handleCloseMovie);

  const [watched, setWatched] = useLocalStorageState('watched');

  const [selectedId, setSelectedId] = useState(null);

  function handleSelectMovie(id) {
    setSelectedId(selectedId => (selectedId === id ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched(watched => [...watched, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched(watched => watched.filter(movie => movie.imdbID !== id));
  }

  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {isLoading && !error && <Loader />}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <Summary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
