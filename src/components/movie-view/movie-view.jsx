import Button from "react-bootstrap/Button";

export const MovieView = ({ movieData, onBackClick }) => {
  return (
    <div>
      <div>
        <img src={movieData.Poster} className="movie-poster" />
      </div>
      <div>
        <span>Title: {movieData.Title}</span>
      </div>
      <div>
        <span>Description:<br/>{movieData.Description}</span>
      </div>
      <div>
        <span>Director: {movieData.Director.Name}</span>
      </div>
      <div>
        <span>Genre: {movieData.Genre.Name}</span>
      </div>
      <Button onClick={onBackClick}>Back</Button>
    </div>
  );
};
