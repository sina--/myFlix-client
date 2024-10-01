import React from "react";
import { Button } from "react-bootstrap";
import { useState } from "react";

export const FavoriteButton = ({ initFav = false, movieId, username }) => {
  const [isFav, setIsFav] = useState(initFav);

  const addToFav = async () => {
    try {
      const response = await fetch(`https://sw-movie-flix-5fc48d8b332a.herokuapp.com/users/${username}/movies/${movieId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setIsFav(true);
        console.log("Movie added to favorites!");
      } else {
        console.error("Failed to add movie to favorites.");
      }
    } catch (error) {
      console.error("Error adding movie to favorites:", error);
    }
  };

  const removeFromFav = async () => {
    try {
      const response = await fetch(`https://sw-movie-flix-5fc48d8b332a.herokuapp.com/users/${username}/movies/${movieId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setIsFav(false);
        console.log("Movie removed from favorites!");
      } else {
        console.error("Failed to remove movie from favorites.");
      }
    } catch (error) {
      console.error("Error removing movie from favorites:", error);
    }
  };

  const toggleFav = () => {
    if (isFav) {
      removeFromFav();
    } else {
      addToFav();
    }
  };

  return (
    <Button variant="outline-danger" onClick={toggleFav}>
      <i className={`bi ${isFav ? "bi-heart-fill" : "bi-heart"}`} />
    </Button>
  );
};
