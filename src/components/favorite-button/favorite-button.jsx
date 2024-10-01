import React from "react";
import { Button } from "react-bootstrap";

export const FavoriteButton = ({ isFav, onClick }) => {
  return (
    <Button variant="outline-danger" onClick={onClick}>
      <i className={`bi ${isFav ? "bi-heart-fill" : "bi-heart"}`} />
    </Button>
  );
};
