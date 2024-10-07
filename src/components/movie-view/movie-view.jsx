import { useParams } from "react-router";
import { Link } from "react-router-dom";

export const MovieView = ({ movieData }) => {
  const { movieId } = useParams();
  const movie = movieData.find((b) => b._id === movieId);

  return (
    <div>
      <div>
        <img src={movie.Poster} className="movie-poster" />
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
