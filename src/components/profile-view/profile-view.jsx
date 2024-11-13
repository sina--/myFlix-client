import React from "react";
import { useState, useEffect } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card.jsx";

export const ProfileView = ({ user, toggleFavorite }) => {
  const [username, setUsername] = useState(user.Username);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user.Email);
  const [birthday, setBirthday] = useState(user.Birthday);
  const [favorites, setFavorites] = useState([]);
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(
      `https://sw-movie-flix-5fc48d8b332a.herokuapp.com/users/${user.Username}`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      },
    )
      .then((response) => response.json())
      .then((data) => {
        setFavorites(data.Favorites);
      })
      .catch((error) => {
        console.error("Error fetching user favorites:", error);
      });
  }, [username]);

  useEffect(() => {
    if (favorites.length > 0) {
      fetch("https://sw-movie-flix-5fc48d8b332a.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
        .then((response) => response.json())
        .then((data) => {
          const favMovies = data.filter((movie) =>
            favorites.includes(movie._id),
          );
          setMovies(favMovies);
        })
        .catch((error) => {
          console.error("Error fetching favorite movies:", error);
        });
    }
  }, [favorites]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedData = {};

    if (username !== user.Username) updatedData.Username = username;
    if (email !== user.Email) updatedData.Email = email;
    if (birthday !== user.Birthday) updatedData.Birthday = birthday;
    if (password !== "") updatedData.Password = password;

    if (Object.keys(updatedData).length === 0) {
      alert("No changes detected.");
      return;
    }

    fetch(
      `https://sw-movie-flix-5fc48d8b332a.herokuapp.com/users/${user.Username}`,
      {
        method: "PUT",
        body: JSON.stringify(updatedData),
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      },
    )
      .then((response) => response.json())
      .then((updatedUser) => {
        alert("Profile updated successfully");
        localStorage.setItem("user", JSON.stringify(updatedUser));
        navigate("/");
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        alert("Profile update failed");
      });
  };

  const deregister = (event) => {
    event.preventDefault();
    fetch(
      `https://sw-movie-flix-5fc48d8b332a.herokuapp.com/users/${username}/deregister`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      },
    ).then((response) => {
      if (response.ok) {
        alert(`${username} successfully deleted`);
        localStorage.clear();
        navigate("/");
      } else {
        alert("Something went wrong");
      }
    });
  };

  return (
    <div className="profile-view-container p-3">
      <h3 className="mb-4">Update User Profile:</h3>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formUsername" className="mb-3">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                minLength="3"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formPassword" className="mb-3">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter new password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formDate" className="mb-3">
              <Form.Label>Birthday:</Form.Label>
              <Form.Control
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit" className="me-2">
          Update
        </Button>
        <Button variant="danger" onClick={deregister} className="me-2">
          Delete User
        </Button>
        <Button variant="secondary" onClick={() => navigate("/")}>
          Back
        </Button>
      </Form>

      <h3 className="mt-5 mb-4">Your Favorite Movies:</h3>
      {movies.length > 0 ? (
        <Row>
          {movies.map((movie) => (
            <Col className="mb-4" key={movie._id} md={3}>
              <MovieCard
                movieData={movie}
                isFav={favorites.some((fav) => fav === movie._id)}
                toggleFavorite={toggleFavorite}
              />
            </Col>
          ))}
        </Row>
      ) : (
        <p>No favorite movies added yet.</p>
      )}
    </div>
  );
};
