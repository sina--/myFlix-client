import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { FavoriteButton } from "../favorite-button/favorite-button.jsx";
import "./movie-view.scss"; // Import any additional styles here

export const MovieView = ({ movieData, favorites, toggleFavorite }) => {
  const { movieId } = useParams();
  const movie = movieData.find((b) => b._id === movieId);
  const isFav = favorites.some((fav) => fav._id === movie._id);

  return (
    <div className="movie-view-container">
      <div className="movie-view-content">
        <div className="movie-poster-container">
          <img
            src={movie.Poster}
            className="movie-poster"
            alt={`${movie.Title} Poster`}
          />
        </div>
        <div className="movie-details">
          <h2>{movie.Title}</h2>
          <p>
            <strong>Description:</strong>
            <br />
            {movie.Description}
          </p>
          <p>
            <strong>Director:</strong> {movie.Director.Name}
          </p>
          <p>
            <strong>Genre:</strong> {movie.Genre.Name}
          </p>
          <Link to={`/`}>
            <button className="back-button">Back</button>
          </Link>
          <FavoriteButton
            isFav={isFav}
            movieId={movie._id}
            toggleFavorite={toggleFavorite}
          />
        </div>
      </div>
    </div>
  );
};
