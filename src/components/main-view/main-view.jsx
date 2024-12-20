import { useState, useEffect } from "react";
import { NavigationBar } from "../navigation-bar/navigation-bar.jsx";
import { MovieCard } from "../movie-card/movie-card.jsx";
import { MovieView } from "../movie-view/movie-view.jsx";
import { LoginView } from "../login-view/login-view.jsx";
import { SignupView } from "../signup-view/signup-view.jsx";
import { ProfileView } from "../profile-view/profile-view.jsx";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!token) {
      return;
    }
    fetch("https://sw-movie-flix-5fc48d8b332a.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        setMovies(data);
        const userFavs = data.filter((m) =>
          storedUser.Favorites.includes(m._id),
        );
        setFavorites(userFavs);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, [token]);

  const toggleFavorite = (movieId) => {
    if (favorites.some((fav) => fav._id === movieId)) {
      console.log(`Removing favorite for movieId: ${movieId}`);

      fetch(
        `https://sw-movie-flix-5fc48d8b332a.herokuapp.com/users/${storedUser.Username}/movies/${movieId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        },
      )
        .then((response) => {
          if (!response.ok) throw new Error("Failed to remove from favorites");
          setFavorites(favorites.filter((fav) => fav._id !== movieId));
          return fetch(
            `https://sw-movie-flix-5fc48d8b332a.herokuapp.com/users/${storedUser.Username}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            },
          );
        })
        .then((response) => response.json())
        .then((data) => {
          storedUser.Favorites = data.Favorites;
        })
        .catch((error) => {
          console.error("Error removing favorite:", error);
        });
    } else {
      console.log(`Adding favorite for movieId: ${movieId}`);

      fetch(
        `https://sw-movie-flix-5fc48d8b332a.herokuapp.com/users/${storedUser.Username}/movies/${movieId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        },
      )
        .then((response) => {
          if (!response.ok) throw new Error("Failed to add to favorites");
          const movie = movies.find((m) => m._id === movieId);
          setFavorites([...favorites, movie]);
          return fetch(
            `https://sw-movie-flix-5fc48d8b332a.herokuapp.com/users/${storedUser.Username}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            },
          );
        })
        .then((response) => response.json())
        .then((data) => {
          storedUser.Favorites = data.Favorites;
        })
        .catch((error) => {
          console.error("Error adding favorite:", error);
        });
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const filteredMovies = movies.filter((movie) => {
    return (
      movie.Title.toLowerCase().includes(searchQuery) ||
      movie.Genre.Name.toLowerCase().includes(searchQuery) ||
      movie.Director.Name.toLowerCase().includes(searchQuery)
    );
  });

  const onLoggedOut = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  return (
    <BrowserRouter>
      <NavigationBar user={user} onLoggedOut={onLoggedOut} />
      <div className="pt-4">
        <Row className="justify-content-md-center">
          <Routes>
            <Route
              path="/signup"
              element={
                <>
                  {user ? (
                    <Navigate to="/" />
                  ) : (
                    <Col md={5}>
                      <SignupView />
                    </Col>
                  )}
                </>
              }
            />
            <Route
              path="/login"
              element={
                <>
                  {user ? (
                    <Navigate to="/" />
                  ) : (
                    <Col md={5}>
                      <LoginView
                        onLoggedIn={(user) => {
                          setUser(user);
                          setToken(token);
                        }}
                      />
                    </Col>
                  )}
                </>
              }
            />
            <Route
              path="/movies/:movieId"
              element={
                <>
                  {!user ? (
                    <Navigate to="/login" replace />
                  ) : movies.length === 0 ? (
                    <Col>No movies found!</Col>
                  ) : (
                    <Col md={8}>
                      <MovieView
                        movieData={movies}
                        favorites={favorites}
                        toggleFavorite={toggleFavorite}
                      />
                    </Col>
                  )}
                </>
              }
            />
            <Route
              path="/"
              element={
                <>
                  {!user ? (
                    <Navigate to="/login" replace />
                  ) : (
                    <>
                      <div className="d-flex justify-content-center mb-3">
                        <input
                          type="text"
                          placeholder="Search by title, genre, or director"
                          value={searchQuery}
                          onChange={handleSearchChange}
                          style={{
                            padding: "10px",
                            width: "100%",
                            maxWidth: "400px",
                          }}
                        />
                      </div>
                      {filteredMovies.length === 0 ? (
                        <Col>No movies match your search!</Col>
                      ) : (
                        <>
                          {filteredMovies.map((movie) => (
                            <Col className="mb-4" key={movie._id} md={3}>
                              <MovieCard
                                movieData={movie}
                                isFav={favorites.some(
                                  (fav) => fav._id === movie._id,
                                )}
                                toggleFavorite={toggleFavorite}
                              />
                            </Col>
                          ))}
                        </>
                      )}
                    </>
                  )}
                </>
              }
            />
            <Route
              path="/users/:userId"
              element={
                <>
                  {!user ? (
                    <Navigate to="/login" replace />
                  ) : (
                    <Col md={8}>
                      <ProfileView
                        user={user}
                        toggleFavorite={toggleFavorite}
                      />
                    </Col>
                  )}
                </>
              }
            />
          </Routes>
        </Row>
      </div>
    </BrowserRouter>
  );
};
