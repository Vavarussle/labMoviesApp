import React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PlaceIcon from "@mui/icons-material/Place";
import WorkIcon from "@mui/icons-material/Work";
import StarRateIcon from "@mui/icons-material/StarRate";
import MovieIcon from "@mui/icons-material/Movie";
import { Link } from "react-router-dom";
import {
  ActorDetailsProps,
  ActorMovieCredit,
} from "../../types/interfaces";
import img from "../../images/film-poster-placeholder.png";

const styles = {
  root: {
    padding: "20px",
  },
  profileImage: {
    width: "100%",
    maxWidth: 400,
    borderRadius: "5px",
  },
  detailsPaper: {
    padding: "20px",
  },
  chipSet: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    padding: "15px",
    marginTop: "20px",
  },
  biography: {
    marginTop: "20px",
  },
  creditsSection: {
    marginTop: "30px",
  },
  creditCard: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  creditMedia: {
    height: 350,
  },
  creditContent: {
    flexGrow: 1,
  },
};

interface ActorDetailsComponentProps {
  actor: ActorDetailsProps;
  credits: ActorMovieCredit[];
}

const ActorDetails: React.FC<ActorDetailsComponentProps> = ({
  actor,
  credits,
}) => {
  const sortedCredits = [...credits].sort((a, b) => {
    const firstDate = a.release_date || "";
    const secondDate = b.release_date || "";

    return secondDate.localeCompare(firstDate);
  });

  return (
    <Grid container spacing={4} sx={styles.root}>
      <Grid item xs={12} md={4}>
        <img
          src={
            actor.profile_path
              ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
              : img
          }
          alt={actor.name}
          style={styles.profileImage}
        />
      </Grid>

      <Grid item xs={12} md={8}>
        <Paper sx={styles.detailsPaper}>
          <Typography variant="h3" component="h1">
            {actor.name}
          </Typography>

          <Paper component="div" sx={styles.chipSet}>
            <Chip
              icon={<WorkIcon />}
              label={`Known for: ${actor.known_for_department}`}
              color="primary"
            />

            <Chip
              icon={<StarRateIcon />}
              label={`Popularity: ${actor.popularity.toFixed(1)}`}
            />

            {actor.birthday && (
              <Chip
                icon={<CalendarTodayIcon />}
                label={`Born: ${actor.birthday}`}
              />
            )}

            {actor.deathday && (
              <Chip
                icon={<CalendarTodayIcon />}
                label={`Died: ${actor.deathday}`}
              />
            )}

            {actor.place_of_birth && (
              <Chip
                icon={<PlaceIcon />}
                label={actor.place_of_birth}
              />
            )}
          </Paper>

          <Typography
            variant="h5"
            component="h2"
            sx={styles.biography}
          >
            Biography
          </Typography>

          <Typography variant="body1" component="p">
            {actor.biography
              ? actor.biography
              : "No biography is currently available for this actor."}
          </Typography>

          {actor.also_known_as.length > 0 && (
            <>
              <Typography
                variant="h6"
                component="h3"
                sx={{ marginTop: "20px" }}
              >
                Also known as
              </Typography>

              <Typography variant="body1" component="p">
                {actor.also_known_as.join(", ")}
              </Typography>
            </>
          )}
        </Paper>
      </Grid>

      <Grid item xs={12} sx={styles.creditsSection}>
        <Typography variant="h4" component="h2">
          Movie Credits
        </Typography>
      </Grid>

      {sortedCredits.length > 0 ? (
        sortedCredits.map((credit) => (
          <Grid
            key={`${credit.id}-${credit.character}`}
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
          >
            <Card sx={styles.creditCard}>
              <CardMedia
                sx={styles.creditMedia}
                image={
                  credit.poster_path
                    ? `https://image.tmdb.org/t/p/w500/${credit.poster_path}`
                    : img
                }
                title={credit.title}
              />

              <CardContent sx={styles.creditContent}>
                <Typography variant="h6" component="h3">
                  {credit.title}
                </Typography>

                <Typography variant="body2" component="p">
                  <MovieIcon fontSize="small" />
                  {" "}
                  Character: {credit.character || "Not specified"}
                </Typography>

                <Typography variant="body2" component="p">
                  <CalendarTodayIcon fontSize="small" />
                  {" "}
                  Released: {credit.release_date || "Unknown"}
                </Typography>
              </CardContent>

              <CardActions>
                <Link to={`/movies/${credit.id}`}>
                  <Button
                    variant="outlined"
                    size="small"
                    color="primary"
                  >
                    Movie Details
                  </Button>
                </Link>
              </CardActions>
            </Card>
          </Grid>
        ))
      ) : (
        <Grid item xs={12}>
          <Typography variant="body1">
            No movie credits are currently available.
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default ActorDetails;