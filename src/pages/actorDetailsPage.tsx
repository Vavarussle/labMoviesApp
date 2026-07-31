import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import {
  getActor,
  getActorMovieCredits,
} from "../api/tmdb-api";
import ActorDetails from "../components/actorDetails";
import Spinner from "../components/spinner";
import {
  ActorDetailsProps,
  ActorMovieCredits,
} from "../types/interfaces";

const ActorDetailsPage: React.FC = () => {
  const { id } = useParams();

  const {
    data: actor,
    error: actorError,
    isLoading: actorLoading,
    isError: actorIsError,
  } = useQuery<ActorDetailsProps, Error>(
    ["actor", id],
    () => getActor(id || "")
  );

  const {
    data: credits,
    error: creditsError,
    isLoading: creditsLoading,
    isError: creditsIsError,
  } = useQuery<ActorMovieCredits, Error>(
    ["actorMovieCredits", id],
    () => getActorMovieCredits(id || "")
  );

  if (actorLoading || creditsLoading) {
    return <Spinner />;
  }

  if (actorIsError) {
    return <h1>{actorError.message}</h1>;
  }

  if (creditsIsError) {
    return <h1>{creditsError.message}</h1>;
  }

  if (!actor) {
    return <p>Waiting for actor details</p>;
  }

  return (
    <ActorDetails
      actor={actor}
      credits={credits ? credits.cast : []}
    />
  );
};

export default ActorDetailsPage;