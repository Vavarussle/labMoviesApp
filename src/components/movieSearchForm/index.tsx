import React, { FormEvent } from "react";
import { useQuery } from "react-query";
import { SelectChangeEvent } from "@mui/material";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { getGenres } from "../../api/tmdb-api";
import {
  GenreData,
  MovieSearchCriteria,
} from "../../types/interfaces";
import Spinner from "../spinner";

const styles = {
  form: {
    padding: 3,
    margin: 3,
    maxWidth: 600,
  },
  formControl: {
    marginTop: 2,
    minWidth: 250,
    width: "100%",
  },
  buttons: {
    display: "flex",
    gap: 2,
    marginTop: 3,
  },
};

interface MovieSearchFormProps {
  criteria: MovieSearchCriteria;
  onCriteriaChange: (
    field: keyof MovieSearchCriteria,
    value: string
  ) => void;
  onSearch: () => void;
  onReset: () => void;
}

const MovieSearchForm: React.FC<MovieSearchFormProps> = ({
  criteria,
  onCriteriaChange,
  onSearch,
  onReset,
}) => {
  const {
    data,
    error,
    isLoading,
    isError,
  } = useQuery<GenreData, Error>("genres", getGenres);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const genres = data ? [...data.genres] : [];

  if (!genres.some((genre) => genre.id === "0")) {
    genres.unshift({
      id: "0",
      name: "All genres",
    });
  }

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    onSearch();
  };

  const handleGenreChange = (
    event: SelectChangeEvent
  ) => {
    onCriteriaChange("genre", event.target.value);
  };

  const handleRatingChange = (
    event: SelectChangeEvent
  ) => {
    onCriteriaChange(
      "minimumRating",
      event.target.value
    );
  };

  const handleSortChange = (
    event: SelectChangeEvent
  ) => {
    onCriteriaChange("sortBy", event.target.value);
  };

  return (
    <Paper
      component="form"
      sx={styles.form}
      onSubmit={handleSubmit}
    >
      <Typography variant="h4" component="h1">
        Movie Search
      </Typography>

      <Typography variant="body1" component="p">
        Select several criteria and submit the form to
        search TMDB.
      </Typography>

      <FormControl sx={styles.formControl}>
        <InputLabel id="search-genre-label">
          Genre
        </InputLabel>

        <Select
          labelId="search-genre-label"
          id="search-genre"
          value={criteria.genre}
          label="Genre"
          onChange={handleGenreChange}
        >
          {genres.map((genre) => (
            <MenuItem
              key={genre.id}
              value={genre.id}
            >
              {genre.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        sx={styles.formControl}
        id="search-release-year"
        label="Primary release year"
        type="number"
        value={criteria.year}
        onChange={(event) =>
          onCriteriaChange(
            "year",
            event.target.value
          )
        }
        inputProps={{
          min: 1900,
          max: 2100,
        }}
      />

      <FormControl sx={styles.formControl}>
        <InputLabel id="search-rating-label">
          Minimum rating
        </InputLabel>

        <Select
          labelId="search-rating-label"
          id="search-rating"
          value={criteria.minimumRating}
          label="Minimum rating"
          onChange={handleRatingChange}
        >
          <MenuItem value="0">
            All ratings
          </MenuItem>
          <MenuItem value="5">5+</MenuItem>
          <MenuItem value="6">6+</MenuItem>
          <MenuItem value="7">7+</MenuItem>
          <MenuItem value="8">8+</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={styles.formControl}>
        <InputLabel id="search-sort-label">
          Sort by
        </InputLabel>

        <Select
          labelId="search-sort-label"
          id="search-sort"
          value={criteria.sortBy}
          label="Sort by"
          onChange={handleSortChange}
        >
          <MenuItem value="popularity.desc">
            Popularity: high to low
          </MenuItem>

          <MenuItem value="vote_average.desc">
            Rating: high to low
          </MenuItem>

          <MenuItem value="primary_release_date.desc">
            Release date: newest first
          </MenuItem>

          <MenuItem value="primary_release_date.asc">
            Release date: oldest first
          </MenuItem>
        </Select>
      </FormControl>

      <div style={styles.buttons}>
        <Button
          type="submit"
          variant="contained"
          startIcon={<SearchIcon />}
        >
          Search
        </Button>

        <Button
          type="button"
          variant="outlined"
          startIcon={<RestartAltIcon />}
          onClick={onReset}
        >
          Reset
        </Button>
      </div>
    </Paper>
  );
};

export default MovieSearchForm;