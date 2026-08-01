import React from "react";
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavouriteMoviesPage from "./pages/favouriteMoviesPage"; // NEW
import MoviesReviewPage from "./pages/movieReviewPage"; // NEW
import Siteheader from "./components/siteHeader";
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from "./pages/addMovieReviewPage";
import PopularActorsPage from "./pages/popularActorsPage.tsx";
import ActorDetailsPage from "./pages/actorDetailsPage";
import ActorsContextProvider from "./contexts/actorsContext";
import FavouriteActorsPage from "./pages/favouriteActorsPage.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});


const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Siteheader />
          <MoviesContextProvider>
            <ActorsContextProvider>
              <Routes>
                  <Route path="/reviews/form" element={<AddMovieReviewPage />} />
                  <Route path="/reviews/:id" element={<MoviesReviewPage />} />
                  <Route path="/movies/favourites" element={<FavouriteMoviesPage />} />
                  <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
                  <Route path="/movies/:id" element={<MoviePage />} />
                  <Route
                  path="/actors/favourites"
                  element={<FavouriteActorsPage />}
                  />
                  <Route path="/actors/:id" element={<ActorDetailsPage />} />
                  <Route path="/actors" element={<PopularActorsPage />} />
                  <Route path="/" element={<HomePage />} />
                  <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </ActorsContextProvider>
        </MoviesContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

