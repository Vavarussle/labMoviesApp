import React, { MouseEvent, useContext } from "react";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { ActorsContext } from "../../contexts/actorsContext";
import { BaseActorProps } from "../../types/interfaces";

const AddToFavouriteActorsIcon: React.FC<BaseActorProps> = (actor) => {
  const context = useContext(ActorsContext);

  const onUserSelect = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    context.addToFavouriteActors(actor);
  };

  return (
    <IconButton
      aria-label="add actor to favourites"
      onClick={onUserSelect}
    >
      <FavoriteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToFavouriteActorsIcon;