import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card.jsx";
import { MovieView } from "../movie-view/movie-view.jsx";
import { LoginView } from "../login-view/login-view.jsx";
import { SignupView } from "../signup-view/signup-view.jsx";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    if (!token) {
      console.log("no token");
      return;
    }
    console.log(`token: ${token}`);
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
      <>
        <LoginView
          onLoggedIn={(user) => {
            setUser(user);
            setToken(token);
          }}
        />
        or
        <SignupView />
      </>
    );
  }

  if (selectedMovie) {
    return (
      <MovieView movieData={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return (
      <div>
        <div>
          No Movies Found!
        </div>
        <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
      </div>
    );
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
        <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
      </div>

    );
  }
};
