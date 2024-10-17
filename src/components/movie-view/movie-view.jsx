import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { FavoriteButton } from "../favorite-button/favorite-button.jsx";

export const MovieView = ({ movieData, favorites, toggleFavorite }) => {
  const { movieId } = useParams();
  const movie = movieData.find((b) => b._id === movieId);
  const isFav = favorites.some((fav) => fav._id === movie._id);

  return (
    <div>
      <div>
        <img src={movie.Poster} className="movie-poster" />
        <div>
          <FavoriteButton
            isFav={isFav}
            movieId={movie._id}
            toggleFavorite={toggleFavorite}
          />
        </div>
      </div>
      <div>
        <span>Title: {movie.Title}</span>
      </div>
      <div>
        <span>
          Description:
          <br />
          {movie.Description}
        </span>
      </div>
      <div>
        <span>Director: {movie.Director.Name}</span>
      </div>
      <div>
        <span>Genre: {movie.Genre.Name}</span>
      </div>
      <Link to={`/`}>
        <button className="back-button">Back</button>
      </Link>
    </div>
  );
};
