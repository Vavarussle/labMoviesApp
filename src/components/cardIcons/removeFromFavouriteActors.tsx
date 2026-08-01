import React, { MouseEvent, useContext } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { ActorsContext } from "../../contexts/actorsContext";
import { BaseActorProps } from "../../types/interfaces";

const RemoveFromFavouriteActorsIcon: React.FC<BaseActorProps> = (actor) => {
  const context = useContext(ActorsContext);

  const onUserSelect = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    context.removeFromFavouriteActors(actor);
  };

  return (
    <IconButton
      aria-label="remove actor from favourites"
      onClick={onUserSelect}
    >
      <DeleteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default RemoveFromFavouriteActorsIcon;