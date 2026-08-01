import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import { BaseActorProps } from "../../types/interfaces";
import { ActorsContext } from "../../contexts/actorsContext";
import img from "../../images/film-poster-placeholder.png";

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 500,
  },
  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
  },
};

interface ActorCardProps {
  actor: BaseActorProps;
  action: (actor: BaseActorProps) => React.ReactNode;
}

const ActorCard: React.FC<ActorCardProps> = ({ actor, action }) => {
  const { favouriteActors } = useContext(ActorsContext);

  const isFavourite = favouriteActors.includes(actor.id);

  return (
    <Card sx={styles.card}>
      <CardHeader
        avatar={
          isFavourite ? (
            <Avatar sx={styles.avatar}>
              <FavoriteIcon />
            </Avatar>
          ) : null
        }
        title={
          <Typography variant="h5" component="p">
            {actor.name}
          </Typography>
        }
      />

      <CardMedia
        sx={styles.media}
        image={
          actor.profile_path
            ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
            : img
        }
        title={actor.name}
      />

      <CardContent>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="body1" component="p">
              Department: {actor.known_for_department || "Not available"}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="body1" component="p">
              Popularity: {actor.popularity?.toFixed(1) || "Not available"}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>

      <CardActions disableSpacing>
        {action(actor)}

        <Link to={`/actors/${actor.id}`}>
          <Button variant="outlined" size="medium" color="primary">
            More Info
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default ActorCard;