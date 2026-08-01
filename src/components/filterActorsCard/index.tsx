import React, { ChangeEvent } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FormControl from "@mui/material/FormControl";
import { ActorFilterOption } from "../../types/interfaces";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { SelectChangeEvent } from "@mui/material";

const styles = {
  root: {
    maxWidth: 345,
  },
  formControl: {
    margin: 1,
    minWidth: 220,
    backgroundColor: "rgb(255, 255, 255)",
  },
};

interface FilterActorsCardProps {
  onUserInput: (type: ActorFilterOption, value: string) => void;
  nameFilter: string;
  popularityFilter: string;
}

const FilterActorsCard: React.FC<FilterActorsCardProps> = ({
  nameFilter,
  popularityFilter,
  onUserInput,
}) => {
  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    onUserInput("name", event.target.value);
  };

  const handlePopularityChange = (
    event: SelectChangeEvent<string>
  ) => {
    onUserInput("popularity", event.target.value);
  };

  return (
    <Card sx={styles.root} variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h1">
          <FilterAltIcon fontSize="large" />
          Filter the actors.
        </Typography>
          <TextField
            sx={styles.formControl}
            id="actor-name-search"
            label="Actor name"
            type="search"
            value={nameFilter}
            variant="filled"
            onChange={handleNameChange}
          />

        <FormControl sx={styles.formControl}>
        <InputLabel id="popularity-label">
            Minimum popularity
          </InputLabel>

          <Select
            labelId="popularity-label"
            id="popularity-select"
            value={popularityFilter}
            label="Minimum popularity"
            onChange={handlePopularityChange}>
            <MenuItem value="0">
              All popularity levels
            </MenuItem>

            <MenuItem value="10">10+</MenuItem>
            <MenuItem value="20">20+</MenuItem>
            <MenuItem value="40">40+</MenuItem>
            <MenuItem value="60">60+</MenuItem>
          </Select>
        </FormControl>
      </CardContent>
    </Card>
  );
};

export default FilterActorsCard;