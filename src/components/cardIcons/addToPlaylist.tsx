import React, { useContext } from "react";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import IconButton from "@mui/material/IconButton";
import { BaseMovieProps } from "../../types/interfaces";
import { MoviesContext } from "../../contexts/moviesContext";

const AddToPlaylistIcon: React.FC<BaseMovieProps> = (movie) => {
  const context = useContext(MoviesContext);

  const handleAddToMustWatch = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    context.addToMustWatch(movie);
  };

  return (
    <IconButton aria-label="add to must watch" onClick={handleAddToMustWatch}>
      {movie.mustWatch ? (
        <PlaylistAddCheckIcon color="secondary" fontSize="large" />
      ) : (
        <PlaylistAddIcon color="primary" fontSize="large" />
      )}
    </IconButton>
  );
};


export default AddToPlaylistIcon;