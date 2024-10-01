import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FavoriteButton } from "../favorite-button/favorite-button.jsx";

export const MovieCard = ({ movieData, user }) => {
  return (
    <Card className="h-100">
      <Link to={`/movies/${encodeURIComponent(movieData._id)}`} className="text-decoration-none text-reset">
        <Card.Img variant="top" src={movieData.Poster}/>
        <Card.Body>
          <Card.Title>{movieData.Title}</Card.Title>
          <Card.Text>{movieData.Description}</Card.Text>
          <FavoriteButton 
            initFav={""}
            movieId={movieData._id}
            username={user.Username}
          />
        </Card.Body>
      </Link>
    </Card>
  );
};

MovieCard.propTypes = {
  movieData: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired
    }),
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired
    }),
    Poster: PropTypes.string.isRequired
  }).isRequired,
};
