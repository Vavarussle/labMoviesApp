import React from "react"; // replace existing react import
import { useParams } from "react-router-dom";
import MovieDetails from "../components/movieDetails";
import MovieCast from "../components/movieCast";
import PageTemplate from "../components/templateMoviePage";
import { getMovie, getMovieCredits } from "../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import { MovieDetailsProps, MovieCredits } from "../types/interfaces";

const MovieDetailsPage: React.FC = () => {
  const { id } = useParams();

  const {
    data: movie,
    error: movieError,
    isLoading: movieLoading,
    isError: movieIsError,
  } = useQuery<MovieDetailsProps, Error>(
    ["movie", id],
    () => getMovie(id || "")
  );

  const {
    data: credits,
    error: creditsError,
    isLoading: creditsLoading,
    isError: creditsIsError,
  } = useQuery<MovieCredits, Error>(
    ["movieCredits", id],
    () => getMovieCredits(id || "")
  );

  if (movieLoading || creditsLoading) {
    return <Spinner />;
  }

  if (movieIsError) {
    return <h1>{movieError.message}</h1>;
  }

  if (creditsIsError) {
    return <h1>{creditsError.message}</h1>;
  }

  return (
    <>
      {movie ? (
        <PageTemplate movie={movie}>
          <>
            <MovieDetails {...movie} />

            <MovieCast
              cast={credits ? credits.cast : []}
            />
          </>
        </PageTemplate>
      ) : (
        <p>Waiting for movie details</p>
      )}
    </>
  );
};

export default MovieDetailsPage;
