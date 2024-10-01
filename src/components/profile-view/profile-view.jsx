import React from "react";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const ProfileView = ({ user }) => {
  const [username, setUsername] = useState(user.Username);
  const [password, setPassword] = useState("password");
  const [email, setEmail] = useState(user.Email);
  const [birthday, setBirthday] = useState(user.Birthday);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://sw-movie-flix-5fc48d8b332a.herokuapp.com/users/${user.Username}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
    })
      .then((response) => response.json())
      .then((data) => {
        setFavorites(data.Favorites); 
      })
      .catch((error) => {
        console.error("Error fetching user favorites:", error);
      });
  }, [username]);
  

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    };

    fetch("https://sw-movie-flix-5fc48d8b332a.herokuapp.com/users", {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => {
      if (response.ok) {
        alert("Success");
        window.location.reload();
      } else {
        alert("Profile update failed");
      }
    });
  };
  
  const deregister = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    };

    fetch(`https://sw-movie-flix-5fc48d8b332a.herokuapp.com/users/${username}/deregister`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}`,
        "Content-Type": "application/json"
      },
    }).then((response) => {
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
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            minLength="3"
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formDate">
          <Form.Label>Birthday:</Form.Label>
          <Form.Control
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>

      <h3>Your Favorite Movies:</h3>
      {favorites.length > 0 ? (
        <ul>
          {favorites.map((movieId, index) => (
            <li key={index}>Movie ID: {movieId}</li>
          ))}
        </ul>
      ) : (
        <p>No favorite movies added yet.</p>
      )}

      <Button variant="danger" onClick={deregister}>
        Delete User
      </Button>
      <Button onClick={() => navigate("/")}>Back</Button>
    </>
  );
};
