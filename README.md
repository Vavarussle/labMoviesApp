# React Movies Application

GitHub Repository: https://github.com/Vavarussle/labMoviesApp

## Overview

This project is an extension of the React Movies laboratory application developed during the Full Stack Development 2 module.

The objective of the assignment was to extend the existing application introducing additional data models, pages and functionality.

The application uses The Movie Database (TMDB) API to retrieve movie and actor information.

---

# Features

## Existing Features

The original application includes:

* Browse popular movies
* View movie details
* View movie images
* View movie reviews
* Upcoming movies
* Favourite movies
* Write movie reviews
* Genre filtering
* Title filtering
* Material UI interface
* React Query data fetching and caching
* Storybook support

---

## Additional Functionality Implemented

The following functionality was added as part of this assignment.

### Actor Entity

A new Actor data model was introduced into the application.

Additional interfaces were created to represent:

* Popular actors
* Actor details
* Actor movie credits

These data models are separate from the existing movie models and map directly to TMDB actor endpoints.

---

### Popular Actors

A new page displays the list of popular actors retrieved from TMDB.

Features include:

* Actor cards
* Actor popularity
* Department information
* Navigation to Actor Details

---

### Actor Details

A new route displays detailed information for an individual actor.

Information includes:

* Profile image
* Biography
* Birthday
* Place of birth
* Also known as names
* Movie credits

---

### Favourite Actors

Users can add and remove actors from a favourites list.

Favourite actors are managed using the same  approach used by the movie favourites implementation.

---

### Movie and Actor Hyperlinking

Navigation between entities has been extended.

Users can now navigate:

* Movie → Actor
* Actor → Movie

This provides significantly improved navigation throughout the application.

---

### Enhanced Movie Filtering

The existing movie filtering system was extended.

Additional filtering criteria include:

* Minimum rating
* Release year

Multiple criteria can be applied simultaneously.

---

### Movie Sorting

Movie lists can now be sorted by:

* Popularity
* Rating
* Release date

Both ascending and descending ordering is supported where appropriate.

---

### Actor Filtering

The Popular Actors page supports filtering by:

* Actor name
* Popularity

---

### Multi-Criteria Movie Search

A dedicated Movie Search page was added.

Users can search TMDB movies using multiple criteria including:

* Genre
* Release year
* Minimum rating
* Sort order

Unlike the Home page filters, this feature performs a new TMDB Discover query using the submitted search criteria.

---

### Storybook

Storybook was extended to document the new reusable components introduced during development.

Additional stories include:

* ActorCard
* ActorDetails
* MovieCast

---

# New Routes

The application now includes the following additional routes.

| Route                | Description                 |
| -------------------- | --------------------------- |
| `/actors`            | Popular actors              |
| `/actors/:id`        | Actor details               |
| `/actors/favourites` | Favourite actors            |
| `/movies/search`     | Multi-criteria movie search |

---

# TMDB API Endpoints Used

## Existing

* Discover Movies
* Movie Details
* Movie Images
* Movie Reviews
* Upcoming Movies
* Genres

## Added

* Popular Actors
* Actor Details
* Actor Movie Credits

---

# Technologies Used

* React
* TypeScript
* React Router
* React Query
* Material UI
* Storybook
* Vite

---

# Project Structure

The project maintains the structure established during the lab exercises.

Major additions include:

* Actor pages
* Actor components
* Actor context
* Actor API functions
* Actor interfaces
* Movie search components
* Additional Storybook stories

---

# Running the Application

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Run Storybook:

```bash
npm run storybook
```

Create a production build:

```bash
npm run build
```

---

# Environment Variables

Create a `.env` file in the project root containing:

```text
VITE_TMDB_KEY=YOUR_TMDB_API_KEY
```

A valid TMDB API key is required to run the application.

---

# Known Limitations

* Movie search currently retrieves the first page of TMDB search results.
* Some actors do not have complete biography or profile information available through TMDB.
