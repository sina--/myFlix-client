import React from "react";
import { Button } from "react-bootstrap";
import { useState } from "react";
import "./favorite-button.scss";

export const FavoriteButton = ({ isFav, movieId, toggleFavorite }) => {
  const handleClick = (event) => {
    toggleFavorite(movieId);
  };

  return (
    <Button className="fav-btn" variant="outline-danger" onClick={handleClick}>
      <i className={`bi ${isFav ? "bi-heart-fill" : "bi-heart"}`} />
    </Button>
  );
};
