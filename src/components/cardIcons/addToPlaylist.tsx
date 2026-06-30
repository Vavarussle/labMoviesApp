import React, { useContext } from "react";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import IconButton from "@mui/material/IconButton";
import { BaseMovieProps } from "../../types/interfaces";
import { MoviesContext } from "../../contexts/moviesContext";

const AddToPlaylistIcon: React.FC<BaseMovieProps> = (movie) => {
  const context = useContext(MoviesContext);

  const handleAddToMustWatch = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    context?.addToMustWatch(movie);
  };

  return (
    <IconButton aria-label="add to must watch" onClick={handleAddToMustWatch}>
      <PlaylistAddIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToPlaylistIcon;