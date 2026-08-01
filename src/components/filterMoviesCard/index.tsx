import React, { ChangeEvent } from "react";
import { FilterOption , GenreData, MovieSortOption} from "../../types/interfaces";
import { SelectChangeEvent } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SortIcon from '@mui/icons-material/Sort';
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {getGenres} from "../../api/tmdb-api";
import {useQuery} from "react-query";
import Spinner from "../spinner";

const styles = {
  root: {
    maxWidth: 345,
  },
  media: { height: 300 },
 
  formControl: {
    margin: 1,
    minWidth: 220,
    backgroundColor: "rgb(255, 255, 255)",
  },
};


interface FilterMoviesCardProps {
  onUserInput: (type: FilterOption, value: string) => void;
  onSortChange: (value: MovieSortOption) => void;
  titleFilter: string;
  genreFilter: string;
  ratingFilter: string;
  yearFilter: string;
  sortOption: MovieSortOption;
}

const FilterMoviesCard: React.FC<FilterMoviesCardProps> = ({ titleFilter, genreFilter, ratingFilter, yearFilter, sortOption, onUserInput, onSortChange, }) => {
  const { data, error, isLoading, isError } = useQuery<GenreData, Error>("genres", getGenres);

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <h1>{(error as Error).message}</h1>;
  }
  const genres = data?.genres || [];
  if (genres[0].name !== "All") {
    genres.unshift({ id: "0", name: "All" });
  }

  const handleChange = (e: SelectChangeEvent, type: FilterOption, value: string) => {
    e.preventDefault()
      onUserInput(type, value)
  };

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange(e, "title", e.target.value)
  }

  const handleGenreChange = (e: SelectChangeEvent) => {
    handleChange(e, "genre", e.target.value)
  };

  const handleRatingChange = (
    event: SelectChangeEvent
  ) => {
    onUserInput("rating", event.target.value);
  };

  const handleYearChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    onUserInput("year", event.target.value);
  };

  const handleSortChange = (
    event: SelectChangeEvent
  ) => {
    onSortChange(event.target.value as MovieSortOption);
  };

  return (
    <>
    <Card sx={styles.root} variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h1">
          <FilterAltIcon fontSize="large" />
          Filter the movies.
        </Typography>
            <TextField
              sx={styles.formControl}
              id="filled-search"
              label="Search field"
              type="search"
              value={titleFilter}
              variant="filled"
              onChange={handleTextChange}
            />

        <FormControl sx={styles.formControl}>
          <InputLabel id="genre-label">Genre</InputLabel>
          <Select
            labelId="genre-label"
            id="genre-select"
            value={genreFilter}
            onChange={handleGenreChange}
          >
            {genres.map((genre) => {
              return (
                <MenuItem key={genre.id} value={genre.id}>
                  {genre.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        <FormControl sx={styles.formControl}>
            <InputLabel id="rating-label">
              Minimum rating
            </InputLabel>

            <Select
              labelId="rating-label"
              id="rating-select"
              value={ratingFilter}
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

          <TextField
            sx={styles.formControl}
            id="release-year-filter"
            label="Release year"
            type="number"
            value={yearFilter}
            variant="filled"
            onChange={handleYearChange}
            inputProps={{
              min: 1900,
              max: 2100,
            }} />
      </CardContent>
    </Card>
    <Card sx={styles.root} variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h1">
            <SortIcon fontSize="large" />
            Sort the movies.
          </Typography>
          <FormControl sx={styles.formControl}>
            <InputLabel id="sort-label">
              Sort by
            </InputLabel>

            <Select
              labelId="sort-label"
              id="sort-select"
              value={sortOption}
              label="Sort by"
              onChange={handleSortChange}
            >
              <MenuItem value="none">
                Default order
              </MenuItem>

              <MenuItem value="popularityDescending">
                Popularity: high to low
              </MenuItem>

              <MenuItem value="popularityAscending">
                Popularity: low to high
              </MenuItem>

              <MenuItem value="ratingDescending">
                Rating: high to low
              </MenuItem>

              <MenuItem value="ratingAscending">
                Rating: low to high
              </MenuItem>

              <MenuItem value="releaseDateDescending">
                Release date: newest first
              </MenuItem>

              <MenuItem value="releaseDateAscending">
                Release date: oldest first
              </MenuItem>
            </Select>
          </FormControl>
        </CardContent>
      </Card>
      </>
  );
}

export default FilterMoviesCard;
