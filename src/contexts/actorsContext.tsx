import React, { useCallback, useState } from "react";
import { BaseActorProps } from "../types/interfaces";

interface ActorsContextInterface {
  favouriteActors: number[];
  addToFavouriteActors: (actor: BaseActorProps) => void;
  removeFromFavouriteActors: (actor: BaseActorProps) => void;
}

const initialContextState: ActorsContextInterface = {
  favouriteActors: [],
  addToFavouriteActors: () => {},
  removeFromFavouriteActors: () => {},
};

export const ActorsContext =
  React.createContext<ActorsContextInterface>(initialContextState);

const ActorsContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [favouriteActors, setFavouriteActors] = useState<number[]>([]);

  const addToFavouriteActors = useCallback((actor: BaseActorProps) => {
    setFavouriteActors((previousFavourites) => {
      if (!previousFavourites.includes(actor.id)) {
        return [...previousFavourites, actor.id];
      }

      return previousFavourites;
    });
  }, []);

  const removeFromFavouriteActors = useCallback(
    (actor: BaseActorProps) => {
      setFavouriteActors((previousFavourites) =>
        previousFavourites.filter((actorId) => actorId !== actor.id)
      );
    },
    []
  );

  return (
    <ActorsContext.Provider
      value={{
        favouriteActors,
        addToFavouriteActors,
        removeFromFavouriteActors,
      }}
    >
      {children}
    </ActorsContext.Provider>
  );
};

export default ActorsContextProvider;