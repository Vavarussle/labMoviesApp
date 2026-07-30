import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PersonIcon from "@mui/icons-material/Person";
import StarRateIcon from "@mui/icons-material/StarRate";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import { BaseActorProps } from "../../types/interfaces";
import img from "../../images/film-poster-placeholder.png";

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 500,
  },
};

interface ActorCardProps {
  actor: BaseActorProps;
  action: (actor: BaseActorProps) => React.ReactNode;
}

const ActorCard: React.FC<ActorCardProps> = ({ actor, action }) => {
  return (
    <Card sx={styles.card}>
      <CardHeader
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
      />

      <CardContent>
        <Grid container>
          <Grid item xs={7}>
            <Typography variant="body1" component="p">
              <PersonIcon fontSize="small" />
              {" "}
              {actor.known_for_department}
            </Typography>
          </Grid>

          <Grid item xs={5}>
            <Typography variant="body1" component="p">
              <StarRateIcon fontSize="small" />
              {" "}
              {actor.popularity.toFixed(1)}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>

      <CardActions disableSpacing>
        {action(actor)}

        <Link to={`/actors/${actor.id}`}>
          <Button variant="outlined" size="medium" color="primary">
            More Info ...
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default ActorCard;