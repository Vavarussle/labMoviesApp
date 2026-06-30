import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getUpcomingMovies } from "../api/tmdb-api";
import { DiscoverMovies, BaseMovieProps } from "../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToPlaylistIcon from "../components/cardIcons/addToPlaylist";
import { MoviesContext } from "../contexts/moviesContext";

const UpcomingMoviesPage: React.FC = () => {
  const context = useContext(MoviesContext);
  const { data, error, isLoading, isError } = useQuery<DiscoverMovies, Error>(
    "upcoming",
    getUpcomingMovies
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data ? data.results : [];

  const mustWatchMovies = movies.map((movie) => ({
    ...movie,
    mustWatch: context?.mustWatch.includes(movie.id),
  }));

  return (
    <PageTemplate
      title="Upcoming Movies"
      movies={mustWatchMovies}
      action={(movie: BaseMovieProps) => {
        return <AddToPlaylistIcon {...movie} />;
      }}
    />
  );
};

export default UpcomingMoviesPage;