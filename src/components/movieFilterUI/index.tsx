import React, { useState } from "react";
import FilterCard from "../filterMoviesCard";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import { BaseMovieProps, FilterOption, MovieSortOption } from "../../types/interfaces";

export const titleFilter = (movie: BaseMovieProps, value: string): boolean => {
    return movie.title.toLowerCase().search(value.toLowerCase()) !== -1;
};

export const genreFilter = (movie: BaseMovieProps, value: string) => {
    const genreId = Number(value);
    const genreIds = movie.genre_ids;
    return genreId > 0 && genreIds ? genreIds.includes(genreId) : true;
};

export const ratingFilter = (
  movie: BaseMovieProps,
  value: string
): boolean => {
  const minimumRating = Number(value);

  return movie.vote_average >= minimumRating;
};

export const yearFilter = (
  movie: BaseMovieProps,
  value: string
): boolean => {
  if (value === "") {
    return true;
  }

  return movie.release_date
    ? movie.release_date.startsWith(value)
    : false;
};

const styles = {
    root: {
        backgroundColor: "#bfbfbf",
    },
    fab: {
        marginTop: 8,
        position: "fixed",
        top: 20,
        right: 2,
    },
};

interface MovieFilterUIProps {
    onFilterValuesChange: (type: FilterOption, value: string) => void;
    onSortChange: (value: MovieSortOption) => void;
    titleFilter: string;
    genreFilter: string;
    ratingFilter: string;
    yearFilter: string;
    sortOption: MovieSortOption;
}


const MovieFilterUI: React.FC<MovieFilterUIProps> = ({ onFilterValuesChange, onSortChange, titleFilter, genreFilter, ratingFilter, yearFilter, sortOption }) => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    return (
        <>
            <Fab
                color="secondary"
                variant="extended"
                onClick={() => setDrawerOpen(true)}
                sx={styles.fab}
            >
                Filter
            </Fab>
            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
            >
                <FilterCard
                    onUserInput={onFilterValuesChange}
                    onSortChange={onSortChange}
                    titleFilter={titleFilter}
                    genreFilter={genreFilter}
                    ratingFilter={ratingFilter}
                    yearFilter={yearFilter}
                    sortOption={sortOption}
                />
            </Drawer>
        </>
    );
};

export default MovieFilterUI;
