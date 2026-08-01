import React, { useContext } from "react";
import { useQueries } from "react-query";
import { ActorsContext } from "../contexts/actorsContext";
import { getActor } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import TemplateActorListPage from "../components/templateActorListPage";
import RemoveFromFavouriteActors from "../components/cardIcons/removeFromFavouriteActors";
import { BaseActorProps } from "../types/interfaces";

const FavouriteActorsPage: React.FC = () => {
  const { favouriteActors: actorIds } = useContext(ActorsContext);

  const favouriteActorQueries = useQueries(
    actorIds.map((actorId) => ({
      queryKey: ["actor", actorId],
      queryFn: () => getActor(actorId.toString()),
    }))
  );

  const isLoading = favouriteActorQueries.some(
    (query) => query.isLoading
  );

  const isError = favouriteActorQueries.some(
    (query) => query.isError
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>Unable to load favourite actors.</h1>;
  }

  const favouriteActors = favouriteActorQueries
    .map((query) => query.data as BaseActorProps | undefined)
    .filter(
      (actor): actor is BaseActorProps => actor !== undefined
    );

  return (
    <TemplateActorListPage
      title="Favourite Actors"
      actors={favouriteActors}
      action={(actor: BaseActorProps) => (
        <RemoveFromFavouriteActors {...actor} />
      )}
    />
  );
};

export default FavouriteActorsPage;