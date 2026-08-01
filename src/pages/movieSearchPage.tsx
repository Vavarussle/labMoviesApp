import React, { useState } from "react";
import { useQuery } from "react-query";
import MovieSearchForm from "../components/movieSearchForm";
import PageTemplate from "../components/templateMovieListPage";
import Spinner from "../components/spinner";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import { getMoviesByCriteria } from "../api/tmdb-api";
import {
  BaseMovieProps,
  DiscoverMovies,
  MovieSearchCriteria,
} from "../types/interfaces";

const defaultCriteria: MovieSearchCriteria = {
  genre: "0",
  year: "",
  minimumRating: "0",
  sortBy: "popularity.desc",
};

const MovieSearchPage: React.FC = () => {
  const [formCriteria, setFormCriteria] =
    useState<MovieSearchCriteria>(defaultCriteria);

  const [submittedCriteria, setSubmittedCriteria] =
    useState<MovieSearchCriteria>(defaultCriteria);

  const [hasSearched, setHasSearched] =
    useState(false);

  const {
    data,
    error,
    isLoading,
    isError,
  } = useQuery<DiscoverMovies, Error>(
    ["movieSearch", submittedCriteria],
    () => getMoviesByCriteria(submittedCriteria),
    {
      enabled: hasSearched,
    }
  );

  const changeCriteria = (
    field: keyof MovieSearchCriteria,
    value: string
  ) => {
    setFormCriteria((previousCriteria) => ({
      ...previousCriteria,
      [field]: value,
    }));
  };

  const searchMovies = () => {
    setSubmittedCriteria({
      ...formCriteria,
    });

    setHasSearched(true);
  };

  const resetSearch = () => {
    setFormCriteria(defaultCriteria);
    setSubmittedCriteria(defaultCriteria);
    setHasSearched(false);
  };

  const movies = data ? data.results : [];

  return (
    <>
      <MovieSearchForm
        criteria={formCriteria}
        onCriteriaChange={changeCriteria}
        onSearch={searchMovies}
        onReset={resetSearch}
      />

      {isLoading && <Spinner />}

      {isError && (
        <h1>{error.message}</h1>
      )}

      {!hasSearched && (
        <p style={{ margin: "24px" }}>
          Select your criteria and press Search.
        </p>
      )}

      {hasSearched &&
        !isLoading &&
        !isError &&
        movies.length === 0 && (
          <p style={{ margin: "24px" }}>
            No movies matched the selected criteria.
          </p>
        )}

      {hasSearched &&
        !isLoading &&
        !isError &&
        movies.length > 0 && (
          <PageTemplate
            title="Movie Search Results"
            movies={movies}
            action={(movie: BaseMovieProps) => (
              <AddToFavouritesIcon {...movie} />
            )}
          />
        )}
    </>
  );
};

export default MovieSearchPage;