import React from "react";
import { useQuery } from "react-query";
import { getPopularActors } from "../api/tmdb-api";
import {
  BaseActorProps,
  PopularActors,
} from "../types/interfaces";
import PageTemplate from "../components/templateActorListPage";
import Spinner from "../components/spinner";
import AddToFavouriteActors from "../components/cardIcons/addToFavouriteActors";

const PopularActorsPage: React.FC = () => {
  const {
    data,
    error,
    isLoading,
    isError,
  } = useQuery<PopularActors, Error>(
    "popularActors",
    () => getPopularActors()
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const actors = data ? data.results : [];

  return (
    <PageTemplate
      title="Popular Actors"
      actors={actors}
      action={(actor: BaseActorProps) => (
        <AddToFavouriteActors {...actor} />
      )}
    />
  );
};

export default PopularActorsPage;