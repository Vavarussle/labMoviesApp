import React from "react";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import IconButton from "@mui/material/IconButton";

const AddToPlaylistIcon: React.FC = () => {
  return (
    <IconButton color="primary">
      <PlaylistAddIcon fontSize="large" />
    </IconButton>
  );
};

export default AddToPlaylistIcon;