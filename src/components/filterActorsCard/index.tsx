import React, { ChangeEvent } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FormControl from "@mui/material/FormControl";
import { ActorFilterOption } from "../../types/interfaces";

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
  departmentFilter: string;
}

const FilterActorsCard: React.FC<FilterActorsCardProps> = ({
  nameFilter,
  departmentFilter,
  onUserInput,
}) => {
  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    onUserInput("name", event.target.value);
  };

  const handleDepartmentChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    onUserInput("department", event.target.value);
  };

  return (
    <Card sx={styles.root} variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h1">
          <FilterAltIcon fontSize="large" />
          Filter the actors.
        </Typography>

        <FormControl sx={styles.formControl}>
          <TextField
            id="actor-name-search"
            label="Actor name"
            type="search"
            value={nameFilter}
            variant="filled"
            onChange={handleNameChange}
          />
        </FormControl>

        <FormControl sx={styles.formControl}>
          <TextField
            id="actor-department-search"
            label="Known-for department"
            type="search"
            value={departmentFilter}
            variant="filled"
            onChange={handleDepartmentChange}
          />
        </FormControl>
      </CardContent>
    </Card>
  );
};

export default FilterActorsCard;