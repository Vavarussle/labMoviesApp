import React, { useState } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getMovies } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, {
  titleFilter,
  genreFilter,
  ratingFilter,
  yearFilter,
} from "../components/movieFilterUI";
import { BaseMovieProps, DiscoverMovies, FilterOption, MovieSortOption } from "../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";


const titleFiltering = {
  name: "title",
  value: "",
  condition: titleFilter,
};
const genreFiltering = {
  name: "genre",
  value: "0",
  condition: genreFilter,
};

const ratingFiltering = {
  name: "rating",
  value: "0",
  condition: ratingFilter,
};

const yearFiltering = {
  name: "year",
  value: "",
  condition: yearFilter,
};

const HomePage: React.FC = () => {
  const { data, error, isLoading, isError } = useQuery<DiscoverMovies, Error>("discover", getMovies);
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [titleFiltering, genreFiltering, ratingFiltering, yearFiltering]
  );

  const [sortOption, setSortOption] =
    useState<MovieSortOption>("none");

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }


  const changeFilterValues = (type: FilterOption, value: string) => {
    const changedFilter = { name: type, value: value };
    const updatedFilterSet = filterValues.map(
      (filterValue) =>
        filterValue.name === type
          ? changedFilter
          : filterValue
    );
    setFilterValues(updatedFilterSet);
  };

  const movies = data ? data.results : [];
  const filteredMovies =
    filterFunction(movies) as BaseMovieProps[];

  const displayedMovies = [...filteredMovies];

  switch (sortOption) {
    case "popularityDescending":
      displayedMovies.sort(
        (firstMovie, secondMovie) =>
          secondMovie.popularity - firstMovie.popularity
      );
      break;

    case "popularityAscending":
      displayedMovies.sort(
        (firstMovie, secondMovie) =>
          firstMovie.popularity - secondMovie.popularity
      );
      break;

    case "ratingDescending":
      displayedMovies.sort(
        (firstMovie, secondMovie) =>
          secondMovie.vote_average -
          firstMovie.vote_average
      );
      break;

    case "ratingAscending":
      displayedMovies.sort(
        (firstMovie, secondMovie) =>
          firstMovie.vote_average -
          secondMovie.vote_average
      );
      break;

    case "releaseDateDescending":
      displayedMovies.sort(
        (firstMovie, secondMovie) =>
          secondMovie.release_date.localeCompare(
            firstMovie.release_date
          )
      );
      break;

    case "releaseDateAscending":
      displayedMovies.sort(
        (firstMovie, secondMovie) =>
          firstMovie.release_date.localeCompare(
            secondMovie.release_date
          )
      );
      break;

    default:
      break;
  }

  const favourites = movies.filter(
    (movie) => movie.favourite
  );

  localStorage.setItem(
    "favourites",
    JSON.stringify(favourites)
  );

  return (
    <>
      <PageTemplate
        title="Discover Movies"
        movies={displayedMovies}
        action={(movie: BaseMovieProps) => (
          <AddToFavouritesIcon {...movie} />
        )}
      />

      <MovieFilterUI
        onFilterValuesChange={changeFilterValues}
        onSortChange={setSortOption}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
        ratingFilter={filterValues[2].value}
        yearFilter={filterValues[3].value}
        sortOption={sortOption}
      />
    </>
  );
};

export default HomePage;
