import React, { useContext } from "react"
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, {
  titleFilter,
  genreFilter,
  ratingFilter,
  yearFilter,
} from "../components/movieFilterUI";
import RemoveFromFavourites from "../components/cardIcons/removeFromFavourites";
import WriteReview from "../components/cardIcons/writeReview";
import  { MovieSortOption, FilterOption, BaseMovieProps } from "../types/interfaces";

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

const FavouriteMoviesPage: React.FC = () => {
  const { favourites: movieIds } = useContext(MoviesContext);
  const [sortOption, setSortOption] = React.useState<MovieSortOption>("none");
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [titleFiltering, genreFiltering, ratingFiltering, yearFiltering]
  );

  // Create an array of queries and run them in parallel.
  const favouriteMovieQueries = useQueries(
    movieIds.map((movieId) => {
      return {
        queryKey: ["movie", movieId],
        queryFn: () => getMovie(movieId.toString()),
      };
    })
  );

  // Check if any of the parallel queries is still loading.
  const isLoading = favouriteMovieQueries.find((m) => m.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }


  const allFavourites = favouriteMovieQueries
    .map((query) => query.data as BaseMovieProps | undefined)
    .filter(
      (movie): movie is BaseMovieProps =>
        movie !== undefined
    );

  const filteredMovies =
    filterFunction(allFavourites) as BaseMovieProps[];

  const displayedMovies = [...filteredMovies];

  switch (sortOption) {
    case "popularityDescending":
      displayedMovies.sort(
        (firstMovie, secondMovie) =>
          secondMovie.popularity -
          firstMovie.popularity
      );
      break;

    case "popularityAscending":
      displayedMovies.sort(
        (firstMovie, secondMovie) =>
          firstMovie.popularity -
          secondMovie.popularity
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

  return (
    <>
      <PageTemplate
        title="Favourite Movies"
        movies={displayedMovies}
        action={(movie) => {
          return (
            <>
              <RemoveFromFavourites {...movie} />
              <WriteReview {...movie} />
            </>
          );
        }}
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

export default FavouriteMoviesPage;
