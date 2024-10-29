import React from "react";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card.jsx";

export const ProfileView = ({ user, toggleFavorite }) => {
  const [username, setUsername] = useState(user.Username);
  const [password, setPassword] = useState("password");
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

    if (username !== user.Username) {
      updatedData.Username = username;
    }
    if (email !== user.Email) {
      updatedData.Email = email;
    }
    if (birthday !== user.Birthday) {
      updatedData.Birthday = birthday;
    }

    if (password !== "") {
      updatedData.Password = password;
    }

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
    <>
      <h3 className="m-3">Update User Profile:</h3>
      <Form onSubmit={handleSubmit} className="m-3">
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            minLength="3"
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formDate">
          <Form.Label>Birthday:</Form.Label>
          <Form.Control
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="m-3">
          Update
        </Button>
      </Form>

      <h3 className="m-3">Your Favorite Movies:</h3>
      {movies.length > 0 ? (
        <Row className="m-1">
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

      <Button className="m-3" onClick={() => navigate("/")}>
        Back
      </Button>
      <Button variant="danger" onClick={deregister} className="m-3">
        Delete User
      </Button>
    </>
  );
};
