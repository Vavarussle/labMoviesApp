import React from "react";
import { useQuery } from "react-query";
import { getPopularActors } from "../api/tmdb-api";
import {
  BaseActorProps,
  PopularActors,
  ActorFilterOption,
} from "../types/interfaces";
import PageTemplate from "../components/templateActorListPage";
import Spinner from "../components/spinner";
import AddToFavouriteActors from "../components/cardIcons/addToFavouriteActors";
import ActorFilterUI from "../components/actorFilterUI";
import useFiltering from "../hooks/useFiltering";

const nameFiltering = {
  name: "name",
  value: "",
  condition: (actor: BaseActorProps, value: string) => actor.name.toLowerCase().search(value.toLowerCase()) !== -1,
};

const departmentFiltering = {
  name: "department",
  value: "",
  condition: (actor: BaseActorProps, value: string) => actor.known_for_department.toLowerCase().search(value.toLowerCase()) !== -1,
};

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

    const { filterValues, setFilterValues, filterFunction } = useFiltering([nameFiltering, departmentFiltering, ]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const actors = data ? data.results : [];
  const displayedActors = filterFunction(actors);

    const changeFilterValues = (
    type: ActorFilterOption, value: string) => {
        const changedFilter = { name: type, value: value 
        };
        const updatedFilterSet =
        type === "name" ? [changedFilter, filterValues[1]] : [filterValues[0], changedFilter];

        setFilterValues(updatedFilterSet);
    };

  return (
    <>
    <PageTemplate
      title="Popular Actors"
      actors={displayedActors}
      action={(actor: BaseActorProps) => (
        <AddToFavouriteActors {...actor} />
      )}
    />
    <ActorFilterUI
        onFilterValuesChange={changeFilterValues}
        nameFilter={filterValues[0].value}
        departmentFilter={filterValues[1].value}
    />
    </>
  );
};

export default PopularActorsPage;