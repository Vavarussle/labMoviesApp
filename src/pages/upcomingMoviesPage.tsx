import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getUpcomingMovies } from "../api/tmdb-api";
import { DiscoverMovies, BaseMovieProps } from "../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToPlaylistIcon from "../components/cardIcons/addToPlaylist";

const UpcomingMoviesPage: React.FC = () => {
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

  return (
    <PageTemplate
      title="Upcoming Movies"
      movies={movies}
      action={(movie: BaseMovieProps) => {
        return <AddToPlaylistIcon {...movie} />;
      }}
    />
  );
};

export default UpcomingMoviesPage;