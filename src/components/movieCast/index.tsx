import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { MovieCastMember } from "../../types/interfaces";
import img from "../../images/film-poster-placeholder.png";

const styles = {
  castSection: {
    marginTop: "30px",
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  media: {
    height: 350,
  },
  content: {
    flexGrow: 1,
  },
};

interface MovieCastProps {
  cast: MovieCastMember[];
}

const MovieCast: React.FC<MovieCastProps> = ({ cast }) => {
  const displayedCast = [...cast]
    .sort((first, second) => first.order - second.order)
    .slice(0, 12);

  return (
    <Grid container spacing={3} sx={styles.castSection}>
      <Grid item xs={12}>
        <Typography variant="h4" component="h2">
          Cast
        </Typography>
      </Grid>

      {displayedCast.length > 0 ? (
        displayedCast.map((actor) => (
          <Grid
            key={`${actor.id}-${actor.character}`}
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
          >
            <Card sx={styles.card}>
              <CardHeader title={actor.name} />

              <CardMedia
                sx={styles.media}
                image={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
                    : img
                }
                title={actor.name}
              />

              <CardContent sx={styles.content}>
                <Typography variant="body1" component="p">
                  Character: {actor.character || "Not specified"}
                </Typography>
              </CardContent>

              <CardActions>
                <Link to={`/actors/${actor.id}`}>
                  <Button
                    variant="outlined"
                    size="small"
                    color="primary"
                  >
                    Actor Details
                  </Button>
                </Link>
              </CardActions>
            </Card>
          </Grid>
        ))
      ) : (
        <Grid item xs={12}>
          <Typography variant="body1">
            No cast information is currently available.
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default MovieCast;