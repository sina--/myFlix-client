import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card.jsx";
import { MovieView } from "../movie-view/movie-view.jsx";
import { LoginView } from "../login-view/login-view.jsx";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (!token) {
      return;
    }
    fetch("https://sw-movie-flix-5fc48d8b332a.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setMovies(data);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, [token]);

  if (!user) {
    return (
      <LoginView
        onLoggedIn={(user) => {
          setUser(user);
          setToken(token);
        }}
      />;
    );
  }

  if (selectedMovie) {
    return (
      <MovieView movieData={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>No Movies Found!</div>;
  } else {
    return (
      <div>
        <div>
          {movies.map((movie) => {
            return (
              <MovieCard 
                key={movie._id}
                movieData={movie}
                onMovieClick={(newSelectedMovie) => {
                  setSelectedMovie(newSelectedMovie);
                }}
              />
            );
          })}
        </div>
        <button onClick={() => { setUser(null); setToken(null); }}>Logout</button>
      </div>

    );
  }
};
